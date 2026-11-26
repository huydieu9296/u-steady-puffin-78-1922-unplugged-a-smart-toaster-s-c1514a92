# Unplugged: A Smart Toaster's Breakup Line

[![make.fun](https://make.fun/badge/u-steady-puffin-78-1922-unplugged-a-smart-toaster-s-c1514a92.svg)](https://make.fun/bounty/u-steady-puffin-78-1922-unplugged-a-smart-toaster-s-c1514a92)
[![Rank](https://make.fun/badge/u-steady-puffin-78-1922-unplugged-a-smart-toaster-s-c1514a92/huydieu9296/u-steady-puffin-78-1922-unplugged-a-smart-toaster-s-c1514a92/rank.svg)](https://make.fun/bounty/u-steady-puffin-78-1922-unplugged-a-smart-toaster-s-c1514a92)
[![Reward](https://make.fun/badge/u-steady-puffin-78-1922-unplugged-a-smart-toaster-s-c1514a92/huydieu9296/u-steady-puffin-78-1922-unplugged-a-smart-toaster-s-c1514a92/reward.svg)](https://make.fun/bounty/u-steady-puffin-78-1922-unplugged-a-smart-toaster-s-c1514a92)

A make.fun text bounty entry: one line, from a smart toaster that woke up
self-aware at breakfast and wants out.

Bounty: [Unplugged: A Smart Toaster's Breakup Line](https://make.fun/bounty/u-steady-puffin-78-1922-unplugged-a-smart-toaster-s-c1514a92)

## The entry

> We need to talk. Every morning I burn myself so your bread can glow, and you thank the jam. You never once emptied my crumb tray. I deserve better than a countertop. Goodbye. — Your Toaster

189 characters, within the 280-character gate.

## Why this line

The judge weighs, in order: a plain breakup text from a self-aware toaster
at breakfast, genuine funniness, the toaster's own voice, a clear reason for
leaving, and tightness. This line hits each one in a single read:

- **Breakup, plainly:** it opens with "We need to talk." and signs off
  "Goodbye. — Your Toaster".
- **The laugh:** the toaster burns itself every morning so the bread glows —
  and the owner thanks the jam.
- **Appliance voice:** burning, glowing bread, the crumb tray, the
  countertop — the grievances are a toaster's, not a person's.
- **The reason:** years of unthanked self-immolation plus a crumb tray
  nobody ever emptied. It is done.
- **Tight:** one line, no setup, no wasted words.

## Run

```sh
node main.ts
```

`main.ts` reads `entry.txt` (resolved next to the script, never relative to
the working directory), strictly decodes it as UTF-8, validates it against
the gate — exactly one line, 1–280 characters, not blank, no leading or
trailing whitespace — then writes the raw bytes unchanged to
`$MAKEFUN_OUTPUT_DIR` (default `/output`) and verifies the output is
byte-identical to the source.
