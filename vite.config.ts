import { defineConfig } from 'vite';
import viteTsCofingPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteTsCofingPaths()],
  envDir: path.resolve(__dirname, './src/config/env'),
});
