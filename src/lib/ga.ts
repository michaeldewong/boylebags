"use client";

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

const GA_MEASUREMENT_ID = process.env.NEXTPUBLICGAMEASUREMENTID;

function isGAEnabled(): boolean {
  return typeof window !== "undefined" && !!GA_MEASUREMENT_ID && !!window.gtag;
}

function debugLog(eventName: string, params?: Record<string, unknown>): void {
  if (process.env.NODE_ENV !== "production") {
    console.log("[GA Event]", eventName, params || {});
  }
}

export function pageview(url: string): void {
  if (!isGAEnabled()) return;
  
  debugLog("pageview", { url });
  window.gtag!("config", GA_MEASUREMENT_ID!, {
    page_path: url,
  });
}

export function event(
  name: string,
  params?: Record<string, unknown>
): void {
  if (!isGAEnabled()) return;
  
  debugLog(name, params);
  window.gtag!("event", name, params);
}
