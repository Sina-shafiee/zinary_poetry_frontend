import { defineConfig } from 'vite';
import viteTsCofingPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), viteTsCofingPaths()],
});
