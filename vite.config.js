import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // 상대 경로: 빌드 결과를 GitHub Pages 같은 하위 경로 호스팅에 그대로 올릴 수 있게 한다.
  base: './',
});
