import { content } from "@/content";
import { RenderSections } from "@/components/RenderSections";
import { CustomRFQForm } from "@/components/CustomRFQForm";
import type { Metadata } from "next";

const page = content.pages["/custom"] || {
  title: "Volume Quotation Request (500+ Units)",
  description:
    "Submit your requirements for custom volume fulfillment. Guaranteed timeline and full cost transparency.",
  sections: [
    {
      type: "hero",
      title: "Volume Quotation Request (500+ Units)",
      subtitle:
        "Submit your requirements below. We guarantee precision delivery on our stated production timelines for orders meeting our minimum volume requirement.",
    },
  ],
};

const whatYouGetBullets = [
  "Guaranteed Timeline: Receive a binding quote with a firm delivery date within 1 business day.",
  "Direct Qualification: Your request routes immediately to the Account Management team specializing in your industry.",
  "Full Cost Transparency: Quote includes unit price, customization setup fees, and estimated freight to your location.",
];

export const metadata: Metadata = {
  title: page.title,
  description: page.description || "Volume quotation request for 500+ units",
  alternates: {
    canonical: "/custom",
    languages: {
      en: "/custom",
      es: "/es/custom",
    },
  },
};

export default function CustomPage() {
  return (
    <div>
      <RenderSections sections={page.sections} />
      <section className="mx-auto max-w-2xl px-4 py-8">
        <h2 className="mb-6 text-xl font-semibold text-zinc-900">
          What You Get / What To Expect
        </h2>
        <ul className="space-y-3 text-zinc-700">
          {whatYouGetBullets.map((text, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-black">•</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </section>
      <CustomRFQForm />
    </div>
  );
}
