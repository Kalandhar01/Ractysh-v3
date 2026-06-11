export type ServiceVisualKey =
  | "architecture"
  | "interior"
  | "landscape"
  | "visualization"
  | "turnkey"
  | "structural"
  | "management"
  | "demo"
  | "trade";

export interface ServiceCapability {
  title: string;
  body: string;
}

export interface ServiceWorkflowStep {
  label: string;
  title: string;
  body: string;
}

export interface ServiceMetric {
  label: string;
  value: string;
}

export interface PremiumServicePageData {
  slug: string;
  href: string;
  category: "Design Studio" | "Build Delivery" | "Enterprise";
  eyebrow: string;
  title: string;
  titleLines: string[];
  summary: string;
  heroStatement: string;
  visualKey: ServiceVisualKey;
  visualTitle: string;
  visualSubtitle: string;
  visualNodes: string[];
  metrics: ServiceMetric[];
  capabilities: ServiceCapability[];
  workflow: ServiceWorkflowStep[];
  ctaTitle: string;
  ctaBody: string;
}

export const servicePages: PremiumServicePageData[] = [
  {
    slug: "architecture-design",
    href: "/architecture-design",
    category: "Design Studio",
    eyebrow: "Architecture Design",
    title: "Architectural intelligence for premium enterprise spaces.",
    titleLines: ["Architectural", "intelligence for", "enterprise spaces."],
    summary:
      "Concept architecture, spatial planning and decision-grade documentation for premium residential, commercial and mixed-use projects.",
    heroStatement: "Spatial strategy, facade language and planning logic unified into one premium design operating layer.",
    visualKey: "architecture",
    visualTitle: "Spatial Core",
    visualSubtitle: "Blueprint, massing and facade logic synchronized",
    visualNodes: ["Blueprint grid", "Massing model", "Facade system", "Site logic"],
    metrics: [
      { label: "Design Layers", value: "18+" },
      { label: "Planning Mode", value: "BIM-ready" },
      { label: "Review Cycle", value: "Guided" }
    ],
    capabilities: [
      {
        title: "Concept architecture",
        body: "Premium concept systems that align site context, client ambition, utility and buildability from the first review."
      },
      {
        title: "Master planning",
        body: "Controlled spatial zoning, circulation, massing and phase logic for residential, commercial and mixed-use programs."
      },
      {
        title: "Facade direction",
        body: "Architectural identity, proportion systems and exterior language designed for lasting enterprise-grade presence."
      },
      {
        title: "Execution documentation",
        body: "Clear drawing packs, consultant coordination and approval-ready visual information for downstream delivery."
      }
    ],
    workflow: [
      { label: "01", title: "Brief intelligence", body: "Business goals, site constraints, lifestyle needs and approval priorities are mapped into a design mandate." },
      { label: "02", title: "Spatial strategy", body: "Planning grids, circulation and zoning are converted into a premium architectural direction." },
      { label: "03", title: "Design development", body: "Form, material, facade and documentation layers are refined with technical clarity." },
      { label: "04", title: "Execution handoff", body: "Drawing packages and review systems prepare the project for confident construction coordination." }
    ],
    ctaTitle: "Start Your Architectural Workflow",
    ctaBody: "Move from requirement brief to premium spatial strategy with Ractysh Design."
  },
  {
    slug: "interior-design",
    href: "/interior-design",
    category: "Design Studio",
    eyebrow: "Interior Design",
    title: "Luxury interiors engineered for daily performance.",
    titleLines: ["Luxury interiors", "engineered for", "daily performance."],
    summary:
      "Interior systems that combine material intelligence, lighting logic, furniture planning and execution documentation.",
    heroStatement: "A premium interior operating system for spaces that need atmosphere, clarity and exacting finish control.",
    visualKey: "interior",
    visualTitle: "Material Flow",
    visualSubtitle: "Lighting, finishes and spatial moodboards aligned",
    visualNodes: ["Lighting", "Materials", "Furniture", "Finish control"],
    metrics: [
      { label: "Finish System", value: "Luxury" },
      { label: "Zone Logic", value: "Custom" },
      { label: "Handoff", value: "Detailed" }
    ],
    capabilities: [
      {
        title: "Material direction",
        body: "Curated palettes, finishes, textures and surface systems designed for premium visual continuity."
      },
      {
        title: "Lighting strategy",
        body: "Layered lighting plans that shape atmosphere, function, display and evening experience."
      },
      {
        title: "Furniture systems",
        body: "Spatially coordinated furniture, joinery and object placement for comfort, flow and precision."
      },
      {
        title: "Execution drawings",
        body: "Interior documentation and finish schedules that reduce ambiguity during procurement and site delivery."
      }
    ],
    workflow: [
      { label: "01", title: "Lifestyle and use mapping", body: "Rooms, routines, brand cues and finish expectations are translated into a clear interior brief." },
      { label: "02", title: "Mood and material system", body: "Lighting, texture, color and surface strategy establish the cinematic interior direction." },
      { label: "03", title: "Detail coordination", body: "Furniture, joinery, electrical points, ceiling and finish details are synchronized." },
      { label: "04", title: "Premium finish control", body: "Execution packs, procurement notes and review rhythm keep the final space controlled." }
    ],
    ctaTitle: "Start Your Interior Workflow",
    ctaBody: "Create a refined interior experience with material, lighting and execution clarity."
  },
  {
    slug: "landscape-planning",
    href: "/landscape-planning",
    category: "Design Studio",
    eyebrow: "Landscape Planning",
    title: "Environmental terrain planning for premium developments.",
    titleLines: ["Environmental", "terrain planning for", "premium developments."],
    summary:
      "Outdoor planning, terrain logic and ecosystem layering for villas, campuses, hospitality and mixed-use environments.",
    heroStatement: "Site ecology, movement and premium outdoor experience designed as one coordinated landscape system.",
    visualKey: "landscape",
    visualTitle: "Terrain System",
    visualSubtitle: "Ecology, circulation and outdoor layers coordinated",
    visualNodes: ["Terrain", "Canopy", "Pathways", "Water logic"],
    metrics: [
      { label: "Outdoor Layers", value: "12+" },
      { label: "Site Flow", value: "Mapped" },
      { label: "Ecosystem", value: "Active" }
    ],
    capabilities: [
      {
        title: "Site planning",
        body: "Movement, entry, service access, landscape hierarchy and outdoor program zones planned together."
      },
      {
        title: "Terrain logic",
        body: "Levels, drainage intent, view corridors and outdoor comfort translated into spatial terrain systems."
      },
      {
        title: "Planting direction",
        body: "Premium landscape palettes built around climate, maintenance, privacy, identity and long-term experience."
      },
      {
        title: "Outdoor experience",
        body: "Pathways, lighting, seating, water features and landscape focal points shaped into a memorable sequence."
      }
    ],
    workflow: [
      { label: "01", title: "Site reading", body: "Topography, views, access, utilities and climate behavior are studied as the base layer." },
      { label: "02", title: "Experience zoning", body: "Arrival, leisure, service, privacy and circulation zones are arranged with architectural logic." },
      { label: "03", title: "Landscape layering", body: "Planting, hardscape, lighting, water and furniture systems are coordinated." },
      { label: "04", title: "Implementation map", body: "The landscape vision becomes a practical plan for sourcing, sequencing and site execution." }
    ],
    ctaTitle: "Start Your Landscape Workflow",
    ctaBody: "Turn site potential into a premium outdoor experience with structured planning."
  },
  {
    slug: "3d-visualization",
    href: "/3d-visualization",
    category: "Design Studio",
    eyebrow: "3D Visualization",
    title: "Cinematic visualization for confident decisions.",
    titleLines: ["Cinematic", "visualization for", "confident decisions."],
    summary:
      "Photorealistic rendering, walkthrough-ready presentation systems and visual decision tools for architecture and interiors.",
    heroStatement: "A holographic presentation layer that helps clients see, approve and align before execution begins.",
    visualKey: "visualization",
    visualTitle: "Render Pipeline",
    visualSubtitle: "Scene, material and lighting passes in live review",
    visualNodes: ["Scene model", "Lighting pass", "Materials", "Client view"],
    metrics: [
      { label: "Render Mode", value: "Cinematic" },
      { label: "Review Layer", value: "Live" },
      { label: "Visual Output", value: "4K-ready" }
    ],
    capabilities: [
      {
        title: "Photorealistic renders",
        body: "Premium still images that communicate atmosphere, scale, material and design intent clearly."
      },
      {
        title: "Walkthrough planning",
        body: "Camera paths, sequence logic and visual storytelling for client presentations and approvals."
      },
      {
        title: "Material studies",
        body: "Finish options and lighting conditions visualized before procurement or execution commitment."
      },
      {
        title: "Presentation systems",
        body: "Decision-grade visuals packaged for founders, investors, families, boards and project stakeholders."
      }
    ],
    workflow: [
      { label: "01", title: "Model intake", body: "Plans, references, mood direction and design priorities are converted into a visual brief." },
      { label: "02", title: "Scene assembly", body: "Geometry, materials, lighting and camera language are built into a cinematic visual system." },
      { label: "03", title: "Review cycles", body: "Key views and details are refined through controlled feedback rounds." },
      { label: "04", title: "Final presentation", body: "Approved visuals are prepared for stakeholder presentation and execution alignment." }
    ],
    ctaTitle: "Start Your Visualization Workflow",
    ctaBody: "Bring your design into focus with cinematic rendering and decision-grade presentation."
  },
  {
    slug: "turnkey-projects",
    href: "/turnkey-projects",
    category: "Build Delivery",
    eyebrow: "Turnkey Projects",
    title: "End-to-end project execution with one accountable system.",
    titleLines: ["End-to-end", "execution with one", "accountable system."],
    summary:
      "Turnkey delivery from brief, design and sourcing through construction, finishing, handover and documentation.",
    heroStatement: "A single accountable execution layer for premium clients who need control, speed and finish quality.",
    visualKey: "turnkey",
    visualTitle: "Delivery Console",
    visualSubtitle: "Milestones, sourcing and handover synchronized",
    visualNodes: ["Brief", "Procure", "Build", "Handover"],
    metrics: [
      { label: "Owner Model", value: "Single" },
      { label: "Milestones", value: "Tracked" },
      { label: "Delivery", value: "End-to-end" }
    ],
    capabilities: [
      {
        title: "Single accountability",
        body: "One coordinated responsibility layer across design, procurement, execution, finishing and handover."
      },
      {
        title: "Budget visibility",
        body: "Cost lanes, scope decisions and vendor dependencies presented with operational clarity."
      },
      {
        title: "Vendor coordination",
        body: "Procurement, specialist teams and site execution synchronized through a controlled delivery rhythm."
      },
      {
        title: "Handover systems",
        body: "Final delivery, snag tracking, documentation and client transition handled with premium discipline."
      }
    ],
    workflow: [
      { label: "01", title: "Scope lock", body: "Brief, deliverables, finish expectations and budget boundaries are established upfront." },
      { label: "02", title: "Execution planning", body: "Milestones, vendors, procurement dependencies and approval windows are sequenced." },
      { label: "03", title: "Site delivery", body: "Workstreams are monitored with quality checks, issue tracking and progress visibility." },
      { label: "04", title: "Premium handover", body: "Final finish, documentation and transition are completed through one accountable process." }
    ],
    ctaTitle: "Start Your Turnkey Workflow",
    ctaBody: "Move from brief to handover with one premium delivery system."
  },
  {
    slug: "structural-work",
    href: "/structural-work",
    category: "Build Delivery",
    eyebrow: "Structural Work",
    title: "Engineering structure with architectural discipline.",
    titleLines: ["Engineering", "structure with", "architectural discipline."],
    summary:
      "Structural work, civil coordination, PEB alignment and technical delivery for premium construction programs.",
    heroStatement: "A structural execution layer that connects engineering intent with site realities and premium finish goals.",
    visualKey: "structural",
    visualTitle: "Structural Grid",
    visualSubtitle: "Beams, grids and site logic in coordinated motion",
    visualNodes: ["Grid", "Beam", "Load path", "QA layer"],
    metrics: [
      { label: "Structure", value: "Mapped" },
      { label: "QA Points", value: "Multi" },
      { label: "Coordination", value: "Live" }
    ],
    capabilities: [
      {
        title: "Civil coordination",
        body: "Site execution, structural sequencing and technical workstreams handled with practical discipline."
      },
      {
        title: "PEB and framing",
        body: "Pre-engineered building, framing and support systems coordinated with delivery priorities."
      },
      {
        title: "MEP integration",
        body: "Structural and service interfaces reviewed early to reduce clashes and site rework."
      },
      {
        title: "Quality checkpoints",
        body: "Inspection, reporting and correction loops structured around clear technical accountability."
      }
    ],
    workflow: [
      { label: "01", title: "Technical mapping", body: "Drawings, site constraints and structural dependencies are reviewed before mobilization." },
      { label: "02", title: "Sequence planning", body: "Structural activities, materials and specialist teams are organized into a delivery plan." },
      { label: "03", title: "Execution control", body: "Site activity is monitored through quality checks, engineering alignment and issue routing." },
      { label: "04", title: "Documentation close", body: "Completion notes, corrections and handover information are organized for client clarity." }
    ],
    ctaTitle: "Start Your Structural Workflow",
    ctaBody: "Coordinate structural delivery with technical discipline and premium execution control."
  },
  {
    slug: "project-management",
    href: "/project-management",
    category: "Build Delivery",
    eyebrow: "Project Management",
    title: "Live workflow control for complex delivery.",
    titleLines: ["Live workflow", "control for complex", "delivery."],
    summary:
      "Project governance, milestone tracking, reporting rhythm and stakeholder coordination for premium enterprise execution.",
    heroStatement: "Operational sync for teams, vendors and clients who need every moving part visible and accountable.",
    visualKey: "management",
    visualTitle: "Workflow Control",
    visualSubtitle: "Approvals, dependencies and delivery lanes synchronized",
    visualNodes: ["Approvals", "Milestones", "Vendors", "Reports"],
    metrics: [
      { label: "Workflow", value: "Live" },
      { label: "Reporting", value: "Weekly" },
      { label: "Risk Layer", value: "Active" }
    ],
    capabilities: [
      {
        title: "Milestone tracking",
        body: "Program stages, dependencies and delivery checkpoints tracked through a clear operating rhythm."
      },
      {
        title: "Stakeholder updates",
        body: "Client, vendor and internal communication handled through premium reporting and review systems."
      },
      {
        title: "Issue routing",
        body: "Risks, blockers and decisions routed quickly to preserve momentum and accountability."
      },
      {
        title: "Execution governance",
        body: "Quality, schedule, budget and scope monitored as one coordinated enterprise workflow."
      }
    ],
    workflow: [
      { label: "01", title: "Program setup", body: "Scope, teams, milestones and communication protocol are structured before execution begins." },
      { label: "02", title: "Control rhythm", body: "Reviews, approvals, reporting and dependency checks are scheduled into a repeatable cadence." },
      { label: "03", title: "Live coordination", body: "Tasks, vendors, risks and decisions are monitored through active workflow control." },
      { label: "04", title: "Executive reporting", body: "Progress, next actions and completion status are communicated with premium clarity." }
    ],
    ctaTitle: "Start Your Management Workflow",
    ctaBody: "Bring premium control and reporting discipline to complex enterprise delivery."
  },
  {
    slug: "book-demo",
    href: "/book-demo",
    category: "Enterprise",
    eyebrow: "Book Demo",
    title: "Enterprise onboarding designed like a premium intake system.",
    titleLines: ["Enterprise", "onboarding designed", "for clarity."],
    summary:
      "A structured demo and consultation intake experience for clients exploring Architecture, Construction, Real Estate, Export-Import, OTC Exchange or enterprise planning.",
    heroStatement: "Turn early interest into a guided enterprise workflow with clear priorities, routing and next steps.",
    visualKey: "demo",
    visualTitle: "Intake System",
    visualSubtitle: "Requirement capture, routing and onboarding signals",
    visualNodes: ["Intake", "Classify", "Route", "Demo"],
    metrics: [
      { label: "Routing", value: "Guided" },
      { label: "Priority", value: "Mapped" },
      { label: "Next Step", value: "Clear" }
    ],
    capabilities: [
      {
        title: "Guided requirement capture",
        body: "Service interest, timeline, scope and decision context are structured before the first meeting."
      },
      {
        title: "Enterprise routing",
        body: "Requests are mapped to the right Ractysh operating layer across Architecture, Construction, Real Estate, Trade, OTC Exchange and enterprise services."
      },
      {
        title: "Consultation preparation",
        body: "The demo conversation begins with context, priorities and practical next steps already clear."
      },
      {
        title: "Follow-up clarity",
        body: "Clients leave with a structured direction instead of a generic inquiry response."
      }
    ],
    workflow: [
      { label: "01", title: "Request submitted", body: "The client shares service interest, timeline, location and primary objective." },
      { label: "02", title: "Internal review", body: "The requirement is classified across Architecture, Construction, Real Estate, Export-Import, OTC Exchange or enterprise coordination." },
      { label: "03", title: "Demo prepared", body: "Relevant context and meeting direction are prepared for a useful premium conversation." },
      { label: "04", title: "Next action issued", body: "The workflow moves into proposal, discovery, advisory or project planning." }
    ],
    ctaTitle: "Start Your Enterprise Workflow",
    ctaBody: "Book a premium intake and let Ractysh route your requirement intelligently."
  },
  {
    slug: "import-export-service",
    href: "/import-export-service",
    category: "Enterprise",
    eyebrow: "Import & Export Service",
    title: "Enterprise-grade import, export and international business support.",
    titleLines: ["Import, export", "and trade support", "for modern business."],
    summary:
      "Enterprise-grade import, export and international business support for modern commercial ecosystems.",
    heroStatement: "Import, export and enterprise trade support systems designed for modern commercial operations.",
    visualKey: "trade",
    visualTitle: "Global Route Map",
    visualSubtitle: "Supplier lanes, documentation and cross-border commerce paths connected",
    visualNodes: ["Supplier lanes", "Ports", "Freight lanes", "Documents"],
    metrics: [
      { label: "Trade Network", value: "Global" },
      { label: "Trade Support", value: "Coordinated" },
      { label: "Commerce Layer", value: "Cross-border" }
    ],
    capabilities: [
      {
        title: "International Business Support",
        body: "Commercial teams, vendors and supplier networks aligned around cross-border commerce requirements."
      },
      {
        title: "International Trade Support",
        body: "Supplier lanes, dispatch windows and movement updates structured for enterprise visibility."
      },
      {
        title: "Enterprise Supply Network",
        body: "Supplier readiness, documentation and delivery dependencies mapped into one operating layer."
      },
      {
        title: "Cross-Border Commerce",
        body: "Import and export workflows organized for modern commercial operations across regions."
      }
    ],
    workflow: [
      { label: "01", title: "Trade requirement mapping", body: "Commodity, shipment profile, destination, timing and commercial priorities are defined clearly." },
      { label: "02", title: "Partner and supplier alignment", body: "Suppliers, transport lanes and trade expectations are reviewed with disciplined coordination." },
      { label: "03", title: "Documentation control", body: "Trade documents, certificates and operational checkpoints are prepared before critical movement windows." },
      { label: "04", title: "Trade support", body: "Shipment movement, status reporting and handover dependencies are managed through one enterprise trade layer." }
    ],
    ctaTitle: "Start Your Trade Workflow",
    ctaBody: "Coordinate import, export and international trade requirements through one premium enterprise layer."
  }
];

export const servicePageRoutes = servicePages.map((service) => service.href);

export function getServicePage(slug: string) {
  return servicePages.find((service) => service.slug === slug);
}
