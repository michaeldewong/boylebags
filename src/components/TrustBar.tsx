"use client";

import { usePathname } from "next/navigation";
import { content } from "@/content";
import { contentEs } from "@/content-es";
import { getLocaleFromPath } from "@/lib/locale";

export function TrustBar() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const siteContent = locale === "es" ? contentEs.site : content.site;

  return (
    <div className="w-full border-b border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-2 text-center text-xs font-medium text-zinc-700">
        {siteContent.trustBarText}
      </div>
    </div>
  );
}
