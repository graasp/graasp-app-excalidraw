/// <reference types="./src/env"/>
import { resolve } from 'path';
import { UserConfigExport, defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import istanbul from 'vite-plugin-istanbul';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }): UserConfigExport => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    base: '',
    server: {
      port: parseInt(process.env.VITE_PORT, 10) || 4001,
      open: mode !== 'test', // open only when mode is different form test
      watch: {
        ignored: ['**/coverage/**'],
      },
    },
    build: {
      outDir: 'build',
    },
    plugins: [
      checker({
        typescript: true,
        eslint: { lintCommand: 'eslint "./**/*.{ts,tsx}"' },
      }),
      react(),
      istanbul({
        include: 'src/*',
        exclude: ['node_modules', 'test/'],
        extension: ['.js', '.ts', '.tsx'],
        requireEnv: false,
        checkProd: true,
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    define: {
      'process.env.REACT_APP_GRAASP_ASSETS_URL': `"${process.env.VITE_GRAASP_ASSETS_URL}"`,
    },
  });
};
