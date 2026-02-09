import Link from "next/link";
import { TrackedCtas } from "@/components/TrackedCtas";

export type ProductTemplateData = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  useCases: string[];
  industries: string[];
};

type ProductTemplateProps = {
  product: ProductTemplateData;
};

export function ProductTemplate({ product }: ProductTemplateProps) {
  const quoteHref = `/custom?productInterest=${encodeURIComponent(product.title)}`;

  const ctaPrimary = {
    href: quoteHref,
    label: "Request Tiered Quote (MOQ Applies)",
    variant: "primary" as const,
  };

  const ctaSecondary = {
    href: "/sample-pack",
    label: "Request Sample Pack",
    variant: "secondary" as const,
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-12">
        {/* Hero */}
        <header className="mb-12 border-b border-zinc-200 pb-10">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-zinc-500">
            Product
          </p>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900">
            {product.title}
          </h1>
          <p className="text-lg text-zinc-600">{product.metaDescription}</p>
        </header>

        {/* Use Cases */}
        <section className="mb-12" aria-labelledby="use-cases-heading">
          <h2
            id="use-cases-heading"
            className="mb-6 text-2xl font-semibold text-zinc-900"
          >
            B2B Use Cases
          </h2>
          <p className="mb-4 text-zinc-700">
            Built for the programs that drive brand reach and loyalty. Common
            applications:
          </p>
          <ul className="space-y-2 text-zinc-700">
            {product.useCases.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-zinc-400">—</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Industries Served */}
        <section className="mb-12" aria-labelledby="industries-heading">
          <h2
            id="industries-heading"
            className="mb-6 text-2xl font-semibold text-zinc-900"
          >
            Industries We Serve
          </h2>
          <p className="mb-4 text-zinc-700">
            We supply procurement and marketing teams across these segments:
          </p>
          <ul className="space-y-2 text-zinc-700">
            {product.industries.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-zinc-400">—</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA section */}
        <section
          className="rounded-lg border-2 border-zinc-900 bg-zinc-50 p-8"
          aria-labelledby="cta-heading"
        >
          <h2 id="cta-heading" className="mb-4 text-xl font-semibold text-zinc-900">
            Request a Quote
          </h2>
          <p className="mb-6 text-zinc-700">
            Submit your quantity and requirements. We will send a detailed quote
            with lead time and options. Minimum order 500 units.
          </p>
          <TrackedCtas ctas={[ctaPrimary, ctaSecondary]} />
          <p className="mt-4 text-sm text-zinc-500">
            For orders under 500 units, please use our{" "}
            <Link href="/sample-pack" className="underline hover:text-zinc-700">
              Sample Request
            </Link>{" "}
            page.
          </p>
        </section>
      </div>
    </div>
  );
}
