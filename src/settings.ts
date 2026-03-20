/**
 * @source cursor @line_count 74
 */

import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import type { Env, JwtPayload } from './types';
import { getAvailableModels } from './llm';

const settings = new Hono<{ Bindings: Env }>();

const updateSettingsSchema = z.object({
  llm_provider: z.enum(['deepseek', 'gemini', 'custom']).optional(),
  model_name: z.string().max(100).optional(),
  api_key: z.string().max(500).optional(),
  custom_provider_url: z.string().max(500).optional(),
  custom_model_name: z.string().max(100).optional(),
  language: z.string().max(10).optional(),
});

settings.get('/', async (c) => {
  const payload = c.get('jwtPayload' as never) as JwtPayload;
  const db = c.env.DB;

  const userSettings = await db
    .prepare('SELECT * FROM user_settings WHERE user_id = ?')
    .bind(payload.userId)
    .first();

  const maskedSettings = userSettings
    ? {
        ...userSettings,
        api_key: userSettings.api_key
          ? '••••' + (userSettings.api_key as string).slice(-4)
          : '',
      }
    : null;

  return c.json({ settings: maskedSettings, models: getAvailableModels() });
});

const ALLOWED_SETTING_COLUMNS = new Set([
  'llm_provider', 'model_name', 'api_key',
  'custom_provider_url', 'custom_model_name', 'language',
]);

settings.put('/', zValidator('json', updateSettingsSchema), async (c) => {
  const payload = c.get('jwtPayload' as never) as JwtPayload;
  const data = c.req.valid('json');
  const db = c.env.DB;

  const fields: string[] = [];
  const values: unknown[] = [];

  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && ALLOWED_SETTING_COLUMNS.has(key)) {
      fields.push(`${key} = ?`);
      values.push(value);
    }
  }

  if (fields.length === 0) {
    return c.json({ error: '没有需要更新的字段' }, 400);
  }

  fields.push("updated_at = datetime('now')");
  values.push(payload.userId);

  await db
    .prepare(
      `UPDATE user_settings SET ${fields.join(', ')} WHERE user_id = ?`
    )
    .bind(...values)
    .run();

  return c.json({ success: true, message: '设置已更新' });
});

export default settings;
