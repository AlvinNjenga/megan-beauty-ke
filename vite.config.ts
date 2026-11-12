import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ isSsrBuild }) => ({
  base: "/",
  plugins: [react()],
  build: { copyPublicDir: !isSsrBuild },
}));
