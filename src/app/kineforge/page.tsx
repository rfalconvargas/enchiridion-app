import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  MousePointerClick,
  ScanLine,
  MessageSquareText,
  GanttChartSquare,
  Clapperboard,
  FileBarChart,
  Camera,
  Film,
  Bot,
  Bone,
  Gauge,
  Landmark,
  GraduationCap,
  Palette,
  Workflow,
  Check,
  Minus,
  ArrowRight,
  Globe,
  Library,
  Wrench,
  FlaskConical,
  HelpCircle,
  Sparkles,
  MessageSquareHeart,
  Compass,
} from "lucide-react";
import { SITE_URL, BRAND_NAME, CHANNEL_URL, CHANNEL_HANDLE, FEEDBACK_URL } from "@/lib/brand";
import { KineforgeHero } from "@/components/kineforge/KineforgeHero";
import { KineforgeStudio } from "@/components/kineforge/KineforgeStudio";
import { KineforgeFeedback } from "@/components/kineforge/KineforgeFeedback";
import { Reveal } from "@/components/landing/Reveal";

const TITLE = "Kineforge — AI-directed prehistoric 3D scene planning";
const DESCRIPTION =
  "A concept prototype for directing rigged prehistoric creatures, cinematic cameras, animation clips, and Unreal Engine timelines with AI-assisted workflows.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/kineforge" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/kineforge`,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/spino-skull.png",
        width: 1200,
        height: 630,
        alt: "Kineforge — AI-directed prehistoric 3D scene planning",
      },
    ],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

/* ── content ──────────────────────────────────────────────────────────── */

const PROBLEMS = [
  {
    icon: Clapperboard,
    title: "Creators need cinematic creature shots",
    body: "Paleontology storytellers want documentary-grade dinosaur footage — but a single believable shot can take days of specialist 3D work.",
  },
  {
    icon: GanttChartSquare,
    title: "The pieces are hard to coordinate",
    body: "Rigs, animation clips, cameras, lighting, fog, and timelines all have to agree. Wiring them by hand in Unreal is slow and unforgiving.",
  },
  {
    icon: Bot,
    title: "AI can't animate arbitrary rigs yet",
    body: "Today's tools can organize and direct a scene, but they can't reliably generate realistic motion for an arbitrary creature rig on their own.",
  },
];

const WORKFLOW = [
  { icon: MousePointerClick, step: "Select creature", body: "Pick a rigged prehistoric model to build the shot around." },
  { icon: ScanLine, step: "Analyze rig", body: "Inspect the skeleton, bones, and which clips it can actually take." },
  { icon: MessageSquareText, step: "Describe shot", body: "Say what you want in plain language — mood, move, framing." },
  { icon: GanttChartSquare, step: "Build timeline", body: "Lay clips, cameras, and lighting onto a coordinated timeline." },
  { icon: Clapperboard, step: "Render / export", body: "Get a Sequencer-ready shot plan to render or hand to an artist." },
];

/* 3-column credibility table: where each capability sits today vs the concept
   vs the research frontier. */
const COMPARISON = [
  { icon: ScanLine, cap: "Rig inspection", current: "Read the skeleton by hand in-editor", kineforge: "Auto rig report + control checklist", future: "Automatic Control Rig generation" },
  { icon: Film, cap: "Animation clips", current: "Source & retarget manually", kineforge: "Per-shot clip shopping list", future: "AI-suggested / generated clips" },
  { icon: Camera, cap: "Camera direction", current: "Hand-place cameras and cuts", kineforge: "Prompt → camera plan + lenses", future: "Auto coverage from intent" },
  { icon: GanttChartSquare, cap: "Sequencer timeline", current: "Build tracks manually", kineforge: "Generated timeline blocks", future: "One-click Sequencer export" },
  { icon: Bone, cap: "Jaw / tail controls", current: "Keyframe every control by hand", kineforge: "Flags required controls & markers", future: "Prompt-directed bone animation" },
  { icon: Gauge, cap: "Scientific plausibility", current: "Researcher judgment, case by case", kineforge: "Context notes & source prompts", future: "Motion-plausibility scoring" },
  { icon: Clapperboard, cap: "Render planning", current: "Ad-hoc notes in a doc", kineforge: "Structured render notes + checklist", future: "Auto render / optimization passes" },
];

const USE_CASES = [
  { icon: Clapperboard, label: "Enchiridion documentaries" },
  { icon: Palette, label: "Paleoart previs" },
  { icon: Landmark, label: "Museum explainers" },
  { icon: GraduationCap, label: "Education videos" },
  { icon: Workflow, label: "Creature animation planning" },
  { icon: Camera, label: "Unreal cinematic blocking" },
];

const ROADMAP = [
  { icon: Globe, title: "Web concept demo", state: "live" as const },
  { icon: FileBarChart, title: "Rig report + shot-plan generator", state: "progress" as const },
  { icon: Clapperboard, title: "Unreal Sequencer export", state: "next" as const },
  { icon: Library, title: "Compatible animation clip library", state: "next" as const },
  { icon: Wrench, title: "Control Rig / IK cleanup tools", state: "next" as const },
  { icon: FlaskConical, title: "AI-assisted creature motion research", state: "research" as const },
];

const ROADMAP_STATE: Record<string, { label: string; cls: string; node: string }> = {
  live: {
    label: "Live now",
    cls: "border-ds-primary/40 bg-ds-primary/15 text-ds-accent",
    node: "border-ds-primary bg-ds-primary text-ds-on-primary",
  },
  progress: {
    label: "In progress",
    cls: "border-ds-primary/30 bg-ds-primary/[0.06] text-ds-accent",
    node: "border-ds-primary/50 bg-ds-surface text-ds-accent",
  },
  next: {
    label: "Planned",
    cls: "border-ds-border bg-ds-surface-2 text-ds-faint",
    node: "border-ds-border bg-ds-surface-2 text-ds-faint",
  },
  research: {
    label: "Research",
    cls: "border-ds-secondary/30 bg-ds-secondary/10 text-ds-secondary",
    node: "border-dashed border-ds-secondary/50 bg-ds-surface text-ds-secondary",
  },
};

const FEEDBACK_QUESTIONS = [
  "Would this be useful for creators making science videos?",
  "Is the MVP more valuable as a rig inspector, a shot planner, or a Sequencer assistant?",
  "What would make you trust the generated shot plan?",
  "Would you pay for compatible creature animation packs?",
  "Should this be an Unreal plugin, a web planner, or both?",
];

/* Small shared kicker — used for wayfinding, not on every section. */
function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2 text-ds-secondary">
      <span className="h-px w-8 bg-ds-border-strong" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
        {children}
      </span>
    </div>
  );
}

const COL_GRID = "md:grid-cols-[1.2fr_1fr_1.1fr_1fr]";

export default function KineforgePage() {
  return (
    <div className="kineforge min-h-screen">
      <KineforgeHero />

      <main className="kf-aurora relative overflow-hidden">
        <div className="kf-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden />

        <div className="relative mx-auto max-w-5xl px-6">
          {/* Reality / honesty banner */}
          <Reveal as="div" className="pt-4">
            <div className="kf-lit flex flex-col gap-3 rounded-[var(--radius-ds-lg)] border border-ds-warning/30 bg-ds-warning/[0.07] p-6 sm:flex-row sm:items-start sm:gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-ds-sm)] bg-ds-warning/15 text-ds-warning">
                <AlertTriangle size={20} />
              </span>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.12em] text-ds-warning">
                  This is a concept prototype
                </p>
                <p className="mt-1.5 text-pretty text-sm leading-relaxed text-ds-muted">
                  Current AI tools can help organize and direct the scene, but
                  realistic dinosaur animation still depends on compatible rigs,
                  animation clips, Control Rig, or artist cleanup. Kineforge is
                  honest about that line — it makes the assembly and direction
                  faster, not the impossible automatic.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Why this exists */}
          <section className="py-20">
            <Reveal>
              <Kicker>Why this exists</Kicker>
              <h2 className="max-w-2xl text-balance text-3xl font-bold leading-tight text-ds-text sm:text-4xl">
                Built from what AI can actually do today.
              </h2>
            </Reveal>
            <Reveal as="div" className="mt-8">
              <div className="kf-panel kf-lit p-7 sm:p-9">
                <p className="text-pretty text-lg leading-relaxed text-ds-text sm:text-xl">
                  I tested current Unreal MCP workflows and learned that AI can
                  help with setup, sequencing, cameras, and scene logic — but{" "}
                  <span className="text-ds-accent">
                    not yet with high-quality creature animation from arbitrary
                    rigs.
                  </span>
                </p>
                <p className="mt-4 max-w-3xl text-pretty text-base leading-relaxed text-ds-muted">
                  Kineforge preserves the bigger idea: a focused workspace for
                  directing prehistoric scenes by combining rigs, animation clips,
                  cinematic cameras, scientific context, and AI-assisted production
                  planning.
                </p>
                <p className="mt-6 flex items-center gap-2 border-t border-ds-border pt-5 text-xs font-semibold uppercase tracking-[0.14em] text-ds-faint">
                  <ScanLine size={13} className="text-ds-secondary" />
                  Field notes from building Enchiridion
                </p>
              </div>
            </Reveal>
          </section>

          {/* Problem */}
          <section className="py-20">
            <Reveal>
              <Kicker>The problem</Kicker>
              <h2 className="max-w-2xl text-balance text-3xl font-bold leading-tight text-ds-text sm:text-4xl">
                Cinematic creatures are easy to imagine and brutal to build.
              </h2>
            </Reveal>
            <div className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-ds-lg)] border border-ds-border bg-ds-border/60 md:grid-cols-3">
              {PROBLEMS.map(({ icon: Icon, title, body }, i) => (
                <Reveal as="div" key={title} delay={i * 0.08}>
                  <div className="flex h-full flex-col bg-ds-surface/70 p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-[var(--radius-ds-sm)] bg-ds-primary/12 text-ds-accent">
                      <Icon size={21} />
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-ds-text">{title}</h3>
                    <p className="mt-2 text-pretty text-sm leading-relaxed text-ds-muted">
                      {body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Workflow */}
          <section className="py-20">
            <Reveal>
              <Kicker>The workflow</Kicker>
              <h2 className="max-w-2xl text-balance text-3xl font-bold leading-tight text-ds-text sm:text-4xl">
                Five steps from a rigged model to a shot plan.
              </h2>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-ds-muted">
                Kineforge directs the assembly. You stay in control of every
                creative call along the way.
              </p>
            </Reveal>

            <ol className="relative mt-12 grid gap-8 md:grid-cols-5 md:gap-4">
              <span
                className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-ds-primary/40 to-transparent md:block"
                aria-hidden
              />
              {WORKFLOW.map(({ icon: Icon, step, body }, i) => (
                <Reveal as="li" key={step} delay={i * 0.07} className="relative">
                  <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-0">
                    <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-ds-primary/40 bg-ds-surface text-ds-accent shadow-[var(--shadow-ds)]">
                      <Icon size={20} />
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ds-primary text-[11px] font-bold text-ds-on-primary">
                        {i + 1}
                      </span>
                    </span>
                    <h3 className="text-sm font-semibold text-ds-text md:mt-4">{step}</h3>
                  </div>
                  <p className="mt-1 text-pretty text-xs leading-relaxed text-ds-muted md:mt-2 md:pr-2">
                    {body}
                  </p>
                </Reveal>
              ))}
            </ol>
          </section>

          {/* Interactive concept demo */}
          <section id="concept-demo" className="scroll-mt-8 py-20">
            <Reveal>
              <Kicker>Concept demo</Kicker>
              <h2 className="max-w-2xl text-balance text-3xl font-bold leading-tight text-ds-text sm:text-4xl">
                From creature prompt to cinematic shot plan.
              </h2>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-ds-muted">
                Pick a creature and a style, describe the shot, and generate a
                plan. Kineforge doesn&apos;t magically animate anything — it
                organizes the rig requirements, shots, and timeline so a creator
                can build the scene faster.
              </p>
            </Reveal>
            <Reveal as="div" className="mt-10">
              <KineforgeStudio />
            </Reveal>
          </section>

          {/* Comparison table */}
          <section id="compare" className="scroll-mt-8 py-20">
            <Reveal>
              <Kicker>Honest scope</Kicker>
              <h2 className="max-w-2xl text-balance text-3xl font-bold leading-tight text-ds-text sm:text-4xl">
                Where Kineforge sits — today and tomorrow.
              </h2>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-ds-muted">
                The same capability, across the raw Unreal + AI workflow, the
                Kineforge concept, and the longer research goal.
              </p>
            </Reveal>

            <Reveal as="div" className="mt-10">
              <div className="overflow-hidden rounded-[var(--radius-ds-lg)] border border-ds-border bg-ds-surface/40">
                {/* header (desktop) */}
                <div className={`hidden grid-cols-1 ${COL_GRID} md:grid`}>
                  <div className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-ds-faint">
                    Capability
                  </div>
                  <div className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-ds-faint">
                    Current Unreal + AI
                  </div>
                  <div className="bg-ds-primary/[0.07] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-ds-accent">
                    Kineforge concept
                  </div>
                  <div className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-ds-secondary">
                    Future research goal
                  </div>
                </div>

                {COMPARISON.map(({ icon: Icon, cap, current, kineforge, future }) => (
                  <div
                    key={cap}
                    className={`grid grid-cols-1 gap-px border-t border-ds-border bg-ds-border/40 ${COL_GRID}`}
                  >
                    {/* capability */}
                    <div className="flex items-center gap-2.5 bg-ds-surface/70 px-4 py-3.5">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--radius-ds-sm)] bg-ds-surface-2 text-ds-accent">
                        <Icon size={15} />
                      </span>
                      <span className="text-sm font-semibold text-ds-text">{cap}</span>
                    </div>
                    {/* current */}
                    <div className="bg-ds-surface/70 px-4 py-3.5">
                      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.12em] text-ds-faint md:hidden">
                        Current Unreal + AI
                      </span>
                      <span className="flex items-start gap-2 text-[13px] text-ds-muted">
                        <Minus size={13} className="mt-0.5 shrink-0 text-ds-faint" />
                        {current}
                      </span>
                    </div>
                    {/* kineforge (highlighted) */}
                    <div className="bg-ds-primary/[0.07] px-4 py-3.5">
                      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.12em] text-ds-accent md:hidden">
                        Kineforge concept
                      </span>
                      <span className="flex items-start gap-2 text-[13px] font-medium text-ds-text">
                        <Check size={13} className="mt-0.5 shrink-0 text-ds-accent" />
                        {kineforge}
                      </span>
                    </div>
                    {/* future */}
                    <div className="bg-ds-surface/70 px-4 py-3.5">
                      <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.12em] text-ds-secondary md:hidden">
                        Future research goal
                      </span>
                      <span className="flex items-start gap-2 text-[13px] text-ds-muted">
                        <FlaskConical size={13} className="mt-0.5 shrink-0 text-ds-secondary" />
                        {future}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-ds-faint">
                <span className="inline-flex items-center gap-1.5">
                  <Check size={12} className="text-ds-accent" /> Available in the concept
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FlaskConical size={12} className="text-ds-secondary" /> Research goal — not built
                </span>
              </p>
            </Reveal>
          </section>

          {/* Use cases */}
          <section className="py-20">
            <Reveal>
              <Kicker>Where it fits</Kicker>
              <h2 className="max-w-2xl text-balance text-3xl font-bold leading-tight text-ds-text sm:text-4xl">
                Built for people who explain the deep past.
              </h2>
            </Reveal>
            <div className="mt-10 flex flex-wrap gap-3">
              {USE_CASES.map(({ icon: Icon, label }, i) => (
                <Reveal as="div" key={label} delay={(i % 3) * 0.06}>
                  <span className="inline-flex items-center gap-2.5 rounded-full border border-ds-border bg-ds-surface/70 px-4 py-2.5 text-sm font-medium text-ds-text transition-colors hover:border-ds-primary/40 hover:text-ds-accent">
                    <Icon size={16} className="text-ds-accent" />
                    {label}
                  </span>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Roadmap */}
          <section id="roadmap" className="scroll-mt-8 py-20">
            <Reveal>
              <Kicker>The roadmap</Kicker>
              <h2 className="max-w-2xl text-balance text-3xl font-bold leading-tight text-ds-text sm:text-4xl">
                A path from concept to creature motion.
              </h2>
            </Reveal>
            <Reveal as="div" className="mt-10">
              <ol className="relative space-y-3 before:absolute before:bottom-6 before:left-[23px] before:top-6 before:w-px before:bg-ds-border">
                {ROADMAP.map(({ icon: Icon, title, state }, i) => {
                  const s = ROADMAP_STATE[state];
                  return (
                    <li key={title} className="relative flex items-center gap-4">
                      <span
                        className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${s.node}`}
                      >
                        <Icon size={19} />
                      </span>
                      <div className="kf-panel flex flex-1 flex-wrap items-center justify-between gap-2 px-4 py-3.5">
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ds-faint">
                            Phase {i + 1}
                          </p>
                          <h3 className="text-sm font-semibold text-ds-text sm:text-base">
                            {title}
                          </h3>
                        </div>
                        <span
                          className={`shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] ${s.cls}`}
                        >
                          {s.label}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </Reveal>
          </section>

          {/* What feedback I need */}
          <section id="feedback" className="scroll-mt-8 py-20">
            <Reveal>
              <Kicker>What feedback I need</Kicker>
              <h2 className="max-w-2xl text-balance text-3xl font-bold leading-tight text-ds-text sm:text-4xl">
                Five questions worth more than a thumbs-up.
              </h2>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-ds-muted">
                If you make 3D, science video, or paleo content, these are the
                answers that would shape what gets built next.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {FEEDBACK_QUESTIONS.map((q, i) => (
                <Reveal as="div" key={q} delay={(i % 2) * 0.06}>
                  <div className="kf-panel flex h-full items-start gap-3 p-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ds-primary/12 text-[12px] font-bold text-ds-accent">
                      {i + 1}
                    </span>
                    <p className="text-pretty text-sm leading-relaxed text-ds-text">{q}</p>
                  </div>
                </Reveal>
              ))}
              <Reveal as="div" delay={0.06}>
                <a
                  href={FEEDBACK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cta="kineforge_questions_form"
                  data-cta-kind="secondary"
                  data-cta-placement="kineforge_feedback_questions"
                  className="ds-focus flex h-full items-center justify-center gap-2 rounded-[var(--radius-ds)] border border-dashed border-ds-primary/40 bg-ds-primary/[0.05] p-4 text-sm font-semibold text-ds-accent transition-colors hover:bg-ds-primary/10"
                >
                  <HelpCircle size={16} />
                  Answer these in the feedback form
                  <ArrowRight size={15} />
                </a>
              </Reveal>
            </div>

            {/* Quick intent signals */}
            <Reveal as="div" className="mt-8">
              <div className="kf-lit rounded-[var(--radius-ds-lg)] border border-ds-border bg-ds-surface/50 px-6 py-8 text-center">
                <p className="mb-5 text-sm font-medium text-ds-muted">
                  Or leave a one-tap reaction:
                </p>
                <KineforgeFeedback />
              </div>
            </Reveal>
          </section>

          {/* Final CTA */}
          <section className="py-24">
            <Reveal>
              <div className="kf-lit flex flex-col items-center gap-6 rounded-[var(--radius-ds-xl)] border border-ds-primary/25 bg-ds-surface/50 px-6 py-14 text-center shadow-[var(--shadow-ds-glow)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ds-primary/15 text-ds-accent">
                  <Sparkles size={24} />
                </span>
                <h2 className="max-w-2xl text-balance text-3xl font-bold leading-tight text-ds-text sm:text-4xl">
                  Help shape Kineforge.
                </h2>
                <p className="max-w-xl text-pretty text-base leading-relaxed text-ds-muted">
                  It&apos;s a concept, not a finished product — your feedback
                  decides what&apos;s worth building first.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={FEEDBACK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta="share_feedback"
                    data-cta-kind="primary"
                    data-cta-placement="kineforge_final_cta"
                    className="ds-focus ench-cta"
                  >
                    <MessageSquareHeart size={16} />
                    Share feedback on Kineforge
                  </a>
                  <Link
                    href="#concept-demo"
                    data-cta="explore_concept_demo"
                    data-cta-kind="secondary"
                    data-cta-placement="kineforge_final_cta"
                    className="ds-focus inline-flex items-center gap-2 rounded-[var(--radius-ds)] border border-ds-border-strong px-5 py-3 text-sm font-semibold text-ds-text transition-colors hover:border-ds-primary hover:text-ds-accent"
                  >
                    <Clapperboard size={16} />
                    Explore the concept demo
                  </Link>
                  <Link
                    href="/"
                    data-cta="view_enchiridion"
                    data-cta-kind="secondary"
                    data-cta-placement="kineforge_final_cta"
                    className="ds-focus inline-flex items-center gap-2 rounded-[var(--radius-ds)] border border-ds-border-strong px-5 py-3 text-sm font-semibold text-ds-text transition-colors hover:border-ds-primary hover:text-ds-accent"
                  >
                    <Compass size={16} />
                    View Enchiridion
                  </Link>
                </div>
              </div>
            </Reveal>
          </section>
        </div>
      </main>

      {/* Slim footer back to Enchiridion */}
      <footer className="kf-aurora border-t border-ds-border">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/enchiridion-logo.png"
              alt=""
              aria-hidden
              className="h-7 w-7 rounded-full object-contain"
            />
            <p className="text-sm text-ds-muted">
              Kineforge is a concept tool from{" "}
              <Link href="/" className="ds-focus font-semibold text-ds-text hover:text-ds-accent">
                {BRAND_NAME}
              </Link>
              .
            </p>
          </div>
          <div className="flex items-center gap-5 text-sm">
            <Link
              href="/"
              className="ds-focus inline-flex items-center gap-1.5 text-ds-muted transition-colors hover:text-ds-accent"
            >
              Back to Enchiridion <ArrowRight size={14} />
            </Link>
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ds-focus text-ds-muted transition-colors hover:text-ds-accent"
            >
              {CHANNEL_HANDLE}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
