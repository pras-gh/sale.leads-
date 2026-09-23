/*
 * All landing-page copy lives here. Hero, proof, problem, and steps carry the
 * final SalesTarget copy; the sections after them are still placeholder.
 * The proof stats are product claims: keep them sourced before launch.
 */

export const site = {
  name: "SalesTarget",
  nav: {
    features: {
      label: "Features",
      title: "One pipeline, six stages.",
      body: "Everything between finding a lead and putting it in front of the right rep.",
      link: { label: "See the full pipeline", href: "/#pipeline" },
    },
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Demo", href: "/demo" },
    ],
    login: { label: "Log in", href: "/login" },
    cta: { label: "Start free trial", href: "/signup" },
  },

  hero: {
    tag: "AI Sales Operating System",
    headline: ["Find buyers.", "Personalize outreach.", "Book meetings."],
    body: "Everything your sales team needs to find qualified leads, generate personalized outreach, and manage deals — powered by AI in one workspace.",
    primary: { label: "Start free trial", href: "/signup" },
    secondary: { label: "Book a demo", href: "/demo" },
    points: ["Launch campaigns in minutes", "AI-powered personalization"],
  },

  proof: {
    lead: "Trusted by founders, agencies, and fast-growing teams.",
    stats: [
      { value: 840, suffix: "M+", label: "Professional profiles" },
      { value: 96, suffix: "M+", label: "Company records" },
      { value: 50, suffix: "+", label: "Data sources" },
      { value: 1, suffix: "", label: "Unified outbound workspace" },
    ],
  },

  problem: {
    headline: "Stop juggling five different sales tools.",
    body: "Modern outbound teams waste hours switching between prospecting, enrichment, outreach, CRM, and AI writing tools.",
    resolution: "SalesTarget brings your entire outbound workflow into one AI-powered workspace.",
    tools: ["Prospecting", "Enrichment", "Outreach", "CRM", "AI writing"],
    comparison: [
      { without: "Multiple subscriptions.", with: "One platform." },
      { without: "Manual lead research.", with: "AI finds ideal buyers." },
      { without: "Generic cold emails.", with: "Personalized outreach instantly." },
      { without: "Scattered CRM.", with: "Everything in one pipeline." },
    ],
  },

  products: [
    {
      title: "Lead Sourcing",
      body: "Pull prospects from the places your buyers already are, into one list.",
      href: "#pipeline",
    },
    {
      title: "Enrichment",
      body: "Fill in company, role, and contact details before a rep ever opens the record.",
      href: "#pipeline",
    },
    {
      title: "Scoring & Routing",
      body: "Rank every lead against your ideal customer and send it to the right owner.",
      href: "#pipeline",
    },
  ],

  pipeline: {
    headline: "One Pipeline. Every Lead.",
    items: [
      { id: "sourcing", title: "Sourcing", body: "Bring leads in from lists, forms, and research in a single intake." },
      { id: "enrichment", title: "Enrichment", body: "Complete each record with firmographic and contact data." },
      { id: "deduplication", title: "Deduplication", body: "Merge repeats so one person is one lead, however many times they show up." },
      { id: "scoring", title: "Scoring", body: "Weight fit and intent against the profile of the customers you want." },
      { id: "routing", title: "Routing", body: "Assign by territory, segment, or round-robin, with no manual triage." },
      { id: "crm-sync", title: "CRM Sync", body: "Push qualified leads and their history to the system your team already uses." },
    ],
  },

  faq: {
    headline: "Questions? Ask Away.",
    items: [
      {
        q: "What counts as a lead?",
        a: "Any person or company you might sell to. A lead becomes qualified once it matches the profile and signals you define.",
      },
      {
        q: "Can I bring my own lists?",
        a: "Yes. Imported lists go through the same enrichment, deduplication, and scoring as everything else.",
      },
      {
        q: "How is a lead scored?",
        a: "Against your ideal customer profile: company fit, role fit, and the intent signals you choose to weight.",
      },
      {
        q: "Who owns the data?",
        a: "You do. Leads, notes, and scores can be exported at any time.",
      },
    ],
    contact: { prompt: "Can't find what you're looking for?", label: "Contact us", href: "#start" },
  },

  useCases: {
    headline: "Built For",
    items: [
      { tag: "SDR teams", title: "Start every day with a ranked list instead of a blank search bar.", meta: "Prospecting" },
      { tag: "Founders", title: "Run outbound before there's a sales team to run it for you.", meta: "Early-stage" },
      { tag: "Agencies", title: "Build and hand over qualified lists for each client, kept separate.", meta: "Multi-workspace" },
    ],
  },

  steps: {
    headline: "Three steps from search to meeting.",
    items: [
      { title: "Describe your buyer", body: "Search using natural language instead of filters." },
      { title: "AI builds your outreach", body: "Generate personalized emails and LinkedIn messages for every lead." },
      { title: "Launch and track campaigns", body: "Monitor replies, meetings, and pipeline from one dashboard." },
    ],
    /* Illustrations inside the cards: fictional people and companies from src/data. */
    demo: {
      query: "VP Sales at B2B companies in Europe",
      filters: ["Role · VP Sales", "Region · EMEA", "Model · B2B"],
      results: [
        { name: "Priya Patel", title: "VP of Sales", company: "Tessaract Payments", fit: 94 },
        { name: "Jonas Fischer", title: "VP of Sales", company: "Quillfeather Legal Tech", fit: 88 },
        { name: "Elena Rossi", title: "VP of Sales", company: "Halcyon Learning", fit: 81 },
      ],
      message: {
        to: "Priya Patel",
        subject: "Tessaract's Madrid launch",
        opening: "Hi Priya — congrats on opening the Madrid office.",
      },
      campaignId: "camp_002",
    },
  },

  closing: {
    headline: "Start Prospecting",
    body: "Source, enrich, score, and route sales leads, all in one workspace built for the way sales teams actually work.",
    cta: { label: "Start free trial", href: "/signup" },
  },

  footer: {
    columns: [
      {
        title: "Product",
        links: [
          { label: "Sourcing", href: "/#sourcing" },
          { label: "Enrichment", href: "/#enrichment" },
          { label: "Scoring", href: "/#scoring" },
          { label: "Routing", href: "/#routing" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "How it works", href: "/#how" },
          { label: "FAQ", href: "/#faq" },
          { label: "Design system", href: "/design" },
        ],
      },
      {
        title: "Account",
        links: [
          { label: "Pricing", href: "/pricing" },
          { label: "Demo", href: "/demo" },
          { label: "Log in", href: "/login" },
          { label: "Start free trial", href: "/signup" },
        ],
      },
    ],
  },
} as const;
