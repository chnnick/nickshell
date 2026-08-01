import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  publicDir: 'public', // Vite copies everything here to dist/ — keep image
                       // originals in assets-src/, not public/.
});
