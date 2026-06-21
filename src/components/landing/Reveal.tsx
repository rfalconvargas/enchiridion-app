"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { track, EVENTS } from "@/lib/analytics";

/**
 * Lightweight scroll-reveal wrapper. Fades + lifts its children into view once,
 * respecting prefers-reduced-motion. Keeps the landing page (a server
 * component) free of motion code while still feeling alive.
 *
 * Pass `trackCard` to also emit `enchiridion_feature_card_view` the first time
 * this element enters view — reusing the same viewport observer, so there's no
 * separate IntersectionObserver and no duplicate view-tracking code.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  trackCard,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li";
  /** When set, fires feature_card_view {card: trackCard} once on first view. */
  trackCard?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      onViewportEnter={
        trackCard
          ? () => track(EVENTS.featureCardView, { card: trackCard })
          : undefined
      }
      transition={{
        duration: 0.6,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
