/**
 * Enchiridion analytics — a thin, typed layer over GA4 (gtag.js, loaded in
 * `app/layout.tsx`, measurement id G-BV75Y67CNH).
 *
 * Design rules:
 *  - One consistent vocabulary: every event name is prefixed `enchiridion_` and
 *    lives in `EVENTS`. Call sites reference `EVENTS.x`, never raw strings.
 *  - `track()` is SSR-safe and a no-op when gtag is unavailable (ad-blockers,
 *    local dev, consent declined) — callers never have to guard.
 *  - Privacy-conscious: only non-PII context is ever sent (placement, label,
 *    topic, module, percent…). Never pass an email, name, or free text a user typed.
 *  - No duplicate events: each user action fires exactly one event. Declarative
 *    click-throughs go through the `data-cta` delegate (see AnalyticsDelegate);
 *    stateful events call `track()` inline.
 *
 * Event taxonomy (params in braces):
 *   — Demo & module lifecycle —
 *   enchiridion_demo_started {demo, module?}   visitor begins an interactive demo
 *   enchiridion_module_completed {module}      finishes a guided module
 *   enchiridion_3d_interaction {surface, topic?} first manipulation of a 3D model
 *
 *   — Conversion & outbound —
 *   enchiridion_youtube_click {placement}      clicks through to the YouTube channel
 *   enchiridion_waitlist_click {placement}     opens the waitlist
 *   enchiridion_primary_cta_click {placement, label}
 *   enchiridion_secondary_cta_click {placement, label}
 *
 *   — Engagement —
 *   enchiridion_scroll_depth {percent}         25 / 50 / 75 / 100, once each
 *   enchiridion_feature_card_view {card}       a feature/benefit card enters view
 *
 *   — Waitlist funnel —
 *   enchiridion_waitlist_submit {placement}
 *   enchiridion_waitlist_success {placement, duplicate}
 *   enchiridion_waitlist_error {placement, message}
 *   enchiridion_feedback_click {placement}
 *   enchiridion_kineforge_intent {intent}      Kineforge concept interest signal
 *   enchiridion_kineforge_demo {action, creature, preset}  concept-demo interaction
 *
 *   — /demo app engagement —
 *   enchiridion_demo_tab_view {tab}
 *   enchiridion_lesson_open {topic}
 *   enchiridion_lesson_step {topic, step_index, step_id}
 *   enchiridion_viewer_control_toggle {control, on}
 *   enchiridion_lesson_save_to_tree {topic}
 */

export const EVENTS = {
  // Demo & module lifecycle
  demoStarted: "enchiridion_demo_started",
  moduleCompleted: "enchiridion_module_completed",
  threeDInteraction: "enchiridion_3d_interaction",

  // Conversion & outbound
  youtubeClick: "enchiridion_youtube_click",
  waitlistClick: "enchiridion_waitlist_click",
  primaryCtaClick: "enchiridion_primary_cta_click",
  secondaryCtaClick: "enchiridion_secondary_cta_click",

  // Engagement
  scrollDepth: "enchiridion_scroll_depth",
  featureCardView: "enchiridion_feature_card_view",

  // Waitlist funnel
  waitlistSubmit: "enchiridion_waitlist_submit",
  waitlistSuccess: "enchiridion_waitlist_success",
  waitlistError: "enchiridion_waitlist_error",
  feedbackClick: "enchiridion_feedback_click",
  kineforgeIntent: "enchiridion_kineforge_intent",
  kineforgeDemo: "enchiridion_kineforge_demo",

  // /demo app engagement
  demoTabView: "enchiridion_demo_tab_view",
  lessonOpen: "enchiridion_lesson_open",
  lessonStep: "enchiridion_lesson_step",
  viewerControlToggle: "enchiridion_viewer_control_toggle",
  lessonSaveToTree: "enchiridion_lesson_save_to_tree",
} as const;

export type AnalyticsEvent = (typeof EVENTS)[keyof typeof EVENTS];

type GtagParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      targetOrEvent: string,
      params?: GtagParams
    ) => void;
  }
}

/** Fire a GA4 event. Safe on the server and when gtag is unavailable. */
export function track(event: AnalyticsEvent, params: GtagParams = {}): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  try {
    window.gtag("event", event, params);
  } catch {
    // Never let analytics throw into product code.
  }
}

// Guards de-dupe "first time only" events (a given key fires at most once per
// page load) so callers don't each reinvent a ref/flag.
const fired = new Set<string>();

/**
 * Fire an event at most once per page load for the given dedupe `key`. Used for
 * things like the first 3D interaction or a scroll-depth threshold.
 */
export function trackOnce(
  key: string,
  event: AnalyticsEvent,
  params: GtagParams = {}
): void {
  if (fired.has(key)) return;
  fired.add(key);
  track(event, params);
}
