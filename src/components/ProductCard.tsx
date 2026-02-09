import Link from "next/link";
import type { ShopKit } from "@/lib/shopKits";

export function ProductCard({ kit }: { kit: ShopKit }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <h3 className="mb-2 text-2xl font-bold text-zinc-900">{kit.name}</h3>
      <p className="mb-4 text-zinc-600">{kit.description}</p>

      <div className="mb-3">
        <span className="inline-block rounded-md bg-zinc-900 px-3 py-1 text-xs font-semibold text-white">
          MOQ: {kit.moq} pcs
        </span>
      </div>

      <div className="mb-4 text-sm font-medium text-zinc-700">
        {kit.pricingModel}
      </div>

      {kit.productionNotes.length > 0 && (
        <ul className="mb-6 space-y-2 text-sm text-zinc-600">
          {kit.productionNotes.map((note, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-zinc-400">—</span>
              {note}
            </li>
          ))}
        </ul>
      )}

      <Link
        href={kit.ctaHref}
        className="inline-flex w-full items-center justify-center rounded-md border-2 border-zinc-900 bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50"
      >
        {kit.ctaLabel}
      </Link>
    </div>
  );
}
