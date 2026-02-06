import { contentEs } from "@/content-es";
import { RenderSections } from "@/components/RenderSections";
import { CustomRFQForm } from "@/components/CustomRFQForm";
import type { Metadata } from "next";

const page = contentEs.pages["/custom"] || {
  title: "Cotización Personalizada",
  description: "Solicitar una cotización de bolsa personalizada",
  sections: [
    {
      type: "hero",
      title: "Solicitar una Cotización Personalizada",
      subtitle:
        "Cuéntenos sobre sus necesidades de bolsas y le proporcionaremos una cotización detallada en 4 horas.",
    },
  ],
};

export const metadata: Metadata = {
  title: page.title,
  description: page.description || "Solicitar una cotización de bolsa personalizada",
  alternates: {
    canonical: "/es/custom",
    languages: {
      en: "/custom",
      es: "/es/custom",
    },
  },
};

export default function CustomPageEs() {
  return (
    <div>
      <RenderSections sections={page.sections} />
      <CustomRFQForm />
    </div>
  );
}
