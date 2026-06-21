"use client";

import { useEffect } from "react";
import { track, EVENTS } from "@/lib/analytics";

/**
 * Fires `enchiridion_scroll_depth {percent}` once each as the visitor passes the
 * 25 / 50 / 75 / 100% marks of the page. Mount once on a long page (the landing).
 *
 * Passive scroll listener, rAF-throttled, and each threshold fires at most once
 * — so no event spam and no duplicate marks.
 */
const THRESHOLDS = [25, 50, 75, 100] as const;

export function ScrollDepthTracker() {
  useEffect(() => {
    const sent = new Set<number>();
    let ticking = false;

    const measure = () => {
      ticking = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      // Very short pages: treat as fully seen.
      const pct =
        scrollable <= 0
          ? 100
          : Math.min(100, Math.round(((window.scrollY || 0) / scrollable) * 100));

      for (const t of THRESHOLDS) {
        if (pct >= t && !sent.has(t)) {
          sent.add(t);
          track(EVENTS.scrollDepth, { percent: t });
        }
      }
      if (sent.size === THRESHOLDS.length) cleanup();
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    const cleanup = () => window.removeEventListener("scroll", onScroll);

    window.addEventListener("scroll", onScroll, { passive: true });
    measure(); // capture the initial position (e.g. short viewport / deep link)
    return cleanup;
  }, []);

  return null;
}
