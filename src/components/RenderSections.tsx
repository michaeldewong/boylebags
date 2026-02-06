import Link from "next/link";
import type { PageSection, CTA } from "@/content";
import { TrackedCtas } from "./TrackedCtas";

function Ctas({ ctas }: { ctas?: CTA[] }) {
  if (!ctas?.length) return null;
  return <TrackedCtas ctas={ctas} />;
}

function HeroSection(props: Extract<PageSection, { type: "hero" }>) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 text-center">
      {props.title && (
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-zinc-900">
          {props.title}
        </h1>
      )}
      {props.subtitle && (
        <p className="mb-8 text-xl text-zinc-600">{props.subtitle}</p>
      )}
      {props.bullets?.length ? (
        <ul className="mb-8 flex flex-wrap justify-center gap-6 text-sm text-zinc-700">
          {props.bullets.map((b, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="text-black">•</span>
              {b}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="flex flex-wrap justify-center gap-4">
        {props.primaryCta && <Ctas ctas={[props.primaryCta]} />}
        {props.secondaryCta && <Ctas ctas={[props.secondaryCta]} />}
      </div>
    </section>
  );
}

function FeatureGridSection(props: Extract<PageSection, { type: "featureGrid" }>) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      {props.title && (
        <h2 className="mb-12 text-center text-3xl font-bold text-zinc-900">
          {props.title}
        </h2>
      )}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {props.items.map((item, i) => (
          <div
            key={i}
            className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <h3 className="mb-3 text-xl font-semibold text-zinc-900">
              {item.title}
            </h3>
            <p className="text-zinc-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function StepsSection(props: Extract<PageSection, { type: "steps" }>) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      {props.title && (
        <h2 className="mb-12 text-center text-3xl font-bold text-zinc-900">
          {props.title}
        </h2>
      )}
      <div className="space-y-8">
        {props.steps.map((step, i) => (
          <div key={i} className="flex gap-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
              {i + 1}
            </div>
            <div className="flex-1">
              <h3 className="mb-2 text-xl font-semibold text-zinc-900">
                {step.title}
              </h3>
              <p className="text-zinc-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FAQSection(props: Extract<PageSection, { type: "faq" }>) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      {props.title && (
        <h2 className="mb-12 text-center text-3xl font-bold text-zinc-900">
          {props.title}
        </h2>
      )}
      <div className="space-y-6">
        {props.items.map((item, i) => (
          <div key={i} className="border-b border-zinc-200 pb-6">
            <h3 className="mb-2 text-lg font-semibold text-zinc-900">
              {item.q}
            </h3>
            <p className="text-zinc-600">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PricingTableSection(props: Extract<PageSection, { type: "pricingTable" }>) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      {props.title && (
        <h2 className="mb-8 text-center text-3xl font-bold text-zinc-900">
          {props.title}
        </h2>
      )}
      <div className="overflow-hidden rounded-lg border border-zinc-200">
        <table className="w-full">
          <tbody>
            {props.rows.map((row, i) => (
              <tr key={i} className="border-b border-zinc-200 last:border-b-0">
                <td className="px-6 py-4 font-semibold text-zinc-900">
                  {row.label}
                </td>
                <td className="px-6 py-4 text-right text-zinc-600">
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {props.notes && (
        <p className="mt-4 text-sm text-zinc-500">{props.notes}</p>
      )}
    </section>
  );
}

function CalloutSection(props: Extract<PageSection, { type: "callout" }>) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <div className="rounded-lg border-2 border-black bg-zinc-50 p-8">
        {props.title && (
          <h2 className="mb-4 text-2xl font-bold text-zinc-900">
            {props.title}
          </h2>
        )}
        <p className="mb-6 text-zinc-700">{props.body}</p>
        {props.ctas && <Ctas ctas={props.ctas} />}
      </div>
    </section>
  );
}

function FormSection(props: Extract<PageSection, { type: "form" }>) {
  // Form rendering is handled by page components
  return (
    <section className="mx-auto max-w-2xl px-4 py-16">
      {props.title && (
        <h2 className="mb-4 text-3xl font-bold text-zinc-900">{props.title}</h2>
      )}
      {props.description && (
        <p className="mb-8 text-zinc-600">{props.description}</p>
      )}
      <div className="text-sm text-zinc-500">
        Form will be rendered by page component (formId: {props.formId})
      </div>
    </section>
  );
}

function LegalSection(props: Extract<PageSection, { type: "legal" }>) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      {props.title && (
        <h2 className="mb-8 text-3xl font-bold text-zinc-900">{props.title}</h2>
      )}
      <div className="prose prose-sm max-w-none">
        {props.paragraphs.map((para, i) => (
          <p key={i} className="mb-4 text-zinc-700 leading-relaxed">
            {para}
          </p>
        ))}
      </div>
    </section>
  );
}

export function RenderSections({ sections }: { sections: PageSection[] }) {
  return (
    <>
      {sections.map((section, idx) => {
        const key = `${section.type}-${idx}`;
        switch (section.type) {
          case "hero":
            return <HeroSection key={key} {...section} />;
          case "featureGrid":
            return <FeatureGridSection key={key} {...section} />;
          case "steps":
            return <StepsSection key={key} {...section} />;
          case "faq":
            return <FAQSection key={key} {...section} />;
          case "pricingTable":
            return <PricingTableSection key={key} {...section} />;
          case "callout":
            return <CalloutSection key={key} {...section} />;
          case "form":
            return <FormSection key={key} {...section} />;
          case "legal":
            return <LegalSection key={key} {...section} />;
          default:
            return null;
        }
      })}
    </>
  );
}
