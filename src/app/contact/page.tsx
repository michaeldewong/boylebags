import { content } from "@/content";
import { RenderSections } from "@/components/RenderSections";
import { ContactForm } from "@/components/ContactForm";
import type { Metadata } from "next";

const page = content.pages["/contact"];

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function ContactPage() {
  return (
    <div>
      <RenderSections sections={page.sections} />
      <ContactForm />
    </div>
  );
}
