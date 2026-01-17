"use client";
import Link from "next/link";
import { useState } from "react";
import { content } from "@/content";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const navLinks = [{ href: "/", label: "Home" }, ...content.site.navLinks];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Brand */}
        <Link href="/" className="text-xl font-bold tracking-tight text-zinc-900">
          {content.site.name}
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
        </nav>
        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
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
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
