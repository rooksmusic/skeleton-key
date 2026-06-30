# Skeleton Key

**Ableton Live 12 extension** — unlock your production using the Skeleton Method.

One click injects a full arrangement skeleton into your Live session: 6 labeled sections (Intro, Build, Drop, Break, Drop 2, Outro), 4 tracks (Drums, Bass, Melody, FX), genre-tuned MIDI patterns, and cue points — all synced to your project's Scale Mode.

---

## Install

1. Download `Skeleton-Key-1.4.2.ablx` from [Releases](../../releases)
2. Double-click the `.ablx` file — Live installs it automatically
3. Fully quit and relaunch Live

---

## How to Open It

Right-click on any of the following in Live to see **Skeleton Key...** in the context menu:

- **Session view:** clip slot (empty or filled), scene row, or track **title/name**
- **Arrangement view:** time selection on a MIDI/audio track, or track **title/name**

> **Track header:** right-click the track **name** on the left — not the clip, mixer, or device area.

If you see **Skeleton Key...** twice, remove duplicate installs: Live → **Settings → Extensions** — keep only one Skeleton Key entry (latest version), quit & relaunch Live.

Click **Skeleton Key...**, pick your genre and BPM, toggle which layers to include, and choose **MIDI** per layer — then hit **BUILD THE SKELETON**.

Each layer has two controls:
- **Include checkbox** — add this track to the build (unchecked = track not created)
- **MIDI checkbox** — when included, inject genre patterns (off = blank labeled clip slots)

To close the dialog without building, click the **X** in the top-right corner, hit **Escape**, or click **cancel**.

---

## What Gets Built

| Section | Beat | Bars |
|---------|------|------|
| Intro   | 0    | 16   |
| Build   | 64   | 16   |
| Drop    | 128  | 16   |
| Break   | 192  | 16   |
| Drop 2  | 256  | 16   |
| Outro   | 320  | 16   |

**Tracks (per layer toggles):**
- `Drums` — genre kick/snare pattern (stripped in Intro/Break/Outro)
- `Bass` — root bass line
- `Melody` — chord stabs / progressions
- `Effects` — sustained atmospheric pad

Only checked layers are created. Uncheck **MIDI** on a layer to get labeled, color-coded clip slots with no notes.

**8 genres:** House (126 BPM), Dubstep (140), Hip-Hop/Trap (145), Drum & Bass (172), Techno (133), Afrobeats (106), Reggaeton (97), UK Garage (130)

**Scale sync:** If Ableton's Scale Mode is on, all melodic notes are automatically transposed to match your project key.

---

## The Skeleton Method

Build the bones first. Drums + bass = skeleton. Add muscle (melody/chords). Then skin (FX, texture, atmosphere). Don't start with the synth patch — start with the structure.

---

## Development

```bash
npm install
npm start        # dev mode (live reload)
npm run package  # build .ablx for distribution
```

Requires Ableton Live 12 with Extensions support.

---

Made by [Rooks Music](https://rooksmusic.com)
