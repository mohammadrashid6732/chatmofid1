import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 9000,
    proxy: {
      "/api": {
        target: "https://apichat.hamafza-startup.ir",
        changeOrigin: true,
        ws: true,
        secure: false,
      },
    },
  },
});
