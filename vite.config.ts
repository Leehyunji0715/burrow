import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  // Vite 8 이 tsconfig 의 paths(~/* alias)를 네이티브 해석하므로
  // vite-tsconfig-paths 플러그인이 필요하지 않다.
  resolve: { tsconfigPaths: true },
  plugins: [react(), vanillaExtractPlugin()],
});
