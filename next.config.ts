import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/jobnotify", destination: "/jobnotify/index.html" },
      { source: "/jobnotify/dashboard", destination: "/jobnotify/index.html" },
      { source: "/jobnotify/saved", destination: "/jobnotify/index.html" },
      { source: "/jobnotify/digest", destination: "/jobnotify/index.html" },
      { source: "/jobnotify/settings", destination: "/jobnotify/index.html" },
      { source: "/jobnotify/proof", destination: "/jobnotify/index.html" },
      { source: "/jobnotify/jt/07-test", destination: "/jobnotify/index.html" },
      { source: "/jobnotify/jt/08-ship", destination: "/jobnotify/index.html" },
      { source: "/jobnotify/jt/proof", destination: "/jobnotify/index.html" }
    ];
  }
};

export default nextConfig;