import Link from "next/link";
import { content } from "@/content";
import { RenderSections } from "@/components/RenderSections";
import { contentEs } from "@/content-es";
import type { Metadata } from "next";

function ProductCard({ product }: { product: typeof content.products[0] }) {
  const minPrice = Math.min(...product.tiers.map((t) => t.unitPrice));
  const maxPrice = Math.max(...product.tiers.map((t) => t.unitPrice));

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <h3 className="mb-2 text-2xl font-bold text-zinc-900">{product.name}</h3>
      <p className="mb-4 text-zinc-600">{product.shortDesc}</p>
      <div className="mb-4 text-sm text-zinc-500">
        <span className="font-semibold text-zinc-900">
          ${minPrice.toFixed(2)}
          {minPrice !== maxPrice && ` - $${maxPrice.toFixed(2)}`}
        </span>
        {" "}por bolsa
      </div>
      <ul className="mb-6 space-y-2 text-sm text-zinc-600">
        {product.bullets.slice(0, 3).map((bullet, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1 text-black">•</span>
            {bullet}
          </li>
        ))}
      </ul>
      <Link
        href={`/es/shop/${product.slug}`}
        className="inline-flex w-full items-center justify-center rounded-md bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
      >
        Ver Detalles del Kit
      </Link>
    </div>
  );
}

const page = contentEs.pages["/shop"];

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: {
    canonical: "/es/shop",
    languages: {
      en: "/shop",
      es: "/es/shop",
    },
  },
};

export default function ShopPageEs() {
  return (
    <div>
      <RenderSections sections={page.sections} />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {content.products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
