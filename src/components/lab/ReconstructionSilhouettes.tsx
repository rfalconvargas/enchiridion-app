import { cn } from "@/lib/cn";

/**
 * Two lightweight inline-SVG theropod profiles used in the reconstruction
 * decision + uncertainty steps. No raster assets, no WebGL — they scale, theme
 * via `currentColor`, and stay crisp on mobile.
 *
 * - "gaunt": the shrink-wrapped look — outline only, pinched belly, skull-like
 *   head, spine bumps showing through.
 * - "fleshed": soft tissue added — a smooth, heavier, filled body.
 */

type Variant = "gaunt" | "fleshed";

const PATHS: Record<Variant, string> = {
  // Skeleton-tight: thin neck, hollow cheek, pinched belly, visible back ridge.
  gaunt:
    "M14 66 L26 60 L30 52 L40 54 L46 60 L60 57 L74 46 L86 53 L100 44 L116 52 L150 56 L196 80 L200 84 L168 70 L150 66 L132 70 L120 64 L120 96 L128 122 L120 122 L114 98 L96 92 L70 94 L54 86 L44 78 L30 74 Z",
  // Soft tissue on top: rounded skull, thick neck, full belly, heavy tail base.
  fleshed:
    "M16 70 C20 60 28 56 36 56 C44 50 56 50 66 54 C78 44 96 40 112 46 C134 40 150 52 168 60 C188 66 204 78 210 88 C198 84 184 80 172 80 C168 92 150 98 132 96 L130 120 L118 120 L116 96 C98 104 76 106 58 98 C44 92 32 86 26 80 C20 78 16 76 16 70 Z",
};

function Silhouette({
  variant,
  label,
  caption,
  highlighted = false,
}: {
  variant: Variant;
  label: string;
  caption: string;
  highlighted?: boolean;
}) {
  const fleshed = variant === "fleshed";
  return (
    <figure
      className={cn(
        "flex flex-col items-center gap-2 rounded-[var(--radius-ds)] border p-4 transition-colors",
        highlighted
          ? "border-ds-primary/50 bg-ds-primary/[0.08] ds-glow"
          : "border-ds-border bg-ds-surface/60"
      )}
    >
      <svg
        viewBox="0 0 220 130"
        role="img"
        aria-label={`${label} reconstruction silhouette`}
        className="h-20 w-full text-ds-accent"
      >
        <path
          d={PATHS[variant]}
          fill={fleshed ? "currentColor" : "none"}
          fillOpacity={fleshed ? 0.85 : 0}
          stroke="currentColor"
          strokeWidth={fleshed ? 2 : 2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Gaunt version shows ribs/spine poking through. */}
        {!fleshed && (
          <g stroke="currentColor" strokeWidth={1.5} strokeOpacity={0.6}>
            <line x1="78" y1="64" x2="84" y2="84" />
            <line x1="90" y1="62" x2="96" y2="86" />
            <line x1="102" y1="62" x2="108" y2="86" />
          </g>
        )}
      </svg>
      <figcaption className="text-center">
        <span className="block text-sm font-semibold text-ds-text">{label}</span>
        <span className="mt-0.5 block text-[11px] leading-snug text-ds-muted">
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}

export function ReconstructionSilhouettes({
  chosenId,
}: {
  /** The decision option id the visitor picked, to highlight the match. */
  chosenId?: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Silhouette
        variant="gaunt"
        label="Shrink-wrapped"
        caption="Skin tight to the bone — dramatic, but lifeless."
        highlighted={chosenId === "shrinkwrap"}
      />
      <Silhouette
        variant="fleshed"
        label="With soft tissue"
        caption="Fat & muscle added — heavier, stranger, more alive."
        highlighted={chosenId === "softtissue"}
      />
    </div>
  );
}
