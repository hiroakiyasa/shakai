import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../..");
const pagesDir = path.join(root, "pages");
const outputPath = path.join(root, "image_generation/CONCEPT_LEDGER.json");

const units = [
  { id: 1, part: "地理", title: "社会の学び方・世界地図・日本の国土", start: 1, end: 45 },
  { id: 2, part: "地理", title: "日本の自然と地方のくらし", start: 46, end: 76 },
  { id: 3, part: "地理", title: "日本の農業", start: 77, end: 99 },
  { id: 4, part: "地理", title: "水産業と食料生産", start: 100, end: 133 },
  { id: 5, part: "地理", title: "日本の工業", start: 134, end: 174 },
  { id: 6, part: "地理", title: "運輸・貿易・情報", start: 175, end: 215 },
  { id: 7, part: "地理", title: "環境と日本の諸地域", start: 216, end: 274 },
  { id: 8, part: "政治", title: "日本国憲法と基本的人権", start: 275, end: 289 },
  { id: 9, part: "政治", title: "政治・選挙・地方自治", start: 290, end: 322 },
  { id: 10, part: "歴史", title: "日本のあけぼの", start: 323, end: 346 },
  { id: 11, part: "歴史", title: "天皇と貴族の世の中", start: 347, end: 370 },
  { id: 12, part: "歴史", title: "武士の世の中", start: 371, end: 406 },
  { id: 13, part: "歴史", title: "江戸幕府の政治", start: 407, end: 434 },
  { id: 14, part: "歴史", title: "明治から近代国家へ", start: 435, end: 468 },
  { id: 15, part: "歴史", title: "戦争と新しい日本", start: 469, end: 487 },
  { id: 16, part: "国際", title: "日本とかかわりの深い国々", start: 488, end: 515 },
  { id: 17, part: "国際", title: "世界平和と日本の役割", start: 516, end: 539 },
  { id: 18, part: "資料", title: "歴史人物・文化・年表資料", start: 540, end: 589 },
  { id: 19, part: "資料", title: "統計・索引・総合資料", start: 590, end: 614 },
];

const includedTypes = new Set([
  "heading", "paragraph", "figure", "table", "chart", "caption",
  "aside_text", "content", "footnote", "vision_footnote",
]);

function unitFor(pageNumber) {
  const unit = units.find((candidate) => pageNumber >= candidate.start && pageNumber <= candidate.end);
  if (!unit) throw new Error(`No unit for source page ${pageNumber}`);
  return unit;
}

function clean(text = "") {
  return text.replace(/\s+/g, " ").trim();
}

function titleHints(blocks) {
  const headings = blocks
    .filter((block) => block.type === "heading")
    .map((block) => clean(block.content))
    .filter((text) => text && !/^p\.?\s*\d+/i.test(text));
  if (headings.length) return headings.slice(0, 8);
  const firstText = blocks.map((block) => clean(block.content)).find(Boolean);
  return firstText ? [firstText.slice(0, 80)] : [];
}

const pageFiles = fs.readdirSync(pagesDir)
  .filter((name) => /^page_\d{4}\.json$/.test(name))
  .sort();

const pages = [];
const allIncludedBlockIds = new Set();
for (const file of pageFiles) {
  const data = JSON.parse(fs.readFileSync(path.join(pagesDir, file), "utf8"));
  const unit = unitFor(data.pageNumber);
  const blocks = data.blocks.filter((block) => includedTypes.has(block.type));
  for (const block of blocks) {
    if (allIncludedBlockIds.has(block.id)) throw new Error(`Duplicate block id ${block.id}`);
    allIncludedBlockIds.add(block.id);
  }
  pages.push({
    source_page: data.pageNumber,
    unit_id: unit.id,
    part: unit.part,
    unit_title: unit.title,
    source_json: `pages/${file}`,
    source_markdown: `pages_md/${file.replace(/\.json$/, ".md")}`,
    title_hints: titleHints(blocks),
    block_ids: blocks.map((block) => block.id),
    block_type_counts: Object.fromEntries(
      [...new Set(blocks.map((block) => block.type))]
        .sort()
        .map((type) => [type, blocks.filter((block) => block.type === type).length]),
    ),
    figure_ids: blocks.filter((block) => block.figureId).map((block) => block.figureId),
    has_substantive_content: blocks.some((block) => clean(block.content)),
  });
}

if (pages.length !== 614) throw new Error(`Expected 614 source pages, got ${pages.length}`);

const baselineConcepts = pages
  .filter((page) => page.has_substantive_content)
  .map((page, index) => ({
    concept_id: `DRAFT-${String(index + 1).padStart(4, "0")}`,
    status: "needs_editorial_review",
    provisional_title: page.title_hints[0] || `元ページ${page.source_page}`,
    source_pages: [page.source_page],
    source_block_ids: page.block_ids,
    source_figure_ids: page.figure_ids,
    editorial_actions_allowed: ["merge_with_adjacent", "split_by_concept", "retitle"],
  }));

const assigned = new Set(baselineConcepts.flatMap((concept) => concept.source_block_ids));
const unassigned = [...allIncludedBlockIds].filter((id) => !assigned.has(id));
if (unassigned.length) throw new Error(`${unassigned.length} included blocks are unassigned`);

const result = {
  schema_version: 1,
  status: "awaiting_editorial_concept_boundaries",
  rule: "One understanding unit becomes one image. Source pages do not determine image boundaries.",
  source_pages: pages.length,
  source_blocks: allIncludedBlockIds.size,
  baseline_concepts: baselineConcepts.length,
  final_concept_count: null,
  units,
  pages,
  concepts: baselineConcepts,
  coverage: {
    assigned_source_blocks: assigned.size,
    unassigned_source_blocks: unassigned,
    duplicate_source_block_assignments: [],
  },
};

fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(`Wrote ${outputPath}`);
console.log(`Pages: ${pages.length}; content blocks: ${allIncludedBlockIds.size}; baseline concepts: ${baselineConcepts.length}`);

