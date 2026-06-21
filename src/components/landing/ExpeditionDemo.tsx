"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Map,
  HelpCircle,
  Boxes,
  Network,
  Brain,
  Rocket,
  Sparkles,
  Loader2,
  ChevronRight,
  Check,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/cn";

/* ----------------------------------------------------------------------------
   Mock data — no backend. Each topic carries the raw material; each goal
   re-frames the lesson lens, the tutor focus, and the suggested output. The
   generator composes a believable "Learning Expedition" from the two.
---------------------------------------------------------------------------- */

type TopicKey =
  | "spinosaurus"
  | "megalodon"
  | "human-evolution"
  | "ancient-oceans"
  | "custom";

interface TopicSeed {
  key: TopicKey;
  label: string;
  tag: string;
  /** Research map — clusters of sources the Research Librarian would gather. */
  researchMap: { branch: string; sources: string }[];
  questions: [string, string, string];
  lessonTitle: string;
  lessonScene: string;
  treeNodes: string[];
  recall: { q: string; a: string };
}

const TOPIC_SEEDS: Record<Exclude<TopicKey, "custom">, TopicSeed> = {
  spinosaurus: {
    key: "spinosaurus",
    label: "Spinosaurus",
    tag: "Prehistoric life",
    researchMap: [
      { branch: "Anatomy & the sail", sources: "Stromer 1915, Ibrahim 2014–2020" },
      { branch: "Aquatic-life debate", sources: "Tail biomechanics · isotope studies" },
      { branch: "Kem Kem ecosystem", sources: "Cretaceous North Africa fauna" },
    ],
    questions: [
      "Was Spinosaurus a swimmer, a wader, or a shoreline hunter?",
      "What did the sail actually do — display, thermoregulation, or both?",
      "Why is the original holotype lost, and how was it reconstructed?",
    ],
    lessonTitle: "The river monster, rebuilt from fragments",
    lessonScene: "Orbit the cranium · scrub reconstructions 1915 → 2026",
    treeNodes: [
      "Spinosauridae",
      "Aquatic adaptations",
      "Cretaceous North Africa",
      "Theropod evolution",
    ],
    recall: {
      q: "What single 2020 discovery reignited the aquatic-Spinosaurus debate?",
      a: "A near-complete, paddle-like tail — evidence for active underwater propulsion.",
    },
  },
  megalodon: {
    key: "megalodon",
    label: "Megalodon",
    tag: "Prehistoric life",
    researchMap: [
      { branch: "Body-size estimates", sources: "Tooth allometry · vertebral models" },
      { branch: "Why it went extinct", sources: "Climate cooling · prey collapse" },
      { branch: "Relatives, not ancestors", sources: "Otodontid lineage vs. great whites" },
    ],
    questions: [
      "How do we estimate a 50-foot body from mostly teeth?",
      "Was Megalodon warm-blooded — and did that doom it?",
      "Why is the great white NOT its descendant?",
    ],
    lessonTitle: "Reconstructing a giant from teeth alone",
    lessonScene: "Scale a human against the jaw · compare tooth sets",
    treeNodes: [
      "Otodontidae",
      "Body-size estimation",
      "Neogene oceans",
      "Marine extinctions",
    ],
    recall: {
      q: "Why can't we build a full Megalodon skeleton from fossils?",
      a: "Cartilage rarely fossilizes — mostly teeth and a few vertebrae survive.",
    },
  },
  "human-evolution": {
    key: "human-evolution",
    label: "Human Evolution",
    tag: "Deep time",
    researchMap: [
      { branch: "The hominin family tree", sources: "Australopithecus → Homo" },
      { branch: "Walking upright", sources: "Pelvis, foot & spine changes" },
      { branch: "Brains, tools & fire", sources: "Encephalization · Oldowan tools" },
    ],
    questions: [
      "Why did walking upright come before big brains?",
      "Are Neanderthals our ancestors, our cousins, or both?",
      "What does 'missing link' actually get wrong?",
    ],
    lessonTitle: "Six million years, one upright walk",
    lessonScene: "Morph skull A → B · trace the bipedal pelvis",
    treeNodes: [
      "Bipedalism",
      "Australopithecus",
      "Genus Homo",
      "Cognitive revolution",
    ],
    recall: {
      q: "Which came first in human evolution: large brains or upright walking?",
      a: "Upright walking — bipedalism predates major brain expansion by millions of years.",
    },
  },
  "ancient-oceans": {
    key: "ancient-oceans",
    label: "Ancient Oceans",
    tag: "Deep time",
    researchMap: [
      { branch: "The Cambrian explosion", sources: "Burgess Shale fauna" },
      { branch: "Marine reptiles", sources: "Ichthyosaurs · plesiosaurs · mosasaurs" },
      { branch: "Mass extinctions", sources: "End-Permian · end-Cretaceous" },
    ],
    questions: [
      "Why did complex life erupt so suddenly in the Cambrian?",
      "How did reptiles come to rule the seas — twice?",
      "What ocean chemistry triggers a mass extinction?",
    ],
    lessonTitle: "500 million years beneath the waves",
    lessonScene: "Dive a Paleozoic reef · layer geological time",
    treeNodes: [
      "Cambrian explosion",
      "Marine reptiles",
      "Ocean chemistry",
      "Extinction events",
    ],
    recall: {
      q: "What event ~252 Ma killed ~90% of marine species?",
      a: "The end-Permian extinction — the 'Great Dying', the largest in Earth's history.",
    },
  },
};

interface Goal {
  id: string;
  label: string;
  lessonLens: string;
  tutorFocus: string;
  output: string;
}

const GOALS: Goal[] = [
  {
    id: "overview",
    label: "Beginner overview",
    lessonLens: "Plain-language tour, no jargon",
    tutorFocus: "checks the big ideas first",
    output: "A one-page illustrated explainer you could teach from.",
  },
  {
    id: "deep-research",
    label: "Deep research",
    lessonLens: "Source-traced, evidence vs. debate",
    tutorFocus: "presses on uncertainty and competing claims",
    output: "An annotated research brief with citations and open questions.",
  },
  {
    id: "visual",
    label: "Visual reconstruction",
    lessonLens: "3D model, layers, and timeline scrub",
    tutorFocus: "asks you to read the anatomy directly",
    output: "An interactive 3D scene with labeled, comparable reconstructions.",
  },
  {
    id: "video",
    label: "Video script",
    lessonLens: "Story beats and visual cues",
    tutorFocus: "tightens your hook and narrative arc",
    output: "A shot-by-shot video script with B-roll and on-screen prompts.",
  },
  {
    id: "exam",
    label: "Exam prep",
    lessonLens: "Testable claims and definitions",
    tutorFocus: "drills the points most likely to be assessed",
    output: "A spaced-repetition deck plus a practice-question set.",
  },
];

const TOPIC_OPTIONS: { key: TopicKey; label: string }[] = [
  { key: "spinosaurus", label: "Spinosaurus" },
  { key: "megalodon", label: "Megalodon" },
  { key: "human-evolution", label: "Human Evolution" },
  { key: "ancient-oceans", label: "Ancient Oceans" },
  { key: "custom", label: "Custom topic" },
];

/** Build a custom seed from a free-text topic the visitor types. */
function customSeed(name: string): TopicSeed {
  const t = name.trim() || "your topic";
  return {
    key: "custom",
    label: t,
    tag: "Any subject",
    researchMap: [
      { branch: `Foundations of ${t}`, sources: "Core concepts & definitions" },
      { branch: "What's settled vs. debated", sources: "Evidence map" },
      { branch: `${t} in context`, sources: "Connections to adjacent fields" },
    ],
    questions: [
      `What's the single biggest misconception about ${t}?`,
      `What evidence would change an expert's mind on ${t}?`,
      `How does ${t} connect to what you already know?`,
    ],
    lessonTitle: `${t}, made visual and structured`,
    lessonScene: "Adaptive scene · diagram · timeline",
    treeNodes: [
      `${t}: foundations`,
      `${t}: key debates`,
      `${t}: applications`,
      "Adjacent concepts",
    ],
    recall: {
      q: `In one sentence, what is the core idea of ${t}?`,
      a: "Enchiridion drafts a model answer from your expedition, then quizzes you on it.",
    },
  };
}

type Phase = "idle" | "building" | "ready";

export function ExpeditionDemo() {
  const prefersReducedMotion = useReducedMotion();
  const [topicKey, setTopicKey] = useState<TopicKey>("spinosaurus");
  const [customTopic, setCustomTopic] = useState("");
  const [goalId, setGoalId] = useState<string>("overview");
  const [phase, setPhase] = useState<Phase>("idle");
  const [revealRecall, setRevealRecall] = useState(false);

  const goal = useMemo(() => GOALS.find((g) => g.id === goalId)!, [goalId]);
  const seed = useMemo(
    () =>
      topicKey === "custom"
        ? customSeed(customTopic)
        : TOPIC_SEEDS[topicKey as Exclude<TopicKey, "custom">],
    [topicKey, customTopic]
  );

  const build = () => {
    setRevealRecall(false);
    setPhase("building");
    // Simulated "assembling your expedition" beat — no network.
    window.setTimeout(
      () => setPhase("ready"),
      prefersReducedMotion ? 150 : 900
    );
  };

  const stagger = (i: number) =>
    prefersReducedMotion
      ? { duration: 0.2 }
      : { duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="overflow-hidden rounded-[var(--radius-ds-lg)] border border-ds-border bg-ds-surface/80 shadow-ds backdrop-blur">
      {/* Control surface */}
      <div className="border-b border-ds-border bg-ds-surface-2/60 p-5 sm:p-6">
        <div className="flex items-center gap-2 text-ds-accent">
          <Sparkles size={15} />
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">
            Plan an expedition
          </span>
        </div>

        {/* Topic */}
        <fieldset className="mt-4">
          <legend className="mb-2 text-xs font-semibold text-ds-muted">
            1 · Choose a subject
          </legend>
          <div className="flex flex-wrap gap-2">
            {TOPIC_OPTIONS.map((t) => (
              <button
                key={t.key}
                type="button"
                aria-pressed={topicKey === t.key}
                onClick={() => {
                  setTopicKey(t.key);
                  setPhase("idle");
                }}
                className={cn("ench-chip", topicKey === t.key && "ench-chip-active")}
              >
                {t.label}
              </button>
            ))}
          </div>
          {topicKey === "custom" && (
            <input
              type="text"
              value={customTopic}
              onChange={(e) => {
                setCustomTopic(e.target.value);
                setPhase("idle");
              }}
              placeholder="e.g. Black holes, the Roman economy, CRISPR…"
              aria-label="Custom topic"
              className="ds-focus mt-3 w-full rounded-[var(--radius-ds-sm)] border border-ds-border bg-ds-surface-3 px-3 py-2.5 text-sm text-ds-text placeholder:text-ds-faint focus:outline-none focus:border-ds-primary"
            />
          )}
        </fieldset>

        {/* Goal */}
        <fieldset className="mt-5">
          <legend className="mb-2 text-xs font-semibold text-ds-muted">
            2 · Pick a learning goal
          </legend>
          <div className="flex flex-wrap gap-2">
            {GOALS.map((g) => (
              <button
                key={g.id}
                type="button"
                aria-pressed={goalId === g.id}
                onClick={() => {
                  setGoalId(g.id);
                  setPhase("idle");
                }}
                className={cn("ench-chip", goalId === g.id && "ench-chip-active")}
              >
                {g.label}
              </button>
            ))}
          </div>
        </fieldset>

        <button
          type="button"
          onClick={build}
          disabled={phase === "building"}
          className="ench-cta mt-6 w-full disabled:opacity-70 sm:w-auto"
        >
          {phase === "building" ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Assembling your expedition…
            </>
          ) : (
            <>
              <Sparkles size={16} />
              {phase === "ready" ? "Regenerate expedition" : "Generate expedition"}
            </>
          )}
        </button>
      </div>

      {/* Result surface */}
      <div className="p-5 sm:p-6">
        {phase !== "ready" ? (
            <motion.div
              key={phase}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center gap-2 py-12 text-center"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ds-primary/10 text-ds-accent">
                {phase === "building" ? (
                  <Loader2 size={22} className="animate-spin" />
                ) : (
                  <Map size={22} />
                )}
              </span>
              <p className="text-sm font-medium text-ds-text">
                {phase === "building"
                  ? "Routing your learning path…"
                  : "Your expedition will appear here"}
              </p>
              <p className="max-w-xs text-xs text-ds-muted">
                {phase === "building"
                  ? "Mapping sources, drafting questions, and growing your tree."
                  : "Pick a subject and a goal, then generate a sample path. (Demo data.)"}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-ds-text">
                  Expedition: {seed.label}
                </h3>
                <span className="ench-chip ench-chip-active">{goal.label}</span>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {/* Research map */}
                <ResultCard
                  transition={stagger(0)}
                  icon={<Map size={16} />}
                  title="Research map"
                >
                  <ul className="space-y-2">
                    {seed.researchMap.map((b) => (
                      <li key={b.branch} className="flex gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ds-primary" />
                        <div>
                          <p className="text-sm font-medium text-ds-text">
                            {b.branch}
                          </p>
                          <p className="text-xs text-ds-faint">{b.sources}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </ResultCard>

                {/* Key questions */}
                <ResultCard
                  transition={stagger(1)}
                  icon={<HelpCircle size={16} />}
                  title="3 key questions"
                >
                  <ol className="space-y-2">
                    {seed.questions.map((q, idx) => (
                      <li key={q} className="flex gap-2.5 text-sm text-ds-text">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ds-primary/15 font-mono text-[11px] text-ds-accent">
                          {idx + 1}
                        </span>
                        {q}
                      </li>
                    ))}
                  </ol>
                </ResultCard>

                {/* Visual lesson */}
                <ResultCard
                  transition={stagger(2)}
                  icon={<Boxes size={16} />}
                  title="Visual lesson"
                >
                  <p className="text-sm font-medium text-ds-text">
                    {seed.lessonTitle}
                  </p>
                  <p className="mt-1 text-xs text-ds-muted">{seed.lessonScene}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-ds-secondary/30 bg-ds-secondary/12 px-2.5 py-1 text-[11px] font-medium text-ds-secondary">
                    Lens · {goal.lessonLens}
                  </span>
                </ResultCard>

                {/* Knowledge tree */}
                <ResultCard
                  transition={stagger(3)}
                  icon={<Network size={16} />}
                  title="Knowledge tree"
                >
                  <div className="flex flex-wrap gap-2">
                    {seed.treeNodes.map((n, idx) => (
                      <span
                        key={n}
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
                          idx === 0
                            ? "border-ds-primary/40 bg-ds-primary/12 text-ds-accent"
                            : "border-ds-border bg-ds-surface-2 text-ds-muted"
                        )}
                      >
                        {idx === 0 ? <Check size={12} /> : <Lock size={11} />}
                        {n}
                      </span>
                    ))}
                  </div>
                  <p className="mt-2.5 text-xs text-ds-faint">
                    The first node unlocks now — each finished lesson opens the next.
                  </p>
                </ResultCard>
              </div>

              {/* Recall challenge — full width */}
              <ResultCard
                transition={stagger(4)}
                icon={<Brain size={16} />}
                title="Recall challenge"
              >
                <p className="text-sm text-ds-text">{seed.recall.q}</p>
                {revealRecall ? (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2.5 rounded-[var(--radius-ds-sm)] border border-ds-success/30 bg-ds-success/10 px-3 py-2.5 text-sm text-ds-text"
                  >
                    {seed.recall.a}
                  </motion.p>
                ) : (
                  <button
                    type="button"
                    onClick={() => setRevealRecall(true)}
                    className="ds-focus mt-3 inline-flex items-center gap-1.5 rounded-full border border-ds-border-strong px-3 py-1.5 text-xs font-semibold text-ds-text transition-colors hover:border-ds-primary hover:text-ds-accent"
                  >
                    Reveal answer
                    <ChevronRight size={13} />
                  </button>
                )}
              </ResultCard>

              {/* Suggested output — full width */}
              <ResultCard
                transition={stagger(5)}
                icon={<Rocket size={16} />}
                title="Suggested project / output"
                accent
              >
                <p className="text-sm text-ds-text">{goal.output}</p>
                <p className="mt-1 text-xs text-ds-muted">
                  The Socratic tutor {goal.tutorFocus} as you build it.
                </p>
              </ResultCard>

              <p className="pt-1 text-center text-[11px] text-ds-faint">
                Sample expedition · illustrative demo data
              </p>
            </motion.div>
          )}
      </div>
    </div>
  );
}

/* A single result card with staggered reveal. */
function ResultCard({
  icon,
  title,
  children,
  transition,
  accent = false,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  transition: object;
  accent?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
      className={cn(
        "rounded-[var(--radius-ds)] border p-4 shadow-ds",
        accent
          ? "border-ds-primary/30 bg-ds-primary/[0.06] ds-glow"
          : "border-ds-border bg-ds-surface"
      )}
    >
      <div className="mb-2.5 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-ds-sm)] bg-ds-surface-3 text-ds-accent">
          {icon}
        </span>
        <h4 className="text-xs font-semibold uppercase tracking-wide text-ds-muted">
          {title}
        </h4>
      </div>
      {children}
    </motion.div>
  );
}
