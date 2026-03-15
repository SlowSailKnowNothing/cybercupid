/**
 * @source cursor @line_count 30
 */

import type { Context, Next } from 'hono';
import type { Env } from './types';
import { verifyJwt } from './crypto';

export async function authMiddleware(
  c: Context<{ Bindings: Env }>,
  next: Next
) {
  const authHeader = c.req.header('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ error: '请先登录' }, 401);
  }

  const token = authHeader.slice(7);
  const payload = await verifyJwt(token, c.env.JWT_SECRET);

  if (!payload) {
    return c.json({ error: '登录已过期，请重新登录' }, 401);
  }

  c.set('jwtPayload' as never, payload as never);
  await next();
}
