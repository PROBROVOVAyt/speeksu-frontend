import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    port: 8124,
    proxy: {
      "/api": {
        target: "https://api.ccail.ru",
        changeOrigin: true,
        rewrite: (path) => {
          console.log("Rewriting path:", path);
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
      },
      "/ws": {
        target: "wss://api.ccail.ru",
        ws: true,
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on("open", () => {
            console.log("WebSocket connection opened");
          });
          proxy.on("close", () => {
            console.log("WebSocket connection closed");
          });
        }
      }
    }
  }
});
