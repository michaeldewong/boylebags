"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { content } from "@/content";
import { contentEs } from "@/content-es";
import { getLocaleFromPath, getAlternatePath, type Locale } from "@/lib/locale";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const locale: Locale = getLocaleFromPath(pathname);
  const isEs = locale === "es";
  const siteContent = isEs ? contentEs.site : content.site;
  const navLinks = [{ href: isEs ? "/es" : "/", label: isEs ? "Inicio" : "Home" }, ...siteContent.navLinks];
  const alternatePath = getAlternatePath(pathname, isEs ? "en" : "es");
  const alternateLabel = isEs ? "EN" : "ES";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Brand */}
        <Link href={isEs ? "/es" : "/"} className="text-xl font-bold tracking-tight text-zinc-900">
          {siteContent.name}
        </Link>
        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-zinc-700 transition-colors hover:text-black"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={alternatePath}
            className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
          >
            {alternateLabel}
          </Link>
        </nav>
        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={isEs ? "Alternar menú" : "Toggle menu"}
        >
          {open ? (isEs ? "Cerrar" : "Close") : (isEs ? "Menú" : "Menu")}
        </button>
      </div>
      {/* Mobile nav */}
      {open && (
        <div id="mobile-nav" className="md:hidden border-t border-zinc-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="flex flex-col gap-3">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-zinc-700 transition-colors hover:text-black"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href={alternatePath}
                className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900"
                onClick={() => setOpen(false)}
              >
                {alternateLabel}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
