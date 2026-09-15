import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable the x-powered-by header for security & byte savings
  poweredByHeader: false,

  // Enable gzip & brotli compression
  compress: true,

  // Image optimization caching
  images: {
    formats: ["image/avif", "image/webp"],
    // Cache optimized images on server/CDN for 1 year
    minimumCacheTTL: 31536000,
  },

  // Aggressive server & edge caching headers
  async headers() {
    return [
      {
        // Static assets in public folder (images, fonts, resume, icons)
        source: "/:path*.(svg|png|jpg|jpeg|webp|avif|ico|pdf|woff2|woff|ttf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // HTML pages: Instant edge delivery with CDN caching until new deployment
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=31536000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
