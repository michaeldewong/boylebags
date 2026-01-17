import { content } from "@/content";
import { RenderSections } from "@/components/RenderSections";
import { SamplePackForm } from "@/components/SamplePackForm";

export default function SamplePackPage() {
  const page = content.pages["/sample-pack"] || {
    title: "Sample Pack",
    sections: [
      {
        type: "hero",
        title: "Request a Sample Pack",
        subtitle:
          "See and feel our bag quality before you order. Available for SoCal customers.",
      },
    ],
  };
  return (
    <div>
      <RenderSections sections={page.sections} />
      <SamplePackForm />
    </div>
  );
}
