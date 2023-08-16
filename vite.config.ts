import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Copy the _redirects file to the root of the build directory
      output: {
        assetFileNames: "[name][extname]",
      },
    },
  },
  server: {
    port: 3000,
  },
});
