import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      
    ],
    domains: ['serenescope-3a234.firebasestorage.app'], 
   
  },
};

export default nextConfig;
