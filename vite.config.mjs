import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const noCacheHeaders = {
  "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
};
export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/nobralta/" : "/",
  preview: { headers: noCacheHeaders },
  build: {
    outDir: "dist/client",
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    headers: noCacheHeaders,
    host: "127.0.0.1",
    port: 4173,
    strictPort: true,
    allowedHosts: ["terminal.local"],
    warmup: {
      clientFiles: ["./src/main.jsx"],
    },
  },
  plugins: [react()],
});
