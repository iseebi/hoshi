import { resolve } from 'path';
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
// eslint-disable-next-line import/no-extraneous-dependencies
import react from '@vitejs/plugin-react';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
      },
    },
    plugins: [react()],
  },
});
