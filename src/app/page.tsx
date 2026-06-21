import Link from "next/link";
import {
  ArrowRight,
  Library,
  Route,
  Boxes,
  MessagesSquare,
  Brain,
  Rocket,
  Zap,
  Network,
  Eye,
  GitBranch,
  Layers,
  FileStack,
  ScrollText,
  StickyNote,
  HelpCircle,
  X,
  Check,
  Sparkles,
  Compass,
  Heart,
  Briefcase,
  Palette,
  Clapperboard,
  Film,
} from "lucide-react";
import { SkullHero } from "@/components/landing/SkullHero";
import { LearningLoop } from "@/components/landing/LearningLoop";
import { ExpeditionDemo } from "@/components/landing/ExpeditionDemo";
import { ChannelBand } from "@/components/landing/ChannelBand";
import { ModulesRoadmap } from "@/components/landing/ModulesRoadmap";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { Reveal } from "@/components/landing/Reveal";
import { WaitlistButton } from "@/components/landing/WaitlistButton";
import { FeedbackButton } from "@/components/FeedbackButton";
import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";

/* The scattered-information problem — what learning feels like today. */
const FRICTION = [
  { icon: FileStack, label: "27 open tabs" },
  { icon: ScrollText, label: "Papers you can't parse" },
  { icon: StickyNote, label: "Notes you never revisit" },
  { icon: HelpCircle, label: "Jargon with no map" },
];

/* The "we're not that" reframe. */
const NOT_THIS = [
  "Not another content library to drown in.",
  "Not another notes app to maintain.",
  "Not another chatbot that forgets you tomorrow.",
];

/* The specialized agent team that runs each expedition. */
const AGENTS = [
  {
    icon: Library,
    name: "Research Librarian",
    role: "Gathers and organizes trustworthy sources — so you start from signal, not a search bar.",
  },
  {
    icon: Route,
    name: "Curriculum Architect",
    role: "Sequences a path from where you are to the outcome you want, one branch at a time.",
  },
  {
    icon: Boxes,
    name: "Visual Explainer",
    role: "Turns complex ideas into 3D scenes, diagrams, and timelines you can actually see.",
  },
  {
    icon: MessagesSquare,
    name: "Socratic Tutor",
    role: "Asks the right questions and adapts difficulty to how you're really doing.",
  },
  {
    icon: Brain,
    name: "Memory Coach",
    role: "Builds recall, review, and spaced repetition so understanding becomes durable.",
  },
  {
    icon: Rocket,
    name: "Output Agent",
    role: "Turns learning into essays, videos, presentations, study guides, or creative projects.",
  },
];

/* Outcome cards — what you walk away with, not what buttons exist. */
const OUTCOMES = [
  {
    icon: Zap,
    title: "Understand difficult topics faster",
    desc: "A guided path replaces the cold-start scramble through tabs and jargon.",
  },
  {
    icon: Network,
    title: "See the structure of a subject",
    desc: "Watch how ideas connect instead of collecting disconnected facts.",
  },
  {
    icon: Eye,
    title: "Learn visually, not passively",
    desc: "3D scenes, diagrams, and timelines do the explaining words can't.",
  },
  {
    icon: GitBranch,
    title: "Build a living knowledge tree",
    desc: "Everything you learn becomes a connected, growing map you own.",
  },
  {
    icon: Brain,
    title: "Remember through active recall",
    desc: "Spaced challenges turn one-time lessons into knowledge that lasts.",
  },
  {
    icon: Palette,
    title: "Turn research into creative output",
    desc: "Finish with something real — an essay, a script, a study guide, a project.",
  },
];

/* The broader Ailiur ecosystem Enchiridion belongs to. */
const ECOSYSTEM = [
  { icon: Compass, label: "Learning", active: true },
  { icon: Heart, label: "Health" },
  { icon: Palette, label: "Creativity" },
  { icon: Briefcase, label: "Work" },
];

// Shared section heading.
function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2 text-ds-secondary">
      <span className="h-px w-8 bg-ds-border-strong" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em]">
        {children}
      </span>
    </div>
  );
}

export default function LandingPage() {
  return (
    <>
      {/* Landing-only: fire scroll-depth milestones (25/50/75/100%). */}
      <ScrollDepthTracker />

      {/* 1 — Cinematic hero (preserved identity, service-first copy) */}
      <SkullHero />

      <main className="ench-aurora relative overflow-hidden">
        {/* Subtle topographic dot texture */}
        <div className="ench-dots pointer-events-none absolute inset-0 opacity-70" />

        <div className="relative mx-auto flex max-w-5xl flex-col px-6 pb-4 pt-16">
          {/* Thesis bridge from the cinematic hero into the service pitch */}
          <Reveal>
            <SectionEyebrow>The thesis</SectionEyebrow>
            <p className="max-w-3xl text-balance text-2xl font-bold leading-snug tracking-tight text-ds-text sm:text-3xl">
              Enchiridion doesn&apos;t just show you information. It turns{" "}
              <span className="text-ds-primary">curiosity into structured understanding</span>
              .
            </p>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-ds-muted">
              Choose a subject. Enchiridion builds the path, teaches it visually,
              tests your understanding, and turns it into durable knowledge — like
              having a personal research team for anything you want to learn.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/demo"
                className="ds-focus ench-cta"
                data-cta="start_expedition"
                data-cta-kind="primary"
                data-cta-placement="thesis"
              >
                Start a learning expedition
                <ArrowRight size={16} />
              </Link>
              <Link
                href="#expedition"
                className="ds-focus inline-flex items-center gap-2 rounded-[var(--radius-ds)] border border-ds-border-strong px-5 py-3 text-sm font-semibold text-ds-text transition-colors hover:border-ds-primary hover:text-ds-accent"
                data-cta="explore_demo"
                data-cta-kind="secondary"
                data-cta-placement="thesis"
              >
                Explore the demo
              </Link>
            </div>
            <p className="mt-3 text-xs text-ds-faint">
              From prehistoric life to any complex topic · runs in your browser
            </p>
          </Reveal>

          {/* 1b — Channel connection (the interactive arm of the YouTube channel) */}
          <Reveal as="div" className="pt-12">
            <ChannelBand />
          </Reveal>

          {/* 2 — The Problem */}
          <section className="py-16">
            <Reveal>
              <SectionEyebrow>The problem</SectionEyebrow>
              <h2 className="max-w-2xl text-balance text-2xl font-bold leading-tight text-ds-text sm:text-3xl">
                Information isn&apos;t scarce. It&apos;s scattered.
              </h2>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-ds-muted">
                You don&apos;t struggle to learn because the answers are missing.
                You struggle because they&apos;re spread across videos, papers,
                tabs, notes, and diagrams — with no clear path from curiosity to
                understanding.
              </p>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {FRICTION.map(({ icon: Icon, label }, i) => (
                <Reveal as="div" key={label} delay={i * 0.06}>
                  <div className="flex h-full flex-col gap-2.5 rounded-[var(--radius-ds)] border border-dashed border-ds-border-strong bg-ds-surface/50 p-4">
                    <Icon size={18} className="text-ds-faint" />
                    <p className="text-sm font-medium text-ds-muted">{label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* 3 — The New Frame */}
          <section className="py-16">
            <Reveal>
              <SectionEyebrow>The new frame</SectionEyebrow>
              <h2 className="max-w-2xl text-balance text-2xl font-bold leading-tight text-ds-text sm:text-3xl">
                A personal knowledge service.
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              <Reveal as="div">
                <ul className="flex h-full flex-col justify-center gap-3 rounded-[var(--radius-ds-lg)] border border-ds-border bg-ds-surface/60 p-6">
                  {NOT_THIS.map((line) => (
                    <li key={line} className="flex items-start gap-3 text-ds-muted">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ds-danger/15 text-ds-danger">
                        <X size={12} />
                      </span>
                      <span className="text-sm leading-relaxed">{line}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal as="div" delay={0.08}>
                <div className="flex h-full flex-col justify-center gap-3 rounded-[var(--radius-ds-lg)] border border-ds-primary/30 bg-ds-primary/[0.06] p-6 ds-glow">
                  <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-ds-sm)] bg-ds-primary/20 text-ds-accent">
                    <Check size={18} />
                  </span>
                  <p className="text-lg font-semibold leading-snug text-ds-text">
                    A guided learning service that builds the path, teaches
                    visually, checks your understanding, and grows your knowledge
                    tree.
                  </p>
                  <p className="text-sm leading-relaxed text-ds-muted">
                    Think personal knowledge autopilot — specialized AI agents
                    working together on whatever you decide to learn next.
                  </p>
                </div>
              </Reveal>
            </div>
          </section>

          {/* 4 — Learning Service Loop */}
          <section id="how-it-works" className="scroll-mt-8 py-16">
            <Reveal>
              <SectionEyebrow>How it works</SectionEyebrow>
              <h2 className="max-w-2xl text-balance text-2xl font-bold leading-tight text-ds-text sm:text-3xl">
                The learning service loop.
              </h2>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-ds-muted">
                Each step is a service running for you — curiosity goes in,
                durable understanding comes out, and the loop keeps growing your
                knowledge tree.
              </p>
            </Reveal>
            <div className="mt-8">
              <LearningLoop />
            </div>
          </section>

          {/* 5 — Agent Team */}
          <section className="py-16">
            <Reveal>
              <SectionEyebrow>Your team</SectionEyebrow>
              <h2 className="max-w-2xl text-balance text-2xl font-bold leading-tight text-ds-text sm:text-3xl">
                Six specialists. One expedition.
              </h2>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-ds-muted">
                Behind every lesson is a team of AI agents with distinct jobs —
                the way a real research group divides the work.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {AGENTS.map(({ icon: Icon, name, role }, i) => (
                <Reveal
                  as="div"
                  key={name}
                  delay={(i % 3) * 0.06}
                  trackCard={`agent:${name}`}
                >
                  <div className="ench-card ench-card-interactive flex h-full flex-col p-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-ds-sm)] bg-ds-secondary/15 text-ds-secondary">
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-3.5 text-sm font-semibold text-ds-text">
                      {name}
                    </h3>
                    <p className="mt-1.5 text-pretty text-xs leading-relaxed text-ds-muted">
                      {role}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* 6 — Interactive Demo */}
          <section id="expedition" className="scroll-mt-8 py-16">
            <Reveal>
              <SectionEyebrow>Try it</SectionEyebrow>
              <h2 className="max-w-2xl text-balance text-2xl font-bold leading-tight text-ds-text sm:text-3xl">
                Plan a sample expedition.
              </h2>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-ds-muted">
                Pick a subject and a goal. Enchiridion sketches the research map,
                the key questions, a visual lesson, your knowledge tree, a recall
                challenge, and what you&apos;d create at the end.
              </p>
            </Reveal>
            <div className="mt-8">
              <ExpeditionDemo />
            </div>
          </section>

          {/* 7 — Outcome Cards */}
          <section className="py-16">
            <Reveal>
              <SectionEyebrow>What you get</SectionEyebrow>
              <h2 className="max-w-2xl text-balance text-2xl font-bold leading-tight text-ds-text sm:text-3xl">
                Outcomes, not features.
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {OUTCOMES.map(({ icon: Icon, title, desc }, i) => (
                <Reveal
                  as="div"
                  key={title}
                  delay={(i % 3) * 0.06}
                  trackCard={`outcome:${title}`}
                >
                  <div className="ench-card ench-card-interactive flex h-full flex-col p-5">
                    <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-ds-sm)] bg-ds-primary/12 text-ds-accent">
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-3.5 text-sm font-semibold text-ds-text">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-pretty text-xs leading-relaxed text-ds-muted">
                      {desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* 8 — Prehistory Proof */}
          <section className="py-16">
            <Reveal as="div">
              <div className="overflow-hidden rounded-[var(--radius-ds-lg)] border border-ds-primary/30 bg-ds-surface/70 ds-glow">
                <div className="relative h-32 ds-grid-bg">
                  <div className="absolute inset-0 bg-gradient-to-br from-ds-primary/25 via-ds-secondary/15 to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <p className="text-[11px] uppercase tracking-wider text-ds-accent">
                      Proof use case
                    </p>
                    <h2 className="text-2xl font-bold text-ds-text">
                      Built first for prehistoric life.
                    </h2>
                  </div>
                </div>
                <div className="grid gap-5 p-6 md:grid-cols-2">
                  <div>
                    <p className="text-pretty text-sm leading-relaxed text-ds-muted">
                      Dinosaurs, extinct ecosystems, deep anatomy, geological
                      time, scientific uncertainty, and live debate make
                      prehistory one of the hardest subjects to learn visually —
                      which makes it the perfect first vertical for Enchiridion.
                    </p>
                    <p className="mt-3 text-pretty text-sm leading-relaxed text-ds-muted">
                      Spin a real Spinosaurus reconstruction, scrub a century of
                      changing science, and see how the same service scales to any
                      complex subject.
                    </p>
                    <Link
                      href="/demo"
                      className="ds-focus ench-cta mt-5"
                      data-cta="spinosaurus_expedition"
                      data-cta-kind="primary"
                      data-cta-placement="prehistory_proof"
                    >
                      Explore the Spinosaurus expedition
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                  <ul className="grid grid-cols-2 gap-2.5 self-start">
                    {[
                      { icon: Boxes, label: "3D anatomy" },
                      { icon: Layers, label: "Reconstructions over time" },
                      { icon: HelpCircle, label: "Evidence vs. debate" },
                      { icon: Network, label: "Knowledge tree" },
                    ].map(({ icon: Icon, label }) => (
                      <li
                        key={label}
                        className="flex items-center gap-2.5 rounded-[var(--radius-ds)] border border-ds-border bg-ds-surface px-3 py-3 text-sm text-ds-text shadow-ds"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--radius-ds-sm)] bg-ds-primary/12 text-ds-accent">
                          <Icon size={15} />
                        </span>
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </section>

          {/* 8b — Modules roadmap (the first five interactive lessons) */}
          <section id="modules" className="scroll-mt-8 py-16">
            <Reveal as="div">
              <ModulesRoadmap />
            </Reveal>
          </section>

          {/* 8c — Creator tools: Kineforge (sibling concept tool) */}
          <section id="tools" className="scroll-mt-8 py-16">
            <Reveal>
              <SectionEyebrow>Creator tools</SectionEyebrow>
              <h2 className="max-w-2xl text-balance text-2xl font-bold leading-tight text-ds-text sm:text-3xl">
                Tools that turn the science into shots.
              </h2>
              <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-ds-muted">
                The same world, in a creator&apos;s hands. Kineforge is an
                early companion tool for directing prehistoric 3D scenes.
              </p>
            </Reveal>

            <Reveal as="div" className="mt-8">
              {/* A volcanic preview panel — Kineforge's own art direction, dropped
                  into the teal page so the sub-brand reads at a glance. */}
              <Link
                href="/kineforge"
                data-cta="open_kineforge"
                data-cta-kind="primary"
                data-cta-placement="home_tools"
                className="ds-focus group grid items-stretch gap-0 overflow-hidden rounded-[var(--radius-ds-lg)] border border-[#3c2f22] bg-[#0c0a08] shadow-ds transition-shadow hover:shadow-[0_20px_50px_rgba(245,165,36,0.18)] sm:grid-cols-[1.4fr_1fr]"
              >
                <div className="relative p-7 sm:p-9">
                  <div
                    className="pointer-events-none absolute inset-0"
                    aria-hidden
                    style={{
                      backgroundImage:
                        "radial-gradient(70% 60% at 12% 0%, rgba(245,165,36,0.16), transparent 70%), radial-gradient(60% 60% at 95% 100%, rgba(45,212,191,0.12), transparent 70%)",
                    }}
                  />
                  <div className="relative">
                    <span className="inline-flex items-center gap-2 rounded-full border border-[#f5a52440] bg-[#f5a5241a] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ffc04d]">
                      <Sparkles size={13} /> New concept tool
                    </span>
                    <h3
                      className="mt-4 text-2xl font-black tracking-tight text-[#f3ebdd] sm:text-3xl"
                      style={{ fontFamily: "'Zimula Trial Bd', var(--font-fredoka), sans-serif" }}
                    >
                      Kineforge
                    </h3>
                    <p className="mt-2 max-w-md text-pretty text-sm leading-relaxed text-[#c4b6a2]">
                      Direct prehistoric 3D scenes with AI — assemble rigs,
                      animation clips, cameras, and cinematic shots for Unreal
                      Engine. An honest concept prototype.
                    </p>
                    <span className="ench-cta mt-6 bg-[#f5a524] text-[#1a1206] group-hover:bg-[#ffc04d]">
                      Explore Kineforge
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>

                {/* Cinematic thumbnail */}
                <div className="relative min-h-[180px] overflow-hidden border-t border-[#3c2f22] sm:border-l sm:border-t-0">
                  <div
                    className="absolute inset-0"
                    aria-hidden
                    style={{
                      background:
                        "radial-gradient(110% 90% at 70% 20%, #211913 0%, #14100c 50%, #0a0807 100%)",
                    }}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/spino-skull.png"
                    alt=""
                    aria-hidden
                    className="absolute -right-6 bottom-0 w-[90%] max-w-[360px] object-contain opacity-90 [filter:drop-shadow(0_10px_30px_rgba(0,0,0,0.6))_drop-shadow(0_0_28px_rgba(245,165,36,0.25))] transition-transform duration-500 group-hover:-translate-y-1"
                  />
                  <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-[#f5a52433] bg-[#0c0a08cc] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#ffc04d] backdrop-blur">
                    <Film size={11} /> Concept
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full border border-[#2dd4bf33] bg-[#0c0a08cc] px-2.5 py-1 text-[10px] font-semibold text-[#7fe6d6] backdrop-blur">
                    <Clapperboard size={11} /> Unreal Engine
                  </div>
                </div>
              </Link>
            </Reveal>
          </section>

          {/* 9 — Ailiur Ecosystem */}
          <section className="py-16">
            <Reveal as="div">
              <div className="rounded-[var(--radius-ds-lg)] border border-ds-border bg-ds-surface/60 p-7 sm:p-9">
                <SectionEyebrow>The ecosystem</SectionEyebrow>
                <h2 className="max-w-2xl text-balance text-2xl font-bold leading-tight text-ds-text sm:text-3xl">
                  The learning context layer of Ailiur.
                </h2>
                <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-ds-muted">
                  Enchiridion is part of a broader AI service ecosystem — a shared
                  personal context across health, learning, creativity, and work.
                  What you learn here informs the rest of your world.
                </p>
                <div className="mt-7 flex flex-wrap gap-2.5">
                  {ECOSYSTEM.map(({ icon: Icon, label, active }) => (
                    <span
                      key={label}
                      className={
                        active
                          ? "inline-flex items-center gap-2 rounded-full border border-ds-primary/40 bg-ds-primary/12 px-4 py-2 text-sm font-semibold text-ds-accent"
                          : "inline-flex items-center gap-2 rounded-full border border-ds-border bg-ds-surface-2 px-4 py-2 text-sm font-medium text-ds-muted"
                      }
                    >
                      <Icon size={15} />
                      {label}
                      {active && (
                        <span className="rounded-full bg-ds-primary/20 px-1.5 py-0.5 text-[10px] uppercase tracking-wide">
                          You are here
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>

          {/* 10 — Final CTA */}
          <section className="flex flex-col items-center gap-5 py-20 text-center">
            <Reveal>
              <Sparkles size={22} className="mx-auto text-ds-accent" />
              <h2 className="mt-3 text-balance text-3xl font-bold leading-tight text-ds-text sm:text-4xl">
                Stop collecting information.
                <br className="hidden sm:block" />{" "}
                <span className="text-ds-primary">Start building understanding.</span>
              </h2>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/demo"
                  className="ds-focus ench-cta"
                  data-cta="start_expedition"
                  data-cta-kind="primary"
                  data-cta-placement="final_cta"
                >
                  Start a learning expedition
                  <ArrowRight size={16} />
                </Link>
                <WaitlistButton variant="outline" placement="final_cta" />
                <FeedbackButton variant="outline" placement="final_cta" />
              </div>
              <p className="mt-3 text-xs text-ds-faint">
                No sign-up · runs in your browser · your feedback shapes what we
                build next
              </p>
            </Reveal>
          </section>
        </div>
      </main>

      {/* Footer — in-page nav, channel link, and the conversion CTAs */}
      <SiteFooter />
    </>
  );
}
