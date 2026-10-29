import { afterAll, describe, expect, it } from 'vitest';

import { buildApp } from './app';

// 포트를 열지 않고 Fastify 의 inject 로 요청을 흉내 낸다 (빠르고, 포트 충돌이 없다)
const app = buildApp();
afterAll(() => app.close());

describe('서버 뼈대', () => {
  it('GET /api/health 는 { ok: true } 를 돌려준다', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/health' });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ ok: true });
  });

  it('없는 주소는 공통 오류 형식으로 404 를 돌려준다', async () => {
    const res = await app.inject({ method: 'GET', url: '/api/nope' });
    expect(res.statusCode).toBe(404);
    expect(res.json()).toEqual({
      error: { code: 'NOT_FOUND', message: '요청한 주소를 찾을 수 없어요' },
    });
  });
});
