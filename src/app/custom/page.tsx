import { content } from "@/content";
import { RenderSections } from "@/components/RenderSections";
import { CustomRFQForm } from "@/components/CustomRFQForm";
import type { Metadata } from "next";

const page = content.pages["/custom"] || {
  title: "Custom Quote",
  description: "Request a custom bag quote",
  sections: [
    {
      type: "hero",
      title: "Request a Custom Quote",
      subtitle:
        "Tell us about your bag needs and we'll provide a detailed quote within 4 hours.",
    },
  ],
};

export const metadata: Metadata = {
  title: page.title,
  description: page.description || "Request a custom bag quote",
};

export default function CustomPage() {
  return (
    <div>
      <RenderSections sections={page.sections} />
      <CustomRFQForm />
    </div>
  );
}
