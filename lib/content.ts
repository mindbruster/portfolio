/**
 * Single source of truth for every piece of copy on the site.
 * Edit here, not in components.
 */

export const profile = {
  name: "Abdul Aziz",
  role: "AI Engineer",
  location: "Lahore, Pakistan",
  email: "mughalabdulaziz4@gmail.com",
  phone: "+92 343 4489592",
  linkedin: "https://www.linkedin.com/in/abdul-aziz-a6670a249",
  github: "https://github.com/mindbruster",
  resume: "/resume.pdf",
  /** Sits under the name. One sentence, no adjectives. */
  headline:
    "I build LLM systems that reach production — RAG, multi-model orchestration, and the content-safety layers that make them shippable.",
  /** Short narrative: who, how they got here, what they want next. */
  about: [
    "I graduated from FAST NUCES in 2025 and went straight into building AI products that real people use. Within a year that meant five platforms in production — and a much clearer idea of where the difficulty actually lives.",
    "It is rarely the model. It is what surrounds it: deciding what a system should refuse to do, what happens when a provider stops responding, how a flat subscription fee gets attributed to a project, and how you prove an answer came from a real source. Those constraints are the parts I find genuinely interesting.",
    "I care most about systems that carry consequences — where a wrong output reaches a child, or a contract gets signed on bad advice. That is where engineering discipline stops being a preference and starts being the product.",
    "I am looking for AI engineering work on applied LLM and retrieval systems, ideally somewhere the correctness bar is high.",
  ],
  /** Longer version for the Approach block. */
  bio: [
    "Over the past year I've taken five AI platforms from requirements to production: a child-safe learning companion for ages 3–13, an AI contract analyser for UAE law, a voice-to-art generative platform, a semantic memory layer for ChatGPT and Gemini, and an internal tool that tracks AI spend across six providers.",
    "The work I'm proudest of is the least visible. On the children's platform, every model response passes a layered safety pipeline before a child sees it. The principle we built to: never trust the model to behave — the filter is the safety guarantee, not the model's intentions.",
    "Before this, computer vision: a four-stage YOLOv8 pipeline for automated litter-offence detection, validated against live city cameras with Punjab Safe Cities Authority.",
  ],
} as const;

export const stats = [
  { value: "5", label: "platforms shipped to production" },
  { value: "20+", label: "languages served with safety filtering" },
  { value: "6", label: "AI providers under one cost model" },
  { value: "30k+", label: "images curated and fine-tuned on" },
] as const;

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  year: string;
  /** The interesting engineering problem, not a feature list. */
  problem: string;
  /** What was actually built. 2–3 short lines. */
  built: string[];
  stack: string[];
  href?: string;
  hrefLabel?: string;
  /** Marks work that is internal / has no public URL. */
  internal?: boolean;
  /** Screenshot of the live product, served from /public/shots.
   *  w/h are the file's true intrinsic size so next/image reserves the
   *  correct aspect box and nothing is squashed. */
  shot?: { src: string; alt: string; w: number; h: number };
  /** Additional frames, shown as a grid on the case-study page. */
  gallery?: { src: string; alt: string; w: number; h: number }[];
  /** Case-study depth, rendered at /work/[slug]. */
  study?: {
    role: string;
    context: string;
    /** Ordered pipeline/flow steps rendered as a diagram. */
    diagram?: { title: string; steps: { label: string; note: string }[] };
    decisions: { title: string; body: string }[];
    outcome: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "yoluno",
    shot: { src: "/shots/yoluno.jpg", alt: "The Yoluno homepage, showing the Luno character and the parent-governed positioning", w: 1485, h: 812 },
    name: "Yoluno",
    tagline: "Child-safe AI learning platform",
    year: "2025 — present",
    problem:
      "An AI companion for children aged 3–13, in 20+ languages, where parents define the boundaries. The model will eventually say something wrong — so the architecture assumes it will.",
    built: [
      "A layered content-safety pipeline that screens every message on the way in and every reply on the way out, classifying each interaction and escalating flagged content to parents in real time.",
      "Typo-tolerant topic matching with stop-word, length-similarity and prefix guards — because plain fuzzy matching flagged “can you teach me” as “cats”.",
      "Multi-model orchestration through a single gateway: chat, vision, story text, illustration, transcription and narration across Gemini and OpenAI.",
    ],
    stack: ["React", "TypeScript", "Express", "PostgreSQL", "OpenRouter", "Socket.io", "Stripe"],
    href: "https://www.yoluno.com",
    hrefLabel: "yoluno.com",
    study: {
      role: "GenAI engineer — safety architecture, model orchestration, backend",
      context:
        "Yoluno is a parent-governed AI companion for children aged 3–13. Parents choose the values and topics that shape their child's world; the child chats, creates illustrated stories, follows daily routines and explores family history. It runs in 20+ languages with the English National Curriculum and IB built in.",
      diagram: {
        title: "Every message travels the same path",
        steps: [
          { label: "Child message", note: "Arrives from the client" },
          { label: "Input screening", note: "Keyword scan, then a multilingual classifier robust to paraphrase" },
          { label: "Prompt assembly", note: "Age-band tone, personality sliders, family context, recent history" },
          { label: "Model", note: "Routed by task through a single gateway — never trusted on its own" },
          { label: "Output screening", note: "Reply checked before the child ever sees it" },
          { label: "Parent dashboard", note: "Flagged events pushed live over Socket.io" },
        ],
      },
      decisions: [
        {
          title: "The filter is the safety guarantee",
          body: "We never rely on the model's intentions. Screening runs on the way in and on the way out, and the final layer is deterministic code with no API dependency — it still runs when every AI service we use is down. 'The safety filter was unavailable' is not a sentence you get to say about a product for children.",
        },
        {
          title: "Fuzzy matching needed three guards",
          body: "Children misspell constantly — 'dinasours', 'violance' — so exact matching on parent-blocked topics missed most of it. Adding edit-distance matching immediately created false positives: 'can you teach me' matched the blocked topic 'cats'. The fix was a stop-word blocklist, a length-similarity bound, and a prefix rule requiring the opening characters to agree.",
        },
        {
          title: "Severity, not a binary",
          body: "A blocked topic and a distress signal are not the same event. Interactions are classified green, yellow or red — yellow surfaces as a redirect in the parent dashboard, red creates a safety report and can trigger a notification. Treating both as 'blocked' would have buried the cases that actually matter.",
        },
        {
          title: "One gateway, many models",
          body: "Chat, vision, story text, illustration, transcription and narration all route through a single service layer rather than per-provider SDKs. Swapping a model is a config change, billing stays in one place, and every call carries an abort timeout so a hanging provider cannot pin an API worker.",
        },
      ],
      outcome: [
        "Shipped to production and live at yoluno.com across 20+ languages.",
        "Every model response passes safety screening before reaching a child.",
        "Parents get real-time visibility into flagged interactions rather than a monthly summary.",
      ],
    },
  },
  {
    slug: "graysen",
    shot: { src: "/shots/graysen.jpg", alt: "The Graysen homepage, showing detected contract issues including a hidden renewal clause", w: 1485, h: 812 },
    name: "Graysen",
    tagline: "AI contract analysis for UAE law",
    year: "2026",
    problem:
      "Legal answers that can't be traced to a source are worthless. In a regulated domain, grounding isn't a feature — it's the product.",
    built: [
      "Clause-level risk detection that flags hidden renewals, excessive penalties and ambiguous terms, then returns a contract health score.",
      "A legal chat grounded in UAE federal law with source citations attached to every response.",
      "Bilingual handling across English and Arabic contracts, with AI-suggested rewrites as negotiation starting points.",
    ],
    stack: ["RAG", "LLMs", "Multilingual NLP", "Vector Search"],
    href: "https://www.graysen.ai/",
    hrefLabel: "graysen.ai",
    study: {
      role: "GenAI engineer — retrieval, grounding, bilingual pipeline",
      context:
        "Graysen reads UAE contracts for people who cannot afford a lawyer for every document — tenants, employees, freelancers, SMEs and in-house teams. It explains what a contract actually says, flags what is unusual, and points to the law it is reasoning from.",
      diagram: {
        title: "From uploaded contract to cited answer",
        steps: [
          { label: "Document upload", note: "PDF or DOCX, English or Arabic" },
          { label: "Clause extraction", note: "Contract split into individually addressable clauses" },
          { label: "Retrieval", note: "Relevant UAE federal law pulled per clause" },
          { label: "Risk assessment", note: "Clause scored against retrieved legal context" },
          { label: "Health score", note: "Per-clause findings rolled into one document rating" },
          { label: "Cited output", note: "Every claim carries the source it came from" },
        ],
      },
      decisions: [
        {
          title: "No citation, no answer",
          body: "In a regulated domain an ungrounded answer is worse than no answer, because it is confidently wrong and a user may act on it. Responses are constrained to what retrieval actually returned, with the source attached. 'The AI said so' is not something anyone can take to a lawyer.",
        },
        {
          title: "Clause-level, not document-level",
          body: "Scoring a whole contract as 'risky' tells a user nothing actionable. Analysis operates per clause so a finding points at the specific sentence that causes it — which is also what makes an AI-suggested rewrite possible.",
        },
        {
          title: "Rewrites are drafts, not advice",
          body: "Suggested clauses are framed as negotiation starting points rather than legal recommendations. That framing is a product decision as much as a legal one: it sets the user's expectation about what the system is for before they rely on it.",
        },
        {
          title: "Arabic is not an afterthought",
          body: "UAE contracts arrive in both languages, often mixed. Bilingual handling had to sit in the retrieval and analysis path from the start rather than being bolted on as a translation layer, which would have lost the legal precision the whole product depends on.",
        },
      ],
      outcome: [
        "Live at graysen.ai, analysing English and Arabic contracts against UAE federal law.",
        "Every answer traceable to a cited source rather than model recall.",
        "Contract health scoring plus a templated document builder for common agreements.",
      ],
    },
  },
  {
    slug: "soundbyte",
    shot: { src: "/shots/soundbyte.jpg", alt: "The SoundBYTE homepage for artist Amrita Sethi", w: 1485, h: 812 },
    name: "SoundBYTE",
    tagline: "Voice-to-art generative platform",
    year: "2025 — present",
    problem:
      "Turn a voice recording into a unique visual identity, then get it onto a physical wall. Digital generation is half the job; fulfilment is the other half.",
    built: [
      "In-browser voice capture via MediaRecorder feeding a generative image pipeline.",
      "A three-app monorepo — marketing site, authenticated creation playground, admin console — over one shared API.",
      "Stripe payments, Redis-backed sessions, S3 storage and print-on-demand fulfilment for physical editions.",
    ],
    stack: ["React", "Express", "Prisma", "Replicate", "Gemini", "Stripe", "Redis"],
    href: "https://www.amritasethi.com",
    hrefLabel: "amritasethi.com",
    study: {
      role: "Engineer — monorepo architecture, generation pipeline, payments and fulfilment",
      context:
        "SoundBYTE is the platform behind Amrita Sethi, a Dubai artist whose work has been shown at Art Dubai and covered by CNN, Forbes and BBC. It turns a recorded voice into a generated visual identity, sells it, and ships it as a physical print.",
      diagram: {
        title: "Voice in, framed print out",
        steps: [
          { label: "Voice capture", note: "Recorded in-browser via MediaRecorder" },
          { label: "Audio processing", note: "Waveform analysed into the visual parameters" },
          { label: "Generation", note: "Image pipeline across Replicate and Gemini" },
          { label: "Checkout", note: "Stripe payment with webhook confirmation" },
          { label: "Print preparation", note: "Output upscaled and colour-prepared for physical media" },
          { label: "Fulfilment", note: "Handed to a print-on-demand provider and tracked in admin" },
        ],
      },
      decisions: [
        {
          title: "Three apps, one API",
          body: "A public marketing site, an authenticated creation playground, and an internal admin console have genuinely different audiences and release cadences, but share types, auth and pricing logic. An npm-workspaces monorepo with shared packages for types, config, services, stores and UI kept them independent without duplicating the domain model.",
        },
        {
          title: "Fulfilment is part of the product",
          body: "A generated image is not the deliverable — a framed print arriving at someone's door is. That meant integrating a print-on-demand vendor, preparing files to physical spec, and building admin tooling to track real orders. Most generative projects stop at the download button.",
        },
        {
          title: "Pricing lives in shared config",
          body: "Editions, commissions and studio releases each price differently, and the artist changes them. Pricing rules sit in a shared package consumed by every app rather than being duplicated per surface, so a change lands everywhere at once and cannot drift between the storefront and the invoice.",
        },
        {
          title: "Sessions in Redis, not memory",
          body: "The creation flow is a multi-step wizard people abandon and return to, and the API runs more than one instance. Redis-backed sessions meant progress survived both a refresh and a deploy.",
        },
      ],
      outcome: [
        "Live at amritasethi.com, selling both digital editions and physical prints.",
        "End-to-end path from a voice recording to a fulfilled physical order.",
        "Three applications shipped over one shared API and domain model.",
      ],
    },
  },
  {
    slug: "llm-meter",
    shot: {
      src: "/shots/llm-meter-v2.jpg",
      alt: "The LLM Meter activity dashboard: total AI spend, requests, token volume and allocated Claude Code cost, with a ranked breakdown by model. Per-project attribution is blurred.",
      w: 1897,
      h: 1085,
    },
    name: "LLM Meter",
    tagline: "Multi-provider AI cost attribution",
    year: "2026",
    problem:
      "Everyone tracks their OpenAI bill. Almost nobody can say which project it came from — and subscription seats aren't per-token, so the cost has to be allocated rather than measured.",
    built: [
      "Cross-provider attribution across OpenAI, Anthropic, Gemini, OpenRouter, fal.ai and GLM, answering which team, project or person spent what.",
      "A seat-cost allocation model that divides a flat monthly fee by actual usage, then attributes down to project level.",
      "Multi-tenant ingestion with API-key auth and daily rollups, reconciling three overlapping capture paths that must never be summed.",
    ],
    stack: ["Next.js 15", "Prisma", "PostgreSQL", "Recharts", "Multi-tenant"],
    internal: true,
    study: {
      role: "Engineer — cost model, ingestion, multi-tenant API",
      context:
        "Teams were running six AI providers and receiving one number at the end of the month. LLM Meter answers the question that bill cannot: which team, project or person actually spent it.",
      diagram: {
        title: "Three capture paths, one reconciled total",
        steps: [
          { label: "File connector", note: "Reads local usage logs, rolled up per project and machine" },
          { label: "OTLP metrics", note: "Telemetry stream from instrumented services" },
          { label: "Provider analytics", note: "Authoritative usage pulled from the provider API" },
          { label: "Reconciliation", note: "Same tokens seen three ways — matched, never summed" },
          { label: "Daily rollups", note: "Per org, project, user, model and day" },
          { label: "Attribution", note: "Reported, computed, or allocated depending on cost type" },
        ],
      },
      decisions: [
        {
          title: "Allocate what you cannot measure",
          body: "A subscription seat is a flat monthly fee, not a per-token charge — there is no invoice line to attribute. The model divides the monthly fee by that account's actual usage for the month, giving a defensible per-project rate. Inventing per-token dollars for a flat fee would have produced numbers that looked precise and were wrong.",
        },
        {
          title: "Reconcile, never sum",
          body: "The same tokens arrive through three independent capture paths. Summing them triples the total. Each path has different trust and different grain, so they are matched against each other and the most authoritative source wins.",
        },
        {
          title: "Three cost types, not one",
          body: "Some providers report real dollars, some require computing units against a pricing table, and subscriptions require allocation. Collapsing these into a single 'cost' field would hide which numbers are measured and which are estimated.",
        },
      ],
      outcome: [
        "Cost visibility across six providers where previously there was one opaque monthly figure.",
        "Spend attributable down to individual project and person.",
        "Subscription seats allocated to per-project cost — something no off-the-shelf tool does.",
      ],
    },
  },
  {
    slug: "myneutron",
    shot: {
      src: "/shots/myneutron-v2.jpg",
      alt: "The myNeutron homepage: an AI knowledge base that builds on everything you know, with the tagline start with context, not from scratch",
      w: 1915,
      h: 1113,
    },
    name: "myNeutron",
    tagline: "Semantic memory for ChatGPT and Gemini",
    year: "2025 — present",
    problem:
      "Chat assistants forget everything between sessions. Giving them persistent memory means deciding what is worth remembering, and retrieving it without drowning the context window.",
    built: [
      "Semantic memory and retrieval modules that let ChatGPT, Gemini and email share one persistent context layer.",
      "Semantic search and data capture across sessions, surfaced through a Chrome extension overlay.",
      "Cross-assistant memory consistency so context follows the user rather than the tool.",
    ],
    stack: ["Chrome Extension", "Vector Search", "Embeddings", "LLM APIs"],
    href: "https://myneutron.ai/",
    hrefLabel: "myneutron.ai",
    study: {
      role: "GenAI engineer — semantic memory and retrieval modules",
      context:
        "myNeutron is a Chrome extension that gives ChatGPT, Gemini and email a shared, persistent memory. The context follows the user rather than living inside whichever assistant they happened to use.",
      diagram: {
        title: "Capture once, recall anywhere",
        steps: [
          { label: "Capture", note: "Content collected from chat sessions and email in-page" },
          { label: "Chunk and embed", note: "Text split and converted to vectors" },
          { label: "Store", note: "Persisted with metadata about origin and time" },
          { label: "Query", note: "New prompt embedded and matched semantically" },
          { label: "Rank and trim", note: "Only what fits and earns its place in the context window" },
          { label: "Inject", note: "Retrieved memory surfaced into the active assistant" },
        ],
      },
      decisions: [
        {
          title: "Retrieval is a budget problem",
          body: "Memory is only useful if it reaches the model, and context windows are finite and paid for. The hard part is not storing everything — it is deciding what earns its place in the prompt on any given turn.",
        },
        {
          title: "Memory belongs to the user, not the tool",
          body: "Each assistant has its own siloed memory, which fragments context across tools. Keeping the store outside any single provider means switching from ChatGPT to Gemini does not reset what the system knows.",
        },
        {
          title: "Semantic, not keyword",
          body: "People do not recall the words they originally used. Embedding-based search finds a conversation by what it was about, which is the only way recall works when the user is paraphrasing something from weeks ago.",
        },
      ],
      outcome: [
        "Live at myneutron.ai as a Chrome extension.",
        "Persistent semantic memory shared across ChatGPT, Gemini and email.",
        "Semantic search and capture surfaced without leaving the assistant.",
      ],
    },
  },
  {
    slug: "litter-detection",
    shot: {
      src: "/shots/litter-detection-1.jpg",
      alt: "Live detection output: a rickshaw boxed as VEHICLE, a car boxed as LITTERING CAR, the discarded item tagged LITTER ID 0, and the number plate located by ANPR. Plates and faces are blurred.",
      w: 1920,
      h: 1080,
    },
    gallery: [
      {
        src: "/shots/litter-detection-2.jpg",
        alt: "The same offending vehicle tracked as it crosses the trigger line, with the discarded item still tagged.",
        w: 1920,
        h: 1080,
      },
      {
        src: "/shots/litter-detection-3.jpg",
        alt: "Overhead angle: the arm is visible mid-throw, the litter is tagged, and the plate is located on the tracked vehicle.",
        w: 1920,
        h: 1080,
      },
    ],
    name: "Litter Detection",
    tagline: "Computer vision for Punjab Safe Cities Authority",
    year: "2024 — 2025",
    problem:
      "Catching littering from a moving vehicle on a live road camera. Not one model — a four-stage pipeline where every stage can fail the next.",
    built: [
      "YOLOv8s detects the littering action, YOLOv8n tracks the offending vehicle, then ANPR and OCR extract the plate and generate a challan automatically.",
      "Scraped and curated a custom 30,000+ image dataset, then fine-tuned both detection and tracking models.",
      "Validated for real-time performance against live road footage alongside PSCA's operations team.",
    ],
    stack: ["Python", "YOLOv8", "OpenCV", "ANPR", "OCR", "DeepSORT"],
    internal: true,
    study: {
      role: "AI engineer — pipeline design, dataset curation, model fine-tuning",
      context:
        "A final-year project delivered with Punjab Safe Cities Authority, targeting public littering from vehicles using the existing city surveillance network.",
      diagram: {
        title: "Four stages, each gating the next",
        steps: [
          { label: "Road footage", note: "Live feed from city surveillance cameras" },
          { label: "YOLOv8s", note: "Detects the littering action itself" },
          { label: "YOLOv8n", note: "Tracks the offending vehicle across frames" },
          { label: "ANPR", note: "Locates the number plate on the tracked vehicle" },
          { label: "OCR", note: "Reads the plate characters" },
          { label: "Challan", note: "Violation generated automatically" },
        ],
      },
      decisions: [
        {
          title: "Two models, not one",
          body: "Detecting the act and tracking the vehicle are different problems with different speed and accuracy needs. A larger model handles action detection where precision matters most; a smaller, faster one handles tracking across frames where throughput matters more.",
        },
        {
          title: "The dataset was the project",
          body: "No public dataset covers littering from vehicles on Pakistani roads. We scraped and curated 30,000+ images and fine-tuned from there. Most of the effort went into data, not architecture — which is usually where real-world CV projects actually live.",
        },
      ],
      outcome: [
        "Validated for real-time performance against live road footage with PSCA's operations team.",
        "End-to-end automation from detection through to challan generation.",
        "Custom 30,000+ image dataset curated and used to fine-tune both models.",
      ],
    },
  },
];

export type Principle = { title: string; body: string };

/** Drawn from real decisions, not generic values. */
export const principles: Principle[] = [
  {
    title: "The filter is the guarantee",
    body: "Never trust a model to behave. Screen on the way in, screen on the way out, and make the last layer deterministic code that still runs when every AI service is down.",
  },
  {
    title: "One gateway, every model",
    body: "Route providers through a single service layer. Swapping a model becomes a config change instead of a refactor, and billing stays in one place.",
  },
  {
    title: "Allocate what you can't measure",
    body: "Flat-fee subscriptions have no invoice line to point at. If you can't measure a cost directly, build a defensible allocation model instead of guessing.",
  },
  {
    title: "The model is 20% of the work",
    body: "The other 80% is auth, payments, migrations, timeouts, and what happens when the provider stops responding. Shipping is the rest of it.",
  },
];

export type Role = {
  company: string;
  title: string;
  period: string;
  location?: string;
  points: string[];
};

export const experience: Role[] = [
  {
    company: "BIG Immersive",
    title: "Associate GenAI Engineer",
    period: "Nov 2025 — Present",
    location: "Lahore, Pakistan",
    points: [
      "Ship production GenAI features end to end across four client and internal platforms, owning work from model integration through deployment.",
      "Build RAG pipelines and vector search over production knowledge bases, including semantic memory and retrieval modules and citation-grounded legal retrieval.",
      "Orchestrate OpenAI, Gemini and Replicate behind a single service layer spanning chat, vision, transcription, image generation and TTS.",
      "Design and implement LLM content-safety and moderation layers, including a multi-stage filter classifying every response before it reaches a child user.",
      "Deliver the surrounding product surface: multi-tenant APIs, Stripe billing, real-time dashboards and Dockerised services.",
    ],
  },
  {
    company: "BIG Immersive",
    title: "AI Excellence Program",
    period: "Aug 2025 — Oct 2025",
    location: "Lahore, Pakistan",
    points: [
      "Built a RAG-based chatbot delivering context-aware responses grounded in a custom document corpus.",
      "Contributed to AI/ML projects across model building, evaluation and deployment, and collaborated on live client work.",
    ],
  },
  {
    company: "Punjab Safe Cities Authority",
    title: "AI Engineer — Final Year Project",
    period: "Nov 2024 — Jan 2025",
    location: "Lahore, Pakistan",
    points: [
      "Built a four-stage computer vision pipeline for automated litter-offence detection, integrating YOLOv8 detection and tracking with ANPR and OCR.",
      "Curated a 30,000+ image dataset and validated real-time performance against live city surveillance feeds.",
    ],
  },
];

export const skills = [
  {
    group: "GenAI & LLM",
    items: [
      "RAG",
      "Vector search",
      "Embeddings",
      "Semantic memory",
      "Prompt engineering",
      "Multi-model orchestration",
      "Content safety",
      "LangChain",
      "OpenAI",
      "Gemini",
      "Anthropic",
      "Replicate",
    ],
  },
  {
    group: "Languages",
    items: ["Python", "TypeScript", "JavaScript", "Java", "C/C++", "SQL"],
  },
  {
    group: "Backend",
    items: [
      "FastAPI",
      "Node.js",
      "Express",
      "Next.js",
      "Prisma",
      "REST APIs",
      "Socket.io",
      "JWT/OAuth",
      "Stripe",
      "Docker",
    ],
  },
  {
    group: "Frontend",
    items: ["React", "Next.js", "SvelteKit", "Vite", "Tailwind CSS", "TanStack Query", "Zustand"],
  },
  {
    group: "ML & Vision",
    items: ["PyTorch", "TensorFlow", "scikit-learn", "OpenCV", "YOLOv8", "ANPR", "OCR", "Pandas"],
  },
  {
    group: "Data & Infra",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "AWS S3", "Railway", "Vercel", "Playwright"],
  },
] as const;

export const education = {
  school: "FAST NUCES, Lahore",
  degree: "BS Computer Science",
  period: "Aug 2021 — Jul 2025",
};

export const nav = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#approach", label: "Approach" },
  { href: "/#experience", label: "Experience" },
  { href: "/#notes", label: "Notes" },
  { href: "/#contact", label: "Contact" },
] as const;

export type Note = { title: string; blurb: string; tag: string };

/** Short technical write-ups. Each maps to a published post. */
export const notes: Note[] = [
  {
    title: "Your AI bill is not per-token anymore",
    blurb:
      "A subscription seat is a flat monthly fee, so there is no invoice line to attribute. The cost has to be allocated, not measured — and that changes how you model spend entirely.",
    tag: "Cost attribution",
  },
  {
    title: "Fuzzy matching flagged “can you teach me” as “cats”",
    blurb:
      "Children misspell everything, so exact matching on blocked topics misses most of it. Adding edit distance fixed that and immediately broke something else. The fix took three stacked guards.",
    tag: "Content safety",
  },
  {
    title: "Stop trying to make the model behave",
    blurb:
      "Assume it won't. Screen on the way in, screen on the way out, and make the last layer deterministic code that still runs when every AI service is down.",
    tag: "LLM architecture",
  },
  {
    title: "One hanging API call took down our workers",
    blurb:
      "Not a bug in our code — a provider that simply stopped responding. Without an abort signal, your LLM provider's uptime silently becomes your uptime.",
    tag: "Reliability",
  },
];
