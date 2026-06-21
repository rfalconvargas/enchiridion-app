/**
 * Single source of truth for Enchiridion brand links & copy.
 *
 * Everything outward-facing (the YouTube channel, the canonical site URL, the
 * positioning lines used by SEO + the landing) lives here so it's a one-line
 * edit instead of a hunt across components.
 */

/** Public site origin — used for canonical URLs, OG tags, and JSON-LD. */
export const SITE_URL = "https://enchiridion.ailiur.com";

export const BRAND_NAME = "Enchiridion";

/** The Enchiridion YouTube channel. */
export const CHANNEL_URL = "https://www.youtube.com/@enchiridion.ailiur";
export const CHANNEL_HANDLE = "@enchiridion.ailiur";

/** Demo-feedback Google Form (also referenced by FeedbackButton). */
export const FEEDBACK_URL = "https://forms.gle/hFFBq3xEZk4SQzHa9";

/** Positioning — the one line the whole product hangs on. */
export const POSITIONING =
  "Enchiridion turns complex science into interactive 3D learning experiences.";

export const POSITIONING_SUPPORT =
  "The interactive companion to the Enchiridion channel — spin real fossil reconstructions, watch the science change with every discovery, and keep what you learn.";

/** Short shared meta description (SEO + OG + Twitter). */
export const META_DESCRIPTION =
  "Enchiridion turns complex science into interactive 3D learning experiences. Spin real fossil reconstructions, watch the science change over time, and build your own Knowledge Tree — the interactive companion to the Enchiridion YouTube channel.";
