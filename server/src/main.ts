import { buildApp } from './app';

// 3000 은 로컬의 다른 프로젝트가 흔히 쓰고 있어 비켜 둔다. Vite proxy 가 이 포트로 넘긴다 (vite.config.ts)
const PORT = Number(process.env.PORT ?? 4000);
// 컨테이너·배포 환경에서는 바깥에서 들어오는 요청을 받도록 0.0.0.0 으로 연다
const HOST = process.env.HOST ?? '0.0.0.0';

const app = buildApp({
  logger: { level: process.env.LOG_LEVEL ?? 'info' },
});

try {
  await app.listen({ port: PORT, host: HOST });
} catch (error) {
  app.log.error(error);
  process.exit(1);
}

// Ctrl+C·배포 교체 시 처리 중인 요청을 마치고 닫는다 (graceful shutdown)
for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.once(signal, () => {
    void app.close().then(() => process.exit(0));
  });
}
