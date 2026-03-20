/**
 * @source cursor @line_count 98
 */

import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import type { Env, JwtPayload } from './types';

const profile = new Hono<{ Bindings: Env }>();

function safeJsonParse<T>(str: string | null | undefined, fallback: T): T {
  if (!str) return fallback;
  try {
    return JSON.parse(str) as T;
  } catch {
    return fallback;
  }
}

profile.get('/', async (c) => {
  const payload = c.get('jwtPayload' as never) as JwtPayload;
  const db = c.env.DB;

  const userProfile = await db
    .prepare('SELECT * FROM user_profiles WHERE user_id = ?')
    .bind(payload.userId)
    .first();

  if (!userProfile) {
    return c.json({ error: '档案不存在' }, 404);
  }

  const levelInfo = getLevelInfo(userProfile.exp as number);

  return c.json({
    profile: userProfile,
    level: levelInfo,
    badges: safeJsonParse(userProfile.badges as string, []),
    radar: safeJsonParse(userProfile.radar_data as string, {}),
  });
});

const updateRadarSchema = z.object({
  image_mgmt: z.number().min(1).max(10).optional(),
  emotional_stability: z.number().min(1).max(10).optional(),
  communication: z.number().min(1).max(10).optional(),
  execution: z.number().min(1).max(10).optional(),
  life_richness: z.number().min(1).max(10).optional(),
});

profile.put('/radar', zValidator('json', updateRadarSchema), async (c) => {
  const payload = c.get('jwtPayload' as never) as JwtPayload;
  const data = c.req.valid('json');
  const db = c.env.DB;

  const current = await db
    .prepare('SELECT radar_data FROM user_profiles WHERE user_id = ?')
    .bind(payload.userId)
    .first<{ radar_data: string }>();

  const radar = safeJsonParse(current?.radar_data, {});
  const updated = { ...radar, ...data };

  await db
    .prepare(
      "UPDATE user_profiles SET radar_data = ?, updated_at = datetime('now') WHERE user_id = ?"
    )
    .bind(JSON.stringify(updated), payload.userId)
    .run();

  return c.json({ success: true, radar: updated });
});

profile.post('/add-exp', zValidator('json', z.object({ amount: z.number().min(0).max(100) })), async (c) => {
  const payload = c.get('jwtPayload' as never) as JwtPayload;
  const { amount } = c.req.valid('json');
  const db = c.env.DB;

  await db
    .prepare(
      "UPDATE user_profiles SET exp = exp + ?, updated_at = datetime('now') WHERE user_id = ?"
    )
    .bind(amount, payload.userId)
    .run();

  const updated = await db
    .prepare('SELECT exp, level FROM user_profiles WHERE user_id = ?')
    .bind(payload.userId)
    .first<{ exp: number; level: number }>();

  if (updated) {
    const newLevel = getLevelInfo(updated.exp).level;
    if (newLevel !== updated.level) {
      await db
        .prepare('UPDATE user_profiles SET level = ? WHERE user_id = ?')
        .bind(newLevel, payload.userId)
        .run();
    }
  }

  return c.json({ success: true, exp: updated?.exp, level: getLevelInfo(updated?.exp || 0) });
});

interface LevelInfo {
  level: number;
  title: string;
  currentExp: number;
  nextLevelExp: number;
  progress: number;
}

const LEVELS = [
  { level: 1, title: '恋爱小白', exp: 0 },
  { level: 2, title: '社交新手', exp: 100 },
  { level: 3, title: '约会学徒', exp: 300 },
  { level: 4, title: '搭讪艺术家', exp: 600 },
  { level: 5, title: '情感工程师', exp: 1000 },
  { level: 6, title: '恋爱战略家', exp: 1500 },
  { level: 7, title: '心动制造机', exp: 2200 },
  { level: 8, title: '约会大师', exp: 3000 },
  { level: 9, title: '灵魂伴侣候选人', exp: 4000 },
  { level: 10, title: 'CyberCupid毕业生', exp: 5000 },
];

function getLevelInfo(exp: number): LevelInfo {
  let current = LEVELS[0];
  let next = LEVELS[1];

  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (exp >= LEVELS[i].exp) {
      current = LEVELS[i];
      next = LEVELS[i + 1] || LEVELS[i];
      break;
    }
  }

  const progress =
    current === next
      ? 100
      : ((exp - current.exp) / (next.exp - current.exp)) * 100;

  return {
    level: current.level,
    title: current.title,
    currentExp: exp,
    nextLevelExp: next.exp,
    progress: Math.min(100, Math.round(progress)),
  };
}

export default profile;
