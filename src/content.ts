export type CTA = {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "ghost";
};

export type HeroSection = {
  type: "hero";
  title?: string;
  subtitle?: string;
  bullets?: string[];
  primaryCta?: CTA;
  secondaryCta?: CTA;
};

export type FeatureGridSection = {
  type: "featureGrid";
  title?: string;
  items: Array<{
    title: string;
    description: string;
  }>;
};

export type StepsSection = {
  type: "steps";
  title?: string;
  steps: Array<{
    title: string;
    description: string;
  }>;
};

export type FAQSection = {
  type: "faq";
  title?: string;
  items: Array<{
    q: string;
    a: string;
  }>;
};

export type PricingTableSection = {
  type: "pricingTable";
  title?: string;
  rows: Array<{
    label: string;
    value: string;
  }>;
  notes?: string;
};

export type CalloutSection = {
  type: "callout";
  title: string;
  body: string;
  ctas?: CTA[];
};

export type FormSection = {
  type: "form";
  title: string;
  description?: string;
  formId: string;
};

export type LegalSection = {
  type: "legal";
  title: string;
  paragraphs: string[];
};

export type PageSection =
  | HeroSection
  | FeatureGridSection
  | StepsSection
  | FAQSection
  | PricingTableSection
  | CalloutSection
  | FormSection
  | LegalSection;

export type NavItem = {
  href: string;
  label: string;
};

export type ProductTier = {
  qty: number;
  unitPrice: number;
};

export type Product = {
  slug: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  tiers: ProductTier[];
  defaultTierQty: number;
  decoration: string;
  leadTime: string;
  bullets: string[];
  image?: string;
};

export type AddOn = {
  id: string;
  name: string;
  description: string;
  pricingType: "flat" | "perBag";
  price: number;
};

export type PageContent = {
  title: string;
  description?: string;
  sections: PageSection[];
};

export type SiteConfig = {
  name: string;
  tagline: string;
  trustBarText: string;
  navLinks: NavItem[];
  resourcesLinks?: NavItem[];
  footerLinks: NavItem[];
  footerLines: string[];
};

export const addOns: AddOn[] = [
  {
    id: "rush",
    name: "Rush Processing",
    description: "Expedited production and shipping",
    pricingType: "flat",
    price: 150,
  },
  {
    id: "retailReady",
    name: "Retail Ready Finish",
    description: "Premium finish for retail display",
    pricingType: "perBag",
    price: 1.2,
  },
  {
    id: "splitShipment",
    name: "Split Shipment",
    description: "Additional shipping location",
    pricingType: "flat",
    price: 25,
  },
  {
    id: "insertCard",
    name: "Insert Card",
    description: "Custom insert card included",
    pricingType: "perBag",
    price: 0.5,
  },
];

export const products: Product[] = [
  {
    slug: "event-saver-kit",
    name: "Event Saver Kit",
    shortDesc: "Fast-turn solution for events and promotions",
    longDesc:
      "Perfect for last-minute events, trade shows, and promotional campaigns. Quick-ship with standard decoration options. Reliable quality, fast turnaround.",
    tiers: [
      { qty: 50, unitPrice: 2.5 },
      { qty: 100, unitPrice: 2.2 },
      { qty: 250, unitPrice: 1.95 },
      { qty: 500, unitPrice: 1.75 },
    ],
    defaultTierQty: 100,
    decoration: "1-color or DTF depending on material",
    leadTime: "5-7 business days (standard), 2-3 days (rush)",
    bullets: [
      "Standard decoration included",
      "Quick-ship availability",
      "Proof required before production",
      "Bulk pricing tiers available",
    ],
  },
  {
    slug: "retail-ready-kit",
    name: "Retail Ready Kit",
    shortDesc: "Premium finish for retail environments",
    longDesc:
      "High-quality bags designed for retail display. Premium materials and finishes. Perfect for boutique stores, gift shops, and premium brand experiences. Includes Retail Ready add-on.",
    tiers: [
      { qty: 50, unitPrice: 3.5 },
      { qty: 100, unitPrice: 3.2 },
      { qty: 250, unitPrice: 2.95 },
      { qty: 500, unitPrice: 2.75 },
      { qty: 1000, unitPrice: 2.6 },
    ],
    defaultTierQty: 100,
    decoration: "Premium screen print or embroidery",
    leadTime: "7-10 business days (standard), 4-5 days (rush)",
    bullets: [
      "Premium materials and construction",
      "Retail-ready finish standard (includes Retail Ready add-on)",
      "Enhanced decoration options",
      "Professional appearance",
    ],
  },
  {
    slug: "swag-stash-starter",
    name: "Swag Stash Starter",
    shortDesc: "Program-friendly starter kit",
    longDesc:
      "Designed for ongoing programs and reorder workflows. Consistent quality, reliable supply. Perfect for corporate programs, membership benefits, and recurring promotions.",
    tiers: [
      { qty: 500, unitPrice: 1.7 },
      { qty: 1000, unitPrice: 1.55 },
    ],
    defaultTierQty: 500,
    decoration: "Standard screen print",
    leadTime: "7-10 business days (standard), 4-5 days (rush)",
    bullets: [
      "Program pricing available",
      "Reorder-friendly workflow",
      "Consistent quality",
      "Storage options available",
    ],
  },
];

export const site: SiteConfig = {
  name: "Boyle Bags",
  tagline: "Bags made simple for busy teams.",
  trustBarText: "99.8% On-Time Delivery | 150+ Enterprise Clients Served | Factory-Direct QA Vetted",
  navLinks: [
    { href: "/shop", label: "Shop" },
    { href: "/custom", label: "Custom" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ],
  footerLinks: [
    { href: "/terms", label: "Terms" },
    { href: "/contact", label: "Contact" },
  ],
  footerLines: [
    "Boyle Bags® is the customer-facing brand of Bag Solutions Group, a DBA of Boyle & Co., LLC.",
    "Requirements can vary by store type and local ordinances. Information is general and not legal advice.",
    "Copyright © 2026 Boyle & Co., LLC.",
  ],
};

export const pages: Record<string, PageContent> = {
  "/": {
    title: "Home",
    description: "Quick-ship kits and custom RFQs for busy Southern California teams",
    sections: [
      {
        type: "hero",
        title: "Custom Corporate Bags. Delivered On-Spec, On-Time.",
        subtitle:
          "Reliable high-volume fulfillment for US B2B buyers. Eliminate sourcing risk with our fixed-deadline production schedule.",
        primaryCta: {
          href: "/custom",
          label: "Get Tiered Quote (MOQ Applies)",
          variant: "primary",
        },
      },
      {
        type: "callout",
        title: "Start Your Volume Order",
        body: "We specialize in custom volume fulfillment. Minimum Order Quantity (MOQ) for production runs starts at 500 units.",
        ctas: [
          {
            href: "/custom",
            label: "Get Tiered Quote (MOQ Applies)",
            variant: "primary",
          },
          {
            href: "/sample-pack",
            label: "Request Material Samples",
            variant: "secondary",
          },
        ],
      },
    ],
  },
  "/shop": {
    title: "Custom Bag Manufacturing – Bulk & Wholesale",
    description: "Factory-direct pricing for brands and events. Minimum Order Quantity: 500 Units.",
    sections: [
      {
        type: "hero",
        title: "Custom Bag Manufacturing – Bulk & Wholesale",
        subtitle:
          "Factory-direct pricing for brands and events. Minimum Order Quantity: 500 Units.",
        primaryCta: {
          href: "/custom",
          label: "Start High-Volume Quote",
          variant: "primary",
        },
        secondaryCta: {
          href: "/sample-pack",
          label: "Request Sample Pack",
          variant: "secondary",
        },
      },
    ],
  },
  "/services": {
    title: "Services",
    description: "Service levels and proofing process",
    sections: [
      {
        type: "hero",
        title: "Service Levels",
        subtitle:
          "Three service levels for different needs: Quick-Ship for urgent events, Premium Finish for retail quality, and Swag Stash for ongoing programs.",
      },
      {
        type: "steps",
        title: "How Proofing Works",
        steps: [
          {
            title: "Submit Your Order",
            description:
              "Choose a kit or submit a custom RFQ with your requirements and decoration details.",
          },
          {
            title: "Receive Proof",
            description:
              "We'll send a digital proof of your design within 24-48 hours for your review and approval.",
          },
          {
            title: "Approve & Revise",
            description:
              "Review the proof and approve or request one revision (included). Additional revisions are $25 each.",
          },
          {
            title: "Production & Delivery",
            description:
              "Once approved, we begin production and deliver according to your selected timeline.",
          },
        ],
      },
      {
        type: "featureGrid",
        title: "Our Three Service Levels",
        items: [
          {
            title: "Quick-Ship",
            description:
              "For schools and teams with urgent events. Fast 2-5 day turnaround. Limited slots. Full payment upfront. $150 rush fee. Best when you need bags fast.",
          },
          {
            title: "Premium Finish",
            description:
              "For retail stores and brands needing consistent quality. 5-10 business days. One revision included. Deposit required. Best for repeat orders with consistent specs.",
          },
          {
            title: "Swag Stash Program",
            description:
              "For distributors and businesses with ongoing needs. Scheduled recurring orders. Baseline quantities ready. Storage available. Best for operational ease and consistent supply.",
          },
        ],
      },
    ],
  },
  "/reorder-program": {
    title: "Reorder Program",
    description: "Set up recurring orders",
    sections: [
      {
        type: "hero",
        title: "Reorder Program",
        subtitle:
          "Simplify your bag supply with scheduled recurring orders and optional storage.",
      },
      {
        type: "featureGrid",
        items: [
          {
            title: "Baseline Quantity",
            description:
              "Set a baseline quantity that we keep ready for your regular needs.",
          },
          {
            title: "Send the Usual",
            description:
              "Simply request your standard order and we'll process it quickly using your saved preferences.",
          },
          {
            title: "Optional Storage",
            description:
              "We can store your inventory and ship on demand, reducing your storage costs.",
          },
        ],
      },
      {
        type: "callout",
        title: "Get Started",
        body: "Request a custom quote to set up your reorder program. We'll work with you to establish baseline quantities, pricing, and shipping schedules.",
        ctas: [
          {
            href: "/custom",
            label: "Request a Custom Quote",
            variant: "primary",
          },
        ],
      },
    ],
  },
  "/bag-updates": {
    title: "Bag Updates",
    description: "California compliance information",
    sections: [
      {
        type: "hero",
        title: "California Bag Compliance Updates",
        subtitle:
          "Compliance-aware information about bag requirements. This is general information, not legal advice.",
      },
      {
        type: "callout",
        title: "Important Disclaimer",
        body: "Requirements can vary by store type and local ordinances. Information is general and not legal advice. We recommend consulting with legal counsel or your local regulatory authority to ensure compliance with all applicable laws and regulations.",
      },
      {
        type: "legal",
        title: "General Information",
        paragraphs: [
          "Bag requirements can vary significantly by store type, location, and local ordinances. Regulations change frequently and may differ between cities, counties, and states.",
          "Boyle Bags and Bag Solutions Group provide compliance-aware products and information, but do not guarantee that any bag product will meet all regulatory requirements in all jurisdictions.",
          "We stay informed about general compliance trends and can discuss your needs, but you are responsible for ensuring compliance with all applicable local, state, and federal regulations.",
        ],
      },
      {
        type: "callout",
        title: "Need Compliance Guidance?",
        body: "While we cannot provide legal advice, we can help you understand general requirements and recommend consulting with compliance experts for your specific situation.",
        ctas: [
          {
            href: "/contact",
            label: "Contact Us",
            variant: "secondary",
          },
        ],
      },
    ],
  },
  "/about": {
    title: "About",
    description: "About Boyle Bags",
    sections: [
      {
        type: "hero",
        title: "About Boyle Bags",
        subtitle:
          "We make bags simple for busy teams who need reliable supply, fast turnaround, and quality results.",
      },
      {
        type: "featureGrid",
        items: [
          {
            title: "Reliability",
            description:
              "Consistent quality and on-time delivery. We understand the importance of meeting deadlines.",
          },
          {
            title: "Speed",
            description:
              "Fast quotes, quick turnaround, and rush options when you need them most.",
          },
          {
            title: "Proofing",
            description:
              "We require proof approval to ensure your design is exactly right before production.",
          },
          {
            title: "Local Support",
            description:
              "Expert guidance and responsive support throughout your project.",
          },
        ],
      },
    ],
  },
  "/custom": {
    title: "Volume Quotation Request (500+ Units)",
    description:
      "Submit your requirements for custom volume fulfillment. Guaranteed timeline and full cost transparency.",
    sections: [
      {
        type: "hero",
        title: "Volume Quotation Request (500+ Units)",
        subtitle:
          "Submit your requirements below. We guarantee precision delivery on our stated production timelines for orders meeting our minimum volume requirement.",
      },
    ],
  },
  "/sample-pack": {
    title: "Sample Pack",
    description: "Request a sample pack",
    sections: [
      {
        type: "hero",
        title: "Request a Sample Pack",
        subtitle:
          "See and feel our bag quality before you order. Available for SoCal customers.",
      },
      {
        type: "form",
        title: "Sample Pack Request",
        description:
          "Fill out the form below to request a sample pack. SoCal customers receive priority shipping.",
        formId: "sample-pack",
      },
    ],
  },
  "/contact": {
    title: "Contact",
    description: "Get in touch",
    sections: [
      {
        type: "hero",
        title: "Contact Us",
        subtitle:
          "Have questions? Need a quote? Email us at sales@boylebags.com or use the form below. We usually reply within 1 business day.",
      },
      {
        type: "callout",
        title: "Get in Touch",
        body: "Email: sales@boylebags.com | We usually reply within 1 business day.",
        ctas: [
          {
            href: "mailto:sales@boylebags.com",
            label: "Send Email",
            variant: "primary",
          },
        ],
      },
      {
        type: "form",
        title: "Send us a message",
        description:
          "Fill out the form below or email us directly at sales@boylebags.com. We usually reply within 1 business day.",
        formId: "contact",
      },
    ],
  },
  "/terms": {
    title: "Terms",
    description: "Terms and conditions",
    sections: [
      {
        type: "legal",
        title: "Terms and Conditions",
        paragraphs: [
          "1. Proof approval required.",
          "2. Includes 1 revision; extra revisions $25 each.",
          "3. Rush slots limited; scheduled upon payment.",
          "4. Equivalent substitution may apply if out of stock.",
          "5. Payment: Rush paid in full; standard deposit + balance due before ship.",
        ],
      },
    ],
  },
  "/privacy": {
    title: "Privacy",
    description: "Privacy policy",
    sections: [
      {
        type: "legal",
        title: "Privacy Policy",
        paragraphs: [
          "Boyle Bags respects your privacy. We collect information necessary to process your orders and provide customer service.",
          "We do not sell your personal information to third parties. Information is used solely for order processing, customer communication, and service improvement.",
          "If you have questions about our privacy practices, please contact us.",
        ],
      },
    ],
  },
  "/shipping": {
    title: "Shipping",
    description: "Shipping information",
    sections: [
      {
        type: "hero",
        title: "Shipping Information",
        subtitle: "We ship nationwide with reliable carriers.",
      },
      {
        type: "featureGrid",
        items: [
          {
            title: "Standard Shipping",
            description:
              "Standard shipping is included in kit pricing. Delivery times vary by location and carrier.",
          },
          {
            title: "Split Shipment",
            description:
              "Need to ship to multiple locations? Add split shipment option for $25 per additional location.",
          },
          {
            title: "Tracking",
            description:
              "All orders include tracking information. You'll receive updates as your order ships.",
          },
        ],
      },
    ],
  },
};

export const content = {
  site,
  products,
  addOns,
  pages,
};
