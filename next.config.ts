import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    // Using <img> tags directly for compatibility with existing image paths
    unoptimized: false,
  },
  // Trailing slash for clean URLs
  trailingSlash: false,
};

export default nextConfig;
