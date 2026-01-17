import { content } from "@/content";
import { RenderSections } from "@/components/RenderSections";

export default function PrivacyPage() {
  const page = content.pages["/privacy"];
  return <RenderSections sections={page.sections} />;
}
