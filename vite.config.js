import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.example.com", // для HTTP-запросов
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      },
      "/ws": {
        target: "wss://api.example.com", // для WebSocket-соединений
        changeOrigin: true,
        ws: true,
        rewrite: (path) => path.replace(/^\/ws/, "")
      }
    }
  }
});
