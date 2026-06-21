import Link from "next/link";
import { Box, Clock, ArrowRight } from "lucide-react";
import { MODULES, MODULE_STATUS_LABEL } from "@/data/modules";
import { cn } from "@/lib/cn";

/**
 * Public roadmap of the first five interactive modules. Leads with the
 * *interaction* (what you do in 3D), not a spec sheet. Spinosaurus is live and
 * links into the lab; the rest set expectations and feed the waitlist.
 */
export function ModulesRoadmap() {
  return (
    <section aria-labelledby="modules-heading">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ds-secondary">
            The learning map
          </p>
          <h2
            id="modules-heading"
            className="mt-1.5 text-balance text-2xl font-bold text-ds-text"
          >
            Five modules to start
          </h2>
        </div>
      </div>

      <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {MODULES.map((m) => {
          const isLive = m.status === "live";
          return (
            <li
              key={m.id}
              className={cn(
                "ench-card flex flex-col p-5",
                isLive && "border-ds-primary/30 ds-glow"
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-ds-faint">
                  {m.domain}
                </span>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                    isLive
                      ? "bg-ds-primary/15 text-ds-accent"
                      : "border border-ds-border bg-ds-surface-2 text-ds-muted"
                  )}
                >
                  {MODULE_STATUS_LABEL[m.status]}
                </span>
              </div>

              <h3 className="mt-2 text-lg font-bold leading-tight text-ds-text">
                {m.name}
              </h3>
              <p className="font-mono text-[11px] italic text-ds-muted">
                {m.scientificName}
              </p>

              {/* The interactive promise — the whole point of the module. */}
              <p className="mt-3 flex gap-2 text-sm leading-relaxed text-ds-text">
                <Box size={15} className="mt-0.5 shrink-0 text-ds-secondary" />
                {m.interaction}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-ds-border pt-3">
                <span className="inline-flex items-center gap-1.5 text-[11px] text-ds-faint">
                  <Clock size={12} className="text-ds-secondary" />
                  {m.minutes} min · {m.difficulty}
                </span>
                {isLive ? (
                  <Link
                    href="/demo"
                    className="ds-focus inline-flex items-center gap-1 text-xs font-semibold text-ds-accent hover:underline"
                  >
                    Start lesson
                    <ArrowRight size={13} />
                  </Link>
                ) : (
                  <span className="text-xs font-medium text-ds-faint">
                    In production
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
