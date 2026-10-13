import { defineConfig } from 'vitest/config';

export default defineConfig({
  // vanilla-extract/reactRouter 플러그인은 테스트에 불필요하므로 넣지 않는다.
  // (실시간 로직은 순수 TS라 DOM 없이 테스트 가능)
  resolve: { tsconfigPaths: true },
  test: {
    environment: 'node',
    include: ['app/**/*.test.ts'],
  },
});
