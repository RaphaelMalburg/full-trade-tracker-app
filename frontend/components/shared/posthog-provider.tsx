// app/providers.js
"use client";

import { useEffect, useState } from "react";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.debug();
    },
    autocapture: false,
    capture_pageview: true,
    capture_pageleave: false,
    disable_session_recording: true,
    persistence: "memory",
    bootstrap: {
      distinctID: "anonymous",
      isIdentifiedID: false,
      featureFlags: {},
    },
    cross_subdomain_cookie: false,
    enable_recording_console_log: false,
    mask_all_text: true,
    mask_all_element_attributes: true,
    advanced_disable_decide: true,
  });
}

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
