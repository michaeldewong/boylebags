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
  trustBarText: "4-hour quotes • Proof required • Rush slots limited",
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
        title: "Bags made simple for busy Southern California teams.",
        subtitle:
          "Quick-ship kits, clean branding, and a reorder program that fits how you work.",
        bullets: [
          "Fast quotes. Clear proofs. No surprises.",
          "Low minimums for local teams and events.",
          "Easy reorders + consistent supply.",
        ],
        primaryCta: {
          href: "/shop",
          label: "Shop Quick-Ship Kits",
          variant: "primary",
        },
        secondaryCta: {
          href: "/custom",
          label: "Request a Custom Quote",
          variant: "secondary",
        },
      },
      {
        type: "featureGrid",
        title: "How We Work",
        items: [
          {
            title: "Shop Kits",
            description:
              "Choose from three proven kits with transparent pricing. Fast-turn options available.",
          },
          {
            title: "Custom Quote",
            description:
              "Submit your requirements and receive a detailed quote within 4 hours.",
          },
          {
            title: "Reorder Program",
            description:
              "Set up recurring orders with baseline quantities and flexible scheduling.",
          },
        ],
      },
      {
        type: "callout",
        title: "Local SoCal support. Fast response. Straightforward recommendations.",
        body: "We understand Southern California businesses and deliver bags that fit your workflow.",
      },
    ],
  },
  "/shop": {
    title: "Shop",
    description: "Quick-ship bag kits",
    sections: [
      {
        type: "hero",
        title: "Quick-Ship Kits",
        subtitle:
          "Three proven options with transparent pricing and fast turnaround.",
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
          "We sell certainty and service, not commodity bags. Three service levels designed for different needs: Quick-Ship for fast turnaround, Premium Finish for retail quality, and Swag Stash for ongoing programs.",
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
              "Perfect for urgent events and last-minute needs. 2-5 business days. Limited slots available. Full payment required upfront. $150 flat rush fee.",
          },
          {
            title: "Premium Finish",
            description:
              "Retail-ready quality with enhanced materials and finishes. 5-10 business days. Includes one revision. Deposit required, balance due before shipping.",
          },
          {
            title: "Swag Stash Program",
            description:
              "Ongoing program service with scheduled recurring orders. Baseline quantities, consistent supply. Storage options available. Flexible scheduling.",
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
    title: "Custom Quote",
    description: "Request a custom bag quote",
    sections: [
      {
        type: "hero",
        title: "Request a Custom Quote",
        subtitle:
          "Tell us about your bag needs and we'll provide a detailed quote within 4 hours.",
      },
      {
        type: "form",
        title: "Custom RFQ Form",
        description:
          "Fill out the form below with your requirements and we'll send you a detailed quote.",
        formId: "custom-rfq",
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
          "Have questions? Need a quote? We're here to help. Get in touch and we'll respond within 4 business hours.",
      },
      {
        type: "callout",
        title: "Get in Touch",
        body: "Phone: +1 (XXX) XXX-XXXX | Email: sales@boylebags.com",
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
          "Fill out the form below and we'll get back to you within 4 business hours.",
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
