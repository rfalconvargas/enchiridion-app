/**
 * Fossil Lab module content.
 *
 * One module today ("The Problem With Shrink-Wrapped Dinosaurs"), but the shape
 * is data-only so new modules are a content edit, not a code change. The
 * `FossilLab` wizard reads a `LabModule` and renders the 7-step flow from it.
 */

export interface DecisionOption {
  id: string;
  label: string;
  /** One-line consequence shown after the visitor picks. Neither is "wrong". */
  consequence: string;
}

export interface LabModule {
  id: string;
  /** Small eyebrow above the hook. */
  kicker: string;
  title: string;
  hookSubtitle: string;
  /** ~estimated seconds, surfaced as social proof for "under a minute". */
  seconds: number;

  /** Step 2 — the specimen. */
  specimen: {
    image: string;
    imageAlt: string;
    caption: string;
    body: string;
  };

  /** Step 3 — the fossil clue. */
  clue: {
    eyebrow: string;
    headline: string;
    body: string;
  };

  /** Step 4 — the reconstruction decision. */
  decision: {
    prompt: string;
    helper: string;
    options: [DecisionOption, DecisionOption];
  };

  /** Step 5 — scientific uncertainty. */
  uncertainty: {
    headline: string;
    body: string;
    examples: string[];
  };

  /** Step 6 — the takeaway. */
  learning: {
    headline: string;
    points: string[];
  };

  /** Step 7 — the close. */
  cta: {
    headline: string;
    body: string;
  };
}

export const SHRINK_WRAP_MODULE: LabModule = {
  id: "shrink-wrapped-dinosaurs",
  kicker: "Fossil Lab · Module 01",
  title: "The Problem With Shrink-Wrapped Dinosaurs",
  hookSubtitle:
    "Most dinosaurs you've seen are guesses dressed up as facts. Spend 45 seconds in the lab and you'll never look at one the same way.",
  seconds: 45,

  specimen: {
    image: "/spino-skull.png",
    imageAlt: "Spinosaurus aegyptiacus lateral cranium reconstruction",
    caption: "The specimen",
    body: "This is roughly what a fossil gives us: bone. No skin, no muscle, no fat — just the scaffold the animal was built on.",
  },

  clue: {
    eyebrow: "Fossil clue",
    headline: "Fossils preserve the scaffold, not the animal.",
    body: "Skin, fat, lips, and muscle almost never fossilize. So every reconstruction has to make a choice the bones can't make for it: how much soft tissue went back on top?",
  },

  decision: {
    prompt: "You're the paleoartist. Rebuild it.",
    helper: "There's no wrong answer here — that's the whole point.",
    options: [
      {
        id: "shrinkwrap",
        label: "Wrap the skin tight to the skull",
        consequence:
          "You get the dramatic, snarling look most movies use — every bony ridge showing through.",
      },
      {
        id: "softtissue",
        label: "Add fat, muscle & soft tissue",
        consequence:
          "You get a heavier, stranger animal — closer to how living creatures actually look.",
      },
    ],
  },

  uncertainty: {
    headline: "Living animals are not shrink-wrapped.",
    body: "Strip the soft tissue from a hippo, a seal, or an ostrich and the skull looks nothing like the living face. “Shrink-wrapping” makes extinct animals look like zombies — anatomically tight, but biologically wrong. The honest answer is that we're often estimating, and good paleoart shows that uncertainty instead of hiding it.",
    examples: [
      "A hippo skull hides behind huge cheeks and lips",
      "An ostrich's face is mostly soft tissue, not bone",
      "Seals carry fat that erases the skeleton's shape",
    ],
  },

  learning: {
    headline: "What you just learned",
    points: [
      "A skeleton is a starting point, not a portrait.",
      "Soft tissue — the part we rarely find — changes everything.",
      "The best reconstructions are honest about what we don't know.",
    ],
  },

  cta: {
    headline: "This is how Enchiridion teaches science.",
    body: "Every Enchiridion video and lesson turns fossil evidence into something you can question, explore, and actually understand — not just memorize.",
  },
};
