export interface ProjectCaseStudy {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: 'Mobile & Full-Stack' | 'Agentic AI' | 'AI Applications' | 'Automation & Data';
  filterGroup: 'All' | 'AI & Agents' | 'Mobile & Flutter' | 'Automation';
  stackSummary: string;
  statusNote: string;
  overview: string;
  problemSolved: string;
  myContribution: string;
  technologies: string[];
  implementedFeatures: string[];
  roadmapOrProductionNotes: string[];
  architectureSteps: {
    layer: string;
    component: string;
    responsibility: string;
  }[];
  specialHighlight?: {
    title: string;
    items: { name: string; detail: string }[];
  };
  githubUrl: string;
  liveDemoUrl: string;
  isFeaturedWide?: boolean;
}

export interface SkillGroup {
  id: string;
  index: string;
  category: string;
  focusSummary: string;
  skills: {
    name: string;
    context: string;
    stage: 'Project-Applied' | 'Active Exploration';
  }[];
}

export interface JourneyItem {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  isEditablePlaceholder?: boolean;
}

export const WHATSAPP_NUMBER = '[INSERT_MY_WHATSAPP_NUMBER_WITH_COUNTRY_CODE]';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/masood-achakzai-a55a63349';

export function buildWhatsAppUrl(rawNumber: string, customMessage?: string): string | null {
  if (!rawNumber || rawNumber.includes('INSERT')) return null;
  const sanitizedDigits = rawNumber.replace(/[\s+\-[\]()]/g, '').replace(/[^0-9]/g, '');
  if (sanitizedDigits.length < 8) return null;
  const msg = encodeURIComponent(
    customMessage ||
      'Hello Masood, I visited your portfolio and would like to discuss a project or collaboration.'
  );
  return `https://wa.me/${sanitizedDigits}?text=${msg}`;
}

export function isValidLinkedInUrl(url: string): boolean {
  if (!url || url.includes('INSERT')) return false;
  const trimmed = url.trim();
  return (
    (trimmed.startsWith('https://') || trimmed.startsWith('http://')) &&
    trimmed.includes('linkedin.com/') &&
    trimmed !== 'https://www.linkedin.com/' &&
    trimmed !== 'https://linkedin.com/'
  );
}

export const PERSONAL_INFO = {
  fullName: 'Muhammad Masood',
  professionalName: 'Masood Achakzai',
  title: 'Computer Science Developer · AI & Automation Engineer · Software Developer',
  education: 'BS Computer Science',
  academicStatus: '6th Semester',
  institutionPlaceholder: '[INSERT UNIVERSITY / INSTITUTION NAME, QUETTA]',
  location: 'Quetta, Pakistan',
  fullLocation: 'Quetta, Balochistan, Pakistan',
  heroKicker: 'AVAILABLE FOR OPPORTUNITIES · PORTFOLIO 2026',
  heroHeadline: 'Engineering Intelligent Systems. Building Extraordinary Digital Experiences.',
  heroSubtitle:
    "I'm Muhammad Masood, a Computer Science developer focused on Artificial Intelligence, Agentic Systems, Intelligent Automation, and Real-World Software Engineering.",
  heroIntroduction:
    "I'm a Computer Science student and developer passionate about building intelligent software, AI-powered applications, automation systems, and practical digital products. My interests span artificial intelligence, agentic AI, full-stack development, database engineering, and mobile technologies.",
  brandStatement: "I don't just write code. I build intelligent systems and practical digital products.",
  portraitPath: '/assets/aistudio/WhatsApp_Image_2026-11-03_at_10.02.59_PM_10f295f1.jpeg',
  githubUsername: 'masoodachakzai4-ui',
  githubUrl: 'https://github.com/masoodachakzai4-ui',
  instagramUrl: 'https://www.instagram.com/masoodachakzai4/',
  facebookUrl: 'https://www.facebook.com/',
  facebookDisplayName: 'Masood Achakzai',
  defaultEmail: 'masoodachakzai4@gmail.com',
  defaultLinkedIn: LINKEDIN_URL,
  defaultWhatsApp: WHATSAPP_NUMBER,
};

export const PROJECTS_DATA: ProjectCaseStudy[] = [
  {
    id: 'quetta-ride',
    index: '01',
    title: 'Quetta Ride',
    subtitle: 'Location-Focused Multi-App Ride-Hailing Platform & Dispatch Ecosystem',
    category: 'Mobile & Full-Stack',
    filterGroup: 'Mobile & Flutter',
    stackSummary: 'Flutter · Dart · Firebase · Cloud Firestore · Web Admin',
    statusNote: 'Multi-Role Functional Prototype · Architected for Regional Expansion',
    isFeaturedWide: true,
    overview:
      'A regional ride-hailing platform engineered specifically around the urban mobility dynamics of Quetta, Balochistan, with a modular architecture capable of scaling to secondary cities across Pakistan. The ecosystem unifies a Passenger mobile app, a Driver/Captain mobile app, and a central Web Admin Dashboard backed by real-time Firebase synchronization.',
    problemSolved:
      'Commuters and local transport operators in Quetta face fragmented booking experiences, inconsistent fare negotiation, and limited localized digital dispatch support for common regional transit modes such as motorcycles, auto rickshaws, and compact cars.',
    myContribution:
      'Designed the end-to-end multi-role system architecture, engineered the Flutter cross-platform passenger and captain interfaces, modeled real-time Firestore collections for trip state machines, implemented distance-based fare calculation logic, and built the web management console.',
    technologies: [
      'Flutter',
      'Dart',
      'Firebase Authentication',
      'Cloud Firestore',
      'GPS & Map Interface',
      'Web Technologies (HTML5/CSS3/JS)',
      'Real-Time State Sync',
    ],
    implementedFeatures: [
      'Passenger application with pickup/drop-off selection and real-time ride booking workflow',
      'Driver/Captain application with registration, online/offline availability toggle, and trip acceptance',
      'Centralized Web Admin Dashboard for monitoring registered users, captains, and ride logs',
      'Multi-tier vehicle selection supporting Motorcycle, Auto Rickshaw, and Small Cars',
      'Dynamic fare calculation engine based on route distance and selected vehicle category',
      'Interactive GPS & map interface with live ride status transitions',
      'Role-based user authentication, ride history logs, and post-trip rating & review workflow',
    ],
    roadmapOrProductionNotes: [
      'Prototype Verified: Core booking state machine, Firebase Auth, Firestore live document syncing, fare estimation, and role separation.',
      'Production Roadmap: High-concurrency geospatial sharding (GeoFlutterFire at scale), automated payment gateway settlement, and Play Store release pipeline.',
    ],
    architectureSteps: [
      {
        layer: 'Client Tier (Mobile & Web)',
        component: 'Flutter Passenger App · Flutter Captain App · Web Admin Portal',
        responsibility: 'Captures GPS coordinates, renders map views, manages role-specific booking UI, and streams trip state changes.',
      },
      {
        layer: 'Identity & Security',
        component: 'Firebase Authentication & Role Guards',
        responsibility: 'Verifies passenger, driver, and admin credentials while enforcing document-level access boundaries.',
      },
      {
        layer: 'Real-Time State Engine',
        component: 'Cloud Firestore Collections (users, drivers, rides, reviews)',
        responsibility: 'Synchronizes ride requests, captain assignments, live coordinates, and trip completion receipts in real time.',
      },
      {
        layer: 'Pricing & Dispatch Logic',
        component: 'Fare Calculation & Vehicle Tier Matcher',
        responsibility: 'Computes transparent fares across Motorcycle, Auto Rickshaw, and Small Car tiers before dispatch confirmation.',
      },
    ],
    specialHighlight: {
      title: 'Supported Regional Vehicle Tiers',
      items: [
        {
          name: 'Motorcycle (Bike)',
          detail: 'Fast, economical solo transit optimized for high-density city corridors and student commutes.',
        },
        {
          name: 'Auto Rickshaw',
          detail: 'Accessible neighborhood short-haul transport tailored to local Quetta street networks.',
        },
        {
          name: 'Small Cars',
          detail: 'Weather-protected family and group rides with transparent distance-based pricing.',
        },
      ],
    },
    githubUrl: 'https://github.com/masoodachakzai4-ui',
    liveDemoUrl: '',
  },
  {
    id: 'kb-lifecycle-agent',
    index: '02',
    title: 'AI-Powered Knowledge Base Lifecycle Agent',
    subtitle: 'Agentic Documentation Freshness Monitor & Knowledge Rot Prevention System',
    category: 'Agentic AI',
    filterGroup: 'AI & Agents',
    stackSummary: 'Agentic AI · Python · LLM Reasoning · RAG · Workflow Automation',
    statusNote: 'Live Deployed Web Application & Agentic Workflow System',
    isFeaturedWide: true,
    overview:
      'An autonomous agentic system designed to combat organizational knowledge rot by continuously auditing technical documentation, detecting stale procedures or contradictions against recent engineering changes, identifying coverage gaps, and generating actionable update recommendations.',
    problemSolved:
      'Engineering and operations teams rapidly accumulate outdated wiki pages, broken onboarding guides, and undocumented workflow changes ("knowledge rot"), causing wasted developer hours and recurring operational errors.',
    myContribution:
      'Architected the multi-step agentic reasoning loop, designed document freshness evaluation prompts and semantic comparison pipelines, structured knowledge-gap detection heuristics, and modeled integration webhooks for enterprise collaboration tools.',
    technologies: [
      'Python',
      'Agentic AI Workflows',
      'LLM APIs',
      'Retrieval-Augmented Generation (RAG)',
      'LangChain Concepts',
      'Webhook & REST Integrations',
      'Structured JSON Outputs',
    ],
    implementedFeatures: [
      'Automated knowledge freshness monitoring across technical markdown and document repositories',
      'AI-powered semantic document analysis comparing existing docs against new system updates',
      'Outdated documentation detection flagging deprecated commands, old API paths, or stale policies',
      'Knowledge gap identification highlighting recurring questions lacking canonical documentation',
      'Structured intelligent recommendations with draft revision snippets for human-in-the-loop review',
      'Extensible connector architecture designed for Slack, Microsoft Teams, Jira, Notion, and GitHub workflows',
    ],
    roadmapOrProductionNotes: [
      'Live Web Deployment: Interactive demonstration hosted at ai-powered-knowledge-base-lifecycle.vercel.app.',
      'Implemented Core: Document ingestion, semantic staleness scoring, gap analysis reasoning loop, and structured revision payloads.',
      'Integration Concept Layer: Enterprise OAuth webhook connectors for live bi-directional syncing with Notion, Jira, GitHub PRs, Slack, and Microsoft Teams.',
    ],
    architectureSteps: [
      {
        layer: 'Ingestion & Event Triggers',
        component: 'Document Corpus & Repository Change Listeners',
        responsibility: 'Ingests markdown/wiki articles and monitors timestamps, commit events, or support ticket topics.',
      },
      {
        layer: 'Semantic Retrieval (RAG)',
        component: 'Chunking & Vector Similarity Index',
        responsibility: 'Retrieves overlapping documentation sections to check for internal contradictions or missing context.',
      },
      {
        layer: 'Agentic Evaluation Engine',
        component: 'LLM Freshness Auditor & Gap Detector',
        responsibility: 'Scores document decay risk, pinpoints obsolete sections, and synthesizes recommended patches.',
      },
      {
        layer: 'Notification & Action Dispatch',
        component: 'Slack / Teams / Notion / GitHub / Jira Integration Layer',
        responsibility: 'Routes actionable maintainer alerts and draft documentation updates to team channels.',
      },
    ],
    githubUrl: 'https://github.com/masoodachakzai4-ui',
    liveDemoUrl: 'https://ai-powered-knowledge-base-lifecycle.vercel.app/',
  },
  {
    id: 'ai-study-assistant',
    index: '03',
    title: 'AI Study Assistant',
    subtitle: 'Document-Grounded Educational Copilot for PDF Analysis, Quizzes & Flashcards',
    category: 'AI Applications',
    filterGroup: 'AI & Agents',
    stackSummary: 'Python · NLP · LLM Integration · RAG · Streamlit',
    statusNote: 'Implemented AI Application',
    overview:
      'An intelligent academic companion built to transform dense lecture PDFs and textbooks into interactive study workflows. Students can upload course documents, ask context-grounded questions, and automatically generate structured quizzes and active-recall flashcards.',
    problemSolved:
      'Students spend hours manually summarizing lengthy PDFs and creating practice questions without immediate feedback on comprehension gaps.',
    myContribution:
      'Built the PDF text extraction and chunking pipeline, integrated LLM prompt templates for grounded question answering, and engineered deterministic parsers for interactive quiz and flashcard generation.',
    technologies: [
      'Python',
      'Natural Language Processing (NLP)',
      'LLM Integration',
      'PDF Text Extraction',
      'RAG Pipeline',
      'Streamlit / Modern Web UI',
    ],
    implementedFeatures: [
      'PDF document parsing and context-window segmentation for long academic chapters',
      'Document-grounded AI chatbot that answers student queries using uploaded source material',
      'Automated multiple-choice and short-answer quiz generation with answer explanations',
      'Active-recall flashcard synthesis (Front/Back concept pairs) for rapid exam revision',
      'Interactive study session workflow focused on reducing hallucination via source grounding',
    ],
    roadmapOrProductionNotes: [
      'Implemented: End-to-end PDF upload, grounded Q&A chat, quiz generator, and flashcard export.',
      'Future Enhancement: Spaced-repetition scheduling history and multi-document cross-referencing.',
    ],
    architectureSteps: [
      {
        layer: 'Document Parser',
        component: 'PDF Ingestion & Text Sanitizer',
        responsibility: 'Extracts raw text from uploaded academic PDFs and splits content into semantic passages.',
      },
      {
        layer: 'Context Grounding',
        component: 'Passage Retriever & Prompt Builder',
        responsibility: 'Matches user questions or study objectives with relevant textbook sections.',
      },
      {
        layer: 'Generative Study Engine',
        component: 'LLM Q&A, Quiz & Flashcard Synthesizer',
        responsibility: 'Produces accurate answers, structured quiz items, and revision flashcards.',
      },
    ],
    githubUrl: 'https://github.com/masoodachakzai4-ui',
    liveDemoUrl: '',
  },
  {
    id: 'bizbook',
    index: '04',
    title: 'BizBook',
    subtitle: 'Cross-Platform Business Ledger, Inventory, Sales & Financial Reporting App',
    category: 'Mobile & Full-Stack',
    filterGroup: 'Mobile & Flutter',
    stackSummary: 'Flutter · Dart · Local Database · PDF Generation',
    statusNote: 'Implemented Mobile Business Application',
    overview:
      'A comprehensive mobile business management and bookkeeping application designed for small-to-medium merchants to digitize daily operations—covering inventory catalog management, customer ledgers, sales and purchase recording, payment tracking, and printable PDF financial reports.',
    problemSolved:
      'Local shopkeepers and small businesses often rely on error-prone paper ledgers ("khata"), making it difficult to track outstanding customer balances, stock levels, and monthly profitability.',
    myContribution:
      'Developed the complete Flutter application architecture, designed the local relational data schema for transactions and inventory, built executive summary dashboards, and implemented automated PDF invoice and report generation.',
    technologies: [
      'Flutter',
      'Dart',
      'Local Database Management',
      'PDF Generation Engine',
      'State Management',
      'Material / Custom UI Components',
    ],
    implementedFeatures: [
      'User authentication and secure business profile initialization',
      'Executive dashboard displaying revenue, purchases, net balance, and recent activity',
      'Product & inventory management with pricing, SKU/unit tracking, and stock updates',
      'Customer and supplier ledger management with receivables/payables history',
      'End-to-end Sales, Purchases, and Payments transaction recording workflows',
      'Financial summary reports and one-tap PDF invoice/statement generation for sharing',
    ],
    roadmapOrProductionNotes: [
      'Implemented: Offline-first local database persistence, full CRUD across products/customers/sales/purchases/payments, and PDF export.',
      'Future Enhancement: Optional cloud backup sync and multi-staff barcode scanning.',
    ],
    architectureSteps: [
      {
        layer: 'Presentation Layer',
        component: 'Flutter Screens & Financial Charts',
        responsibility: 'Provides fast data entry forms for sales, purchases, and customer payments.',
      },
      {
        layer: 'Business Logic',
        component: 'Ledger & Inventory Controllers',
        responsibility: 'Maintains atomic stock deductions, running customer balances, and date-range aggregations.',
      },
      {
        layer: 'Persistence & Reporting',
        component: 'Local SQL/NoSQL Store + PDF Builder',
        responsibility: 'Persists transactions offline and renders formatted A4/receipt PDF statements.',
      },
    ],
    githubUrl: 'https://github.com/masoodachakzai4-ui',
    liveDemoUrl: '',
  },
  {
    id: 'ai-chatbot',
    index: '05',
    title: 'Intelligent Conversational AI Chatbot',
    subtitle: 'Context-Aware Multi-Turn Assistant with Structured Prompt Engineering',
    category: 'AI Applications',
    filterGroup: 'AI & Agents',
    stackSummary: 'Python · Generative AI · LLM APIs · REST Backend · Modern UI',
    statusNote: 'Implemented AI Application',
    overview:
      'A modular conversational AI application engineered to deliver fast, context-aware multi-turn interactions. Built with configurable system personas, conversation memory management, and clean API integration between the frontend chat interface and backend LLM service.',
    problemSolved:
      'Raw LLM endpoints lack session memory, domain guardrails, and user-friendly formatting needed for practical customer support or technical assistance workflows.',
    myContribution:
      'Engineered the backend API orchestration, implemented sliding-window conversation history management, crafted system prompt guardrails, and built a responsive chat interface with markdown and code rendering.',
    technologies: [
      'Python',
      'FastAPI / REST APIs',
      'Generative AI Models',
      'Google AI Studio / OpenAI / Local LLM via Ollama',
      'JavaScript / HTML5 / CSS3',
    ],
    implementedFeatures: [
      'Multi-turn conversational memory preserving context across follow-up queries',
      'Configurable system instructions for domain-specific assistant behavior',
      'Structured markdown, code block, and step-by-step reasoning output formatting',
      'Graceful error handling, token/rate safeguard checks, and response latency feedback',
    ],
    roadmapOrProductionNotes: [
      'Implemented: Core conversational loop, history management, and LLM API integration.',
      'Extensible: Can be connected to local models via Ollama or cloud providers.',
    ],
    architectureSteps: [
      {
        layer: 'Chat Client',
        component: 'Responsive Web Interface',
        responsibility: 'Manages user input, message streaming display, and markdown formatting.',
      },
      {
        layer: 'Orchestration Layer',
        component: 'Python Backend & Session Buffer',
        responsibility: 'Appends conversation history, applies system prompts, and validates API payloads.',
      },
      {
        layer: 'Model Inference',
        component: 'Cloud LLM API / Local Ollama Runtime',
        responsibility: 'Generates contextually grounded natural language responses.',
      },
    ],
    githubUrl: 'https://github.com/masoodachakzai4-ui',
    liveDemoUrl: '',
  },
  {
    id: 'b2b-lead-scraper',
    index: '06',
    title: 'B2B Lead Scraper & Data Pipeline',
    subtitle: 'Automated Business Directory Extraction, Normalization & Export Workflow',
    category: 'Automation & Data',
    filterGroup: 'Automation',
    stackSummary: 'Python · Data Extraction · Automation · CSV / Google Sheets',
    statusNote: 'Implemented Automation Utility',
    overview:
      'A Python-based data extraction and enrichment utility engineered to collect publicly available business directory records, sanitize and deduplicate contact metadata, and output structured datasets ready for CRM ingestion or Google Sheets automation workflows.',
    problemSolved:
      'Sales and outreach teams waste hours manually copying business names, phone numbers, categories, and websites from fragmented public directories into spreadsheets.',
    myContribution:
      'Developed the Python extraction scripts with rate-limiting and retry logic, built data cleaning and deduplication pipelines, and formatted standardized CSV/JSON and Google Sheets-compatible outputs.',
    technologies: [
      'Python',
      'HTTP Requests & HTML Parsing',
      'Data Cleaning & Normalization',
      'CSV / JSON Structured Export',
      'Google Sheets & n8n Pipeline Compatibility',
    ],
    implementedFeatures: [
      'Targeted extraction of public business listings by industry category and geographic region',
      'Polite rate-limiting, request header management, and resilient error recovery',
      'Automated normalization of phone numbers, URLs, business categories, and addresses',
      'Deduplication engine preventing redundant records across multi-page runs',
      'Clean structured export to CSV/JSON for direct import into Google Sheets or n8n workflows',
    ],
    roadmapOrProductionNotes: [
      'Implemented: Configurable Python scraper, data sanitizer, deduplication, and structured CSV/Sheets export.',
      'Responsible Practice: Designed strictly for public business directory data with respectful request pacing.',
    ],
    architectureSteps: [
      {
        layer: 'Collection Engine',
        component: 'Rate-Limited Python Fetcher',
        responsibility: 'Queries public directory pages with configurable delays and retry backoff.',
      },
      {
        layer: 'Transformation Pipeline',
        component: 'Parser, Sanitizer & Deduplicator',
        responsibility: 'Extracts structured fields, validates contact formats, and removes duplicate entities.',
      },
      {
        layer: 'Output Sink',
        component: 'CSV / JSON / Google Sheets Webhook',
        responsibility: 'Delivers clean tabular lead datasets ready for business workflows.',
      },
    ],
    githubUrl: 'https://github.com/masoodachakzai4-ui',
    liveDemoUrl: '',
  },
];

export const SKILL_CATEGORIES: SkillGroup[] = [
  {
    id: 'languages',
    index: '01',
    category: 'Programming Languages',
    focusSummary: 'Core languages used across AI scripting, OOP foundations, web interfaces, and cross-platform mobile apps.',
    skills: [
      { name: 'Python', context: 'AI apps, FastAPI backends, NLP, automation & data extraction', stage: 'Project-Applied' },
      { name: 'Dart', context: 'Flutter mobile apps (Quetta Ride, BizBook) & state logic', stage: 'Project-Applied' },
      { name: 'JavaScript', context: 'Interactive web interfaces, DOM manipulation & API clients', stage: 'Project-Applied' },
      { name: 'C++', context: 'Data structures, algorithms, and object-oriented programming foundations', stage: 'Project-Applied' },
      { name: 'HTML5', context: 'Semantic document structure, SEO markup & accessible layouts', stage: 'Project-Applied' },
      { name: 'CSS3', context: 'Responsive grid/flexbox architecture, animations & modern theming', stage: 'Project-Applied' },
    ],
  },
  {
    id: 'ai-engineering',
    index: '02',
    category: 'Artificial Intelligence & Agentic Systems',
    focusSummary: 'Designing LLM-powered applications, document-grounded RAG pipelines, and autonomous agent workflows.',
    skills: [
      { name: 'Generative AI & LLM Integration', context: 'Prompt engineering, structured outputs & API orchestration', stage: 'Project-Applied' },
      { name: 'Agentic AI & AI Agents', context: 'Reasoning loops, tool invocation & lifecycle monitoring agents', stage: 'Project-Applied' },
      { name: 'Retrieval-Augmented Generation (RAG)', context: 'PDF chunking, context retrieval & grounded Q&A', stage: 'Project-Applied' },
      { name: 'AI Chatbots', context: 'Multi-turn session memory & domain-specific conversational systems', stage: 'Project-Applied' },
      { name: 'AI Application Development', context: 'End-to-end user-facing AI tools (AI Study Assistant, KB Agent)', stage: 'Project-Applied' },
      { name: 'Multi-Agent & Local LLM Exploration', context: 'Experimenting with Ollama, LangChain & collaborative agent patterns', stage: 'Active Exploration' },
    ],
  },
  {
    id: 'automation',
    index: '03',
    category: 'Automation & Intelligent Workflows',
    focusSummary: 'Eliminating repetitive manual work through event-driven pipelines, webhooks, and AI task orchestration.',
    skills: [
      { name: 'n8n Workflow Automation', context: 'Multi-node webhook orchestration, conditional routing & API chaining', stage: 'Project-Applied' },
      { name: 'AI Workflow & Agentic Automation', context: 'Combining LLM reasoning nodes with deterministic business triggers', stage: 'Project-Applied' },
      { name: 'API Integrations', context: 'REST webhook payloads, JSON transformations & third-party connectors', stage: 'Project-Applied' },
      { name: 'Google Sheets Automation', context: 'Automated lead ingestion, reporting sync & tabular pipelines', stage: 'Project-Applied' },
      { name: 'Business Process Automation', context: 'Lead scraping, notification dispatch & knowledge auditing flows', stage: 'Project-Applied' },
    ],
  },
  {
    id: 'mobile',
    index: '04',
    category: 'Mobile Application Development',
    focusSummary: 'Building responsive, production-structured Android and cross-platform applications with Flutter and Dart.',
    skills: [
      { name: 'Flutter', context: 'Multi-screen apps, custom widgets, maps & offline-first business tools', stage: 'Project-Applied' },
      { name: 'Dart', context: 'Asynchronous streams, model serialization & clean modular architecture', stage: 'Project-Applied' },
      { name: 'Android Application Development', context: 'APK builds, device permissions, geolocation & local storage', stage: 'Project-Applied' },
      { name: 'Cross-Platform Development', context: 'Unified codebase patterns across mobile and web admin views', stage: 'Project-Applied' },
    ],
  },
  {
    id: 'backend-db',
    index: '05',
    category: 'Backend & Database Engineering',
    focusSummary: 'Structuring RESTful services, authentication boundaries, relational schemas, and real-time NoSQL collections.',
    skills: [
      { name: 'FastAPI & Python Backends', context: 'High-performance REST endpoints, request validation & AI service wrappers', stage: 'Project-Applied' },
      { name: 'Firebase & Cloud Firestore', context: 'Real-time NoSQL synchronization & role-based auth (Quetta Ride)', stage: 'Project-Applied' },
      { name: 'MySQL & Relational Design', context: 'Normalized schemas, foreign keys, joins & SQL query design', stage: 'Project-Applied' },
      { name: 'Data Modeling & CRUD Operations', context: 'Transactional ledgers (BizBook), user profiles & audit logs', stage: 'Project-Applied' },
      { name: 'Authentication & Application Architecture', context: 'Session security, role separation & layered system design', stage: 'Project-Applied' },
    ],
  },
  {
    id: 'frontend-tools',
    index: '06',
    category: 'Frontend & Development Ecosystem',
    focusSummary: 'Modern interfaces and the daily engineering toolchain used for building, testing, and deploying software.',
    skills: [
      { name: 'Responsive Web & Modern UI Development', context: 'Clean component hierarchies, dark/light themes & accessible layouts', stage: 'Project-Applied' },
      { name: 'Git, GitHub, VS Code & Android Studio', context: 'Version control, repository management, debugging & mobile emulation', stage: 'Project-Applied' },
      { name: 'Google AI Studio, Claude & Antigravity IDE', context: 'AI-assisted engineering, prompt prototyping & rapid architecture iteration', stage: 'Project-Applied' },
      { name: 'Ollama, Hugging Face, LangChain & Streamlit', context: 'Local LLM execution, open-weight models & rapid AI web frontends', stage: 'Project-Applied' },
    ],
  },
];

export const JOURNEY_TIMELINE: JourneyItem[] = [
  {
    period: 'Current · 6th Semester',
    title: 'BS Computer Science (Undergraduate)',
    subtitle: 'Quetta, Balochistan, Pakistan · [INSERT UNIVERSITY NAME]',
    description:
      'Pursuing a Bachelor of Science in Computer Science with a strong focus on software engineering, artificial intelligence, database systems, data structures, and practical system implementation.',
    highlights: [
      'Core Coursework: Data Structures & Algorithms (C++), Database Management Systems (MySQL), Object-Oriented Programming, Software Engineering, Operating Systems, and Artificial Intelligence.',
      'Focusing academic capstones and independent engineering work on real-world regional and enterprise problems.',
    ],
    isEditablePlaceholder: true,
  },
  {
    period: '2025 – 2026',
    title: 'AI Engineering, Agentic Systems & Workflow Automation',
    subtitle: 'Independent R&D & Applied Project Engineering',
    description:
      'Transitioned from standard application development into LLM orchestration, Retrieval-Augmented Generation (RAG), autonomous agent workflows, and n8n business process automation.',
    highlights: [
      'Architected the AI-Powered Knowledge Base Lifecycle Agent to detect documentation decay and knowledge gaps.',
      'Built the AI Study Assistant for PDF-grounded question answering, automated quiz generation, and flashcards.',
      'Developed automated B2B lead extraction pipelines and n8n multi-step webhook integrations.',
    ],
  },
  {
    period: '2024 – 2025',
    title: 'Cross-Platform Mobile & Full-Stack System Development',
    subtitle: 'Flutter, Dart, Firebase & Relational Database Architecture',
    description:
      'Engineered multi-role mobile and web software systems focused on local businesses and urban transportation in Balochistan.',
    highlights: [
      'Designed and built the Quetta Ride prototype ecosystem (Passenger App, Captain App, and Web Admin Dashboard) using Flutter and Firebase.',
      'Created BizBook, an offline-capable business management and accounting application with local database persistence and PDF reporting.',
    ],
  },
  {
    period: 'Foundations',
    title: 'Programming Fundamentals & Problem Solving',
    subtitle: 'C++, Python, Web Technologies & Database Design',
    description:
      'Established core computational thinking through structured programming in C++ and Python, relational data modeling in MySQL, and responsive frontend web development.',
    highlights: [
      'Built foundational CRUD applications, algorithmic solutions, and responsive web interfaces.',
      'Developed a disciplined self-learning habit centered on turning theoretical CS concepts into working products.',
    ],
  },
];
