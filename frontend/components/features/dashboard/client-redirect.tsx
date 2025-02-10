"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ClientRedirectProps {
  accountId: string;
}

export function ClientRedirect({ accountId }: ClientRedirectProps) {
  const router = useRouter();

  console.log("[ClientRedirect] Component render start");

  useEffect(() => {
    console.log("[ClientRedirect] Checking redirect conditions", {
      // Add relevant state here
    });
    router.replace(`/dashboard?tradingAccountId=${accountId}`);
  }, [accountId, router]);

  console.log("[ClientRedirect] Component render end");
  return null;
}
