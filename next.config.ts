import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Permite que o build produza o bundle mesmo com erros de lint
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
