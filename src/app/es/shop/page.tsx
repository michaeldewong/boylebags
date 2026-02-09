import { ShopKitCard } from "@/components/ShopKitCard";
import { RenderSections } from "@/components/RenderSections";
import { contentEs } from "@/content-es";
import {
  EXPECTED_SHOP_KIT_COUNT,
  SHOP_KITS,
} from "@/lib/shopKits";
import type { Metadata } from "next";

const isDev = process.env.NODE_ENV !== "production";
const showKitCountWarning =
  isDev && SHOP_KITS.length !== EXPECTED_SHOP_KIT_COUNT;

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
        {showKitCountWarning && (
          <div
            className="mb-6 rounded-lg border-2 border-amber-500 bg-amber-50 p-4 text-center text-sm font-medium text-amber-900"
            role="alert"
          >
            [Dev only] Expected {EXPECTED_SHOP_KIT_COUNT} shop kits; showing{" "}
            {SHOP_KITS.length}. Fix src/lib/shopKits.ts for production parity.
          </div>
        )}
        <div className="grid gap-8 md:grid-cols-3">
          {SHOP_KITS.map((kit) => (
            <ShopKitCard key={kit.id} kit={kit} />
          ))}
        </div>
      </section>
    </div>
  );
}
