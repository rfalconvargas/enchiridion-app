"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Compass,
  Target,
  Map,
  Boxes,
  MessagesSquare,
  Network,
  Brain,
  Rocket,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/**
 * The Enchiridion learning-service loop. Each node is a service that runs for
 * the learner — curiosity in, durable understanding out. Rendered as a flowing,
 * connected sequence that wraps responsively and loops back on itself.
 */
const STEPS: { icon: LucideIcon; label: string; detail: string }[] = [
  { icon: Compass, label: "Curiosity", detail: "A question worth chasing." },
  { icon: Target, label: "Learning goal", detail: "We turn it into an outcome." },
  { icon: Map, label: "Research map", detail: "Trustworthy sources, organized." },
  { icon: Boxes, label: "Visual lesson", detail: "3D scenes, diagrams, timelines." },
  { icon: MessagesSquare, label: "Socratic tutor", detail: "Questions that adapt to you." },
  { icon: Network, label: "Knowledge tree", detail: "Understanding, connected." },
  { icon: Brain, label: "Recall", detail: "Spaced review that sticks." },
  { icon: Rocket, label: "Project / output", detail: "Learning becomes something real." },
];

export function LearningLoop() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <ol className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
      {STEPS.map((step, i) => {
        const Icon = step.icon;
        const isLast = i === STEPS.length - 1;
        return (
          <motion.li
            key={step.label}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.5,
              delay: prefersReducedMotion ? 0 : i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative flex flex-col gap-2 rounded-[var(--radius-ds)] border border-ds-border bg-ds-surface/80 p-4 shadow-ds backdrop-blur transition-colors hover:border-ds-primary/50"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-ds-sm)] bg-ds-primary/12 text-ds-accent transition-colors group-hover:bg-ds-primary/20">
                <Icon size={18} />
              </span>
              <span className="font-mono text-[11px] text-ds-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-ds-text">{step.label}</h3>
              <p className="mt-0.5 text-xs leading-relaxed text-ds-muted">
                {step.detail}
              </p>
            </div>

            {/* Connector arrow — points to the next service in the loop */}
            {!isLast && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-1.5 top-1/2 z-10 hidden -translate-y-1/2 text-ds-border-strong sm:block"
              >
                <ArrowRight size={14} />
              </span>
            )}
          </motion.li>
        );
      })}
    </ol>
  );
}
