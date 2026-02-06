"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Product } from "@/content";
import { event } from "@/lib/ga";

const MOQ_MIN = 500;
const MOQ_ERROR_MESSAGE =
  "Minimum order is 500 units. For samples, please visit our Sample Request page.";

export function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(500);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const quantityNum = quantity;
  const meetsMOQ = quantityNum >= MOQ_MIN;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!meetsMOQ) {
      setError(MOQ_ERROR_MESSAGE);
      return;
    }

    setSubmitting(true);

    // Route to custom RFQ page with product pre-filled via query params
    const params = new URLSearchParams({
      product: product.slug,
      quantity: quantity.toString(),
      productInterest: product.name,
    });

    event("product_rfq_start", {
      product_slug: product.slug,
      quantity: quantity.toString(),
    });

    router.push(`/custom?${params.toString()}`);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold text-zinc-900">{product.name}</h1>
        <p className="text-lg text-zinc-600">{product.shortDesc}</p>
      </div>

      <div className="mb-8 rounded-lg border border-zinc-200 bg-white p-6">
        <h2 className="mb-4 text-2xl font-semibold text-zinc-900">Description</h2>
        <p className="mb-4 text-zinc-700">{product.longDesc}</p>
        <ul className="space-y-2 text-zinc-600">
          {product.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-1 text-black">•</span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-8 rounded-lg border border-zinc-200 bg-white p-6">
        <h3 className="mb-3 text-lg font-semibold text-zinc-900">Details</h3>
        <div className="space-y-2 text-sm text-zinc-600">
          <div>
            <span className="font-medium text-zinc-900">Decoration:</span>{" "}
            {product.decoration}
          </div>
          <div>
            <span className="font-medium text-zinc-900">Lead Time:</span>{" "}
            {product.leadTime}
          </div>
          <div>
            <span className="font-medium text-zinc-900">Minimum Order:</span>{" "}
            500 units
          </div>
        </div>
      </div>

      {/* Qualification Form */}
      <div className="rounded-lg border-2 border-black bg-white p-6">
        <h2 className="mb-4 text-2xl font-semibold text-zinc-900">
          Request Quote
        </h2>
        <p className="mb-6 text-zinc-600">
          Enter your quantity to proceed with a detailed quote request.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700">
              Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              min={MOQ_MIN}
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10) || 0;
                setQuantity(val);
                if (error && val >= MOQ_MIN) setError(null);
              }}
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
              aria-invalid={!!error}
            />
            {error && (
              <p className="mt-2 text-sm text-red-600" role="alert">
                {error}
              </p>
            )}
            {!error && !meetsMOQ && quantity > 0 && (
              <p className="mt-2 text-sm text-amber-600">
                Minimum order is 500 units.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={submitting || !meetsMOQ}
              className="flex-1 rounded-md bg-black px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Processing..." : "Continue to Quote Request"}
            </button>
            <Link
              href="/sample-pack"
              className="flex-1 rounded-md border-2 border-zinc-900 bg-white px-6 py-3 text-center text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50"
            >
              Request Sample Pack
            </Link>
          </div>
        </form>

        <p className="mt-4 text-xs text-zinc-500">
          You&apos;ll complete a detailed quote request form with delivery dates,
          customization options, and contact information.
        </p>
      </div>
    </div>
  );
}
