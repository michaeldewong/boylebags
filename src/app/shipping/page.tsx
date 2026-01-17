import { content } from "@/content";
import { RenderSections } from "@/components/RenderSections";

export default function ShippingPage() {
  const page = content.pages["/shipping"];
  return <RenderSections sections={page.sections} />;
}
