"use client";

import { useState } from "react";
import { ThumbsUp, Hourglass, Film, Wrench, Check } from "lucide-react";
import { FEEDBACK_URL } from "@/lib/brand";
import { track, EVENTS } from "@/lib/analytics";

/**
 * Lightweight interest signals for the Kineforge concept. The three "soft"
 * intents record optimistically in place (instant acknowledgment, no round
 * trip); the technical intent routes to the existing feedback form where real
 * notes land.
 */

const INTENTS = [
  { id: "would_use", icon: ThumbsUp, label: "I'd use this" },
  { id: "too_early", icon: Hourglass, label: "Interesting but too early" },
  { id: "needs_clips", icon: Film, label: "Needs real animation clips" },
] as const;

export function KineforgeFeedback() {
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {INTENTS.map(({ id, icon: Icon, label }) => {
        const active = picked === id;
        return (
          <button
            key={id}
            type="button"
            aria-pressed={active}
            onClick={() => {
              setPicked(id);
              track(EVENTS.kineforgeIntent, { intent: id });
            }}
            className={`ds-focus inline-flex items-center gap-2 rounded-[var(--radius-ds)] border px-5 py-3 text-sm font-semibold transition-all duration-150 active:scale-[0.98] ${
              active
                ? "border-ds-primary bg-ds-primary/15 text-ds-accent"
                : "border-ds-border-strong text-ds-text hover:border-ds-primary hover:text-ds-accent"
            }`}
          >
            {active ? <Check size={16} /> : <Icon size={16} />}
            {active ? "Noted — thank you" : label}
          </button>
        );
      })}

      <a
        href={FEEDBACK_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          track(EVENTS.kineforgeIntent, { intent: "technical_feedback" });
          track(EVENTS.feedbackClick, { placement: "kineforge_feedback" });
        }}
        className="ds-focus inline-flex items-center gap-2 rounded-[var(--radius-ds)] bg-ds-primary px-5 py-3 text-sm font-semibold text-ds-on-primary shadow-[var(--shadow-ds-glow)] transition-all duration-150 hover:bg-ds-accent hover:text-white active:scale-[0.98]"
      >
        <Wrench size={16} />
        I can give technical feedback
      </a>
    </div>
  );
}
