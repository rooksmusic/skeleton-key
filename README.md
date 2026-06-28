# Skeleton Key

**Ableton Live 12 extension** — unlock your production using the Skeleton Method.

One click injects a full arrangement skeleton into your Live session: 6 labeled sections (Intro, Build, Drop, Break, Drop 2, Outro), 4 tracks (Drums, Bass, Melody, FX), genre-tuned MIDI patterns, and cue points — all synced to your project's Scale Mode.

---

## Install

1. Download `Skeleton-Key-1.4.0.ablx` from [Releases](../../releases)
2. Double-click the `.ablx` file — Live installs it automatically
3. Fully quit and relaunch Live

---

## How to Open It

Right-click on any of the following in Live to see **Skeleton Key...** in the context menu:

- **Session view:** any clip slot (empty or filled) or scene
- **Arrangement view:** any selected region on a MIDI or audio track
- **Track headers:** right-click the track name in either view

Click **Skeleton Key...**, pick your genre and BPM, toggle which layers get MIDI (or leave unchecked for blank clip slots), then hit **BUILD THE SKELETON**.

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

**4 tracks per section (always created):**
- `Drums` — genre kick/snare pattern (stripped in Intro/Break/Outro)
- `Bass` — root bass line
- `Melody` — chord stabs / progressions
- `Effects` — sustained atmospheric pad

**v1.4 — blank canvas mode:** Uncheck a layer's MIDI toggle to get labeled, color-coded clip slots with no notes — structure only, so you can write your own parts on top.

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
