"use client";
import { useState } from "react";
import type { Product } from "@/content";
import { content } from "@/content";

export function ProductDetail({ product }: { product: Product }) {
  const [selectedTier, setSelectedTier] = useState(
    product.tiers.find((t) => t.qty === product.defaultTierQty) || product.tiers[0]
  );
  const [rush, setRush] = useState(false);
  const [retailReady, setRetailReady] = useState(false);
  const [splitShipment, setSplitShipment] = useState(false);
  const [splitLocations, setSplitLocations] = useState(1);
  const [insertCard, setInsertCard] = useState(false);

  const qty = selectedTier.qty;
  const basePrice = selectedTier.unitPrice * qty;

  const addOnsTotal =
    (rush ? content.addOns.find((a) => a.id === "rush")?.price || 0 : 0) +
    (retailReady
      ? (content.addOns.find((a) => a.id === "retailReady")?.price || 0) * qty
      : 0) +
    (splitShipment
      ? (content.addOns.find((a) => a.id === "splitShipment")?.price || 0) *
        splitLocations
      : 0) +
    (insertCard
      ? (content.addOns.find((a) => a.id === "insertCard")?.price || 0) * qty
      : 0);

  const total = basePrice + addOnsTotal;

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
        <h2 className="mb-4 text-2xl font-semibold text-zinc-900">
          Quantity & Pricing
        </h2>
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-zinc-700">
            Select Quantity
          </label>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {product.tiers.map((tier) => (
              <button
                key={tier.qty}
                type="button"
                onClick={() => setSelectedTier(tier)}
                className={`rounded-md border-2 px-4 py-3 text-sm font-medium transition-colors ${
                  selectedTier.qty === tier.qty
                    ? "border-black bg-black text-white"
                    : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-400"
                }`}
              >
                {tier.qty}
                <div className="mt-1 text-xs">
                  ${tier.unitPrice.toFixed(2)}/bag
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="mb-3 text-lg font-semibold text-zinc-900">Add-ons</h3>
          <div className="space-y-3">
            {content.addOns.map((addOn) => {
              const isChecked =
                (addOn.id === "rush" && rush) ||
                (addOn.id === "retailReady" && retailReady) ||
                (addOn.id === "splitShipment" && splitShipment) ||
                (addOn.id === "insertCard" && insertCard);

              return (
                <label
                  key={addOn.id}
                  className="flex items-start gap-3 rounded-md border border-zinc-200 p-3 hover:bg-zinc-50"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => {
                      if (addOn.id === "rush") setRush(e.target.checked);
                      if (addOn.id === "retailReady")
                        setRetailReady(e.target.checked);
                      if (addOn.id === "splitShipment")
                        setSplitShipment(e.target.checked);
                      if (addOn.id === "insertCard")
                        setInsertCard(e.target.checked);
                    }}
                    className="mt-1 h-4 w-4 rounded border-zinc-300 text-black focus:ring-2 focus:ring-black"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-zinc-900">{addOn.name}</div>
                    <div className="text-sm text-zinc-600">{addOn.description}</div>
                    <div className="mt-1 text-sm font-semibold text-zinc-900">
                      {addOn.pricingType === "flat"
                        ? `+$${addOn.price.toFixed(2)} flat`
                        : `+$${addOn.price.toFixed(2)} per bag`}
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
          {splitShipment && (
            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium text-zinc-700">
                Number of additional locations (0-5)
              </label>
              <input
                type="number"
                min="0"
                max="5"
                value={splitLocations}
                onChange={(e) =>
                  setSplitLocations(Math.max(0, Math.min(5, parseInt(e.target.value) || 0)))
                }
                className="w-32 rounded-md border border-zinc-300 px-3 py-2 text-sm"
              />
            </div>
          )}
        </div>

        <div className="rounded-lg bg-zinc-50 p-6">
          <div className="mb-4 flex items-center justify-between border-b border-zinc-200 pb-4">
            <span className="text-sm text-zinc-600">Base Price</span>
            <span className="font-semibold text-zinc-900">
              ${basePrice.toFixed(2)}
            </span>
          </div>
          {addOnsTotal > 0 && (
            <div className="mb-4 flex items-center justify-between border-b border-zinc-200 pb-4">
              <span className="text-sm text-zinc-600">Add-ons</span>
              <span className="font-semibold text-zinc-900">
                +${addOnsTotal.toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-zinc-900">Total</span>
            <span className="text-2xl font-bold text-zinc-900">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border-2 border-black bg-black p-6 text-center">
        <button
          type="button"
          className="w-full rounded-md bg-white px-6 py-4 text-lg font-semibold text-black transition-colors hover:bg-zinc-100"
        >
          Request Proof & Checkout
        </button>
        <p className="mt-3 text-sm text-zinc-400">
          You&apos;ll receive a proof for approval before production begins
        </p>
      </div>

      <div className="mt-8 rounded-lg border border-zinc-200 bg-white p-6">
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
        </div>
      </div>
    </div>
  );
}
