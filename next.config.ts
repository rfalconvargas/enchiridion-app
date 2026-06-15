import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 100% static app (no API routes / server actions — the waitlist talks to
  // Supabase from the client). Export to plain HTML/JS, which also skips Next's
  // serverless file-tracing step that was killing the Vercel build.
  output: "export",
  images: { unoptimized: true },
  // three.js ships modern ESM; transpiling keeps the bundler happy across
  // three / @react-three subpath imports.
  transpilePackages: ["three"],
  // Pin the file-tracing/workspace root to this app so Next never walks up to
  // parent lockfiles (the umbrella repo / drive root on dev machines).
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
