"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  MessageSquareHeart,
  Sparkles,
  Camera,
  Bone,
  Film,
} from "lucide-react";
import { FEEDBACK_URL } from "@/lib/brand";
import { track, EVENTS } from "@/lib/analytics";

// The R3F canvas can't server-render — load it on the client with an on-brand
// volcanic skeleton so the hero paints instantly and the creature fades in.
const KineforgeViewer = dynamic(() => import("./KineforgeViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-ds-primary/25 border-t-ds-primary" />
    </div>
  ),
});

const ZIMULA_BD = "'Zimula Trial Bd', var(--font-fredoka), sans-serif";

/** Small "lit" stat chip floating over the stage. */
function StageChip({
  icon: Icon,
  children,
  className,
}: {
  icon: typeof Camera;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`kf-panel flex items-center gap-2 px-3 py-2 text-[11px] font-semibold text-ds-text ${className ?? ""}`}
    >
      <Icon size={14} className="text-ds-accent" />
      {children}
    </div>
  );
}

export function KineforgeHero() {
  const reduce = useReducedMotion();
  const [interacted, setInteracted] = useState(false);

  const ease = [0.16, 1, 0.3, 1] as const;
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: reduce ? 0 : delay, ease },
  });

  return (
    <section className="kf-aurora relative overflow-hidden">
      <div className="kf-grid pointer-events-none absolute inset-0" aria-hidden />

      {/* Slim sub-brand header */}
      <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="ds-focus group flex items-center gap-2.5"
          aria-label="Enchiridion home"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/enchiridion-logo.png"
            alt=""
            aria-hidden
            className="h-7 w-7 rounded-full object-contain"
          />
          <span className="flex items-baseline gap-1.5">
            <span
              style={{ fontFamily: ZIMULA_BD }}
              className="text-lg font-black tracking-tight text-ds-text"
            >
              Kineforge
            </span>
            <span className="hidden text-[11px] font-semibold uppercase tracking-[0.18em] text-ds-faint sm:inline">
              by Enchiridion
            </span>
          </span>
        </Link>
        <Link
          href="/"
          className="ds-focus hidden items-center gap-1.5 rounded-full border border-ds-border px-3.5 py-2 text-xs font-semibold text-ds-muted transition-colors hover:border-ds-border-strong hover:text-ds-text sm:inline-flex"
        >
          ← Enchiridion
        </Link>
      </header>

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-6 pb-20 pt-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pt-10">
        {/* Left — copy */}
        <div className="max-w-xl">
          <motion.div {...rise(0)}>
            <span className="inline-flex items-center gap-2 rounded-full border border-ds-primary/30 bg-ds-primary/[0.08] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ds-accent">
              <Sparkles size={13} />
              Concept workspace · Unreal Engine
            </span>
          </motion.div>

          <motion.h1
            {...rise(0.08)}
            className="mt-5 text-balance text-[clamp(2.4rem,6vw,4.25rem)] font-black leading-[0.98] tracking-[-0.02em] text-ds-text"
          >
            Direct prehistoric
            <br />
            3D scenes{" "}
            <span className="text-ds-primary">with AI.</span>
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-ds-muted sm:text-lg"
          >
            A concept workspace for turning rigged creatures, animation clips,
            cameras, and environments into cinematic Unreal Engine shots.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="#concept-demo"
              className="ds-focus ench-cta"
              data-cta="try_concept_demo"
              data-cta-kind="primary"
              data-cta-placement="kineforge_hero"
            >
              Try the concept demo
              <ArrowRight size={16} />
            </Link>
            <a
              href={FEEDBACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track(EVENTS.feedbackClick, { placement: "kineforge_hero" })}
              className="ds-focus inline-flex items-center gap-2 rounded-[var(--radius-ds)] border border-ds-border-strong px-5 py-3 text-sm font-semibold text-ds-text transition-colors hover:border-ds-primary hover:text-ds-accent"
            >
              <MessageSquareHeart size={16} />
              Give feedback
            </a>
          </motion.div>

          <motion.p
            {...rise(0.32)}
            className="mt-5 max-w-lg text-pretty text-sm leading-relaxed text-ds-muted"
          >
            <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-ds-warning align-middle" />
            An AI-directed cinematic workflow for prehistoric 3D scenes —{" "}
            <span className="font-semibold text-ds-text">
              not a finished automatic animation engine yet.
            </span>
          </motion.p>
        </div>

        {/* Right — cinematic stage */}
        <motion.div
          initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: reduce ? 0 : 0.2, ease }}
          className="kf-lit relative aspect-[4/3.4] w-full overflow-hidden rounded-[var(--radius-ds-lg)] border border-ds-border shadow-[var(--shadow-ds-glow)] lg:aspect-[4/4.2]"
        >
          <div className="kf-stage absolute inset-0">
            <KineforgeViewer
              autoRotate={!interacted && !reduce}
              onInteract={() => setInteracted(true)}
            />
          </div>

          {/* Rig coordinate ticks — "AI-directed scene" framing, decorative. */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.5]"
            aria-hidden
            style={{
              backgroundImage:
                "linear-gradient(90deg, transparent 0 49.6%, rgba(245,165,36,0.18) 49.6% 50.4%, transparent 50.4%), linear-gradient(0deg, transparent 0 49.6%, rgba(245,165,36,0.14) 49.6% 50.4%, transparent 50.4%)",
              maskImage:
                "radial-gradient(60% 60% at 50% 45%, transparent 60%, #000 100%)",
              WebkitMaskImage:
                "radial-gradient(60% 60% at 50% 45%, transparent 60%, #000 100%)",
            }}
          />

          {/* Top-left label */}
          <div className="pointer-events-none absolute left-3 top-3">
            <StageChip icon={Bone}>Spinosaurus aegyptiacus · live GLB</StageChip>
          </div>
          {/* Bottom row of "shot" chips */}
          <div className="pointer-events-none absolute inset-x-3 bottom-3 flex flex-wrap items-center justify-between gap-2">
            <StageChip icon={Camera}>Shot 01 · Dolly-in</StageChip>
            <StageChip icon={Film}>Drag to orbit the specimen</StageChip>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
