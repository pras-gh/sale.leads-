import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A lockfile higher up the home directory otherwise makes Turbopack guess the wrong root.
  turbopack: { root: __dirname },
};

export default nextConfig;
