import { content } from "@/content";
import { RenderSections } from "@/components/RenderSections";

export default function TermsPage() {
  const page = content.pages["/terms"];
  return <RenderSections sections={page.sections} />;
}
