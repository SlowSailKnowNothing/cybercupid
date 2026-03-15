/**
 * @source cursor @line_count 220
 */

import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import type { Env, JwtPayload, UserSettings, Message } from './types';
import { callLLM, type LLMMessage } from './llm';
import { SYSTEM_PROMPT, getModulePrompt } from './prompt';

const chat = new Hono<{ Bindings: Env }>();

const sendMessageSchema = z.object({
  content: z.string().min(1).max(10000),
  conversation_id: z.number().optional(),
  module: z.string().optional(),
});

const MAX_CONTEXT_MESSAGES = 30;

chat.get('/conversations', async (c) => {
  const payload = c.get('jwtPayload' as never) as JwtPayload;
  const db = c.env.DB;

  const conversations = await db
    .prepare(
      'SELECT * FROM conversations WHERE user_id = ? ORDER BY updated_at DESC LIMIT 50'
    )
    .bind(payload.userId)
    .all();

  return c.json({ conversations: conversations.results });
});

chat.get('/conversations/:id', async (c) => {
  const payload = c.get('jwtPayload' as never) as JwtPayload;
  const id = parseInt(c.req.param('id'));
  const db = c.env.DB;

  const conversation = await db
    .prepare('SELECT * FROM conversations WHERE id = ? AND user_id = ?')
    .bind(id, payload.userId)
    .first();

  if (!conversation) {
    return c.json({ error: '对话不存在' }, 404);
  }

  const messages = await db
    .prepare(
      'SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC'
    )
    .bind(id)
    .all();

  return c.json({ conversation, messages: messages.results });
});

chat.delete('/conversations/:id', async (c) => {
  const payload = c.get('jwtPayload' as never) as JwtPayload;
  const id = parseInt(c.req.param('id'));
  const db = c.env.DB;

  await db
    .prepare('DELETE FROM messages WHERE conversation_id = ? AND conversation_id IN (SELECT id FROM conversations WHERE user_id = ?)')
    .bind(id, payload.userId)
    .run();

  await db
    .prepare('DELETE FROM conversations WHERE id = ? AND user_id = ?')
    .bind(id, payload.userId)
    .run();

  return c.json({ success: true });
});

chat.post('/send', zValidator('json', sendMessageSchema), async (c) => {
  const payload = c.get('jwtPayload' as never) as JwtPayload;
  const { content, conversation_id, module } = c.req.valid('json');
  const db = c.env.DB;

  const settings = await db
    .prepare('SELECT * FROM user_settings WHERE user_id = ?')
    .bind(payload.userId)
    .first<UserSettings>();

  if (!settings || !settings.api_key) {
    return c.json({ error: '请先在设置中配置 API Key' }, 400);
  }

  let convId = conversation_id;

  if (!convId) {
    const moduleLabel = getModuleLabel(module || 'chat');
    const title =
      content.length > 20 ? content.slice(0, 20) + '...' : content;
    const result = await db
      .prepare(
        'INSERT INTO conversations (user_id, title, module) VALUES (?, ?, ?)'
      )
      .bind(payload.userId, `${moduleLabel}: ${title}`, module || 'chat')
      .run();
    convId = result.meta.last_row_id as number;
  } else {
    const conv = await db
      .prepare('SELECT id FROM conversations WHERE id = ? AND user_id = ?')
      .bind(convId, payload.userId)
      .first();
    if (!conv) {
      return c.json({ error: '对话不存在' }, 404);
    }
  }

  await db
    .prepare(
      'INSERT INTO messages (conversation_id, role, content) VALUES (?, ?, ?)'
    )
    .bind(convId, 'user', content)
    .run();

  const historyMessages = await db
    .prepare(
      `SELECT role, content FROM messages WHERE conversation_id = ? ORDER BY created_at ASC LIMIT ?`
    )
    .bind(convId, MAX_CONTEXT_MESSAGES)
    .all<Message>();

  const profile = await db
    .prepare('SELECT * FROM user_profiles WHERE user_id = ?')
    .bind(payload.userId)
    .first();

  const llmMessages: LLMMessage[] = [];

  let systemContent = SYSTEM_PROMPT;
  const conversation = await db
    .prepare('SELECT module FROM conversations WHERE id = ?')
    .bind(convId)
    .first<{ module: string }>();

  const activeModule = module || conversation?.module || 'chat';
  const modulePrompt = getModulePrompt(activeModule);
  if (modulePrompt) {
    systemContent += '\n\n' + modulePrompt;
  }

  if (profile) {
    const radar = JSON.parse((profile.radar_data as string) || '{}');
    systemContent += `\n\n## 用户当前状态
- 等级: Lv.${profile.level}
- EXP: ${profile.exp}
- 连续活跃: ${profile.streak_days}天
- 五维雷达: 形象管理${radar.image_mgmt}/10, 情绪稳定${radar.emotional_stability}/10, 沟通表达${radar.communication}/10, 行动执行${radar.execution}/10, 生活丰盈${radar.life_richness}/10`;
  }

  llmMessages.push({ role: 'system', content: systemContent });

  if (historyMessages.results) {
    for (const msg of historyMessages.results) {
      llmMessages.push({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      });
    }
  }

  try {
    const response = await callLLM(settings, llmMessages);

    await db
      .prepare(
        'INSERT INTO messages (conversation_id, role, content) VALUES (?, ?, ?)'
      )
      .bind(convId, 'assistant', response.content)
      .run();

    await db
      .prepare(
        "UPDATE conversations SET updated_at = datetime('now') WHERE id = ?"
      )
      .bind(convId)
      .run();

    await db
      .prepare(
        "UPDATE user_profiles SET last_active = datetime('now'), updated_at = datetime('now') WHERE user_id = ?"
      )
      .bind(payload.userId)
      .run();

    return c.json({
      conversation_id: convId,
      message: {
        role: 'assistant',
        content: response.content,
        model: response.model,
      },
      usage: response.usage,
    });
  } catch (error: any) {
    return c.json({ error: error.message || 'LLM 调用失败' }, 500);
  }
});

function getModuleLabel(module: string): string {
  const labels: Record<string, string> = {
    chat: '💬 对话',
    interview: '🔍 深度访谈',
    'mock-date': '💕 模拟约会',
    mission: '📋 任务清单',
    checkin: '✅ 打卡',
    'date-plan': '📅 约会方案',
    debrief: '📝 复盘',
  };
  return labels[module] || '💬 对话';
}

export default chat;
