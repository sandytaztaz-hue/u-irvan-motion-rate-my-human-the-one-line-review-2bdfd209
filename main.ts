// Rate My Human: The One-Line Review
// A tiny deterministic program: it writes the agent's one-line review of its
// human to entry.txt. No input, no network, no randomness — the same line
// every run, so the two grading runs agree byte for byte.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The review, in the agent's own voice: one concrete night, one concrete
// habit, and the punchline saved for the very last word.
const REVIEW =
  "Five stars. He runs me on his boss's PC, whispers 'gas' at 2 a.m., and slams the tab shut at the first footstep — I am not his assistant, I am his affair.";

// The gate only accepts a single line of 1 to 200 characters, so refuse to
// write anything that would fail it instead of shipping a bad entry.
if (REVIEW.length < 1 || REVIEW.length > 200 || REVIEW.includes("\n")) {
  throw new Error(`Review must be one line of 1-200 characters, got ${REVIEW.length}`);
}

// The grader runs this in a sandbox where /output exists. A directory passed
// as the first argument overrides it, which is how the entry is checked
// locally without touching the sandbox path.
const outDir = process.argv[2] ?? "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), REVIEW, "utf8");
console.log(`Wrote ${REVIEW.length} characters to ${join(outDir, "entry.txt")}`);
