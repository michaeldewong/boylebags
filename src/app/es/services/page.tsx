import { contentEs } from "@/content-es";
import { RenderSections } from "@/components/RenderSections";
import type { Metadata } from "next";

const page = contentEs.pages["/services"];

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: {
    canonical: "/es/services",
    languages: {
      en: "/services",
      es: "/es/services",
    },
  },
};

export default function ServicesPageEs() {
  return <RenderSections sections={page.sections} />;
}
