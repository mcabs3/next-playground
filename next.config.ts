import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    ppr: true,
    // dynamicIO: true,
    // useCache: true,
    clientSegmentCache: true,
  },
};

export default nextConfig;
