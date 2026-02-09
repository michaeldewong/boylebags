import { ShopKitCard } from "@/components/ShopKitCard";
import { RenderSections } from "@/components/RenderSections";
import { contentEs } from "@/content-es";
import { SHOP_KITS } from "@/lib/shopKits";
import type { Metadata } from "next";

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
          {SHOP_KITS.map((kit) => (
            <ShopKitCard key={kit.id} kit={kit} />
          ))}
        </div>
      </section>
    </div>
  );
}
