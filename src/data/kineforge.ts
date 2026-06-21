/**
 * Data model for the Kineforge concept demo (KineforgeStudio).
 *
 * This is a deliberately *honest* front-end simulation: there is no Unreal
 * connection. The builders below turn a (creature, style preset) selection into
 * the same artifacts the real workflow would produce — a rig report, a shot
 * timeline, a camera plan, an animation-clip checklist, and export targets — so
 * a creator can read what Kineforge would organize for them.
 */

export type CreatureId = "spinosaurus" | "tyrannosaurus" | "triceratops" | "custom";
export type PresetId =
  | "documentary"
  | "fossil"
  | "museum"
  | "paleoart"
  | "cinematic";

export interface Creature {
  id: CreatureId;
  name: string;
  sci: string;
  /** Whether a live 3D model ships on the site today (drives honest labelling). */
  live: boolean;
  template: string;
  skeletonStatus: string;
  /** Rig controls the template expects. */
  controls: string[];
  warning: string;
  /** The 10–12s "action beat" timeline label. */
  actionBeat: string;
  /** Animation clips the shot would need. */
  animClips: string[];
}

export interface Preset {
  id: PresetId;
  name: string;
  /** Establishing environment used in the 0–2s timeline block. */
  env: string;
  /** One-line treatment summary. */
  grade: string;
  /** Four lenses, one per camera in the plan. */
  lenses: string[];
  /** Preset-specific render note. */
  renderNote: string;
}

export const CREATURES: Record<CreatureId, Creature> = {
  spinosaurus: {
    id: "spinosaurus",
    name: "Spinosaurus",
    sci: "Spinosaurus aegyptiacus",
    live: true,
    template: "Spinosaurid · Theropod variant",
    skeletonStatus: "Compatible rig required",
    controls: ["Pelvis", "Spine", "Neck", "Head", "Jaw", "Tail", "Legs", "Feet"],
    warning:
      "Realistic locomotion requires matching animation clips or Control Rig cleanup.",
    actionBeat: "Jaw-open / roar marker",
    animClips: [
      "Idle breathing clip",
      "Slow walk cycle",
      "Head turn",
      "Jaw open",
      "Tail sway",
      "Foot planting / IK cleanup",
    ],
  },
  tyrannosaurus: {
    id: "tyrannosaurus",
    name: "Tyrannosaurus",
    sci: "Tyrannosaurus rex",
    live: false,
    template: "Tyrannosaurid · Theropod variant",
    skeletonStatus: "Compatible rig required",
    controls: ["Pelvis", "Spine", "Neck", "Head", "Jaw", "Arms", "Tail", "Legs", "Feet"],
    warning:
      "Bipedal weight and tail counterbalance need matching walk clips or Control Rig cleanup.",
    actionBeat: "Jaw-open / roar marker",
    animClips: [
      "Idle breathing clip",
      "Stalking walk cycle",
      "Head turn",
      "Jaw open / bite",
      "Tail counterbalance",
      "Foot planting / IK cleanup",
    ],
  },
  triceratops: {
    id: "triceratops",
    name: "Triceratops",
    sci: "Triceratops horridus",
    live: false,
    template: "Ceratopsid · Quadruped variant",
    skeletonStatus: "Compatible rig required",
    controls: [
      "Pelvis",
      "Spine",
      "Neck",
      "Head",
      "Beak",
      "Frill",
      "Tail",
      "Fore-legs",
      "Hind-legs",
      "Feet",
    ],
    warning:
      "Quadruped gait needs four-limb IK and matching walk clips or Control Rig cleanup.",
    actionBeat: "Head-lower / bellow marker",
    animClips: [
      "Idle breathing clip",
      "Heavy walk cycle",
      "Head sweep",
      "Beak / jaw open",
      "Tail sway",
      "Four-point foot planting / IK cleanup",
    ],
  },
  custom: {
    id: "custom",
    name: "Custom rig",
    sci: "User-supplied skeleton",
    live: false,
    template: "Custom · unverified",
    skeletonStatus: "Unknown — import rig to analyze",
    controls: ["Detected on import"],
    warning:
      "Upload a rig map first — Kineforge can't validate controls until the skeleton is imported.",
    actionBeat: "Action beat (define on import)",
    animClips: ["Imported clips required", "Map controls to Kineforge schema"],
  },
};

export const PRESETS: Record<PresetId, Preset> = {
  documentary: {
    id: "documentary",
    name: "Natural history documentary",
    env: "shallow river at sunset",
    grade: "Naturalistic · soft golden grade",
    lenses: ["24mm", "50mm tele", "85mm", "35mm push"],
    renderNote: "Warm naturalistic grade, subtle grain, observational mood.",
  },
  fossil: {
    id: "fossil",
    name: "Fossil formation explainer",
    env: "sediment strata cross-section",
    grade: "Diagrammatic · high-clarity key light",
    lenses: ["28mm", "40mm", "65mm macro", "35mm push"],
    renderNote: "Clean key light, labelled depth cues, explainer-friendly contrast.",
  },
  museum: {
    id: "museum",
    name: "Museum reconstruction",
    env: "lit museum hall",
    grade: "Neutral · gallery spotlighting",
    lenses: ["35mm", "50mm", "85mm", "50mm orbit"],
    renderNote: "Neutral white balance, soft spotlights, reconstruction-accurate.",
  },
  paleoart: {
    id: "paleoart",
    name: "Paleoart previs",
    env: "Cretaceous floodplain",
    grade: "Painterly · atmospheric haze",
    lenses: ["21mm", "40mm", "75mm", "40mm push"],
    renderNote: "Painterly atmosphere, layered haze, concept-art colour story.",
  },
  cinematic: {
    id: "cinematic",
    name: "Cinematic YouTube intro",
    env: "mist + volumetric haze",
    grade: "High-contrast · anamorphic flare",
    lenses: ["40mm anamorphic", "35mm", "75mm", "50mm push"],
    renderNote: "Punchy contrast, anamorphic flares, title-safe negative space.",
  },
};

export const CREATURE_ORDER: CreatureId[] = [
  "spinosaurus",
  "tyrannosaurus",
  "triceratops",
  "custom",
];

export const PRESET_ORDER: PresetId[] = [
  "documentary",
  "fossil",
  "museum",
  "paleoart",
  "cinematic",
];

export const DEFAULT_PROMPT =
  "A Spinosaurus walks through a shallow river at sunset, pauses, turns its head toward camera, opens its jaws, and the camera pushes in through mist.";

export interface TimelineBlock {
  t: string;
  label: string;
  /** Relative duration (seconds) — drives the visual bar width. */
  dur: number;
  /** track tint token */
  tone: "env" | "creature" | "beat" | "camera";
}

export interface CameraShot {
  shot: string;
  lens: string;
}

export interface ShotPlan {
  creature: Creature;
  preset: Preset;
  timeline: TimelineBlock[];
  cameras: CameraShot[];
  exports: { label: string; detail: string }[];
}

/** Build the full simulated shot plan from a creature + style preset. */
export function buildShotPlan(creature: Creature, preset: Preset): ShotPlan {
  const timeline: TimelineBlock[] = [
    { t: "0–2s", label: `Establish ${preset.env}`, dur: 2, tone: "env" },
    { t: "2–6s", label: "Creature enters frame", dur: 4, tone: "creature" },
    { t: "6–8s", label: "Pause / weight shift", dur: 2, tone: "creature" },
    { t: "8–10s", label: "Head turns toward camera", dur: 2, tone: "creature" },
    { t: "10–12s", label: creature.actionBeat, dur: 2, tone: "beat" },
    { t: "12–15s", label: "Camera push-in through mist", dur: 3, tone: "camera" },
  ];

  const shots = [
    "Wide establishing shot",
    "Low tracking shot",
    "Medium creature profile",
    "Push-in close-up",
  ];
  const cameras: CameraShot[] = shots.map((shot, i) => ({
    shot,
    lens: preset.lenses[i] ?? "50mm",
  }));

  const exports = [
    { label: "Unreal Sequencer shot plan", detail: `${timeline.length} timeline blocks` },
    { label: "Rig-map checklist", detail: `${creature.controls.length} controls` },
    { label: "Animation clip shopping list", detail: `${creature.animClips.length} clips` },
    { label: "Render notes", detail: preset.renderNote },
  ];

  return { creature, preset, timeline, cameras, exports };
}
