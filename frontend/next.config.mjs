/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["rugcjzphoxicgveicoay.supabase.co", "ui-avatars.com", "googleusercontent.com"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              // Base security
              "default-src 'self'",

              // Image handling
              "img-src 'self' data: blob: https://rugcjzphoxicgveicoay.supabase.co https://ui-avatars.com https://*.googleusercontent.com",

              // Script handling
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:",
              "style-src 'self' 'unsafe-inline'",

              // Connection security
              "connect-src 'self' https://rugcjzphoxicgveicoay.supabase.co wss://rugcjzphoxicgveicoay.supabase.co",

              // Worker and frame security
              "worker-src 'self' blob:",
              "frame-src 'self' https://rugcjzphoxicgveicoay.supabase.co",

              // Font security
              "font-src 'self' data:",

              // Media security
              "media-src 'self'",
            ].join("; "),
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
