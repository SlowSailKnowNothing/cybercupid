/**
 * @source cursor @line_count 15
 */

import type { Context } from 'hono';
import { getHtml } from './frontend';

export function serveStatic(c: Context): Response {
  return new Response(getHtml(), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  });
}
