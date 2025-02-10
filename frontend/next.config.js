const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "rugcjzphoxicgveicoay.supabase.co",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self' https://*.posthog.com https://*.posthog.io https://*.i.posthog.com https://*.eu.posthog.com https://*.eu.i.posthog.com https://*.eu-assets.i.posthog.com",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://*.posthog.com https://*.posthog.io https://*.i.posthog.com https://*.eu.posthog.com https://*.eu.i.posthog.com https://*.eu-assets.i.posthog.com https://app.posthog.com https://eu.posthog.com",
              "connect-src 'self' https://*.posthog.com https://*.posthog.io https://*.i.posthog.com https://*.eu.posthog.com https://*.eu.i.posthog.com https://*.eu-assets.i.posthog.com https://app.posthog.com https://eu.posthog.com wss://*.posthog.com wss://*.posthog.io",
              "img-src 'self' data: blob: https://*.posthog.com https://*.posthog.io https://*.i.posthog.com https://*.eu.posthog.com https://*.eu.i.posthog.com https://*.eu-assets.i.posthog.com https://lh3.googleusercontent.com https://rugcjzphoxicgveicoay.supabase.co",
              "style-src 'self' 'unsafe-inline'",
              "frame-src 'self' https://*.posthog.com https://*.posthog.io https://app.posthog.com https://eu.posthog.com",
              "font-src 'self' data:",
              "media-src 'self'",
              "worker-src 'self' blob:",
              "manifest-src 'self'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
  sentry: {
    hideSourceMaps: true,
  },
};

module.exports = withSentryConfig(nextConfig, {
  silent: true,
  org: "dev-studio-vc",
  project: "trade-tracker",
});
