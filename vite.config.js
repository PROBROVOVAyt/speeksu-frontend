import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.ccail.ru",
        changeOrigin: true,
        rewrite: (path) => {
          console.log("Rewriting path:", path); // Логируем путь
          return path.replace(/^\/api/, "");
        },
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            console.log("Proxying request:", proxyReq.path);
          });
          proxy.on("proxyRes", (proxyRes) => {
            console.log("Received response with status:", proxyRes.statusCode);
          });
        }
      }
    }
  }
});
