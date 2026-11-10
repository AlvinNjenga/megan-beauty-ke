import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ isSsrBuild }) => ({
  base: "/megan-beauty-ke/",
  plugins: [react()],
  build: { copyPublicDir: !isSsrBuild },
}));
