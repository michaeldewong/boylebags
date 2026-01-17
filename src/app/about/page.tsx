import { content } from "@/content";
import { RenderSections } from "@/components/RenderSections";

export default function AboutPage() {
  const page = content.pages["/about"];
  return <RenderSections sections={page.sections} />;
}
