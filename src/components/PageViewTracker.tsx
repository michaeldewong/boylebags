"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getLocaleFromPath } from "@/lib/locale";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

export function PageViewTracker({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only track in production and if gtag is available
    if (typeof window === "undefined" || !window.gtag) return;

    const pagePath = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    const locale = getLocaleFromPath(pathname);

    // Track page_view event on route change
    window.gtag("config", gaId, {
      page_path: pagePath,
    });
  }, [pathname, searchParams, gaId]);

  return null;
}
