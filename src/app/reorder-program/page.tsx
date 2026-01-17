import { content } from "@/content";
import { RenderSections } from "@/components/RenderSections";

export default function ReorderProgramPage() {
  const page = content.pages["/reorder-program"];
  return <RenderSections sections={page.sections} />;
}
