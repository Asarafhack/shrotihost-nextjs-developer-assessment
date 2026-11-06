import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  // Support static export when explicitly requested (e.g. for GitHub Pages),
  // while defaulting to full-stack Node.js server with dynamic API route handlers.
  ...(isStaticExport ? { output: "export" } : {}),
  experimental: {
    cpus: 1,
    webpackBuildWorker: false,
  },
};

export default nextConfig;

