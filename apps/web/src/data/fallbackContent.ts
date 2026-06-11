import type { SiteContent } from "@/lib/types";

export const fallbackContent: SiteContent = {
  seo: {
    title: "Ractysh Group | Five-Pillar Private Enterprise Ecosystem",
    description:
      "Ractysh Group unifies Architecture, Construction, Real Estate, Export & Import and OTC Exchange through one premium enterprise operating ecosystem.",
    keywords: [
      "Ractysh Group",
      "Private Enterprise Group",
      "Architecture Division",
      "Construction Division",
      "Real Estate Division",
      "Enterprise Ecosystem",
      "Architectural Design",
      "Construction Management",
      "Interior Design",
      "Turnkey Projects",
      "Export & Import",
      "Cross-Border Commerce",
      "International Trade Support",
      "OTC Exchange"
    ],
    ogImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=82",
    canonicalUrl: "https://ractysh.com"
  },
  theme: {
    mode: "dark",
    accent: "#D6B45F"
  },
  nav: {
    logoText: "Ractysh",
    items: [
      { label: "Ecosystem", href: "/#features" },
      { label: "Services", href: "/services" },
      { label: "Our Work", href: "/our-projects" },
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Book Consultation", href: "/book-consultation" },
      { label: "Contact", href: "/contact" },
      { label: "Founder", href: "/founder" }
    ]
  },
  hero: {
    eyebrow: "Ractysh Group Enterprise Ecosystem",
    headline: "Architecture, Construction, Real Estate, Trade and OTC Exchange through one ecosystem",
    subheadline:
      "Ractysh Group operates across Architecture, Construction, Real Estate, Export & Import and OTC Exchange through one premium operating layer.",
    primaryCta: "Book Consultation",
    secondaryCta: "Know More",
    trustLine: "Built for premium clients who need clarity, discretion and accountable delivery."
  },
  divisions: [
    {
      id: "architecture",
      name: "Architecture",
      legalName: "Ractysh Architecture Division",
      summary:
        "Spatial intelligence, architecture, interiors and visualization for premium residential, commercial and mixed-use programs.",
      services: [
        "Architecture",
        "Interior Design",
        "Landscape Design",
        "3D Visualization",
        "Urban Planning",
        "Structural Design",
        "MEP Design",
        "Design Documentation"
      ],
      metric: "Spatial intelligence"
    },
    {
      id: "construction",
      name: "Construction",
      legalName: "Ractysh Construction Division",
      summary:
        "Execution-first construction division delivering civil works, structural coordination, MEP, renovation and turnkey projects.",
      services: [
        "Construction",
        "Interior Works",
        "Renovation",
        "PEB Structural Work",
        "Electrical & Plumbing",
        "Painting Work",
        "Material Sourcing",
        "Turnkey Projects"
      ],
      metric: "Project delivery"
    },
    {
      id: "real-estate",
      name: "Real Estate",
      legalName: "Ractysh Real Estate Division",
      summary:
        "Asset positioning, development advisory, sales readiness and investor presentation for premium property opportunities.",
      services: ["Asset Positioning", "Development Advisory", "Sales Readiness", "Leasing Strategy", "Investor Presentation"],
      metric: "Asset strategy"
    },
    {
      id: "import-export",
      name: "Export & Import",
      legalName: "Ractysh Import & Export Pvt Ltd",
      summary:
        "Global export, import and enterprise trade support systems designed for modern commercial operations.",
      services: ["Export & Import Operations", "International Business Support", "Supplier Network Management", "Cross-Border Commerce"],
      metric: "Global trade"
    },
    {
      id: "otc-exchange",
      name: "OTC Exchange",
      legalName: "Ractysh OTC Exchange Division",
      summary:
        "Private counterparty coordination, deal-room documentation and settlement-readiness workflows for qualified OTC opportunities.",
      services: ["Private Counterparty Intake", "Deal-Room Coordination", "Documentation Workflow", "Transaction Readiness"],
      metric: "Private exchange"
    }
  ],
  services: [
    {
      title: "Export & Import",
      description: "Enterprise-grade export, import and international business support for modern business ecosystems.",
      company: "Ractysh Import & Export",
      tags: ["Global Trade", "Trade Documentation", "Supplier Network"]
    },
    {
      title: "Signature Architecture",
      description: "Premium residential, commercial and mixed-use design systems with enterprise documentation.",
      company: "Ractysh Design",
      tags: ["Architecture", "Planning"]
    },
    {
      title: "Real Estate Asset Strategy",
      description: "Asset positioning, development advisory, investor presentation and sales readiness for premium property programs.",
      company: "Ractysh Real Estate",
      tags: ["Real Estate", "Asset Strategy", "Development"]
    },
    {
      title: "Construction Delivery",
      description: "Construction, interiors, MEP, sourcing and finishing handled through one accountable channel.",
      company: "Ractysh Construction",
      tags: ["Construction", "Execution"]
    },
    {
      title: "Design Visualization",
      description: "Photorealistic 3D renders, walkthrough-ready concepts and decision-grade presentation outputs.",
      company: "Ractysh Design",
      tags: ["3D", "Rendering"]
    },
    {
      title: "Premium Renovation",
      description: "High-control renovation and interiors for clients who expect speed, finish and discretion.",
      company: "Ractysh Construction",
      tags: ["Renovation", "Interiors"]
    },
    {
      title: "International Business Support",
      description: "Cross-border commerce, market access and supplier network support handled through one enterprise layer.",
      company: "Ractysh Import & Export",
      tags: ["Cross-Border Commerce", "Supplier Network"]
    },
    {
      title: "OTC Exchange Coordination",
      description: "Private counterparty intake, deal-room documentation and transaction-readiness workflow for qualified OTC opportunities.",
      company: "Ractysh OTC Exchange",
      tags: ["OTC Exchange", "Private Deals", "Counterparty Workflow"]
    }
  ],
  projects: [
    {
      title: "Cross-Border Commerce Suite",
      category: "Export & Import Operations",
      location: "Global",
      summary: "A structured operating environment for supplier networks, cross-border commerce and trade documentation.",
      year: "2026"
    },
    {
      title: "Luxury Villa Design System",
      category: "Architecture",
      location: "Coimbatore • Palani • Dindigul",
      summary: "Architecture, interiors, landscape and visualization unified into one premium design language.",
      year: "2026"
    },
    {
      title: "Turnkey Commercial Interior",
      category: "Construction",
      location: "India",
      summary: "End-to-end construction, MEP, furnishing and premium finish delivery.",
      year: "2025"
    },
    {
      title: "Premium Asset Positioning Mandate",
      category: "Real Estate",
      location: "India",
      summary: "Development story, investor material and launch readiness structured for a premium property opportunity.",
      year: "2026"
    },
    {
      title: "Private Counterparty Workflow",
      category: "OTC Exchange",
      location: "Private",
      summary: "A controlled intake and documentation flow for qualified private transaction conversations.",
      year: "2026"
    }
  ],
  stats: [
    { label: "Business verticals", value: 5, suffix: "" },
    { label: "Service capabilities", value: 32, suffix: "+" },
    { label: "Enterprise workflows", value: 20, suffix: "+" },
    { label: "Unified delivery model", value: 1, suffix: "" }
  ],
  testimonials: [
    {
      quote: "Ractysh brings the rare combination of discretion, design taste and operational seriousness.",
      name: "Private Client",
      role: "Real estate investor"
    },
    {
      quote: "The group structure makes it easier to move from concept to execution without losing accountability.",
      name: "Development Partner",
      role: "Commercial project owner"
    },
    {
      quote: "The experience feels premium because the process is controlled, clear and fast.",
      name: "Institutional Associate",
      role: "Strategic client"
    }
  ],
  blogs: [],
  founder: {
    name: "Fawas",
    role: "Chairman & Founder",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=84",
    heroImage:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1600&q=82",
    shortArticle:
      "Ractysh was created to bring serious enterprise discipline to Architecture, Construction, Real Estate, Global Trade and Private Exchange coordination. The group is built around trust, documentation and accountable delivery.",
    biography:
      "The Founder and Chairman leads Ractysh Group with a cross-sector view of architectural design, construction systems, real estate positioning, international trade and private transaction coordination. The leadership approach combines premium client service with operational controls normally expected in institutional environments.",
    vision:
      "To build a globally respected five-pillar enterprise ecosystem where Architecture, Construction, Real Estate, Trade and Private Exchange operations move with clarity, dignity and measurable trust.",
    mission:
      "To give premium clients one accountable platform for Architecture, Construction, Real Estate, Export-Import operations and OTC Exchange coordination.",
    resumeSummary:
      "Leadership focus across enterprise operations, spatial strategy, construction delivery, real estate positioning, international business support, private exchange workflow and premium client advisory.",
    achievements: [
      "Structured Ractysh as a multi-division enterprise ecosystem.",
      "Built service capabilities across Architecture, Construction, Real Estate, Export-Import operations and OTC Exchange coordination.",
      "Established a premium operating model focused on privacy, quality and accountability.",
      "Created a unified brand direction for technical, architectural and global commercial services."
    ],
    timeline: [
      {
        year: "2023",
        title: "Enterprise foundation",
        description: "Defined the Ractysh group structure and premium multi-division operating model."
      },
      {
        year: "2024",
        title: "Design and construction expansion",
        description: "Expanded capabilities into architecture, interiors, construction and turnkey project coordination."
      },
      {
        year: "2025",
        title: "Export-import and real estate operations",
        description: "Formalized international business support, supplier network management, property positioning and development advisory workflows for premium clients."
      },
      {
        year: "2026",
        title: "Five-pillar enterprise platform",
        description: "Unified the public brand, consultation desk and investor-ready web presence across Architecture, Construction, Real Estate, Export & Import and OTC Exchange."
      }
    ],
    certifications: [
      { title: "Trademark Registration", issuer: "Government authority", year: "2026", fileUrl: "/trademark-certificate.pdf" },
      { title: "Enterprise Operations Charter", issuer: "Ractysh Group", year: "2026" }
    ],
    awards: ["Enterprise ecosystem builder", "Premium client operations leadership", "Design and construction strategy"],
    socialLinks: [
      { label: "LinkedIn", href: "https://www.linkedin.com" },
      { label: "Email", href: "mailto:noorulsmart1998@gmail.com" }
    ],
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=82",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=82",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=82"
    ]
  },
  directors: [
    {
      name: "Executive Director",
      position: "Director - Construction Delivery",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=84",
      experience: "10+ years across construction coordination, vendor management and site execution.",
      biography:
        "Leads construction programs with a focus on schedule clarity, safety discipline, quality control and practical execution governance.",
      leadershipStatement:
        "Premium construction is earned through daily discipline, transparent reporting and respect for every technical detail.",
      socialLinks: [{ label: "LinkedIn", href: "https://www.linkedin.com" }]
    },
    {
      name: "Design Director",
      position: "Director - Architecture & Interiors",
      image:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=84",
      experience: "12+ years in spatial planning, interior systems, visualization and client presentation.",
      biography:
        "Guides the design studio across concept, documentation, visualization, material direction and premium client reviews.",
      leadershipStatement:
        "Great design should feel effortless for the client because the thinking behind it is deeply controlled.",
      socialLinks: [{ label: "LinkedIn", href: "https://www.linkedin.com" }]
    },
    {
      name: "Operations Director",
      position: "Director - Enterprise Operations",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=84",
      experience: "8+ years in enterprise coordination, customer experience and operating systems.",
      biography:
        "Connects business divisions, demo requests, client communications and internal execution dashboards.",
      leadershipStatement:
        "Trust grows when clients can see the process, the owner and the next step without asking twice.",
      socialLinks: [{ label: "Email", href: "mailto:noorulsmart1998@gmail.com" }]
    }
  ],
  businessDivisions: [
    {
      id: "architecture",
      title: "Architecture Division",
      eyebrow: "Ractysh Architecture",
      description:
        "Master planning, facade language, 3D visualization, interiors and BIM-ready documentation for premium residential and commercial spaces.",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=84",
      href: "/architecture",
      cta: "Explore Architecture",
      metrics: [
        { label: "Design layers", value: "18+" },
        { label: "Visualization", value: "3D" }
      ],
      highlights: ["Master planning", "3D visualization", "Interior systems", "BIM coordination"]
    },
    {
      id: "construction",
      title: "Construction Division",
      eyebrow: "Ractysh Construction",
      description:
        "Execution-first construction systems for civil works, structural delivery, MEP coordination and turnkey project governance.",
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=84",
      href: "/construction",
      cta: "Plan Construction",
      metrics: [
        { label: "Site control", value: "Live" },
        { label: "QA checkpoints", value: "Multi" }
      ],
      highlights: ["Site execution", "Structural delivery", "MEP tracking", "Turnkey reporting"]
    },
    {
      id: "real-estate",
      title: "Real Estate Division",
      eyebrow: "Ractysh Real Estate",
      description:
        "Asset positioning, development advisory, investor presentation and sales readiness for premium property opportunities.",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=84",
      href: "/real-estate",
      cta: "Explore Real Estate",
      metrics: [
        { label: "Asset view", value: "360" },
        { label: "Market layer", value: "Premium" }
      ],
      highlights: ["Asset positioning", "Development advisory", "Sales readiness", "Investor presentation"]
    },
    {
      id: "import-export",
      title: "Export & Import Division",
      eyebrow: "Ractysh Import & Export",
      description:
        "Global export, import and enterprise trade support systems designed for modern commercial operations.",
      image:
        "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1400&q=84",
      href: "/import-export",
      cta: "Explore Trade",
      metrics: [
        { label: "Trade network", value: "Global" },
        { label: "Trade Support", value: "Coordinated" }
      ],
      highlights: ["International business support", "Supplier lane systems", "Market access", "International trade support"]
    },
    {
      id: "otc-exchange",
      title: "OTC Exchange Division",
      eyebrow: "Ractysh OTC Exchange",
      description:
        "Private counterparty coordination, deal-room documentation and transaction-readiness workflows for qualified OTC opportunities.",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=84",
      href: "/otc-exchange",
      cta: "Explore OTC",
      metrics: [
        { label: "Counterparty", value: "Qualified" },
        { label: "Workflow", value: "Private" }
      ],
      highlights: ["Private intake", "Deal-room coordination", "Documentation workflow", "Transaction readiness"]
    }
  ],
  locations: [
    {
      name: "Ractysh Group Locations",
      address: "Coimbatore • Palani • Dindigul",
      outlookLocation: "Coimbatore • Palani • Dindigul",
      phone: "+91 9080844114",
      email: "noorulsmart1998@gmail.com",
      hours: "Monday to Saturday, 10:00 AM - 6:30 PM",
      mapEmbedUrl:
        "https://www.google.com/maps?q=Coimbatore%20Palani%20Dindigul&output=embed"
    }
  ],
  legal: {
    trademarkNotice: "Ractysh™ is a Registered Trademark Company.",
    certificateTitle: "Ractysh Trademark Registration Certificate",
    certificateUrl: "/trademark-certificate.pdf",
    certificatePreviewUrl:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=82",
    documents: [
      {
        slug: "privacy-policy",
        title: "Privacy Policy",
        summary: "How Ractysh collects, protects and uses website and demo information.",
        body:
          "Ractysh Group respects client privacy. Information submitted through forms, demo requests, subscriptions or feedback channels is used only for business communication, service evaluation, compliance review and client support. We do not sell private client information.",
        updatedAt: "2026-05-14"
      },
      {
        slug: "terms-and-conditions",
        title: "Terms & Conditions",
        summary: "Website use, demo scope, content ownership and business communication terms.",
        body:
          "By using this website, visitors agree that published information is for general business communication and does not create a binding engagement until a written agreement is executed. Ractysh may update services, content and policies as business requirements evolve.",
        updatedAt: "2026-05-14"
      },
      {
        slug: "disclosure",
        title: "Disclosure",
      summary: "Important business, financial, design and project disclosure notes.",
      body:
          "Construction, Real Estate, Export-Import and OTC Exchange discussions may involve risk, regulation, timelines, counterparty suitability and third-party dependencies. Ractysh provides structured business workflows and does not present website content as legal, tax, investment, financial or engineering advice.",
        updatedAt: "2026-05-14"
      },
      {
        slug: "copyright-policy",
      title: "Copyright Policy",
        summary: "Ownership and permitted use of Ractysh brand, copy, visuals and presentation systems.",
        body:
          "All brand marks, website copy, design compositions, graphics, dashboards and presentation systems are owned by Ractysh Group unless otherwise stated. Unauthorized copying, resale or misleading use is prohibited.",
        updatedAt: "2026-05-14"
      },
      {
        slug: "trademark-certification",
        title: "Trademark Certification",
        summary: "Registered trademark notice, certificate preview and certificate download.",
        body:
          "Ractysh™ is presented as a registered trademark company. The certificate preview and downloadable record are available for public review.",
        updatedAt: "2026-05-14"
      }
    ]
  },
  popup: {
    enabled: true,
    delayMs: 20000,
    title: "Join the Ractysh Enterprise Briefing",
    description:
      "Receive premium updates on Architecture, Construction, Real Estate, Export-Import and OTC Exchange operations.",
    ctaLabel: "Subscribe"
  },
  googleRatings: {
    score: 4.9,
    totalReviews: 128,
    rateUsUrl: "https://www.google.com/search?q=Ractysh+Group+reviews",
    reviews: [
      {
        name: "Private Client",
        role: "Real estate investor",
        rating: 5,
        quote: "The Ractysh experience felt structured and premium."
      },
      {
        name: "Project Partner",
        role: "Commercial developer",
        rating: 5,
        quote: "Project execution updates were clear and professional."
      },
      {
        name: "Enterprise Associate",
        role: "Trade operations client",
        rating: 5,
        quote: "Trade coordination was clear, structured and highly professional."
      }
    ]
  },
  feedback: {
    title: "Client review inbox",
    description:
      "Share confidential feedback with the Ractysh leadership team. Approved comments may be featured as testimonials.",
    email: "noorulsmart1998@gmail.com"
  },
  careers: {
    heroTitle: "Build premium enterprise systems with Ractysh.",
    intro:
      "Ractysh careers are designed for people who think with precision, respect craft and want to work across Architecture, Construction, Real Estate, Export-Import, OTC Exchange and enterprise client service.",
    culture: [
      "Client discretion and trust-first communication.",
      "High ownership across design, execution and operations.",
      "Technical documentation, quality control and premium presentation.",
      "A calm, ambitious culture built for long-term enterprise work."
    ],
    jobs: [
      {
        title: "Architectural Designer",
        location: "Coimbatore • Palani • Dindigul",
        type: "Full-time",
        summary: "Own concept development, drawings, visualization coordination and premium client presentation packages."
      },
      {
        title: "Construction Project Coordinator",
        location: "India",
        type: "Full-time",
        summary: "Track site execution, procurement, vendor updates, quality checkpoints and handover documentation."
      },
      {
        title: "Enterprise Operations Associate",
        location: "Coimbatore • Palani • Dindigul",
        type: "Full-time",
        summary: "Support client inquiries, demo routing, CRM discipline and business division coordination."
      }
    ],
    internships: [
      {
        title: "Design Studio Internship",
        summary: "For architecture and interior design students interested in premium visualization and documentation."
      },
      {
        title: "Business Operations Internship",
        summary: "For candidates interested in enterprise coordination, content systems and client experience."
      }
    ]
  },
  pages: [
    {
      slug: "business",
      title: "Ractysh Business Ecosystem",
      eyebrow: "Business Divisions",
      description:
        "A connected business platform across Architecture, Construction, Real Estate, Export & Import and OTC Exchange.",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=82",
      sections: [
        {
          title: "Enterprise operating model",
          body:
            "Ractysh connects premium services under one brand architecture so clients can move from spatial planning to construction, real estate strategy, sourcing, trade documentation and private exchange coordination with fewer handoffs."
        },
        {
          title: "Investor-ready presentation",
          body:
            "Each division is structured with clear positioning, premium visuals, technical descriptions and conversion paths for enterprise clients."
        }
      ]
    },
    {
      slug: "services",
      title: "Premium Enterprise Services",
      eyebrow: "Services",
      description:
        "Service systems for Architecture, Construction, Real Estate, Export-Import operations, OTC Exchange and turnkey delivery.",
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=82",
      sections: [
        {
          title: "Clear service ownership",
          body:
            "Every service is written for business clarity: the client understands the outcome, operating controls and next step."
        }
      ]
    }
  ],
  certifications: [],
  milestones: [
    {
      year: "2023",
      title: "Brand foundation",
      description: "Ractysh began with a multi-division vision for premium enterprise services."
    },
    {
      year: "2024",
      title: "Architecture and construction capability",
      description: "Design, construction and turnkey service systems were formalized."
    },
    {
      year: "2025",
      title: "Export-import and real estate operations",
      description: "International business support, supplier network management, market access and real estate positioning were added."
    },
    {
      year: "2026",
      title: "Five-pillar enterprise platform",
      description: "The public website and consultation systems became one operating platform across all five pillars."
    }
  ],
  partners: [
    { name: "Architecture Studios", description: "Design, visualization and documentation partners." },
    { name: "Construction Vendors", description: "Construction, MEP, PEB and material sourcing networks." },
    { name: "Real Estate Partners", description: "Asset, leasing, sales and development advisory support." },
    { name: "Trade Networks", description: "Supplier, documentation and market-access support." },
    { name: "Enterprise Advisors", description: "Professional support for premium client and private exchange requirements." }
  ],
  sections: [
    { id: "hero", label: "Hero", visible: true, order: 1 },
    { id: "business-divisions", label: "Business Divisions", visible: true, order: 3 },
    { id: "frameworks", label: "Frameworks We Support", visible: false, order: 4 },
    { id: "journey", label: "Journey Cards", visible: false, order: 5 },
    { id: "divisions", label: "Divisions", visible: false, order: 6 },
    { id: "services", label: "Services Bento", visible: false, order: 7 },
    { id: "stats", label: "Statistics", visible: false, order: 8 },
    { id: "solutions", label: "Solution Tabs", visible: false, order: 9 },
    { id: "projects", label: "Projects", visible: false, order: 10 },
    { id: "security", label: "Security", visible: false, order: 11 },
    { id: "trust", label: "Project Timeline Experience", visible: true, order: 12 },
    { id: "ratings", label: "Google Reviews", visible: true, order: 13 },
    { id: "faq", label: "FAQ", visible: false, order: 14 },
    { id: "cta", label: "CTA", visible: false, order: 15 }
  ],
  footer: {
    headline: "Ractysh",
    description:
      "A five-pillar private enterprise group across Architecture, Construction, Real Estate, Export & Import and OTC Exchange.",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Disclosure", href: "/disclosure" },
      { label: "Copyright Policy", href: "/copyright-policy" },
      { label: "Sitemap", href: "/sitemap" }
    ],
    socialLinks: [
      { label: "LinkedIn", href: "https://www.linkedin.com" },
      { label: "Instagram", href: "https://www.instagram.com" },
      { label: "Email", href: "mailto:noorulsmart1998@gmail.com" }
    ]
  },
  updatedAt: new Date().toISOString()
};
