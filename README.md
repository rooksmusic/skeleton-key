# Skeleton Key

**Ableton Live 12 extension** — unlock your production using the Skeleton Method.

One click injects a full arrangement skeleton into your Live session: 5 labeled sections (Intro, Build, Drop, Break, Outro), 4 tracks (Drums, Bass, Melody, FX), genre-tuned MIDI patterns, and cue points — all synced to your project's Scale Mode.

---

## Install

1. Download `Skeleton-Key-1.1.0.ablx` from [Releases](../../releases)
2. Open Ableton Live 12 Beta
3. Preferences → Extensions → drag the `.ablx` file in
4. Restart Live
5. Right-click anywhere in the arrangement or session view → **Skeleton Key...**

Requires **Developer Mode** enabled: Preferences → Extensions → Enable Developer Mode

---

## How It Works

Select a genre blueprint, optionally tweak the BPM, hit **BUILD THE SKELETON**.

Live gets:

| Section | Beat | Bars |
|---------|------|------|
| Intro   | 0    | 16   |
| Build   | 64   | 16   |
| Drop    | 128  | 16   |
| Break   | 192  | 16   |
| Outro   | 256  | 16   |

**4 tracks per section:**
- `SKELETON · Drums` — genre kick/snare pattern (stripped in Intro/Break/Outro)
- `MUSCLE · Bass` — root bass line
- `MELODY · Chords` — chord stabs / progressions (silent in Intro/Outro)
- `SKIN · FX` — sustained atmospheric pad (full track length)

**Genres:** House (126 BPM), Dubstep (140), Hip-Hop/Trap (145), Drum & Bass (172)

**Scale sync:** If Ableton's Scale Mode is on, all melodic notes are automatically transposed to match your project key.

---

## The Skeleton Method

Build the bones first. Drums + bass = skeleton. Add muscle (melody/chords). Then skin (FX, texture, atmosphere). Don't start with the synth patch — start with the structure.

---

## Development

```bash
npm install
npm start        # dev mode (live reload into running Live instance)
npm run package  # build .ablx for distribution
```

Requires Ableton Live 12 Beta with Extensions SDK.

---

Made by [Rooks Music](https://rooksmusic.com)
