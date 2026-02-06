"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CTA } from "@/content";
import { event } from "@/lib/ga";
import { getLocaleFromPath } from "@/lib/locale";

export function TrackedCtas({ ctas }: { ctas: CTA[] }) {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);

  const handleClick = (cta: CTA) => {
    // Track CTA clicks
    const isPrimary = cta.variant === "primary";
    const isMailto = cta.href.startsWith("mailto:");
    const isTel = cta.href.startsWith("tel:");
    
    if (isMailto) {
      const email = cta.href.replace("mailto:", "");
      event("email_click", {
        email,
        location: "cta",
        locale,
      });
    } else if (isTel) {
      const phone = cta.href.replace("tel:", "");
      event("tel_click", {
        phone,
        location: "cta",
        locale,
      });
    } else if (isPrimary) {
      // Track primary CTA clicks
      event("cta_click", {
        label: cta.label,
        location: "hero",
        href: cta.href,
        locale,
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      {ctas.map((cta) => {
        const base =
          "inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-semibold transition-colors";
        const variants: Record<string, string> = {
          primary: "bg-black text-white hover:bg-zinc-800",
          secondary: "border-2 border-black text-black hover:bg-black hover:text-white",
          ghost: "text-black hover:bg-zinc-100",
        };
        const cls = `${base} ${variants[cta.variant ?? "primary"] ?? variants.primary}`;
        return (
          <Link
            key={`${cta.href}-${cta.label}`}
            href={cta.href}
            className={cls}
            onClick={() => handleClick(cta)}
          >
            {cta.label}
          </Link>
        );
      })}
    </div>
  );
}
