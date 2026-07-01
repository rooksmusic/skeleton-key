console.log("Skeleton Key extension activated");

import {
  initialize,
  type ActivationContext,
  MidiClip,
  type NoteDescription,
  type ApiVersion,
} from "@ableton-extensions/sdk";

// Import the HTML and CSS template assets (inlined by esbuild text loader)
import htmlTemplate from "./ui/index.html";
import cssStyles from "./ui/styles.css";

// Using standard SDK property setter directly

// Colors in 24-bit decimal format
const COLORS = {
  DRUMS: 16734525,   // 0xFF7A3D (vibrant orange)
  BASS: 16754747,    // 0xFFB03B (warm amber)
  MELODY: 891391,    // 0x00D9FF (bright cyan)
  EFFECTS: 11030783  // 0xA85FFF (vivid purple)
};

// Context menu scopes — register every SDK scope, but never overlapping pairs on the
// same right-click target (Live stacks matching scopes as separate menu rows):
//   ClipSlot + ClipSlotSelection  → session slot / clip view
//   ClipSlot + MidiClip|AudioClip → filled session clip
// Use ClipSlotSelection for session slots (incl. multi-select) and clip scopes for
// clip bodies (session clip view, arrangement clips). Omit ClipSlot entirely.
const CONTEXT_MENU_SCOPES = [
  "ClipSlotSelection",
  "MidiClip",
  "AudioClip",
  "MidiTrack",
  "AudioTrack",
  "Scene",
  "MidiTrack.ArrangementSelection",
  "AudioTrack.ArrangementSelection",
  "DrumRack",
  "Sample",
  "Simpler",
] as const;

let isActivated = false;

export function activate(activation: ActivationContext) {
  if (isActivated) {
    console.warn("Skeleton Key: activate() already ran — skipping duplicate registration");
    return;
  }
  isActivated = true;

  console.log("Skeleton Key: activate() called");

  const context = initialize(activation, "1.0.0");

  console.log("Skeleton Key: context initialized");

  // Register the command that opens the UI dialog
  context.commands.registerCommand("skeleton-key.open", () =>
    (async () => {
      console.log("Skeleton Key: command triggered, opening dialog");
      try {
        // Inline CSS into the HTML template
        const formattedHtml = htmlTemplate
          .replace(/<link rel="stylesheet"[^>]*>\s*/g, "")
          .replace("</head>", `<style>${cssStyles}</style></head>`);

        // Encode HTML as a data URL
        const dialogUrl = `data:text/html,${encodeURIComponent(formattedHtml)}`;

        // Show the modal dialog and wait for user action
        const resultStr = await context.ui.showModalDialog(dialogUrl, 390, 580);
        if (!resultStr) return;

        const result = JSON.parse(resultStr);
        if (result && result.action === "inject" && result.genre) {
          const customBpm = result.bpm ? Number(result.bpm) : undefined;
          const layerConfig = normalizeLayerConfig(result);
          if (!LAYER_KEYS.some((layer) => layerConfig.include[layer])) return;
          await injectBlueprint(context, result.genre, customBpm, layerConfig);
        }
      } catch (err) {
        console.error("[Skeleton Key] Dialog failed:", err);
      }
    })()
  );

  // Register context menu action on all valid object scopes.
  // Must be called synchronously during activate — the SDK host does not await
  // the activate return value, so async/await here causes registrations to be lost.
  for (const scope of CONTEXT_MENU_SCOPES) {
    context.ui.registerContextMenuAction(
      scope,
      "Skeleton Key...",
      "skeleton-key.open"
    );
    console.log(`Skeleton Key: registered context menu on ${scope}`);
  }

  console.log("Skeleton Key: fully activated");
}

// Note names for logging
const NOTE_NAMES = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];

type LayerKey = "drums" | "bass" | "melody" | "effects";

type LayerConfig = {
  include: Record<LayerKey, boolean>;
  midi: Record<LayerKey, boolean>;
};

const LAYER_KEYS: LayerKey[] = ["drums", "bass", "melody", "effects"];

const DEFAULT_LAYER_CONFIG: LayerConfig = {
  include: { drums: true, bass: true, melody: true, effects: true },
  midi: { drums: true, bass: true, melody: true, effects: true },
};

function normalizeLayerConfig(result: {
  include?: Partial<Record<LayerKey, boolean>>;
  midi?: Partial<Record<LayerKey, boolean>>;
  layers?: LayerConfig;
  tracks?: Partial<Record<LayerKey, boolean>>;
}): LayerConfig {
  if (result.layers?.include && result.layers?.midi) {
    return {
      include: { ...DEFAULT_LAYER_CONFIG.include, ...result.layers.include },
      midi: { ...DEFAULT_LAYER_CONFIG.midi, ...result.layers.midi },
    };
  }

  const legacyMidi = result.midi || result.tracks;
  return {
    include: legacyMidi
      ? {
          drums: legacyMidi.drums !== false,
          bass: legacyMidi.bass !== false,
          melody: legacyMidi.melody !== false,
          effects: legacyMidi.effects !== false,
        }
      : { ...DEFAULT_LAYER_CONFIG.include },
    midi: {
      ...DEFAULT_LAYER_CONFIG.midi,
      ...(result.midi || {}),
    },
  };
}

// Transpose a note array by semitones (drums notes at pitch < 40 are kit pieces — skip)
function transposeNotes(notes: NoteDescription[], semitones: number): NoteDescription[] {
  if (semitones === 0) return notes;
  return notes.map(n => ({
    ...n,
    pitch: n.pitch < 40 ? n.pitch : Math.max(0, Math.min(127, n.pitch + semitones))
  }));
}

// Primary DAW timeline injector function
type MidiConfig = { drums: boolean; bass: boolean; melody: boolean; effects: boolean };

async function injectBlueprint(
  context: ReturnType<typeof initialize>,
  genre: string,
  customBpm?: number,
  layerConfig: LayerConfig = DEFAULT_LAYER_CONFIG,
) {
  console.log(`[Skeleton Key] Injecting blueprint for genre: ${genre}`);
  const song = context.application.song;

  // Read project key/scale — rootNote is 0=C … 11=B
  const projectRoot = song.rootNote ?? 0;
  const scaleEnabled = song.scaleMode ?? false;
  console.log(`[Skeleton Key] Project key: ${NOTE_NAMES[projectRoot]}, Scale Mode: ${scaleEnabled}`);

  // Default root notes per genre (used as blueprint base)
  const genreRoots: Record<string, number> = {
    house:       9,  // A
    dubstep:     5,  // F
    hiphop_trap: 3,  // D#/Eb
    dnb:         5,  // F
    techno:      5,  // F
    afrobeats:   7,  // G
    reggaeton:   2,  // D
    uk_garage:   9,  // A
  };
  const blueprintRoot = genreRoots[genre] ?? 0;
  const transpose = scaleEnabled ? ((projectRoot - blueprintRoot + 12) % 12) : 0;
  if (transpose !== 0) {
    console.log(`[Skeleton Key] Transposing +${transpose} semitones to match project key ${NOTE_NAMES[projectRoot]}`);
  }

  // Set tempo — use custom BPM from dialog if provided, else genre default
  const defaultBpms: Record<string, number> = {
    house: 126, dubstep: 140, hiphop_trap: 145, dnb: 172,
    techno: 133, afrobeats: 106, reggaeton: 97, uk_garage: 130,
  };
  song.tempo = customBpm ?? defaultBpms[genre] ?? 126;

  // 1. Map the Arrangement Locators (Cue Points)
  // Intro (Bar 1 / beat 0), Build (Bar 17 / beat 64), Drop (Bar 33 / beat 128),
  // Break (Bar 49 / beat 192), Outro (Bar 65 / beat 256)
  const locators = [
    { beat: 0,   name: "Intro"   },
    { beat: 64,  name: "Build"   },
    { beat: 128, name: "Drop"    },
    { beat: 192, name: "Break"   },
    { beat: 256, name: "Drop 2"  },
    { beat: 320, name: "Outro"   },
  ];

  for (const loc of locators) {
    try {
      const cp = await song.createCuePoint(loc.beat);
      cp.name = loc.name;
    } catch (e) {
      console.warn(`[Skeleton Key] Failed to create locator at beat ${loc.beat}:`, e);
    }
  }

  // 2. Create only the selected MIDI tracks
  const include = {
    drums: layerConfig.include.drums,
    bass: layerConfig.include.bass,
    melody: layerConfig.include.melody,
    effects: layerConfig.include.effects,
  };

  const tracks = await context.withinTransaction(async () => {
    const created: {
      drums?: Awaited<ReturnType<typeof song.createMidiTrack>>;
      bass?: Awaited<ReturnType<typeof song.createMidiTrack>>;
      melody?: Awaited<ReturnType<typeof song.createMidiTrack>>;
      effects?: Awaited<ReturnType<typeof song.createMidiTrack>>;
    } = {};

    if (include.drums) {
      created.drums = await song.createMidiTrack();
      created.drums.name = "Drums";
    }
    if (include.bass) {
      created.bass = await song.createMidiTrack();
      created.bass.name = "Bass";
    }
    if (include.melody) {
      created.melody = await song.createMidiTrack();
      created.melody.name = "Melody";
    }
    if (include.effects) {
      created.effects = await song.createMidiTrack();
      created.effects.name = "Effects";
    }

    return created;
  });

  // 3. Build all note patterns — full (16 bars), intro/outro (16 bars stripped), break (16 bars minimal)
  type NoteSet = { drums: NoteDescription[], bass: NoteDescription[], melody: NoteDescription[], fx: NoteDescription[] };
  const BARS = 16; // each section is 16 bars / 64 beats

  const full:   NoteSet = { drums: [], bass: [], melody: [], fx: [] };
  const intro:  NoteSet = { drums: [], bass: [], melody: [], fx: [] };
  const brk:    NoteSet = { drums: [], bass: [], melody: [], fx: [] };

  switch (genre) {

    // ─────────────────────────────────── HOUSE ───────────────────────────────
    case "house": {
      // FULL — 4-on-floor kick, off-beat bass, Am7 chord stabs
      for (let i = 0; i < BARS * 4; i++) {
        const v = i % 4 === 0 ? 115 : i % 4 === 2 ? 110 : i % 4 === 1 ? 102 : 95;
        full.drums.push({ pitch: 36, startTime: i,       duration: 0.25, velocity: v });
        full.bass.push ({ pitch: 33, startTime: i + 0.5, duration: 0.4,  velocity: 100 });
      }
      const am7 = [57, 60, 64, 67];
      for (let bar = 0; bar < BARS; bar++) {
        for (const up of [1.5, 3.5]) for (const p of am7)
          full.melody.push({ pitch: p, startTime: bar * 4 + up, duration: 0.4, velocity: 90 });
      }
      for (const p of [45, 52, 57, 64])
        full.fx.push({ pitch: p, startTime: 0, duration: BARS * 4 - 0.5, velocity: 52 });

      // INTRO — kick only, long sparse root bass, no melody, open pad
      for (let i = 0; i < BARS * 4; i++) {
        const v = i % 4 === 0 ? 110 : i % 4 === 2 ? 90 : 0;
        if (v) intro.drums.push({ pitch: 36, startTime: i, duration: 0.25, velocity: v });
      }
      for (let bar = 0; bar < BARS; bar += 4)
        intro.bass.push({ pitch: 33, startTime: bar * 4, duration: 14, velocity: 80 });
      for (const p of [45, 57])
        intro.fx.push({ pitch: p, startTime: 0, duration: BARS * 4 - 0.5, velocity: 45 });

      // BREAK — snare on 3, bass every 2 bars, sparse chord hits, lush pad
      for (let bar = 0; bar < BARS; bar++) {
        brk.drums.push({ pitch: 38, startTime: bar * 4 + 2, duration: 0.25, velocity: 105 });
        if (bar % 2 === 0)
          brk.drums.push({ pitch: 38, startTime: bar * 4 + 3.5, duration: 0.25, velocity: 80 });
      }
      for (let bar = 0; bar < BARS; bar += 2)
        brk.bass.push({ pitch: 33, startTime: bar * 4, duration: 7.5, velocity: 85 });
      for (let bar = 0; bar < BARS; bar += 4) {
        for (const p of am7)
          brk.melody.push({ pitch: p, startTime: bar * 4 + 1.5, duration: 1.5, velocity: 72 });
      }
      for (const p of [45, 52, 57, 64])
        brk.fx.push({ pitch: p, startTime: 0, duration: BARS * 4 - 0.5, velocity: 55 });
      break;
    }

    // ─────────────────────────────────── DUBSTEP ─────────────────────────────
    case "dubstep": {
      // FULL — half-time kick/snare, sustained bass drops, sparse stabs
      for (let bar = 0; bar < BARS; bar++) {
        const bs = bar * 4;
        full.drums.push({ pitch: 36, startTime: bs,       duration: 0.25, velocity: 110 });
        full.drums.push({ pitch: 38, startTime: bs + 2,   duration: 0.25, velocity: 120 });
        if (bar % 2 === 1)
          full.drums.push({ pitch: 36, startTime: bs + 1.5, duration: 0.25, velocity: 100 });
      }
      for (let bar = 0; bar < BARS; bar += 2)
        full.bass.push({ pitch: 29, startTime: bar * 4, duration: 6.0, velocity: 105 });
      const fm = [53, 56, 60];
      for (let bar = 0; bar < BARS; bar++) {
        if (bar % 2 === 0) for (const p of fm)
          full.melody.push({ pitch: p, startTime: bar * 4 + 2.5, duration: 0.5, velocity: 85 });
      }
      for (const p of [41, 53, 56, 60])
        full.fx.push({ pitch: p, startTime: 0, duration: BARS * 4 - 0.5, velocity: 48 });

      // INTRO — kick on 1 only, held bass, no melody, dark pad
      for (let bar = 0; bar < BARS; bar++)
        intro.drums.push({ pitch: 36, startTime: bar * 4, duration: 0.25, velocity: 100 });
      for (let bar = 0; bar < BARS; bar += 4)
        intro.bass.push({ pitch: 29, startTime: bar * 4, duration: 14, velocity: 85 });
      for (const p of [41, 53])
        intro.fx.push({ pitch: p, startTime: 0, duration: BARS * 4 - 0.5, velocity: 42 });

      // BREAK — snare only (no kick), very sparse bass, single chord hit per 4 bars, dark pad
      for (let bar = 0; bar < BARS; bar++)
        brk.drums.push({ pitch: 38, startTime: bar * 4 + 2, duration: 0.25, velocity: 110 });
      for (let bar = 0; bar < BARS; bar += 4)
        brk.bass.push({ pitch: 29, startTime: bar * 4, duration: 14, velocity: 80 });
      for (let bar = 0; bar < BARS; bar += 4) for (const p of fm)
        brk.melody.push({ pitch: p, startTime: bar * 4 + 2.5, duration: 2.0, velocity: 68 });
      for (const p of [41, 53, 56, 60])
        brk.fx.push({ pitch: p, startTime: 0, duration: BARS * 4 - 0.5, velocity: 52 });
      break;
    }

    // ─────────────────────────────────── HIP-HOP / TRAP ──────────────────────
    case "hiphop_trap": {
      // FULL — sparse 808 kick cadence, sub-bass mirrors, descending chords
      const prog = [
        [51, 58, 63], [49, 56, 61], [47, 54, 59], [46, 53, 58]
      ]; // D#m, C#m, Bm, A#m
      for (let bar = 0; bar < BARS; bar++) {
        const bs = bar * 4;
        full.drums.push({ pitch: 36, startTime: bs,       duration: 0.25, velocity: 115 });
        full.drums.push({ pitch: 36, startTime: bs + 1.5, duration: 0.25, velocity: 110 });
        full.drums.push({ pitch: 38, startTime: bs + 2,   duration: 0.25, velocity: 115 });
        if (bar % 2 === 1) {
          full.drums.push({ pitch: 36, startTime: bs + 3.25, duration: 0.125, velocity: 90 });
          full.drums.push({ pitch: 36, startTime: bs + 3.5,  duration: 0.125, velocity: 100 });
        }
        full.bass.push({ pitch: 27, startTime: bs,       duration: 1.25, velocity: 100 });
        full.bass.push({ pitch: 27, startTime: bs + 1.5, duration: 1.25, velocity: 100 });
        if (bar % 2 === 1)
          full.bass.push({ pitch: 27, startTime: bs + 3.5, duration: 0.4, velocity: 90 });
        for (const p of prog[bar % 4])
          full.melody.push({ pitch: p, startTime: bar * 4, duration: 3.5, velocity: 85 });
      }
      for (const p of [39, 51, 54, 58])
        full.fx.push({ pitch: p, startTime: 0, duration: BARS * 4 - 0.5, velocity: 48 });

      // INTRO — kick on 1 only, long 808 sub, no chords, dark sub pad
      for (let bar = 0; bar < BARS; bar++)
        intro.drums.push({ pitch: 36, startTime: bar * 4, duration: 0.25, velocity: 108 });
      for (let bar = 0; bar < BARS; bar += 4)
        intro.bass.push({ pitch: 27, startTime: bar * 4, duration: 14, velocity: 90 });
      for (const p of [39, 51])
        intro.fx.push({ pitch: p, startTime: 0, duration: BARS * 4 - 0.5, velocity: 44 });

      // BREAK — snare on 3 only, bass held, one chord per 4 bars, atmospheric pad
      for (let bar = 0; bar < BARS; bar++)
        brk.drums.push({ pitch: 38, startTime: bar * 4 + 2, duration: 0.25, velocity: 108 });
      for (let bar = 0; bar < BARS; bar += 4)
        brk.bass.push({ pitch: 27, startTime: bar * 4, duration: 14, velocity: 78 });
      for (let bar = 0; bar < BARS; bar += 4) for (const p of prog[bar % 4])
        brk.melody.push({ pitch: p, startTime: bar * 4, duration: 7.5, velocity: 65 });
      for (const p of [39, 51, 54, 58])
        brk.fx.push({ pitch: p, startTime: 0, duration: BARS * 4 - 0.5, velocity: 52 });
      break;
    }

    // ─────────────────────────────────── DRUM AND BASS ───────────────────────
    case "dnb": {
      // FULL — Amen break, Reece bass, Fm9 chords
      const fm9 = [53, 56, 60, 63, 67];
      for (let bar = 0; bar < BARS; bar++) {
        const bs = bar * 4;
        full.drums.push({ pitch: 36, startTime: bs,       duration: 0.2, velocity: 110 });
        full.drums.push({ pitch: 36, startTime: bs + 1.5, duration: 0.2, velocity: 105 });
        full.drums.push({ pitch: 38, startTime: bs + 1,   duration: 0.2, velocity: 115 });
        full.drums.push({ pitch: 38, startTime: bs + 3,   duration: 0.2, velocity: 115 });
        if (bar % 2 === 1)
          full.drums.push({ pitch: 36, startTime: bs + 2.5, duration: 0.2, velocity: 100 });
      }
      for (let bar = 0; bar < BARS; bar += 2)
        full.bass.push({ pitch: 29, startTime: bar * 4, duration: 7.8, velocity: 100 });
      for (let bar = 0; bar < BARS; bar += 2) for (const p of fm9)
        full.melody.push({ pitch: p, startTime: bar * 4, duration: 7.8, velocity: 85 });
      for (const p of [41, 53, 60, 67])
        full.fx.push({ pitch: p, startTime: 0, duration: BARS * 4 - 0.5, velocity: 50 });

      // INTRO — kick + snare minimal (just 1 and 3), bass long, no melody, deep pad
      for (let bar = 0; bar < BARS; bar++) {
        const bs = bar * 4;
        intro.drums.push({ pitch: 36, startTime: bs,     duration: 0.2, velocity: 105 });
        intro.drums.push({ pitch: 38, startTime: bs + 2, duration: 0.2, velocity: 108 });
      }
      for (let bar = 0; bar < BARS; bar += 4)
        intro.bass.push({ pitch: 29, startTime: bar * 4, duration: 14, velocity: 88 });
      for (const p of [41, 53])
        intro.fx.push({ pitch: p, startTime: 0, duration: BARS * 4 - 0.5, velocity: 44 });

      // BREAK — snare only, very sparse bass, long chords, full pad
      for (let bar = 0; bar < BARS; bar++) {
        brk.drums.push({ pitch: 38, startTime: bar * 4 + 1, duration: 0.2, velocity: 112 });
        brk.drums.push({ pitch: 38, startTime: bar * 4 + 3, duration: 0.2, velocity: 105 });
      }
      for (let bar = 0; bar < BARS; bar += 4)
        brk.bass.push({ pitch: 29, startTime: bar * 4, duration: 14, velocity: 82 });
      for (let bar = 0; bar < BARS; bar += 4) for (const p of fm9)
        brk.melody.push({ pitch: p, startTime: bar * 4, duration: 14, velocity: 70 });
      for (const p of [41, 53, 60, 67])
        brk.fx.push({ pitch: p, startTime: 0, duration: BARS * 4 - 0.5, velocity: 54 });
      break;
    }

    // ─────────────────────────────────── TECHNO ──────────────────────────────
    case "techno": {
      // FULL — relentless 4/4 kick, offbeat hi-hat, open hi-hat on 2&4, pulsing bass, minimal stab
      for (let bar = 0; bar < BARS; bar++) {
        const bs = bar * 4;
        for (let b = 0; b < 4; b++)
          full.drums.push({ pitch: 36, startTime: bs + b, duration: 0.2, velocity: b === 0 ? 118 : b === 2 ? 112 : 105 });
        for (let b = 0; b < 4; b++)
          full.drums.push({ pitch: 42, startTime: bs + b + 0.5, duration: 0.1, velocity: 78 });
        full.drums.push({ pitch: 46, startTime: bs + 1, duration: 0.4, velocity: 88 });
        full.drums.push({ pitch: 46, startTime: bs + 3, duration: 0.4, velocity: 85 });
      }
      for (let i = 0; i < BARS * 4; i++) {
        const isDown = i % 4 === 0;
        full.bass.push({ pitch: 29, startTime: i,       duration: 0.35, velocity: isDown ? 108 : 85 });
        full.bass.push({ pitch: 29, startTime: i + 0.5, duration: 0.35, velocity: 75 });
      }
      const fmT = [53, 56, 60];
      for (let bar = 0; bar < BARS; bar += 4) for (const p of fmT)
        full.melody.push({ pitch: p, startTime: bar * 4 + 2.5, duration: 0.3, velocity: 80 });
      for (const p of [29, 41, 53, 56])
        full.fx.push({ pitch: p, startTime: 0, duration: BARS * 4 - 0.5, velocity: 46 });

      // INTRO — kick every beat, no hi-hat, long sparse bass, no melody
      for (let bar = 0; bar < BARS; bar++)
        for (let b = 0; b < 4; b++)
          intro.drums.push({ pitch: 36, startTime: bar * 4 + b, duration: 0.2, velocity: 108 });
      for (let bar = 0; bar < BARS; bar += 4)
        intro.bass.push({ pitch: 29, startTime: bar * 4, duration: 14, velocity: 85 });
      for (const p of [29, 41])
        intro.fx.push({ pitch: p, startTime: 0, duration: BARS * 4 - 0.5, velocity: 40 });

      // BREAK — hi-hat only, sparse bass, long chord holds, atmospheric pad
      for (let bar = 0; bar < BARS; bar++)
        for (let b = 0; b < 4; b++) {
          brk.drums.push({ pitch: 42, startTime: bar * 4 + b,       duration: 0.1, velocity: 80 });
          brk.drums.push({ pitch: 42, startTime: bar * 4 + b + 0.5, duration: 0.1, velocity: 65 });
        }
      for (let bar = 0; bar < BARS; bar += 4)
        brk.bass.push({ pitch: 29, startTime: bar * 4, duration: 14, velocity: 78 });
      for (let bar = 0; bar < BARS; bar += 4) for (const p of fmT)
        brk.melody.push({ pitch: p, startTime: bar * 4 + 2.5, duration: 12, velocity: 65 });
      for (const p of [29, 41, 53, 56])
        brk.fx.push({ pitch: p, startTime: 0, duration: BARS * 4 - 0.5, velocity: 52 });
      break;
    }

    // ─────────────────────────────────── AFROBEATS ───────────────────────────
    case "afrobeats": {
      // FULL — syncopated kick/snare, melodic bass G1/Bb1/F1, bright Gm→F stabs
      for (let bar = 0; bar < BARS; bar++) {
        const bs = bar * 4;
        full.drums.push({ pitch: 36, startTime: bs,       duration: 0.25, velocity: 115 });
        full.drums.push({ pitch: 36, startTime: bs + 2.5, duration: 0.25, velocity: 108 });
        full.drums.push({ pitch: 38, startTime: bs + 1,   duration: 0.25, velocity: 112 });
        full.drums.push({ pitch: 38, startTime: bs + 3,   duration: 0.25, velocity: 110 });
        if (bar % 2 === 0)
          full.drums.push({ pitch: 36, startTime: bs + 3.75, duration: 0.15, velocity: 90 });
      }
      const afroBass: [number, number][] = [[31,34],[34,31],[29,31],[31,29]];
      for (let bar = 0; bar < BARS; bar++) {
        const [p1, p2] = afroBass[bar % 4]; const bs = bar * 4;
        full.bass.push({ pitch: p1, startTime: bs,       duration: 0.8,  velocity: 102 });
        full.bass.push({ pitch: p1, startTime: bs + 1.5, duration: 0.5,  velocity: 90  });
        full.bass.push({ pitch: p2, startTime: bs + 2,   duration: 0.8,  velocity: 98  });
        full.bass.push({ pitch: p2, startTime: bs + 3.5, duration: 0.35, velocity: 85  });
      }
      const gmC = [55,58,62], fC = [53,57,60];
      for (let bar = 0; bar < BARS; bar++) {
        const chord = bar % 2 === 0 ? gmC : fC; const bs = bar * 4;
        for (const p of chord) {
          full.melody.push({ pitch: p, startTime: bs + 0.5, duration: 0.4, velocity: 88 });
          full.melody.push({ pitch: p, startTime: bs + 2.5, duration: 0.4, velocity: 84 });
        }
      }
      for (const p of [43, 55, 58, 62])
        full.fx.push({ pitch: p, startTime: 0, duration: BARS * 4 - 0.5, velocity: 50 });

      // INTRO — kick on 1 only, root G1 bass every 2 bars, warm pad
      for (let bar = 0; bar < BARS; bar++)
        intro.drums.push({ pitch: 36, startTime: bar * 4, duration: 0.25, velocity: 108 });
      for (let bar = 0; bar < BARS; bar += 2)
        intro.bass.push({ pitch: 31, startTime: bar * 4, duration: 7.5, velocity: 88 });
      for (const p of [43, 55])
        intro.fx.push({ pitch: p, startTime: 0, duration: BARS * 4 - 0.5, velocity: 44 });

      // BREAK — snare on 2&4, bass every 2 bars, long chord holds, lush pad
      for (let bar = 0; bar < BARS; bar++) {
        brk.drums.push({ pitch: 38, startTime: bar * 4 + 1, duration: 0.25, velocity: 108 });
        brk.drums.push({ pitch: 38, startTime: bar * 4 + 3, duration: 0.25, velocity: 105 });
      }
      for (let bar = 0; bar < BARS; bar += 2)
        brk.bass.push({ pitch: 31, startTime: bar * 4, duration: 7.5, velocity: 80 });
      for (let bar = 0; bar < BARS; bar += 4) for (const p of gmC)
        brk.melody.push({ pitch: p, startTime: bar * 4 + 0.5, duration: 7.0, velocity: 70 });
      for (const p of [43, 55, 58, 62])
        brk.fx.push({ pitch: p, startTime: 0, duration: BARS * 4 - 0.5, velocity: 54 });
      break;
    }

    // ─────────────────────────────────── REGGAETON ───────────────────────────
    case "reggaeton": {
      // FULL — dembow: kick on 1 and "and of 2" (1.5), snare on 3
      for (let bar = 0; bar < BARS; bar++) {
        const bs = bar * 4;
        full.drums.push({ pitch: 36, startTime: bs,       duration: 0.25, velocity: 118 });
        full.drums.push({ pitch: 36, startTime: bs + 1.5, duration: 0.25, velocity: 110 });
        full.drums.push({ pitch: 38, startTime: bs + 2,   duration: 0.25, velocity: 115 });
        if (bar % 2 === 1)
          full.drums.push({ pitch: 36, startTime: bs + 3.75, duration: 0.15, velocity: 90 });
      }
      for (let bar = 0; bar < BARS; bar++) {
        const bs = bar * 4;
        full.bass.push({ pitch: 38, startTime: bs,       duration: 1.2, velocity: 108 });
        full.bass.push({ pitch: 38, startTime: bs + 1.5, duration: 1.0, velocity: 100 });
        if (bar % 2 === 1)
          full.bass.push({ pitch: 36, startTime: bs + 2.5, duration: 1.2, velocity: 95 });
      }
      const regProg = [[50,53,57],[48,52,55],[46,50,53],[45,49,52]];
      for (let bar = 0; bar < BARS; bar++) {
        const chord = regProg[bar % 4]; const bs = bar * 4;
        for (const p of chord) {
          full.melody.push({ pitch: p, startTime: bs + 0.5, duration: 0.4, velocity: 88 });
          full.melody.push({ pitch: p, startTime: bs + 2.5, duration: 0.4, velocity: 84 });
        }
      }
      for (const p of [38, 50, 53, 57])
        full.fx.push({ pitch: p, startTime: 0, duration: BARS * 4 - 0.5, velocity: 48 });

      // INTRO — kick on 1 only, long 808 bass, no melody, dark sub pad
      for (let bar = 0; bar < BARS; bar++)
        intro.drums.push({ pitch: 36, startTime: bar * 4, duration: 0.25, velocity: 110 });
      for (let bar = 0; bar < BARS; bar += 4)
        intro.bass.push({ pitch: 38, startTime: bar * 4, duration: 14, velocity: 95 });
      for (const p of [38, 50])
        intro.fx.push({ pitch: p, startTime: 0, duration: BARS * 4 - 0.5, velocity: 42 });

      // BREAK — snare on 3 only, bass every 4 bars, long chord holds, atmospheric pad
      for (let bar = 0; bar < BARS; bar++)
        brk.drums.push({ pitch: 38, startTime: bar * 4 + 2, duration: 0.25, velocity: 112 });
      for (let bar = 0; bar < BARS; bar += 4)
        brk.bass.push({ pitch: 38, startTime: bar * 4, duration: 14, velocity: 82 });
      for (let bar = 0; bar < BARS; bar += 4) for (const p of regProg[0])
        brk.melody.push({ pitch: p, startTime: bar * 4, duration: 13.5, velocity: 68 });
      for (const p of [38, 50, 53, 57])
        brk.fx.push({ pitch: p, startTime: 0, duration: BARS * 4 - 0.5, velocity: 52 });
      break;
    }

    // ─────────────────────────────────── UK GARAGE ───────────────────────────
    case "uk_garage": {
      // FULL — 2-step: kick on 1 and "and of 3" (2.5), snare on 2 and 4
      for (let bar = 0; bar < BARS; bar++) {
        const bs = bar * 4;
        full.drums.push({ pitch: 36, startTime: bs,       duration: 0.2, velocity: 115 });
        full.drums.push({ pitch: 36, startTime: bs + 2.5, duration: 0.2, velocity: 108 });
        full.drums.push({ pitch: 38, startTime: bs + 1,   duration: 0.2, velocity: 112 });
        full.drums.push({ pitch: 38, startTime: bs + 3,   duration: 0.2, velocity: 110 });
        if (bar % 2 === 1) {
          full.drums.push({ pitch: 36, startTime: bs + 0.75, duration: 0.15, velocity: 88 });
          full.drums.push({ pitch: 42, startTime: bs + 1.5,  duration: 0.1,  velocity: 72 });
        }
      }
      for (let bar = 0; bar < BARS; bar++) {
        const bs = bar * 4;
        full.bass.push({ pitch: 33, startTime: bs,        duration: 0.7,  velocity: 105 });
        full.bass.push({ pitch: 33, startTime: bs + 0.75, duration: 0.3,  velocity: 85  });
        full.bass.push({ pitch: 40, startTime: bs + 1.5,  duration: 0.7,  velocity: 98  });
        full.bass.push({ pitch: 33, startTime: bs + 2.5,  duration: 0.7,  velocity: 102 });
        full.bass.push({ pitch: 40, startTime: bs + 3.5,  duration: 0.45, velocity: 90  });
      }
      const am7Ug = [57, 60, 64, 67];
      for (let bar = 0; bar < BARS; bar++) {
        const bs = bar * 4;
        for (const p of am7Ug) {
          full.melody.push({ pitch: p, startTime: bs + 0.5, duration: 0.35, velocity: 90 });
          full.melody.push({ pitch: p, startTime: bs + 2.5, duration: 0.35, velocity: 86 });
        }
        if (bar % 2 === 1) for (const p of am7Ug)
          full.melody.push({ pitch: p, startTime: bar * 4 + 3.5, duration: 0.25, velocity: 78 });
      }
      for (const p of [33, 45, 57, 64])
        full.fx.push({ pitch: p, startTime: 0, duration: BARS * 4 - 0.5, velocity: 50 });

      // INTRO — straight kick 1&3, snare 2&4, sparse bass, Am pad
      for (let bar = 0; bar < BARS; bar++) {
        const bs = bar * 4;
        intro.drums.push({ pitch: 36, startTime: bs,     duration: 0.2, velocity: 108 });
        intro.drums.push({ pitch: 36, startTime: bs + 2, duration: 0.2, velocity: 105 });
        intro.drums.push({ pitch: 38, startTime: bs + 1, duration: 0.2, velocity: 110 });
        intro.drums.push({ pitch: 38, startTime: bs + 3, duration: 0.2, velocity: 108 });
      }
      for (let bar = 0; bar < BARS; bar += 2)
        intro.bass.push({ pitch: 33, startTime: bar * 4, duration: 7.5, velocity: 90 });
      for (const p of [33, 45])
        intro.fx.push({ pitch: p, startTime: 0, duration: BARS * 4 - 0.5, velocity: 44 });

      // BREAK — snare on 2&4, bass every 2 bars, sparse Am stabs, warm pad
      for (let bar = 0; bar < BARS; bar++) {
        brk.drums.push({ pitch: 38, startTime: bar * 4 + 1, duration: 0.2, velocity: 108 });
        brk.drums.push({ pitch: 38, startTime: bar * 4 + 3, duration: 0.2, velocity: 105 });
      }
      for (let bar = 0; bar < BARS; bar += 2)
        brk.bass.push({ pitch: 33, startTime: bar * 4, duration: 7.5, velocity: 82 });
      for (let bar = 0; bar < BARS; bar += 4) for (const p of am7Ug)
        brk.melody.push({ pitch: p, startTime: bar * 4 + 0.5, duration: 7.0, velocity: 70 });
      for (const p of [33, 45, 57, 64])
        brk.fx.push({ pitch: p, startTime: 0, duration: BARS * 4 - 0.5, velocity: 52 });
      break;
    }
  }

  // Outro mirrors the intro
  const outro = intro;

  // 4. Create all 5 sections × 4 tracks = 20 clips (each section = 16 bars = 64 beats)
  const SECTION_LEN = BARS * 4; // 64 beats

  const fillMidi = {
    drums: layerConfig.midi.drums,
    bass: layerConfig.midi.bass,
    melody: layerConfig.midi.melody,
    effects: layerConfig.midi.effects,
  };

  async function makeSection(label: string, startBeat: number, notes: NoteSet) {
    if (tracks.drums) {
      const dc = await tracks.drums.createMidiClip(startBeat, SECTION_LEN);
      dc.color = COLORS.DRUMS;
      dc.name = label;
      dc.notes = fillMidi.drums ? notes.drums : [];
    }
    if (tracks.bass) {
      const bc = await tracks.bass.createMidiClip(startBeat, SECTION_LEN);
      bc.color = COLORS.BASS;
      bc.name = label;
      bc.notes = fillMidi.bass ? transposeNotes(notes.bass, transpose) : [];
    }
    if (tracks.melody) {
      const mc = await tracks.melody.createMidiClip(startBeat, SECTION_LEN);
      mc.color = COLORS.MELODY;
      mc.name = label;
      mc.notes = fillMidi.melody ? transposeNotes(notes.melody, transpose) : [];
    }
    if (tracks.effects) {
      const fc = await tracks.effects.createMidiClip(startBeat, SECTION_LEN);
      fc.color = COLORS.EFFECTS;
      fc.name = label;
      fc.notes = fillMidi.effects ? transposeNotes(notes.fx, transpose) : [];
    }
  }

  // 5. Inject all sections
  await makeSection("Intro",  0,   intro);
  await makeSection("Build",  64,  full);
  await makeSection("Drop",   128, full);
  await makeSection("Break",  192, brk);
  await makeSection("Drop 2", 256, full);
  await makeSection("Outro",  320, outro);

  console.log("[Skeleton Key] Blueprint injection complete.");
}
