"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { content } from "@/content";
import { contentEs } from "@/content-es";
import { getLocaleFromPath } from "@/lib/locale";

export function SiteFooter() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const siteContent = locale === "es" ? contentEs.site : content.site;
  const { footerLinks, footerLines } = siteContent;

  return (
    <footer className="mt-auto w-full border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md">
            <div className="mb-2 text-lg font-bold text-zinc-900">
              {siteContent.name}
            </div>
            <p className="text-sm text-zinc-600">{siteContent.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-zinc-700 transition-colors hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 space-y-2 border-t border-zinc-200 pt-8">
          {footerLines.map((line, i) => (
            <p key={i} className="text-xs text-zinc-600">
              {line}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
}
