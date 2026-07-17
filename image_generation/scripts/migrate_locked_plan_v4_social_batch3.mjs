import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../..");
const planPath = path.join(root, "image_generation/LOCKED_PAGE_SEQUENCE.json");
const versionedPath = path.join(root, "image_generation/LOCKED_PAGE_SEQUENCE_V4.json");
const plan = JSON.parse(fs.readFileSync(planPath, "utf8"));

const includedTypes = new Set([
  "heading", "paragraph", "figure", "table", "chart", "caption",
  "aside_text", "content", "footnote", "vision_footnote",
]);

function pageBlockIds(page) {
  const file = path.join(root, `pages/page_${String(page).padStart(4, "0")}.json`);
  return JSON.parse(fs.readFileSync(file, "utf8")).blocks
    .filter((block) => includedTypes.has(block.type))
    .map((block) => block.id);
}

const item24 = plan.items.find((item) => item.image_number === 24);
const item25 = plan.items.find((item) => item.image_number === 25);
if (!item24 || !item25) throw new Error("Missing plan items 24/25");

item24.title = "北方領土・竹島・尖閣諸島をめぐる日本の立場";
item24.source_pages = [34];
item24.source_part = "territory/region-split";
item24.source_block_ids = [
  "p0034_b02", "p0034_b03", "p0034_b04", "p0034_b05",
  "p0034_b11", "p0034_b12", "p0034_b13", "p0034_b14",
  "p0034_b15", "p0034_b16", "p0034_b17",
];
item24.source_markdown = ["pages_md/page_0034.md"];
item24.source_json = ["pages/page_0034.json"];
item24.direct_assets = [
  "figures/p0034_f02.jpg", "figures/p0034_f03.jpg",
  "figures/p0034_f04.jpg", "figures/p0034_f05.jpg",
];

item25.title = "日本の地域区分・都道府県・県庁所在地";
item25.source_pages = [34, 35];
item25.source_part = "region/territory-split";
item25.source_block_ids = [
  "p0034_b06", "p0034_b07", "p0034_b08", "p0034_b09",
  "p0034_b10", "p0034_b18",
  ...pageBlockIds(35),
];
item25.source_markdown = ["pages_md/page_0034.md", "pages_md/page_0035.md"];
item25.source_json = ["pages/page_0034.json", "pages/page_0035.json"];
item25.direct_assets = [
  "figures/p0034_f01.jpg", "figures/p0035_f01.jpg",
  "figures/p0035_f02.jpg", "figures/p0035_f03.jpg", "figures/p0035_f04.jpg",
];

const assigned = new Map();
for (const item of plan.items) {
  for (const blockId of item.source_block_ids) {
    if (assigned.has(blockId)) throw new Error(`Duplicate block ${blockId} in images ${assigned.get(blockId)} and ${item.image_number}`);
    assigned.set(blockId, item.image_number);
  }
}
if (assigned.size !== plan.source_blocks) throw new Error(`Coverage mismatch: ${assigned.size}/${plan.source_blocks}`);

plan.schema_version = 4;
plan.lock_reason = "Social-studies understanding-unit V4: preserve 001-020; separate source p34 territory disputes from regional divisions without changing numbering or total count.";
plan.coverage = {
  assigned_source_blocks: assigned.size,
  unassigned_source_blocks: [],
  duplicate_source_block_assignments: [],
};

fs.writeFileSync(planPath, `${JSON.stringify(plan, null, 2)}\n`);
fs.writeFileSync(versionedPath, `${JSON.stringify(plan, null, 2)}\n`);
console.log(JSON.stringify({ schema_version: plan.schema_version, total_images: plan.total_images, assigned_blocks: assigned.size, item24: item24.title, item25: item25.title }, null, 2));
