import { content } from "@/content";
import { RenderSections } from "@/components/RenderSections";

export default function CaliforniaBagUpdatesPage() {
  // Use the same content as /bag-updates (or create specific content)
  const page = content.pages["/bag-updates"] || content.pages["/california-bag-updates"];
  return <RenderSections sections={page.sections} />;
}
