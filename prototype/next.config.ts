import type { NextConfig } from "next";
const config: NextConfig = {
  devIndicators: false,
  // Keep production verification separate from the running design preview.
  distDir: process.env.NODE_ENV === "production" ? ".next-production" : ".next",
};
export default config;
