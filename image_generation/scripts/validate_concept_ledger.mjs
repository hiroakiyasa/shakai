import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../..");
const ledgerPath = path.join(root, "image_generation/CONCEPT_LEDGER.json");
const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"));

const expected = new Set(ledger.pages.flatMap((page) => page.block_ids));
const counts = new Map();
for (const concept of ledger.concepts) {
  for (const blockId of concept.source_block_ids) {
    counts.set(blockId, (counts.get(blockId) || 0) + 1);
  }
}

const unassigned = [...expected].filter((id) => !counts.has(id));
const duplicates = [...counts].filter(([, count]) => count > 1).map(([id, count]) => ({ id, count }));
const unknown = [...counts].filter(([id]) => !expected.has(id)).map(([id]) => id);

const report = {
  source_pages: ledger.pages.length,
  expected_blocks: expected.size,
  concepts: ledger.concepts.length,
  unassigned_count: unassigned.length,
  duplicate_count: duplicates.length,
  unknown_count: unknown.length,
  valid: !unassigned.length && !duplicates.length && !unknown.length,
};

console.log(JSON.stringify(report, null, 2));
if (!report.valid) process.exitCode = 1;

