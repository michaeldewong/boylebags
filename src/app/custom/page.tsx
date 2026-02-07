import CustomClient from "./CustomClient";
import { content } from "@/content";
import { RenderSections } from "@/components/RenderSections";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

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
    <>
      <RenderSections sections={page.sections} />
      <CustomClient />
    </>
  );
}
