import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        "hoshi-models": path.resolve(__dirname, "../models/src"),
        "hoshi-core": path.resolve(__dirname, "../core/src"),
      },
    },
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        "hoshi-models": path.resolve(__dirname, "../models/src"),
        "hoshi-core": path.resolve(__dirname, "../core/src"),
      },
    },
  },
  renderer: {
    plugins: [react()],
    root: path.resolve(__dirname, "../editor-renderer"),
    build: {
      rollupOptions: {
        input: path.resolve(__dirname, "../editor-renderer/index.html"),
      },
      commonjsOptions: {
        include: [/node_modules/],
      },
    },
    optimizeDeps: {
      include: ["@adobe/react-spectrum"],
    },
  },
});
