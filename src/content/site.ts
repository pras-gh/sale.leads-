/*
 * All landing-page copy lives here. It's placeholder: the structure mirrors the
 * sections the design needs, and the words should be replaced once the product
 * scope is settled. No metrics, customer names, or press — add real ones or none.
 */

export const site = {
  name: "sale.leads",
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
    tag: "Lead intelligence for sales teams",
    headline: "Find. Qualify. Enrich. Route. Close.",
    body: "Source, qualify, and route sales leads from one workspace, so reps spend their time in conversations instead of spreadsheets.",
    primary: { label: "Start free trial", href: "/signup" },
    secondary: { label: "See the pipeline", href: "#pipeline" },
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
    headline: "How It Works",
    items: [
      { tag: "Source", title: "Define who you sell to", body: "Describe your ideal customer once: industry, size, region, roles. Every lead is measured against it." },
      { tag: "Qualify", title: "Let the list sort itself", body: "Leads are enriched, deduplicated, and scored as they arrive, so the best ones rise to the top." },
      { tag: "Route", title: "Put leads in front of reps", body: "Qualified leads go to the right owner and into your CRM, with the context needed for a first message." },
    ],
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
