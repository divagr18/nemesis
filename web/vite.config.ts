import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// `npm run dev` proxies the API to a running server (NEMESIS_API, default localhost:8000).
const api = process.env.NEMESIS_API || "http://localhost:8000";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: Object.fromEntries(["/api", "/clips", "/traj", "/media"].map((p) => [p, { target: api, changeOrigin: true }])),
  },
  build: { outDir: "dist", emptyOutDir: true, chunkSizeWarningLimit: 1200 },
});
