/**
 * @source cursor @line_count 165
 */

import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import type { Env, User } from './types';
import { createJwt, hashPassword, verifyPassword } from './crypto';

const auth = new Hono<{ Bindings: Env }>();

const registerSchema = z.object({
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  nickname: z.string().max(50).optional(),
});

const loginSchema = z.object({
  login: z.string().min(1),
  password: z.string().min(1),
});

auth.post('/register', zValidator('json', registerSchema), async (c) => {
  const { username, email, password, nickname } = c.req.valid('json');
  const db = c.env.DB;

  try {
    const existing = await db
      .prepare('SELECT id FROM users WHERE username = ? OR email = ?')
      .bind(username, email)
      .first();

    if (existing) {
      return c.json({ error: '用户名或邮箱已被注册' }, 409);
    }

    const passwordHash = await hashPassword(password);

    const result = await db
      .prepare(
        'INSERT INTO users (username, email, password_hash, nickname) VALUES (?, ?, ?, ?)'
      )
      .bind(username, email, passwordHash, nickname || username)
      .run();

    const userId = result.meta.last_row_id;
    if (!userId) {
      return c.json({ error: '注册失败，请重试' }, 500);
    }

    await db
      .prepare('INSERT INTO user_settings (user_id) VALUES (?)')
      .bind(userId)
      .run();

    await db
      .prepare('INSERT INTO user_profiles (user_id) VALUES (?)')
      .bind(userId)
      .run();

    const token = await createJwt(
      { userId: Number(userId), username },
      c.env.JWT_SECRET
    );

    return c.json({
      token,
      user: { id: userId, username, email, nickname: nickname || username },
    });
  } catch (error) {
    return c.json({ error: '注册失败，请稍后重试' }, 500);
  }
});

auth.post('/login', zValidator('json', loginSchema), async (c) => {
  const { login, password } = c.req.valid('json');
  const db = c.env.DB;

  try {
    const user = await db
      .prepare('SELECT * FROM users WHERE username = ? OR email = ?')
      .bind(login, login)
      .first<User>();

    if (!user) {
      return c.json({ error: '用户名或密码错误' }, 401);
    }

    const valid = await verifyPassword(password, user.password_hash);
    if (!valid) {
      return c.json({ error: '用户名或密码错误' }, 401);
    }

    const token = await createJwt(
      { userId: user.id, username: user.username },
      c.env.JWT_SECRET
    );

    return c.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        nickname: user.nickname,
      },
    });
  } catch (error) {
    return c.json({ error: '登录失败，请稍后重试' }, 500);
  }
});

auth.get('/me', async (c) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ error: '未登录' }, 401);
  }

  const { verifyJwt } = await import('./crypto');
  const jwtPayload = await verifyJwt(authHeader.slice(7), c.env.JWT_SECRET);
  if (!jwtPayload) {
    return c.json({ error: '登录已过期' }, 401);
  }

  const db = c.env.DB;
  const user = await db
    .prepare(
      'SELECT id, username, email, nickname, avatar_url, created_at FROM users WHERE id = ?'
    )
    .bind(jwtPayload.userId)
    .first();

  if (!user) {
    return c.json({ error: '用户不存在' }, 404);
  }

  const settings = await db
    .prepare('SELECT * FROM user_settings WHERE user_id = ?')
    .bind(jwtPayload.userId)
    .first();

  const profile = await db
    .prepare('SELECT * FROM user_profiles WHERE user_id = ?')
    .bind(jwtPayload.userId)
    .first();

  return c.json({ user, settings, profile });
});

export default auth;
