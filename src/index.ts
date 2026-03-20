/**
 * @source cursor @line_count 50
 */

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import type { Env } from './types';
import { authMiddleware } from './middleware';
import auth from './auth';
import chat from './chat';
import settings from './settings';
import profile from './profile';
import { serveStatic } from './static';

const app = new Hono<{ Bindings: Env }>();

app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.get('/api/health', (c) => {
  return c.json({ status: 'ok', version: '1.0.0', name: 'CyberCupid Web' });
});

app.get('/api/question-bank', async (c) => {
  const questionBank = await import('./question-bank.json');
  return c.json(questionBank.default || questionBank);
});

app.route('/api/auth', auth);

app.use('/api/chat/*', authMiddleware);
app.use('/api/settings/*', authMiddleware);
app.use('/api/settings', authMiddleware);
app.use('/api/profile/*', authMiddleware);
app.use('/api/profile', authMiddleware);
app.route('/api/chat', chat);
app.route('/api/settings', settings);
app.route('/api/profile', profile);

app.get('*', (c) => {
  return serveStatic(c);
});

export default app;
