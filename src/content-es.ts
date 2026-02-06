import type { SiteConfig, PageContent } from "./content";

export const siteEs: SiteConfig = {
  name: "Boyle Bags",
  tagline: "Bolsas simples para equipos ocupados.",
  trustBarText: "Cotización en 4 horas hábiles · Prueba requerida · Espacios urgentes limitados",
  navLinks: [
    { href: "/es/shop", label: "Tienda" },
    { href: "/es/custom", label: "Personalizado" },
    { href: "/es/services", label: "Servicios" },
    { href: "/es/contact", label: "Contacto" },
  ],
  footerLinks: [
    { href: "/es/terms", label: "Términos" },
    { href: "/es/contact", label: "Contacto" },
  ],
  footerLines: [
    "Boyle Bags® es la marca orientada al cliente de Bag Solutions Group, un DBA de Boyle & Co., LLC.",
    "Los requisitos pueden variar según el tipo de tienda y las ordenanzas locales. La información es general y no constituye asesoramiento legal.",
    "Copyright © 2026 Boyle & Co., LLC.",
  ],
};

export const pagesEs: Record<string, PageContent> = {
  "/": {
    title: "Inicio",
    description: "Kits de envío rápido y cotizaciones personalizadas para equipos ocupados del sur de California",
    sections: [
      {
        type: "hero",
        title: "Bolsas con marca confiable con cotizaciones en 4 horas y pedidos recurrentes consistentes.",
        subtitle:
          "Obtenga su cotización rápido. Apruebe las pruebas antes de la producción. Reordene con un mensaje. Diseñado para escuelas, equipos y empresas locales del sur de California.",
        bullets: [
          "Cotizaciones en 4 horas. Prueba requerida. Sin sorpresas.",
          "Reordenes fáciles. Suministro consistente. Confiabilidad local.",
          "Precios claros. Mínimos bajos. Cumplimiento rápido.",
        ],
        primaryCta: {
          href: "/es/custom",
          label: "Obtener Cotización (4 hrs)",
          variant: "primary",
        },
        secondaryCta: {
          href: "/es/shop",
          label: "Ver Precios de Envío Rápido",
          variant: "secondary",
        },
      },
      {
        type: "featureGrid",
        title: "Cómo Trabajamos",
        items: [
          {
            title: "Comprar Kits",
            description:
              "Elija entre tres kits probados con precios transparentes. Opciones de entrega rápida disponibles.",
          },
          {
            title: "Cotización Personalizada",
            description:
              "Envíe sus requisitos y reciba una cotización detallada en 4 horas.",
          },
          {
            title: "Programa de Reorden",
            description:
              "Configure pedidos recurrentes con cantidades base y programación flexible.",
          },
        ],
      },
      {
        type: "callout",
        title: "Soporte local de SoCal. Respuesta rápida. Recomendaciones directas.",
        body: "Entendemos las empresas del sur de California y entregamos bolsas que se adaptan a su flujo de trabajo.",
      },
    ],
  },
  "/shop": {
    title: "Tienda",
    description: "Kits de bolsas de envío rápido",
    sections: [
      {
        type: "hero",
        title: "Kits de Envío Rápido",
        subtitle:
          "Precios transparentes. Cumplimiento local rápido. Kits preconfigurados listos para entrega rápida.",
      },
    ],
  },
  "/custom": {
    title: "Cotización Personalizada",
    description: "Solicitar una cotización de bolsa personalizada",
    sections: [
      {
        type: "hero",
        title: "Solicitar una Cotización Personalizada",
        subtitle:
          "Cuéntenos sobre sus necesidades de bolsas y le proporcionaremos una cotización detallada en 4 horas.",
      },
      {
        type: "form",
        title: "Formulario de Cotización Personalizada",
        description:
          "Ideal para escuelas, equipos, eventos y distribuidores que necesitan bolsas con marca confiable. Complete el formulario a continuación con sus requisitos y le enviaremos una cotización detallada.",
        formId: "custom-rfq",
      },
    ],
  },
  "/services": {
    title: "Servicios",
    description: "Niveles de servicio y proceso de pruebas",
    sections: [
      {
        type: "hero",
        title: "Niveles de Servicio",
        subtitle:
          "Tres niveles de servicio para diferentes necesidades: Envío Rápido para eventos urgentes, Acabado Premium para calidad minorista, y Swag Stash para programas continuos.",
      },
      {
        type: "steps",
        title: "Cómo Funciona la Prueba",
        steps: [
          {
            title: "Envíe Su Pedido",
            description:
              "Elija un kit o envíe una cotización personalizada con sus requisitos y detalles de decoración.",
          },
          {
            title: "Reciba la Prueba",
            description:
              "Enviaremos una prueba digital de su diseño en 24-48 horas para su revisión y aprobación.",
          },
          {
            title: "Apruebe y Revise",
            description:
              "Revise la prueba y apruebe o solicite una revisión (incluida). Revisiones adicionales cuestan $25 cada una.",
          },
          {
            title: "Producción y Entrega",
            description:
              "Una vez aprobado, comenzamos la producción y entregamos según su línea de tiempo seleccionada.",
          },
        ],
      },
      {
        type: "featureGrid",
        title: "Nuestros Tres Niveles de Servicio",
        items: [
          {
            title: "Envío Rápido",
            description:
              "Para escuelas y equipos con eventos urgentes. Entrega rápida de 2-5 días. Espacios limitados. Pago completo por adelantado. Tarifa urgente de $150. Mejor cuando necesita bolsas rápido.",
          },
          {
            title: "Acabado Premium",
            description:
              "Para tiendas minoristas y marcas que necesitan calidad consistente. 5-10 días hábiles. Una revisión incluida. Depósito requerido. Mejor para pedidos repetidos con especificaciones consistentes.",
          },
          {
            title: "Programa Swag Stash",
            description:
              "Para distribuidores y empresas con necesidades continuas. Pedidos recurrentes programados. Cantidades base listas. Almacenamiento disponible. Mejor para facilidad operativa y suministro consistente.",
          },
        ],
      },
    ],
  },
  "/contact": {
    title: "Contacto",
    description: "Ponerse en contacto",
    sections: [
      {
        type: "hero",
        title: "Contáctenos",
        subtitle:
          "¿Tiene preguntas? ¿Necesita una cotización? Envíenos un correo a sales@boylebags.com o use el formulario a continuación. Generalmente respondemos en 1 día hábil.",
      },
      {
        type: "callout",
        title: "Póngase en Contacto",
        body: "Correo: sales@boylebags.com | Generalmente respondemos en 1 día hábil.",
        ctas: [
          {
            href: "mailto:sales@boylebags.com",
            label: "Enviar Correo",
            variant: "primary",
          },
        ],
      },
      {
        type: "form",
        title: "Envíenos un mensaje",
        description:
          "Complete el formulario a continuación o envíenos un correo directamente a sales@boylebags.com. Generalmente respondemos en 1 día hábil.",
        formId: "contact",
      },
    ],
  },
};

export const contentEs = {
  site: siteEs,
  pages: pagesEs,
};
