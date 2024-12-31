import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://api.ccail.ru",
        // target: "http://127.0.0.1:8000",
        changeOrigin: true,
        rewrite: (path) => {
          console.log("Rewriting path:", path); // Логируем путь
          return path.replace(/^\/api/, "");
        }
      }
    }
  }
});
