import { contentEs } from "@/content-es";
import { RenderSections } from "@/components/RenderSections";
import { ContactForm } from "@/components/ContactForm";
import type { Metadata } from "next";

const page = contentEs.pages["/contact"];

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: {
    canonical: "/es/contact",
    languages: {
      en: "/contact",
      es: "/es/contact",
    },
  },
};

export default function ContactPageEs() {
  return (
    <div>
      <RenderSections sections={page.sections} />
      <ContactForm />
    </div>
  );
}
