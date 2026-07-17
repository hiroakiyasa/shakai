import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../..");
const inputPath = path.join(root, "image_generation/LOCKED_CONTENT_PLAN.json");
const outputPath = path.join(root, "image_generation/SERIES_652_SEQUENCE.json");

const units = [
  { id: 1,  part: "第1編 地理", chapter: "第1章", title: "世界地図と日本の国土", start: 1, end: 45 },
  { id: 2,  part: "第1編 地理", chapter: "第2章", title: "日本の自然と地方のくらし", start: 46, end: 76 },
  { id: 3,  part: "第1編 地理", chapter: "第3章", title: "日本の農業", start: 77, end: 99 },
  { id: 4,  part: "第1編 地理", chapter: "第4章", title: "水産業と食料生産", start: 100, end: 133 },
  { id: 5,  part: "第1編 地理", chapter: "第5章", title: "日本の工業", start: 134, end: 174 },
  { id: 6,  part: "第1編 地理", chapter: "第6章", title: "運輸・貿易・情報", start: 175, end: 215 },
  { id: 7,  part: "第1編 地理", chapter: "第7章", title: "環境と日本の諸地域", start: 216, end: 274 },
  { id: 8,  part: "第2編 政治", chapter: "第1章", title: "日本国憲法と基本的人権", start: 275, end: 289 },
  { id: 9,  part: "第2編 政治", chapter: "第2章", title: "政治・選挙・地方自治", start: 290, end: 322 },
  { id: 10, part: "第3編 歴史", chapter: "第1章", title: "日本のあけぼの", start: 323, end: 346 },
  { id: 11, part: "第3編 歴史", chapter: "第2章", title: "天皇と貴族の世の中", start: 347, end: 370 },
  { id: 12, part: "第3編 歴史", chapter: "第3章", title: "武士の世の中", start: 371, end: 406 },
  { id: 13, part: "第3編 歴史", chapter: "第4章", title: "江戸幕府の政治", start: 407, end: 434 },
  { id: 14, part: "第3編 歴史", chapter: "第5章", title: "明治から近代国家へ", start: 435, end: 468 },
  { id: 15, part: "第3編 歴史", chapter: "第6章", title: "戦争と新しい日本", start: 469, end: 487 },
  { id: 16, part: "第4編 国際", chapter: "第1章", title: "日本とかかわりの深い国々", start: 488, end: 515 },
  { id: 17, part: "第4編 国際", chapter: "第2章", title: "世界平和と日本の役割", start: 516, end: 539 },
  { id: 18, part: "第5編 資料", chapter: "第1章", title: "歴史人物・文化・年表資料", start: 540, end: 589 },
  { id: 19, part: "第5編 資料", chapter: "第2章", title: "統計・索引・総合資料", start: 590, end: 614 },
];

const oldPlan = JSON.parse(fs.readFileSync(inputPath, "utf8"));
if (!Array.isArray(oldPlan.images) || oldPlan.images.length !== 630) {
  throw new Error(`Expected 630 source items, got ${oldPlan.images?.length ?? "none"}`);
}

function partNumber(sourcePart) {
  const match = /^(\d+)\//.exec(sourcePart ?? "1/1");
  return match ? Number(match[1]) : 1;
}

function unitFor(sourcePage) {
  const unit = units.find((candidate) => sourcePage >= candidate.start && sourcePage <= candidate.end);
  if (!unit) throw new Error(`No unit for source page ${sourcePage}`);
  return unit;
}

const sortedSources = [...oldPlan.images].sort((a, b) =>
  a.source_page - b.source_page ||
  partNumber(a.source_part) - partNumber(b.source_part) ||
  a.image_number - b.image_number
);

const pages = [
  { page_number: 1, type: "cover", title: "未来のための 社会 受験ビジュアル図鑑" },
  { page_number: 2, type: "global_toc", title: "全体目次 1/2" },
  { page_number: 3, type: "global_toc", title: "全体目次 2/2" },
];

let pageNumber = 4;
for (const unit of units) {
  pages.push({
    page_number: pageNumber++,
    type: "unit_toc",
    unit_id: unit.id,
    part: unit.part,
    chapter: unit.chapter,
    unit_title: unit.title,
    source_page_range: [unit.start, unit.end],
  });

  for (const source of sortedSources.filter((item) => unitFor(item.source_page).id === unit.id)) {
    pages.push({
      page_number: pageNumber++,
      type: "content",
      unit_id: unit.id,
      part: unit.part,
      chapter: unit.chapter,
      unit_title: unit.title,
      source_page: source.source_page,
      source_part: source.source_part,
      source_markdown: source.source_markdown,
      source_json: source.source_json,
      source_assets: source.source_assets,
      source_hash: source.source_hash,
      legacy_image_number: source.image_number,
      legacy_category: source.category,
      source_title: source.title,
    });
  }
}

if (pages.length !== 652 || pageNumber !== 653) {
  throw new Error(`Expected 652 final pages, got ${pages.length}`);
}

const contentPages = pages.filter((page) => page.type === "content");
const seenSourceItems = new Set(contentPages.map((page) => `${page.source_page}:${page.source_part}`));
if (contentPages.length !== 630 || seenSourceItems.size !== 630) {
  throw new Error(`Source coverage failure: ${contentPages.length} content pages, ${seenSourceItems.size} unique source items`);
}

for (let index = 0; index < pages.length; index += 1) {
  if (pages[index].page_number !== index + 1) {
    throw new Error(`Sequence gap at array index ${index}`);
  }
  if (pages[index].type === "content") {
    const expected = unitFor(pages[index].source_page);
    if (pages[index].unit_id !== expected.id) {
      throw new Error(`Unit mismatch on final page ${pages[index].page_number}`);
    }
  }
}

const unitSummary = units.map((unit) => {
  const unitPages = pages.filter((page) => page.unit_id === unit.id);
  return {
    ...unit,
    final_page_start: unitPages[0].page_number,
    final_page_end: unitPages.at(-1).page_number,
    content_count: unitPages.filter((page) => page.type === "content").length,
  };
});

const result = {
  schema_version: 2,
  locked: true,
  correction_reason: "The legacy category field mixed unrelated source pages. The corrected sequence follows source-page order and assigns units exclusively by verified source-page ranges.",
  total_pages: pages.length,
  source_items: contentPages.length,
  unit_toc_pages: units.length,
  front_matter_pages: 3,
  units: unitSummary,
  pages,
};

fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(`Wrote ${outputPath}`);
console.log(`Final pages: ${pages.length}; content: ${contentPages.length}; units: ${units.length}`);

