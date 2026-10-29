import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // Vite 8 이 tsconfig 의 paths(~/* alias)를 네이티브 해석하므로
  // vite-tsconfig-paths 플러그인이 필요하지 않다.
  resolve: { tsconfigPaths: true },
  plugins: [react(), vanillaExtractPlugin()],
  // .gitignore·.prettierignore 가 이미 build/ 를 제외하고 있어 Vite 기본값(dist/) 대신 맞춘다.
  build: { outDir: 'build' },
  server: {
    // 브라우저는 5173 한 곳에만 요청하고, Vite 가 /api·/ws 를 API 서버(4000)로 넘긴다.
    // 화면과 API 가 같은 origin 이 되어 CORS 설정이 필요 없고, 세션 쿠키도 그대로 붙는다.
    proxy: {
      '/api': 'http://localhost:4000',
      '/ws': { target: 'ws://localhost:4000', ws: true },
    },
  },
});
