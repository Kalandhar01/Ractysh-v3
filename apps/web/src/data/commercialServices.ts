export interface CommercialServiceMetric {
  label: string;
  value: string;
}

export interface CommercialServiceSection {
  title: string;
  body: string;
}

export interface CommercialServicePageData {
  slug: string;
  href: string;
  eyebrow: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  relatedDivision: string;
  metrics: CommercialServiceMetric[];
  capabilities: CommercialServiceSection[];
  workflow: CommercialServiceSection[];
}

export const commercialServicePages: CommercialServicePageData[] = [
  {
    slug: "architecture-service",
    href: "/architecture-service",
    eyebrow: "Commercial Services / Architecture",
    title: "Architecture Service",
    summary:
      "Commercial architecture support for spatial planning, concept direction, design documentation and premium project decisions.",
    image: "/services/showcase-architecture.webp",
    imageAlt: "Premium architecture service for modern building planning",
    relatedDivision: "Architecture Division",
    metrics: [
      { label: "Service Type", value: "Design" },
      { label: "Output", value: "Plans" },
      { label: "Route", value: "Service" }
    ],
    capabilities: [
      {
        title: "Concept planning",
        body: "Shape site potential, spatial logic and architectural direction before delivery decisions are locked."
      },
      {
        title: "Design documentation",
        body: "Prepare clear drawings, references and review material for approvals, consultants and execution teams."
      },
      {
        title: "Premium presentation",
        body: "Convert design intent into client-ready visuals, narratives and decision material."
      }
    ],
    workflow: [
      { title: "Brief", body: "Requirement, site context, timeline and budget sensitivity are mapped." },
      { title: "Direction", body: "Planning logic, form language and service scope are aligned." },
      { title: "Handoff", body: "Documentation and next-step recommendations are prepared for delivery." }
    ]
  },
  {
    slug: "construction-service",
    href: "/construction-service",
    eyebrow: "Commercial Services / Construction",
    title: "Construction Service",
    summary:
      "Construction service support for site execution, vendor coordination, milestone control and turnkey delivery planning.",
    image: "/services/showcase-construction.webp",
    imageAlt: "Premium construction service for site delivery coordination",
    relatedDivision: "Construction Division",
    metrics: [
      { label: "Service Type", value: "Build" },
      { label: "Output", value: "Delivery" },
      { label: "Route", value: "Service" }
    ],
    capabilities: [
      {
        title: "Execution planning",
        body: "Structure scope, sequence, resources and site dependencies before work moves into delivery."
      },
      {
        title: "Vendor coordination",
        body: "Coordinate specialist teams, procurement signals and communication rhythm around one project view."
      },
      {
        title: "Quality checkpoints",
        body: "Keep progress, finish expectations and issue routing visible through practical control points."
      }
    ],
    workflow: [
      { title: "Scope", body: "Project requirements, drawings and delivery expectations are reviewed." },
      { title: "Plan", body: "Milestones, teams and procurement dependencies are sequenced." },
      { title: "Control", body: "Site progress, issues and handover priorities are tracked." }
    ]
  },
  {
    slug: "real-estate-service",
    href: "/real-estate-service",
    eyebrow: "Commercial Services / Real Estate",
    title: "Real Estate Service",
    summary:
      "Real estate service support for asset positioning, development readiness, investor material and property presentation.",
    image: "/services/showcase-real-estate.webp",
    imageAlt: "Premium real estate service for asset positioning",
    relatedDivision: "Real Estate Division",
    metrics: [
      { label: "Service Type", value: "Advisory" },
      { label: "Output", value: "Positioning" },
      { label: "Route", value: "Service" }
    ],
    capabilities: [
      {
        title: "Asset positioning",
        body: "Clarify buyer logic, value story, location strengths and market-facing presentation."
      },
      {
        title: "Development readiness",
        body: "Connect property opportunity with planning, design and delivery considerations."
      },
      {
        title: "Investor material",
        body: "Prepare concise narratives, visuals and service inputs for serious property conversations."
      }
    ],
    workflow: [
      { title: "Intake", body: "Property type, location, status and commercial objectives are collected." },
      { title: "Frame", body: "Positioning, readiness and presentation needs are structured." },
      { title: "Prepare", body: "Investor-facing and decision-facing service material is organized." }
    ]
  },
  {
    slug: "import-export-service",
    href: "/import-export-service",
    eyebrow: "Commercial Services / Import & Export",
    title: "Import & Export Service",
    summary:
      "Import and export service support for trade requirements, supplier networks, document readiness and cross-border movement.",
    image: "/services/showcase-import-export.webp",
    imageAlt: "Import and export service for international trade support",
    relatedDivision: "Import & Export Division",
    metrics: [
      { label: "Service Type", value: "Trade" },
      { label: "Output", value: "Movement" },
      { label: "Route", value: "Service" }
    ],
    capabilities: [
      {
        title: "Trade requirement mapping",
        body: "Clarify shipment profile, product category, origin, destination, timeline and commercial expectations."
      },
      {
        title: "Supplier coordination",
        body: "Align vendors, readiness signals and operational dependencies before movement."
      },
      {
        title: "Document readiness",
        body: "Organize the service-side document checklist and communication rhythm for cross-border work."
      }
    ],
    workflow: [
      { title: "Map", body: "Trade route, shipment profile and timing are defined." },
      { title: "Coordinate", body: "Supplier, transport and document dependencies are aligned." },
      { title: "Report", body: "Movement status and next actions are communicated clearly." }
    ]
  },
  {
    slug: "otc-exchange-service",
    href: "/otc-exchange-service",
    eyebrow: "Commercial Services / OTC Exchange",
    title: "OTC Exchange Service",
    summary:
      "OTC exchange service support for private counterparty intake, documentation routing and transaction-readiness workflows.",
    image: "/services/showcase-otc-exchange.webp",
    imageAlt: "OTC exchange service for private transaction coordination",
    relatedDivision: "OTC Exchange Division",
    metrics: [
      { label: "Service Type", value: "Private" },
      { label: "Output", value: "Readiness" },
      { label: "Route", value: "Service" }
    ],
    capabilities: [
      {
        title: "Counterparty intake",
        body: "Capture requirement context, mandate sensitivity and suitability signals for private conversations."
      },
      {
        title: "Documentation routing",
        body: "Structure the information path needed before serious counterparty review."
      },
      {
        title: "Transaction readiness",
        body: "Prepare a disciplined service workflow for qualified private-market discussions."
      }
    ],
    workflow: [
      { title: "Qualify", body: "Initial context, requirement and suitability boundaries are reviewed." },
      { title: "Structure", body: "Documentation and counterparty communication needs are organized." },
      { title: "Coordinate", body: "Next steps move through a controlled service workflow." }
    ]
  }
];

export const commercialServiceRoutes = commercialServicePages.map((service) => service.href);

export function getCommercialServicePage(slug: string) {
  return commercialServicePages.find((service) => service.slug === slug);
}
