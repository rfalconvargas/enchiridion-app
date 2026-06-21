/**
 * The first five interactive learning modules surfaced on the landing roadmap.
 *
 * These mirror the `/demo` lesson library but lead with the *interaction* —
 * what the learner actually does in 3D — rather than the spec sheet. Spinosaurus
 * is live; the rest are the announced pipeline. Keep this list short and honest;
 * it doubles as the public roadmap.
 */

export type ModuleStatus = "live" | "next" | "soon";

export interface LearningModule {
  id: string;
  name: string;
  scientificName: string;
  /** Browse domain shown as a small eyebrow. */
  domain: string;
  /** The hook — why this module is worth your time. */
  hook: string;
  /** The interactive promise — what you DO in 3D. Leads with a verb. */
  interaction: string;
  minutes: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  status: ModuleStatus;
}

export const MODULES: LearningModule[] = [
  {
    id: "spinosaurus",
    name: "Spinosaurus",
    scientificName: "Spinosaurus aegyptiacus",
    domain: "Prehistoric life",
    hook: "The river monster that rewrote the rules of predatory dinosaurs.",
    interaction:
      "Orbit the cranium, then scrub reconstructions from 1915 to 2026 to watch the science change.",
    minutes: 12,
    difficulty: "Beginner",
    status: "live",
  },
  {
    id: "trex",
    name: "Tyrannosaurus rex",
    scientificName: "Tyrannosaurus rex",
    domain: "Prehistoric life",
    hook: "The tyrant lizard king — engineered for a bone-crushing bite.",
    interaction:
      "X-ray the jaw to trace the bite mechanics and read binocular vision off the skull.",
    minutes: 15,
    difficulty: "Intermediate",
    status: "next",
  },
  {
    id: "megalodon",
    name: "Megalodon",
    scientificName: "Otodus megalodon",
    domain: "Ancient oceans",
    hook: "A 15-metre shark reconstructed almost entirely from teeth.",
    interaction:
      "Scale a human against the jaw and compare tooth sets to see how size is estimated.",
    minutes: 10,
    difficulty: "Beginner",
    status: "soon",
  },
  {
    id: "human-evolution",
    name: "Human Evolution",
    scientificName: "Hominini",
    domain: "Deep time",
    hook: "Six million years, one upright walk — before the big brains.",
    interaction:
      "Morph one skull into the next and trace the pelvis changes that made us bipedal.",
    minutes: 14,
    difficulty: "Intermediate",
    status: "soon",
  },
  {
    id: "ancient-oceans",
    name: "Ancient Oceans",
    scientificName: "Phanerozoic seas",
    domain: "Deep time",
    hook: "500 million years beneath the waves, layer by layer.",
    interaction:
      "Dive a Paleozoic reef and peel back geological time to watch life rebuild after extinctions.",
    minutes: 16,
    difficulty: "Advanced",
    status: "soon",
  },
];

export const MODULE_STATUS_LABEL: Record<ModuleStatus, string> = {
  live: "Playable now",
  next: "Up next",
  soon: "Coming soon",
};
