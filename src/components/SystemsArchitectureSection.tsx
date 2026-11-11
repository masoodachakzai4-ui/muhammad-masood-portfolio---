import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, ArrowRight, ChevronDown, ChevronUp, Cpu, Workflow } from 'lucide-react';
import { motion } from 'motion/react';
import { InteractiveTiltCard, PageHeroShowcaseFrame } from './InteractiveTiltCard';

interface SystemsArchitectureSectionProps {
  mode: 'ai' | 'automation';
}

const AGENT_PIPELINE_STEPS = [
  {
    step: '01',
    shortLabel: 'USER INPUT',
    name: 'User Input / Event Trigger',
    detail: 'Receives natural-language query, uploaded PDF document, or repository webhook event.',
    samplePayload: '{ "event": "doc_audit_request", "target": "onboarding_guide_v2.md" }',
  },
  {
    step: '02',
    shortLabel: 'AI MODEL',
    name: 'AI Model & Context Grounding',
    detail: 'Embeds query, retrieves relevant semantic chunks (RAG), and constructs a grounded system prompt.',
    samplePayload: 'Retrieved 4 semantic passages (cosine similarity > 0.84) from knowledge index.',
  },
  {
    step: '03',
    shortLabel: 'REASONING',
    name: 'Agentic Reasoning Loop',
    detail: 'Evaluates whether information is sufficient, detects contradictions or outdated API references, and plans tool calls.',
    samplePayload: 'Reasoning: Detected deprecated endpoint /v1/auth in section 3. Selecting patch generator tool.',
  },
  {
    step: '04',
    shortLabel: 'TOOLS / API',
    name: 'Tools & API Invocation',
    detail: 'Calls external REST APIs, database queries, n8n webhooks, or PDF/quiz synthesizers.',
    samplePayload: 'Tool Call -> generate_doc_revision({ section: 3, replacement: "/v2/oauth/token" })',
  },
  {
    step: '05',
    shortLabel: 'EXECUTION',
    name: 'Deterministic Execution',
    detail: 'Validates JSON schema output, updates database or Google Sheets records, and logs execution audit.',
    samplePayload: 'Status: Schema validated. Document freshness score updated from 62% -> 96%.',
  },
  {
    step: '06',
    shortLabel: 'RESPONSE',
    name: 'Structured Response Delivery',
    detail: 'Returns grounded answer, downloadable PDF report, or Slack/Notion maintainer notification.',
    samplePayload: 'Response delivered to client UI with cited source passages and markdown diff.',
  },
];

const AI_DOMAINS = [
  {
    id: 'agentic',
    index: '01',
    title: 'Agentic AI & Autonomous Agents',
    summary: 'Goal-directed LLM agents that plan steps, invoke tools, and audit technical documentation.',
    expanded:
      'Applied in the AI-Powered Knowledge Base Lifecycle Agent to detect outdated wiki pages, identify documentation gaps, and generate actionable maintainer revisions.',
  },
  {
    id: 'rag',
    index: '02',
    title: 'RAG Systems & Document Intelligence',
    summary: 'Retrieval-Augmented Generation grounding LLM answers in PDFs and domain corpora.',
    expanded:
      'Applied in the AI Study Assistant to parse lecture PDFs, retrieve relevant textbook passages, answer student questions, and synthesize quizzes & flashcards.',
  },
  {
    id: 'chatbots',
    index: '03',
    title: 'LLM Applications & Conversational AI',
    summary: 'Context-aware multi-turn chatbots with session memory and structured outputs.',
    expanded:
      'Built using Python, FastAPI, Google AI Studio, OpenAI-compatible endpoints, and local open-weight models via Ollama and LangChain.',
  },
];

const WORKFLOW_SIMULATIONS = {
  leads: {
    title: '01. B2B Lead Extraction & Sheets Pipeline',
    tag: 'PYTHON · N8N · GOOGLE SHEETS',
    nodes: [
      {
        id: '01',
        name: 'Target Query Input',
        role: 'Trigger',
        input: '{ "category": "Logistics & Retail", "region": "Quetta" }',
        output: 'Queued directory pagination URLs with polite rate limit.',
      },
      {
        id: '02',
        name: 'Rate-Limited Python Fetcher',
        role: 'Extraction',
        input: 'GET public directory listings with retry backoff',
        output: 'Extracted 48 raw business entities (Name, Phone, URL).',
      },
      {
        id: '03',
        name: 'Sanitizer & Deduplicator',
        role: 'Transform',
        input: 'Normalize phone formats & remove duplicate records',
        output: '42 unique verified business records normalized to JSON.',
      },
      {
        id: '04',
        name: 'Google Sheets & CSV Sink',
        role: 'Destination',
        input: 'POST batch payload to n8n / Google Sheets webhook',
        output: 'Simulated Result: 42 clean B2B leads appended to master sheet.',
      },
    ],
  },
  knowledge: {
    title: '02. Agentic Documentation Freshness Audit',
    tag: 'AGENTIC AI · RAG · WEBHOOKS',
    nodes: [
      {
        id: '01',
        name: 'Repo Commit Listener',
        role: 'Trigger',
        input: 'Commit pushed: Updated FastAPI auth route to /v2/token',
        output: 'Triggered semantic audit across 14 markdown docs.',
      },
      {
        id: '02',
        name: 'Semantic Drift Detector',
        role: 'RAG Audit',
        input: 'Compare code diff against api_authentication.md',
        output: 'Flagged Stale Section: Line 42 references deprecated /v1/login.',
      },
      {
        id: '03',
        name: 'Patch Synthesizer',
        role: 'LLM Node',
        input: 'Draft updated markdown snippet matching new signature',
        output: 'Generated verified markdown patch + confidence score (0.94).',
      },
      {
        id: '04',
        name: 'Maintainer Alert',
        role: 'Dispatch',
        input: 'Route alert payload to Slack / Notion / GitHub review queue',
        output: 'Simulated Result: Actionable doc-update card delivered.',
      },
    ],
  },
  triage: {
    title: '03. n8n AI Task & Client Inquiry Orchestration',
    tag: 'N8N · API INTEGRATIONS · AI ROUTING',
    nodes: [
      {
        id: '01',
        name: 'Inbound Webhook Trigger',
        role: 'Webhook',
        input: 'POST /webhook/inquiry from client form',
        output: 'Payload validated and sanitized.',
      },
      {
        id: '02',
        name: 'LLM Intent Classifier',
        role: 'AI Node',
        input: 'Analyze project scope, required stack, and urgency',
        output: 'Classified: { "category": "Flutter App", "priority": "High" }',
      },
      {
        id: '03',
        name: 'Sheets Ledger Sync',
        role: 'Storage',
        input: 'Append structured inquiry row to Google Sheets tracker',
        output: 'Row #108 logged with timestamp and tags.',
      },
      {
        id: '04',
        name: 'Instant Notification',
        role: 'Dispatch',
        input: 'Send formatted summary + draft response to engineer',
        output: 'Simulated Result: End-to-end triage completed in 1.2s.',
      },
    ],
  },
};

export const SystemsArchitectureSection: React.FC<SystemsArchitectureSectionProps> = ({ mode }) => {
  // AI Mode State
  const [activeAgentStep, setActiveAgentStep] = useState<number>(0);
  const [isAgentPlaying, setIsAgentPlaying] = useState<boolean>(true);
  const [expandedDomain, setExpandedDomain] = useState<string | null>('agentic');

  // Automation Mode State
  const [activeWorkflowKey, setActiveWorkflowKey] = useState<'leads' | 'knowledge' | 'triage'>('leads');
  const [simStep, setSimStep] = useState<number>(0);
  const [isSimRunning, setIsSimRunning] = useState<boolean>(false);

  useEffect(() => {
    if (mode !== 'ai' || !isAgentPlaying) return;
    const timer = setInterval(() => {
      setActiveAgentStep((prev) => (prev + 1) % AGENT_PIPELINE_STEPS.length);
    }, 2600);
    return () => clearInterval(timer);
  }, [mode, isAgentPlaying]);

  useEffect(() => {
    if (mode !== 'automation' || !isSimRunning) return;
    const timer = setInterval(() => {
      setSimStep((prev) => {
        if (prev >= 3) {
          setIsSimRunning(false);
          return 3;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [mode, isSimRunning]);

  const handleSelectWorkflow = (key: 'leads' | 'knowledge' | 'triage') => {
    setActiveWorkflowKey(key);
    setSimStep(0);
    setIsSimRunning(true);
  };

  if (mode === 'ai') {
    const activeNode = AGENT_PIPELINE_STEPS[activeAgentStep];
    return (
      <section className="relative z-10 py-8 lg:py-12">
        <div className="max-w-[1280px] mx-auto px-6 space-y-16">
          {/* Top Hero Moment: Matches Home Page Layout with Sculpted Orbital Frame */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="space-y-2">
                <p className="text-xs font-mono tracking-[0.2em] text-blue-600 dark:text-sky-400 uppercase font-semibold">
                  PAGE 04 · AI & AGENTIC ENGINEERING
                </p>
                <h1
                  className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-white leading-[1.1] font-display"
                  style={{ textWrap: 'balance' }}
                >
                  Building the Next Generation of{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                    Intelligent Systems.
                  </span>
                </h1>
              </div>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                I design autonomous AI agents, document-grounded RAG architectures, and multi-turn LLM applications that reason over data, call external tools, and deliver verified results.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAgentPlaying((prev) => !prev)}
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 rounded-2xl transition-all cursor-pointer whitespace-nowrap shadow-[0_0_25px_rgba(37,99,235,0.4)]"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{isAgentPlaying ? 'Pause Live Pipeline' : 'Resume Live Pipeline'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveAgentStep(0);
                    setIsAgentPlaying(true);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white/85 dark:bg-[#070B18]/90 border border-slate-200 dark:border-blue-500/30 rounded-2xl hover:border-blue-500 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                  <span>Replay Animation</span>
                </button>
              </div>
            </motion.div>

            <div className="lg:col-span-5">
              <PageHeroShowcaseFrame
                badge={`STAGE ${activeNode.step} · ${activeNode.shortLabel}`}
                title={activeNode.name}
                subtitle={activeNode.detail}
                statusLeft="6-Stage Agent Loop"
                statusRight={isAgentPlaying ? 'Auto-Flow Active' : 'Manual Inspect'}
                icon={Cpu}
              >
                <div className="p-3 rounded-xl bg-blue-950/50 border border-sky-400/30 font-mono text-[11px] text-sky-300">
                  {activeNode.samplePayload}
                </div>
              </PageHeroShowcaseFrame>
            </div>
          </div>

          {/* 6 Interactive 3D-Tilt Agent Pipeline Boxes */}
          <div className="space-y-4">
            <p className="text-xs font-mono text-blue-600 dark:text-sky-400">
              CLICK ANY PIPELINE BOX TO INSPECT: USER INPUT → AI MODEL → REASONING → TOOLS/API → EXECUTION → RESPONSE
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5">
              {AGENT_PIPELINE_STEPS.map((node, index) => {
                const isSelected = index === activeAgentStep;
                return (
                  <InteractiveTiltCard
                    key={node.step}
                    as="button"
                    delay={0.05 + index * 0.04}
                    onClick={() => {
                      setActiveAgentStep(index);
                      setIsAgentPlaying(false);
                    }}
                    className={`p-4 text-left cursor-pointer ${
                      isSelected
                        ? 'ring-2 ring-sky-400 dark:ring-sky-400 bg-blue-600/10 dark:bg-blue-500/20'
                        : ''
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono mb-3">
                      <span className={isSelected ? 'text-blue-600 dark:text-sky-400 font-bold' : 'text-slate-500'}>
                        {node.step} · {node.shortLabel}
                      </span>
                      <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-sky-400' : 'text-slate-500'}`} />
                    </div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                      {node.name}
                    </p>
                  </InteractiveTiltCard>
                );
              })}
            </div>
          </div>

          {/* 3 Interactive 3D-Tilt AI Capability Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {AI_DOMAINS.map((domain, idx) => {
              const isOpen = expandedDomain === domain.id;
              return (
                <InteractiveTiltCard
                  key={domain.id}
                  delay={0.12 + idx * 0.06}
                  className="p-6"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-blue-600 dark:text-sky-400">
                      <span>AI DOMAIN {domain.index}</span>
                      <span>CAPABILITY</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white font-display">
                      {domain.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      {domain.summary}
                    </p>
                    {isOpen && (
                      <p className="pt-3 text-xs text-blue-600 dark:text-sky-300 leading-relaxed border-t border-slate-200/70 dark:border-slate-800">
                        {domain.expanded}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpandedDomain(isOpen ? null : domain.id)}
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-mono text-blue-600 dark:text-sky-400 hover:underline cursor-pointer self-start"
                  >
                    <span>{isOpen ? 'Show Less' : 'Expand Project Context'}</span>
                    {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </InteractiveTiltCard>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  // =========================================================================
  // MODE === 'automation' (PAGE 05)
  // =========================================================================
  const currentWorkflow = WORKFLOW_SIMULATIONS[activeWorkflowKey];
  const activeSimNode = currentWorkflow.nodes[simStep];

  return (
    <section className="relative z-10 py-8 lg:py-12">
      <div className="max-w-[1280px] mx-auto px-6 space-y-16">
        {/* Top Hero Moment: Matches Home Page Layout with Sculpted Orbital Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-2">
              <p className="text-xs font-mono tracking-[0.2em] text-blue-600 dark:text-sky-400 uppercase font-semibold">
                PAGE 05 · AUTOMATION ENGINEERING LAB
              </p>
              <h1
                className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-950 dark:text-white leading-[1.1] font-display"
                style={{ textWrap: 'balance' }}
              >
                n8n, AI Workflows &{' '}
                <span className="bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                  Business Process Automation.
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              Select any of the three workflow navigation boxes below or click <strong>Run Workflow Simulation</strong> to animate node-by-node execution and inspect live input/output payloads.
            </p>

            <button
              type="button"
              onClick={() => {
                setSimStep(0);
                setIsSimRunning(true);
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 rounded-2xl transition-all cursor-pointer whitespace-nowrap shadow-[0_0_25px_rgba(37,99,235,0.45)]"
            >
              <Play className="w-4 h-4" />
              <span>{isSimRunning ? 'Simulating Execution...' : 'Run Workflow Simulation'}</span>
            </button>
          </motion.div>

          <div className="lg:col-span-5">
            <PageHeroShowcaseFrame
              badge={`ACTIVE NODE ${activeSimNode.id} · ${activeSimNode.role.toUpperCase()}`}
              title={activeSimNode.name}
              subtitle={`Input: ${activeSimNode.input}`}
              statusLeft={currentWorkflow.tag}
              statusRight={simStep === 3 ? 'Complete' : `Step ${simStep + 1} of 4`}
              icon={Workflow}
            >
              <div className="p-3 rounded-xl bg-blue-950/50 border border-sky-400/30 font-mono text-[11px] text-sky-300">
                {activeSimNode.output}
              </div>
            </PageHeroShowcaseFrame>
          </div>
        </div>

        {/* 3 Interactive 3D-Tilt Workflow Selector Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {(['leads', 'knowledge', 'triage'] as const).map((key, idx) => {
            const wf = WORKFLOW_SIMULATIONS[key];
            const isSelected = activeWorkflowKey === key;
            return (
              <InteractiveTiltCard
                key={key}
                as="button"
                delay={0.08 + idx * 0.05}
                onClick={() => handleSelectWorkflow(key)}
                className={`p-6 text-left cursor-pointer ${
                  isSelected
                    ? 'ring-2 ring-sky-400 bg-blue-600/10 dark:bg-blue-500/20'
                    : ''
                }`}
              >
                <div className="space-y-2">
                  <p className="text-[11px] font-mono text-blue-600 dark:text-sky-400">{wf.tag}</p>
                  <h2 className="text-lg font-bold text-slate-950 dark:text-white font-display">
                    {wf.title}
                  </h2>
                </div>
              </InteractiveTiltCard>
            );
          })}
        </div>

        {/* 4 Interactive 3D-Tilt Execution Node Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {currentWorkflow.nodes.map((node, idx) => {
            const isCurrent = idx === simStep;
            return (
              <InteractiveTiltCard
                key={node.id}
                as="button"
                delay={0.14 + idx * 0.05}
                onClick={() => {
                  setSimStep(idx);
                  setIsSimRunning(false);
                }}
                className={`p-5 text-left cursor-pointer ${
                  isCurrent
                    ? 'ring-2 ring-sky-400 bg-blue-600/10 dark:bg-blue-500/20'
                    : ''
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className={isCurrent ? 'text-blue-600 dark:text-sky-400 font-bold' : 'text-slate-500'}>
                      NODE {node.id}
                    </span>
                    <span className="text-[11px] text-slate-400">{node.role}</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white font-display">
                    {node.name}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                    {node.output}
                  </p>
                </div>
              </InteractiveTiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
