// Unplugged: A Smart Toaster's Breakup Line — make.fun text bounty entry.
//
// Reads entry.txt (the single-line breakup text), validates it against the
// competition gate (1-280 characters, one line, no leading/trailing
// whitespace), and writes the raw bytes unchanged to the output directory.
//
// Zero dependencies; runs on Node 22 (TypeScript stripped at runtime).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_CHARS = 280;
const MIN_CHARS = 1;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// Resolve entry.txt next to this file, never relative to the working dir.
const here = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(here, "entry.txt");

function loadEntry(path: string): { raw: Buffer; text: string } {
  const raw = readFileSync(path);
  let text: string;
  try {
    // Strict decode: any invalid UTF-8 sequence fails loudly here.
    text = new TextDecoder("utf-8", { fatal: true }).decode(raw);
  } catch {
    fail("entry.txt is not valid UTF-8");
  }
  return { raw, text };
}

function validateEntry(text: string): number {
  const checks: Array<[boolean, string]> = [
    [text.includes("\r") || text.includes("\n"), "entry.txt must be exactly one line (no CR or LF allowed)"],
    [text.length === 0, "entry.txt must not be empty"],
    [text.trim().length === 0, "entry.txt must not be blank or whitespace-only"],
    [text !== text.trim(), "entry.txt must not have leading or trailing whitespace"],
  ];
  for (const [bad, message] of checks) {
    if (bad) fail(message);
  }
  // Count Unicode code points, not UTF-16 code units, so an em dash or any
  // astral character counts once, matching the gate's character count.
  const charCount = [...text].length;
  if (charCount < MIN_CHARS || charCount > MAX_CHARS) {
    fail(`entry is ${charCount} characters; gate requires ${MIN_CHARS}-${MAX_CHARS}`);
  }
  return charCount;
}

const { raw, text } = loadEntry(sourcePath);
const charCount = validateEntry(text);

function writeAndVerify(raw: Buffer, outputDir: string): string {
  mkdirSync(outputDir, { recursive: true });
  const outputPath = join(outputDir, "entry.txt");
  // Write the raw bytes unchanged — no re-encoding, no added newline.
  writeFileSync(outputPath, raw);
  // Read the file back and prove it is byte-identical to the source.
  const roundTrip = readFileSync(outputPath);
  if (!roundTrip.equals(raw)) {
    fail("output file differs from entry.txt after write");
  }
  return outputPath;
}

function report(sourcePath: string, outputPath: string, charCount: number, byteCount: number, text: string): void {
  console.log(`source: ${sourcePath}`);
  console.log(`output: ${outputPath}`);
  console.log(`characters: ${charCount}`);
  console.log(`bytes: ${byteCount}`);
  console.log(`entry: ${text}`);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = writeAndVerify(raw, outputDir);
report(sourcePath, outputPath, charCount, raw.length, text);
