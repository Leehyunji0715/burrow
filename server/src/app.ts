import Fastify, { type FastifyServerOptions } from 'fastify';

import { AppError, errorBody } from './lib/errors';

/**
 * 서버 인스턴스를 만든다. listen 은 하지 않는다 —
 * 테스트는 포트를 열지 않고 app.inject() 로 요청을 흉내 내고, main.ts 만 실제로 포트를 연다.
 */
export function buildApp(options: FastifyServerOptions = {}) {
  const app = Fastify(options);

  app.get('/api/health', () => ({ ok: true }));

  app.setErrorHandler((error, request, reply) => {
    if (error instanceof AppError) {
      return reply.status(error.statusCode).send(errorBody(error.code, error.message));
    }
    // throw 된 값은 Error 가 아닐 수도 있어 unknown 이다. Fastify 가 붙이는 상태 코드
    // (예: 잘못된 JSON 본문 400)는 살리고, 내부 정보는 응답에 싣지 않는다
    const code = statusCodeOf(error);
    const status = code && code < 500 ? code : 500;
    if (status >= 500) request.log.error(error);
    return reply
      .status(status)
      .send(
        status >= 500
          ? errorBody('INTERNAL', '잠시 후 다시 시도해 주세요')
          : errorBody('BAD_REQUEST', '요청 형식이 올바르지 않아요'),
      );
  });

  app.setNotFoundHandler((_request, reply) =>
    reply.status(404).send(errorBody('NOT_FOUND', '요청한 주소를 찾을 수 없어요')),
  );

  return app;
}

function statusCodeOf(error: unknown): number | undefined {
  if (typeof error !== 'object' || error === null || !('statusCode' in error)) return undefined;
  return typeof error.statusCode === 'number' ? error.statusCode : undefined;
}
