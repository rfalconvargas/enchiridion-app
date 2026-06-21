"use client";

import { MessageSquareHeart } from "lucide-react";
import { cn } from "@/lib/cn";
import { track, EVENTS } from "@/lib/analytics";

/** Enchiridion Demo Feedback — Google Form. */
export const FEEDBACK_URL = "https://forms.gle/hFFBq3xEZk4SQzHa9";

type Variant = "solid" | "outline" | "icon";

const VARIANTS: Record<Variant, string> = {
  solid:
    "gap-2 rounded-[var(--radius-ds)] bg-ds-secondary px-5 py-3 text-sm font-semibold text-white shadow-ds hover:brightness-110 active:scale-[0.98]",
  outline:
    "gap-2 rounded-[var(--radius-ds)] border border-ds-secondary/50 px-5 py-3 text-sm font-semibold text-ds-secondary hover:bg-ds-secondary/10 active:scale-[0.98]",
  icon: "h-9 w-9 rounded-full border border-ds-border bg-ds-surface-2 text-ds-secondary transition-colors hover:border-ds-secondary hover:text-ds-secondary",
};

/**
 * Rounded "Share feedback" pill linking to the feedback form (new tab).
 * Plain <a>, so it works in both server and client components.
 */
export function FeedbackButton({
  variant = "solid",
  label = "Share feedback",
  className,
  placement = "demo",
}: {
  variant?: Variant;
  label?: string;
  className?: string;
  /** Where this button lives — sent with the feedback_click event. */
  placement?: string;
}) {
  return (
    <a
      href={FEEDBACK_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track(EVENTS.feedbackClick, { placement })}
      aria-label="Share feedback — opens a Google Form in a new tab"
      title="Share feedback"
      className={cn(
        "ds-focus inline-flex items-center justify-center transition-all duration-150",
        VARIANTS[variant],
        className
      )}
    >
      <MessageSquareHeart size={variant === "icon" ? 18 : 16} />
      {variant !== "icon" && label}
    </a>
  );
}
