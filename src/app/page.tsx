import { content } from "@/content";
import { RenderSections } from "@/components/RenderSections";
import type { Metadata } from "next";

const page = content.pages["/"];

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
};

export default function HomePage() {
  return <RenderSections sections={page.sections} />;
}
