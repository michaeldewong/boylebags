import { content } from "@/content";
import { RenderSections } from "@/components/RenderSections";

export default function BagUpdatesPage() {
  const page = content.pages["/bag-updates"];
  return <RenderSections sections={page.sections} />;
}
