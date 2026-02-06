import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Navbar } from "@/components/Navbar";
import { SiteFooter } from "@/components/SiteFooter";
import { TrustBar } from "@/components/TrustBar";
import { PageViewTracker } from "@/components/PageViewTracker";
import { content } from "@/content";

export const metadata: Metadata = {
  title: content.site.name,
  description: content.site.tagline,
  metadataBase: new URL("https://boylebags.com"),
  alternates: {
    canonical: "/",
  },
};

const GA_MEASUREMENT_ID = process.env.NEXTPUBLICGAMEASUREMENTID;
const isProduction = process.env.NODE_ENV === "production";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const shouldLoadGA = isProduction && GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col bg-white text-zinc-900">
        {shouldLoadGA && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
        <TrustBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        {shouldLoadGA && <PageViewTracker gaId={GA_MEASUREMENT_ID} />}
      </body>
    </html>
  );
}
