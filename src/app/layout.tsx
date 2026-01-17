import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { TrustBar } from "@/components/TrustBar";
import { content } from "@/content";

export const metadata: Metadata = {
  title: content.site.name,
  description: content.site.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col bg-white text-zinc-900">
        <TrustBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
