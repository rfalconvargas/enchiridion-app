"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Play,
  Bone,
  Search,
  Brain,
  Youtube,
  RotateCcw,
  Boxes,
  Check,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { track, EVENTS } from "@/lib/analytics";
import { CHANNEL_URL } from "@/lib/brand";
import { SHRINK_WRAP_MODULE as M } from "@/data/labModule";
import { ReconstructionSilhouettes } from "./ReconstructionSilhouettes";
import { WaitlistButton } from "@/components/landing/WaitlistButton";

const TOTAL_STEPS = 7;
const LEARNING_STEP = 5; // index of the "what you learned" card

export function FossilLab() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [chosen, setChosen] = useState<string | undefined>();
  const completedFired = useRef(false);

  // module_completed fires once, when the learning card is first reached.
  useEffect(() => {
    if (step >= LEARNING_STEP && !completedFired.current) {
      completedFired.current = true;
      track(EVENTS.moduleCompleted, { module: M.id });
    }
  }, [step]);

  const start = useCallback(() => {
    track(EVENTS.demoStarted, { demo: "fossil_lab", module: M.id });
    setStep(1);
  }, []);

  const next = useCallback(() => setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1)), []);
  const back = useCallback(() => setStep((s) => Math.max(0, s - 1)), []);

  const choose = useCallback((id: string) => {
    setChosen(id);
    setStep(4);
  }, []);

  const replay = useCallback(() => {
    completedFired.current = false;
    setChosen(undefined);
    setStep(0);
  }, []);

  const chosenOption = M.decision.options.find((o) => o.id === chosen);

  return (
    <div
      className="relative flex min-h-dvh flex-col text-[#eafbf6]"
      style={{
        backgroundImage:
          "radial-gradient(58% 50% at 12% -6%, rgba(155,214,73,0.18), transparent 66%), radial-gradient(60% 50% at 92% 4%, rgba(21,122,130,0.4), transparent 72%), radial-gradient(95% 70% at 50% 120%, rgba(14,143,144,0.28), transparent 72%), linear-gradient(168deg, #0e544c 0%, #082f2c 56%, #041f1e 100%)",
      }}
    >
      {/* Header — brand + progress + back */}
      <header className="flex items-center justify-between gap-3 px-5 py-4">
        <Link
          href="/"
          aria-label="Enchiridion home"
          className="ds-focus flex items-center gap-2 text-sm font-bold tracking-tight"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/enchiridion-logo.png"
            alt=""
            aria-hidden="true"
            className="h-6 w-6 rounded-full object-contain"
          />
          <span className="text-[#cdeee4]">Fossil Lab</span>
        </Link>

        {step > 0 && (
          <button
            onClick={back}
            className="ds-focus inline-flex items-center gap-1 rounded-full border border-[#5eead42e] px-3 py-1.5 text-xs font-semibold text-[#bfe9dd] transition-colors hover:border-[#5eead466] hover:text-[#5eead4]"
          >
            <ArrowLeft size={13} />
            Back
          </button>
        )}
      </header>

      {/* Progress rail (hidden on the hook) */}
      {step > 0 && (
        <div className="px-5" aria-hidden="true">
          <div className="mx-auto flex max-w-md gap-1.5">
            {Array.from({ length: TOTAL_STEPS - 1 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1 flex-1 rounded-full transition-colors duration-300",
                  i < step ? "bg-[#5eead4]" : "bg-[#5eead41f]"
                )}
              />
            ))}
          </div>
        </div>
      )}

      {/* Step body */}
      <main className="flex flex-1 items-center justify-center px-5 py-6">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: reduce ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          {step === 0 && <Hook onStart={start} />}
          {step === 1 && <Specimen onNext={next} />}
          {step === 2 && <Clue onNext={next} />}
          {step === 3 && <Decision onChoose={choose} />}
          {step === 4 && (
            <Uncertainty chosen={chosenOption} chosenId={chosen} onNext={next} />
          )}
          {step === 5 && <Learning onNext={next} />}
          {step === 6 && <Close onReplay={replay} />}
        </motion.div>
      </main>
    </div>
  );
}

/* ---------------------------------------------------------------- shared UI */

function StepEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7ee0c9]">
      {children}
    </span>
  );
}

/** The cinematic dark CTA used for forward motion. */
function PrimaryButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="ds-focus inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2e9e6a] to-[#14a6a8] px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-[#F4F7EC] shadow-[0_12px_36px_rgba(20,166,168,0.3)] transition-all duration-200 hover:brightness-105 active:scale-[0.98]"
    >
      {children}
    </button>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#5eead42e] bg-[rgba(9,46,42,0.6)] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.35)] backdrop-blur-md">
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------- steps */

function Hook({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center">
      <StepEyebrow>
        <Sparkles size={12} />
        {M.kicker}
      </StepEyebrow>
      <h1 className="mt-4 text-balance text-3xl font-black leading-[1.08] tracking-tight sm:text-4xl">
        {M.title}
      </h1>
      <p className="mx-auto mt-4 max-w-sm text-pretty text-sm leading-relaxed text-[#bfe9dd]">
        {M.hookSubtitle}
      </p>
      <div className="mt-7">
        <PrimaryButton onClick={onStart}>
          <Play size={15} className="fill-current" />
          Start the investigation
        </PrimaryButton>
      </div>
      <p className="mt-3 text-[11px] text-[#7aa8a2]">
        ≈{M.seconds} seconds · no sign-up · runs in your browser
      </p>
    </div>
  );
}

function Specimen({ onNext }: { onNext: () => void }) {
  return (
    <Panel>
      <StepEyebrow>{M.specimen.caption}</StepEyebrow>
      <div className="relative mt-4 flex h-44 items-center justify-center">
        <div
          aria-hidden="true"
          className="absolute h-36 w-36 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(45,212,191,0.28) 0%, transparent 70%)",
            filter: "blur(10px)",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={M.specimen.image}
          alt={M.specimen.imageAlt}
          decoding="async"
          draggable={false}
          className="relative h-44 w-auto select-none object-contain [filter:drop-shadow(0_16px_32px_rgba(0,0,0,0.45))]"
        />
      </div>
      <p className="mt-4 text-pretty text-sm leading-relaxed text-[#d7efe9]">
        {M.specimen.body}
      </p>
      <div className="mt-6">
        <PrimaryButton onClick={onNext}>
          Examine the clue
          <ArrowRight size={15} />
        </PrimaryButton>
      </div>
    </Panel>
  );
}

function Clue({ onNext }: { onNext: () => void }) {
  return (
    <Panel>
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#5eead41a] text-[#5eead4]">
        <Search size={20} />
      </span>
      <StepEyebrow>
        <span className="mt-4 block">
          <Bone size={12} className="mr-1 inline" />
          {M.clue.eyebrow}
        </span>
      </StepEyebrow>
      <h2 className="mt-2 text-balance text-xl font-bold leading-snug">
        {M.clue.headline}
      </h2>
      <p className="mt-3 text-pretty text-sm leading-relaxed text-[#d7efe9]">
        {M.clue.body}
      </p>
      <div className="mt-6">
        <PrimaryButton onClick={onNext}>
          Make the call
          <ArrowRight size={15} />
        </PrimaryButton>
      </div>
    </Panel>
  );
}

function Decision({ onChoose }: { onChoose: (id: string) => void }) {
  return (
    <Panel>
      <StepEyebrow>Reconstruction decision</StepEyebrow>
      <h2 className="mt-3 text-balance text-xl font-bold leading-snug">
        {M.decision.prompt}
      </h2>
      <p className="mt-2 text-sm text-[#bfe9dd]">{M.decision.helper}</p>
      <div className="mt-5 space-y-3">
        {M.decision.options.map((o) => (
          <button
            key={o.id}
            onClick={() => onChoose(o.id)}
            className="ds-focus group flex w-full items-center gap-3 rounded-xl border border-[#5eead42e] bg-[rgba(6,42,39,0.6)] p-4 text-left transition-colors hover:border-[#5eead466] hover:bg-[rgba(9,46,42,0.85)]"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#5eead41a] text-[#5eead4] transition-colors group-hover:bg-[#5eead42e]">
              <Boxes size={16} />
            </span>
            <span className="flex-1 text-sm font-semibold text-[#eafbf6]">
              {o.label}
            </span>
            <ArrowRight
              size={16}
              className="text-[#7aa8a2] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#5eead4]"
            />
          </button>
        ))}
      </div>
    </Panel>
  );
}

function Uncertainty({
  chosen,
  chosenId,
  onNext,
}: {
  chosen: { label: string; consequence: string } | undefined;
  chosenId: string | undefined;
  onNext: () => void;
}) {
  return (
    <Panel>
      {chosen && (
        <p className="mb-4 rounded-lg border border-[#5eead42e] bg-[rgba(6,42,39,0.6)] px-3 py-2.5 text-xs leading-relaxed text-[#bfe9dd]">
          <span className="font-semibold text-[#5eead4]">
            You chose: {chosen.label}.
          </span>{" "}
          {chosen.consequence}
        </p>
      )}
      <StepEyebrow>Scientific uncertainty</StepEyebrow>
      <h2 className="mt-2 text-balance text-xl font-bold leading-snug">
        {M.uncertainty.headline}
      </h2>
      <div className="mt-4 text-[#5eead4]">
        <ReconstructionSilhouettes chosenId={chosenId} />
      </div>
      <p className="mt-4 text-pretty text-sm leading-relaxed text-[#d7efe9]">
        {M.uncertainty.body}
      </p>
      <ul className="mt-4 space-y-2">
        {M.uncertainty.examples.map((ex) => (
          <li key={ex} className="flex items-start gap-2.5 text-sm text-[#cdeee4]">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#9bd649]" />
            {ex}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <PrimaryButton onClick={onNext}>
          What this means
          <ArrowRight size={15} />
        </PrimaryButton>
      </div>
    </Panel>
  );
}

function Learning({ onNext }: { onNext: () => void }) {
  return (
    <Panel>
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#9bd6491f] text-[#9bd649]">
        <Brain size={20} />
      </span>
      <h2 className="mt-4 text-balance text-2xl font-bold leading-tight">
        {M.learning.headline}
      </h2>
      <ul className="mt-4 space-y-3">
        {M.learning.points.map((p) => (
          <li key={p} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5eead42e] text-[#5eead4]">
              <Check size={12} />
            </span>
            <span className="text-sm leading-relaxed text-[#eafbf6]">{p}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <PrimaryButton onClick={onNext}>
          See what this means
          <ArrowRight size={15} />
        </PrimaryButton>
      </div>
    </Panel>
  );
}

function Close({ onReplay }: { onReplay: () => void }) {
  return (
    <Panel>
      <div className="text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#5eead41a] text-[#5eead4]">
          <Sparkles size={22} />
        </span>
        <h2 className="mt-4 text-balance text-2xl font-bold leading-tight">
          {M.cta.headline}
        </h2>
        <p className="mx-auto mt-3 max-w-sm text-pretty text-sm leading-relaxed text-[#d7efe9]">
          {M.cta.body}
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {/* Channel connection — the loud, primary CTA */}
        <a
          href={CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track(EVENTS.youtubeClick, { placement: "fossil_lab" })}
          className="ds-focus flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#ff3d3d] px-6 py-3.5 text-sm font-bold uppercase tracking-widest text-white shadow-[0_12px_36px_rgba(255,61,61,0.28)] transition-all duration-200 hover:brightness-110 active:scale-[0.98]"
        >
          <Youtube size={18} className="fill-current" />
          Watch on YouTube
        </a>

        {/* WaitlistButton fires enchiridion_waitlist_click itself (placement
            below), so no onOpen here — that would double-fire. */}
        <WaitlistButton
          variant="outline"
          placement="fossil_lab"
          className="w-full !border-[#5eead44d] !text-[#eafbf6] hover:!border-[#5eead4] hover:!text-[#5eead4]"
        >
          Join the waitlist
        </WaitlistButton>
      </div>

      <div className="mt-5 flex items-center justify-center gap-5 text-xs">
        <button
          onClick={onReplay}
          className="ds-focus inline-flex items-center gap-1.5 text-[#bfe9dd] transition-colors hover:text-[#5eead4]"
        >
          <RotateCcw size={13} />
          Replay
        </button>
        <Link
          href="/demo"
          className="ds-focus inline-flex items-center gap-1.5 text-[#bfe9dd] transition-colors hover:text-[#5eead4]"
        >
          <Boxes size={13} />
          Open the full lab
        </Link>
      </div>
    </Panel>
  );
}
