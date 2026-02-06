import Link from "next/link";
import { content } from "@/content";
import { RenderSections } from "@/components/RenderSections";
import type { Metadata } from "next";

function ProductCard({ product }: { product: typeof content.products[0] }) {
  // Extract spec snapshot from product (first bullet or decoration info)
  const specSnapshot = product.bullets[0] || `${product.decoration}`;

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <h3 className="mb-2 text-2xl font-bold text-zinc-900">{product.name}</h3>
      <p className="mb-4 text-zinc-600">{product.shortDesc}</p>
      
      {/* MOQ Badge */}
      <div className="mb-3">
        <span className="inline-block rounded-md bg-zinc-900 px-3 py-1 text-xs font-semibold text-white">
          MOQ: 500 pcs
        </span>
      </div>

      {/* Pricing Label (text only) */}
      <div className="mb-4 text-sm font-medium text-zinc-700">
        Volume-Based Pricing
      </div>

      {/* 1-line spec snapshot */}
      <p className="mb-6 text-sm text-zinc-600">{specSnapshot}</p>

      <Link
        href={`/shop/${product.slug}`}
        className="inline-flex w-full items-center justify-center rounded-md border-2 border-zinc-900 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50"
      >
        View Specs & Quote
      </Link>
    </div>
  );
}

const page = content.pages["/shop"];

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: {
    canonical: "/shop",
    languages: {
      en: "/shop",
      es: "/es/shop",
    },
  },
};

function TrustReinforcementLayer() {
  return (
    <>
      {/* Factory Direct Bar */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-6 rounded-lg border border-zinc-200 bg-white p-6 md:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-zinc-900">Direct Pricing</div>
              <div className="text-sm text-zinc-600">No middlemen</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-zinc-900">PMS Color Matching</div>
              <div className="text-sm text-zinc-600">Brand accuracy</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-zinc-900">Global Logistics</div>
              <div className="text-sm text-zinc-600">Worldwide shipping</div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <p className="mb-4 text-center text-sm font-medium text-zinc-700">
          Trusted by procurement teams at:
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale">
          {/* Placeholder logos - replace with actual client logos */}
          <div className="h-8 w-24 rounded bg-zinc-300"></div>
          <div className="h-8 w-24 rounded bg-zinc-300"></div>
          <div className="h-8 w-24 rounded bg-zinc-300"></div>
          <div className="h-8 w-24 rounded bg-zinc-300"></div>
        </div>
      </section>

      {/* Capability Stats */}
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-6 rounded-lg border border-zinc-200 bg-zinc-50 p-6 md:grid-cols-2">
          <div className="text-center">
            <div className="mb-2 text-2xl font-bold text-zinc-900">100%</div>
            <div className="text-sm text-zinc-600">Quality Check</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-2xl font-bold text-zinc-900">Free</div>
            <div className="text-sm text-zinc-600">Digital Mockups</div>
          </div>
        </div>
      </section>
    </>
  );
}

export default function ShopPage() {
  return (
    <div>
      <RenderSections sections={page.sections} />
      
      {/* Wholesale Only Badge */}
      <div className="mx-auto max-w-4xl px-4 -mt-8 mb-8 text-center">
        <span className="inline-block rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white">
          Wholesale Only
        </span>
      </div>

      <TrustReinforcementLayer />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {content.products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* Global Shop Page Warning */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <p className="text-center text-sm text-zinc-600">
          Note: All orders are subject to a strict 500-unit minimum to ensure wholesale pricing efficiency. Requests below this threshold cannot be processed.
        </p>
      </section>
    </div>
  );
}
