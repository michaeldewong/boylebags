import { contentEs } from "@/content-es";
import { RenderSections } from "@/components/RenderSections";
import type { Metadata } from "next";

const page = contentEs.pages["/"];

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: {
    canonical: "/es",
    languages: {
      en: "/",
      es: "/es",
    },
  },
};

export default function HomePageEs() {
  return <RenderSections sections={page.sections} />;
}
