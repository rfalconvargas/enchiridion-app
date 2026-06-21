"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  Bone,
  Camera,
  Film,
  Clapperboard,
  Wand2,
  Sparkles,
  ScanLine,
  AlertTriangle,
  Check,
  ChevronDown,
  FileBarChart,
  ListChecks,
  Download,
  Rotate3d,
  Loader2,
  ArrowRight,
} from "lucide-react";
import {
  CREATURES,
  PRESETS,
  CREATURE_ORDER,
  PRESET_ORDER,
  DEFAULT_PROMPT,
  buildShotPlan,
  type CreatureId,
  type PresetId,
  type TimelineBlock,
} from "@/data/kineforge";
import { track, EVENTS } from "@/lib/analytics";

const KineforgeViewer = dynamic(() => import("./KineforgeViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <span className="h-7 w-7 animate-spin rounded-full border-2 border-ds-primary/25 border-t-ds-primary" />
    </div>
  ),
});

const EASE = [0.16, 1, 0.3, 1] as const;

const TONE: Record<TimelineBlock["tone"], string> = {
  env: "var(--color-ds-secondary)",
  creature: "var(--color-ds-primary)",
  beat: "var(--color-ds-danger)",
  camera: "var(--color-ds-info)",
};

/* ── small building blocks ───────────────────────────────────────────── */

function OutputCard({
  icon: Icon,
  title,
  index,
  children,
  variants,
}: {
  icon: typeof Bone;
  title: string;
  index: number;
  children: React.ReactNode;
  variants: Variants;
}) {
  return (
    <motion.div variants={variants} className="kf-panel kf-lit p-4">
      <div className="mb-3 flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-ds-sm)] bg-ds-primary/12 text-ds-accent">
          <Icon size={16} />
        </span>
        <h4 className="text-sm font-bold text-ds-text">{title}</h4>
        <span className="ml-auto font-mono text-[10px] text-ds-faint">
          {String(index).padStart(2, "0")}
        </span>
      </div>
      {children}
    </motion.div>
  );
}

/** Schematic side-profile rig map — nodes pulse in sequence on (re)generate. */
function RigMap({ runId, active }: { runId: number; active: boolean }) {
  const NODES = [
    { x: 14, y: 50, label: "Tail" },
    { x: 70, y: 44, label: "Pelvis" },
    { x: 96, y: 36, label: "Spine" },
    { x: 134, y: 30, label: "Neck" },
    { x: 165, y: 25, label: "Head" },
    { x: 180, y: 35, label: "Jaw" },
    { x: 80, y: 70, label: "Legs" },
    { x: 84, y: 86, label: "Feet" },
  ];
  return (
    <svg
      key={runId}
      viewBox="0 0 200 96"
      className="h-auto w-full"
      role="img"
      aria-label="Schematic creature rig map"
    >
      {/* spine + limb hairlines */}
      <polyline
        points="14,50 70,44 96,36 134,30 165,25"
        fill="none"
        stroke="var(--color-ds-border-strong)"
        strokeWidth="1"
      />
      <polyline
        points="165,25 180,35"
        fill="none"
        stroke="var(--color-ds-border-strong)"
        strokeWidth="1"
      />
      <polyline
        points="70,44 80,70 84,86"
        fill="none"
        stroke="var(--color-ds-border-strong)"
        strokeWidth="1"
      />
      {NODES.map((n, i) => (
        <g key={n.label}>
          <circle
            cx={n.x}
            cy={n.y}
            r="3.4"
            fill="var(--color-ds-primary)"
            style={
              active
                ? {
                    opacity: 0,
                    animation: `kfNodeIn 0.4s ${EASE} forwards`,
                    animationDelay: `${i * 0.08}s`,
                  }
                : { opacity: 0.9 }
            }
          />
          <text
            x={n.x}
            y={n.y - 6}
            textAnchor="middle"
            className="fill-ds-faint"
            style={{ fontSize: "6px", fontWeight: 600 }}
          >
            {n.label}
          </text>
        </g>
      ))}
      <style>{`@keyframes kfNodeIn{from{opacity:0;transform:scale(0.2)}to{opacity:0.95;transform:scale(1)}}`}</style>
    </svg>
  );
}

/* ── main ────────────────────────────────────────────────────────────── */

export function KineforgeStudio() {
  const reduce = useReducedMotion();
  const [creatureId, setCreatureId] = useState<CreatureId>("spinosaurus");
  const [presetId, setPresetId] = useState<PresetId>("documentary");
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [generated, setGenerated] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [runId, setRunId] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const creature = CREATURES[creatureId];
  const preset = PRESETS[presetId];
  const plan = useMemo(() => buildShotPlan(creature, preset), [creature, preset]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const generate = () => {
    if (generating) return;
    setGenerating(true);
    track(EVENTS.kineforgeDemo, {
      action: "generate",
      creature: creatureId,
      preset: presetId,
    });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(
      () => {
        setGenerating(false);
        setGenerated(true);
        setRunId((r) => r + 1);
      },
      reduce ? 0 : 900
    );
  };

  // Re-stagger the output the first time it appears AND on each regenerate.
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.09 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  };

  return (
    <div className="kf-lit overflow-hidden rounded-[var(--radius-ds-lg)] border border-ds-border bg-ds-surface/60 shadow-[var(--shadow-ds-glow)]">
      {/* Studio chrome */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ds-border bg-ds-surface-3/60 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-ds-danger/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-ds-warning/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-ds-success/70" />
          </span>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-ds-muted">
            <Clapperboard size={14} className="text-ds-accent" />
            Kineforge Studio
          </span>
          <span className="hidden text-xs text-ds-faint sm:inline">
            · From creature prompt to cinematic shot plan
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-ds-warning/30 bg-ds-warning/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-ds-warning">
          Concept simulation — not connected to Unreal yet
        </span>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        {/* ── LEFT: specimen + controls ─────────────────────────────── */}
        <div className="border-b border-ds-border p-4 lg:border-b-0 lg:border-r">
          {/* Specimen preview */}
          <div className="kf-lit relative aspect-[16/10] overflow-hidden rounded-[var(--radius-ds)] border border-ds-border">
            <div className="kf-stage absolute inset-0">
              <KineforgeViewer
                autoRotate={!interacted && !reduce}
                onInteract={() => setInteracted(true)}
              />
            </div>
            {/* misty floor gradient */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
              aria-hidden
              style={{
                background:
                  "linear-gradient(0deg, rgba(245,165,36,0.16), transparent), linear-gradient(0deg, rgba(12,10,8,0.7), transparent)",
              }}
            />
            <div className="pointer-events-none absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-full border border-ds-border bg-ds-bg/70 px-2.5 py-1 text-[10px] font-semibold text-ds-text backdrop-blur">
              <Rotate3d size={11} className="text-ds-accent" />
              {creature.live ? "Live specimen" : "Reference specimen"} · Spinosaurus
            </div>
            {/* generating scan overlay */}
            {generating && (
              <div className="absolute inset-0 overflow-hidden" aria-hidden>
                <div
                  className="absolute inset-x-0 h-16"
                  style={{
                    background:
                      "linear-gradient(0deg, transparent, rgba(245,165,36,0.28), transparent)",
                    animation: "kfScan 0.9s linear",
                  }}
                />
                <style>{`@keyframes kfScan{from{top:-20%}to{top:120%}}`}</style>
              </div>
            )}
            {!creature.live && (
              <div className="pointer-events-none absolute inset-x-2.5 bottom-2.5 rounded-[var(--radius-ds-sm)] border border-ds-secondary/30 bg-ds-bg/75 px-2.5 py-1.5 text-[10px] leading-snug text-ds-secondary backdrop-blur">
                {creature.name} shares the same rig-driven workflow — live model
                coming; Spinosaurus shown for reference.
              </div>
            )}
          </div>

          {/* 1 — Creature selector */}
          <div className="mt-4">
            <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ds-faint">
              Creature
            </label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {CREATURE_ORDER.map((id) => {
                const c = CREATURES[id];
                const on = id === creatureId;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      setCreatureId(id);
                      track(EVENTS.kineforgeDemo, { action: "creature", creature: id });
                    }}
                    className={`ds-focus flex items-center gap-2 rounded-[var(--radius-ds-sm)] border px-3 py-2.5 text-left text-sm font-semibold transition-colors ${
                      on
                        ? "border-ds-primary bg-ds-primary/14 text-ds-accent"
                        : "border-ds-border bg-ds-surface-2 text-ds-muted hover:border-ds-border-strong hover:text-ds-text"
                    }`}
                  >
                    <Bone size={15} className={on ? "text-ds-accent" : "text-ds-faint"} />
                    <span className="min-w-0 truncate">{c.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2 — Prompt */}
          <div className="mt-4">
            <label
              htmlFor="kf-prompt"
              className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ds-faint"
            >
              Shot prompt
            </label>
            <div className="mt-2 flex gap-2 rounded-[var(--radius-ds)] border border-ds-primary/25 bg-ds-surface-3/70 p-2.5 focus-within:border-ds-primary/60">
              <Wand2 size={15} className="mt-0.5 shrink-0 text-ds-accent" />
              <textarea
                id="kf-prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={3}
                className="w-full resize-none bg-transparent text-sm leading-relaxed text-ds-text placeholder:text-ds-faint focus:outline-none"
                placeholder="Describe the shot…"
              />
            </div>
          </div>

          {/* 3 — Style preset */}
          <div className="mt-4">
            <label
              htmlFor="kf-preset"
              className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ds-faint"
            >
              Style preset
            </label>
            <div className="relative mt-2">
              <select
                id="kf-preset"
                value={presetId}
                onChange={(e) => {
                  setPresetId(e.target.value as PresetId);
                  track(EVENTS.kineforgeDemo, { action: "preset", preset: e.target.value });
                }}
                className="ds-focus w-full appearance-none rounded-[var(--radius-ds)] border border-ds-border bg-ds-surface-2 px-3.5 py-3 pr-10 text-sm font-medium text-ds-text"
              >
                {PRESET_ORDER.map((id) => (
                  <option key={id} value={id}>
                    {PRESETS[id].name}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ds-faint"
              />
            </div>
          </div>

          {/* 4 — Generate */}
          <button
            type="button"
            onClick={generate}
            disabled={generating}
            className="ds-focus ench-cta mt-5 w-full disabled:opacity-80"
          >
            {generating ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Composing shot plan…
              </>
            ) : (
              <>
                <Sparkles size={16} />
                {generated ? "Regenerate shot plan" : "Generate shot plan"}
              </>
            )}
          </button>
          <p className="mt-2.5 flex items-center gap-1.5 text-[11px] text-ds-faint">
            <ScanLine size={12} />
            Kineforge organizes the rig, shots, and timeline — it doesn&apos;t
            animate the creature for you.
          </p>
        </div>

        {/* ── RIGHT: generated output ───────────────────────────────── */}
        <div className="relative min-h-[420px] bg-ds-surface-3/30 p-4">
          {!generated && !generating ? (
            <div className="flex h-full min-h-[380px] flex-col items-center justify-center gap-3 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-ds-border-strong text-ds-faint">
                <Clapperboard size={24} />
              </span>
              <p className="max-w-xs text-sm text-ds-muted">
                Describe a shot, pick a creature and a style, then{" "}
                <span className="font-semibold text-ds-text">generate a shot plan</span>{" "}
                to see the rig report, timeline, cameras, and exports.
              </p>
            </div>
          ) : (
            <motion.div
              key={runId}
              variants={container}
              initial="hidden"
              animate={generated ? "show" : "hidden"}
              className="grid gap-3"
            >
              {/* 1 — Rig Report */}
              <OutputCard icon={FileBarChart} title="Rig Report" index={1} variants={item}>
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Row label="Template" value={creature.template} />
                    <Row label="Skeleton" value={creature.skeletonStatus} status />
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.12em] text-ds-faint">
                        Required controls
                      </p>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {creature.controls.map((c) => (
                          <span
                            key={c}
                            className="rounded-full border border-ds-secondary/30 bg-ds-secondary/10 px-2 py-0.5 text-[11px] font-medium text-ds-secondary"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="rounded-[var(--radius-ds-sm)] border border-ds-border bg-ds-surface-3/50 p-2">
                    <RigMap runId={runId} active={!reduce} />
                  </div>
                </div>
                <div className="mt-3 flex items-start gap-2 rounded-[var(--radius-ds-sm)] border border-ds-warning/30 bg-ds-warning/10 px-3 py-2 text-[11px] leading-snug text-ds-warning">
                  <AlertTriangle size={13} className="mt-0.5 shrink-0" />
                  {creature.warning}
                </div>
              </OutputCard>

              {/* 2 — Timeline */}
              <OutputCard icon={Film} title="Timeline Blocks" index={2} variants={item}>
                <div className="space-y-1.5">
                  {plan.timeline.map((b) => (
                    <div key={b.t} className="flex items-center gap-2.5">
                      <span className="w-12 shrink-0 font-mono text-[10px] text-ds-faint">
                        {b.t}
                      </span>
                      <div className="h-7 flex-1 overflow-hidden rounded-[6px] bg-ds-surface-3/60">
                        <div
                          className="flex h-full items-center rounded-[6px] px-2.5"
                          style={{
                            width: `${(b.dur / 4) * 100}%`,
                            minWidth: "55%",
                            background: `color-mix(in srgb, ${TONE[b.tone]} 22%, transparent)`,
                            borderLeft: `3px solid ${TONE[b.tone]}`,
                          }}
                        >
                          <span className="truncate text-[11px] font-medium text-ds-text">
                            {b.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </OutputCard>

              {/* 3 — Camera Plan */}
              <OutputCard icon={Camera} title="Camera Plan" index={3} variants={item}>
                <ol className="grid gap-2 sm:grid-cols-2">
                  {plan.cameras.map((c, i) => (
                    <li
                      key={c.shot}
                      className="flex items-center gap-2.5 rounded-[var(--radius-ds-sm)] border border-ds-border bg-ds-surface-2 px-3 py-2"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ds-info/15 text-[11px] font-bold text-ds-info">
                        {i + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[13px] font-medium text-ds-text">
                          {c.shot}
                        </span>
                        <span className="block font-mono text-[10px] text-ds-faint">
                          {c.lens}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </OutputCard>

              {/* 4 — Animation Requirements */}
              <OutputCard
                icon={ListChecks}
                title="Animation Requirements"
                index={4}
                variants={item}
              >
                <ul className="grid gap-1.5 sm:grid-cols-2">
                  {creature.animClips.map((clip) => (
                    <li
                      key={clip}
                      className="flex items-center gap-2 rounded-[var(--radius-ds-sm)] border border-ds-border bg-ds-surface-2 px-2.5 py-2 text-[13px] text-ds-text"
                    >
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border border-ds-primary/40 text-ds-accent">
                        <Check size={11} />
                      </span>
                      <span className="truncate">{clip}</span>
                    </li>
                  ))}
                </ul>
              </OutputCard>

              {/* 5 — Export Preview */}
              <OutputCard icon={Download} title="Export Preview" index={5} variants={item}>
                <div className="grid gap-2 sm:grid-cols-2">
                  {plan.exports.map((e) => (
                    <div
                      key={e.label}
                      className="flex items-center gap-2.5 rounded-[var(--radius-ds-sm)] border border-ds-primary/25 bg-ds-primary/[0.06] px-3 py-2.5"
                    >
                      <ArrowRight size={14} className="shrink-0 text-ds-accent" />
                      <span className="min-w-0">
                        <span className="block truncate text-[13px] font-semibold text-ds-text">
                          {e.label}
                        </span>
                        <span className="block truncate text-[10px] text-ds-faint">
                          {e.detail}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </OutputCard>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status?: boolean;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.12em] text-ds-faint">{label}</p>
      <p
        className={`text-[13px] font-medium ${
          status ? "text-ds-accent" : "text-ds-text"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
