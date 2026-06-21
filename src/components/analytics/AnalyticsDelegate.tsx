"use client";

import { useEffect } from "react";
import { track, EVENTS } from "@/lib/analytics";

/**
 * One delegated click listener for declarative CTA / outbound tracking.
 *
 * Any element (including server-rendered `<Link>`s — no client conversion
 * needed) can opt in with data attributes:
 *
 *   data-cta          — the label sent with the event (required)
 *   data-cta-kind     — "primary" | "secondary" | "youtube"  (default "primary")
 *   data-cta-placement— where it lives, e.g. "thesis", "final_cta" (optional)
 *
 * Centralizing this means there is exactly ONE click-tracking code path for
 * CTAs — no per-button handlers to drift out of sync, and no double-fires
 * (stateful buttons that call `track()` themselves simply omit `data-cta`).
 */
export function AnalyticsDelegate() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const el = target?.closest<HTMLElement>("[data-cta]");
      if (!el) return;

      const label = el.dataset.cta || "unknown";
      const placement = el.dataset.ctaPlacement || "unknown";
      const kind = el.dataset.ctaKind || "primary";

      if (kind === "youtube") {
        track(EVENTS.youtubeClick, { placement });
      } else if (kind === "secondary") {
        track(EVENTS.secondaryCtaClick, { placement, label });
      } else {
        track(EVENTS.primaryCtaClick, { placement, label });
      }
    };

    // Capture phase so it still fires if inner handlers stop propagation.
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
