import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(() => {
  console.log("*** Vite config loaded ***");

  return {
    root: "./src",
    build: {
      outDir: "./dist",
    },
    plugins: [react()],
  };
});
