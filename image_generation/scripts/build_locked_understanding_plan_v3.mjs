import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../..");
const imageRoot = path.join(root, "image_generation");
const pagesDir = path.join(root, "pages");
const markdownDir = path.join(root, "pages_md");
const legacyPath = path.join(imageRoot, "LOCKED_CONTENT_PLAN.json");
const currentPlanPath = path.join(imageRoot, "LOCKED_PAGE_SEQUENCE.json");
const versionedPlanPath = path.join(imageRoot, "LOCKED_PAGE_SEQUENCE_V3.json");
const legacySequencePath = path.join(imageRoot, "LOCKED_PAGE_SEQUENCE_LEGACY_V2.json");
const batchManifestPath = path.join(imageRoot, "batch_manifest.json");
const batchesDir = path.join(imageRoot, "public_batches");
const legacyBatchesDir = path.join(imageRoot, "public_batches_legacy_v2");

const includedTypes = new Set([
  "heading", "paragraph", "figure", "table", "chart", "caption",
  "aside_text", "content", "footnote", "vision_footnote",
]);

const units = [
  { id: 1, part: "第1編 地理", chapter: "第1章", title: "社会の学び方・世界地図・日本の国土", start: 1, end: 45 },
  { id: 2, part: "第1編 地理", chapter: "第2章", title: "日本の自然と地方のくらし", start: 46, end: 76 },
  { id: 3, part: "第1編 地理", chapter: "第3章", title: "日本の農業", start: 77, end: 99 },
  { id: 4, part: "第1編 地理", chapter: "第4章", title: "水産業と食料生産", start: 100, end: 133 },
  { id: 5, part: "第1編 地理", chapter: "第5章", title: "日本の工業", start: 134, end: 174 },
  { id: 6, part: "第1編 地理", chapter: "第6章", title: "運輸・貿易・情報", start: 175, end: 215 },
  { id: 7, part: "第1編 地理", chapter: "第7章", title: "環境と日本の諸地域", start: 216, end: 274 },
  { id: 8, part: "第2編 政治", chapter: "第1章", title: "日本国憲法と基本的人権", start: 275, end: 289 },
  { id: 9, part: "第2編 政治", chapter: "第2章", title: "政治・選挙・地方自治", start: 290, end: 322 },
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

function clean(value = "") {
  return value.replace(/\s+/g, " ").replace(/[￥★]+/g, "").trim();
}

function sha256(file) {
  return crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
}

function unitFor(sourcePage) {
  const unit = units.find((candidate) => sourcePage >= candidate.start && sourcePage <= candidate.end);
  if (!unit) throw new Error(`No unit for source page ${sourcePage}`);
  return unit;
}

function partNumber(sourcePart = "1/1") {
  return Number(sourcePart.split("/")[0]) || 1;
}

function partTotal(sourcePart = "1/1") {
  return Number(sourcePart.split("/")[1]) || 1;
}

const pageData = new Map();
const allBlockIds = new Set();
for (let page = 1; page <= 614; page += 1) {
  const file = path.join(pagesDir, `page_${String(page).padStart(4, "0")}.json`);
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  const blocks = data.blocks.filter((block) => includedTypes.has(block.type));
  for (const block of blocks) {
    if (allBlockIds.has(block.id)) throw new Error(`Duplicate source block ${block.id}`);
    allBlockIds.add(block.id);
  }
  const headings = blocks.filter((block) => block.type === "heading").map((block) => clean(block.content)).filter(Boolean);
  pageData.set(page, { ...data, includedBlocks: blocks, headings });
}

function blockIdsForPages(sourcePages) {
  return sourcePages.flatMap((page) => pageData.get(page).includedBlocks.map((block) => block.id));
}

function selectedBlockIds(page, ids) {
  const valid = new Set(pageData.get(page).includedBlocks.map((block) => block.id));
  for (const id of ids) if (!valid.has(id)) throw new Error(`Unknown block ${id}`);
  return ids;
}

function assetsForPages(sourcePages) {
  const results = [];
  for (const page of sourcePages) {
    const mdPath = path.join(markdownDir, `page_${String(page).padStart(4, "0")}.md`);
    const text = fs.readFileSync(mdPath, "utf8");
    for (const match of text.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)) {
      const resolved = path.normalize(path.join("pages_md", match[1]));
      if (!results.includes(resolved)) results.push(resolved);
    }
  }
  return results;
}

const firstTwenty = [
  { image_number: 1, type: "cover", title: "未来のための 社会 受験ビジュアル図鑑", source_pages: [1, 2, 3, 4, 5, 6] },
  { image_number: 2, type: "global_toc", title: "全体目次：地理", source_pages: [14, 15, 16, 17] },
  { image_number: 3, type: "global_toc", title: "全体目次：政治・歴史・国際・資料", source_pages: [18, 19, 20] },
  { image_number: 4, type: "unit_opener", title: "第1章 社会の学び方から世界地図へ", source_pages: [21, 22] },
  { image_number: 5, type: "content", title: "社会を学ぶ意味", source_pages: [7] },
  { image_number: 6, type: "content", title: "学びを支える3つの力", source_pages: [8] },
  { image_number: 7, type: "content", title: "主体的・対話的・深い学び", source_pages: [9] },
  { image_number: 8, type: "content", title: "図・表・本文を組み合わせる", source_pages: [10, 11] },
  { image_number: 9, type: "content", title: "知識を使って考え説明する入試力", source_pages: [12, 13] },
  { image_number: 10, type: "content", title: "地球の球形・陸地と海洋・六大陸と三大洋", source_pages: [23] },
  { image_number: 11, type: "content", title: "緯度・経度で位置を表す", source_pages: [24], source_block_ids: selectedBlockIds(24, ["p0024_b01","p0024_b02","p0024_b03","p0024_b04","p0024_b05","p0024_b06","p0024_b07","p0024_b08","p0024_b14","p0024_b15"]) },
  { image_number: 12, type: "content", title: "地軸の傾き・回帰線・白夜と極夜", source_pages: [24], source_block_ids: selectedBlockIds(24, ["p0024_b09","p0024_b16","p0024_b17","p0024_b18","p0024_b19","p0024_b20","p0024_b21","p0024_b22","p0024_b23","p0024_b24","p0024_b25"]) },
  { image_number: 13, type: "content", title: "標準時と時差の原理", source_pages: [24], source_block_ids: selectedBlockIds(24, ["p0024_b10","p0024_b11","p0024_b12"]) },
  { image_number: 14, type: "content", title: "時差計算と日付変更線", source_pages: [24, 25], source_block_ids: ["p0024_b13", ...selectedBlockIds(25, ["p0025_b01","p0025_b02","p0025_b03","p0025_b04","p0025_b05","p0025_b06","p0025_b07","p0025_b08","p0025_b09","p0025_b10","p0025_b11","p0025_b12","p0025_b13","p0025_b14","p0025_b15","p0025_b16","p0025_b17","p0025_b18","p0025_b26"])] },
  { image_number: 15, type: "content", title: "地球儀と平面地図の長所・限界", source_pages: [25, 26], source_block_ids: [...selectedBlockIds(25, ["p0025_b19","p0025_b20","p0025_b21","p0025_b22","p0025_b23","p0025_b24","p0025_b25","p0025_b27","p0025_b28"]), ...selectedBlockIds(26, ["p0026_b02","p0026_b05"])] },
  { image_number: 16, type: "content", title: "三つの世界地図と最短経路", source_pages: [26], source_block_ids: pageData.get(26).includedBlocks.map((block) => block.id).filter((id) => !["p0026_b02","p0026_b05"].includes(id)) },
  { image_number: 17, type: "content", title: "二つの造山帯と世界の山・川", source_pages: [27] },
  { image_number: 18, type: "content", title: "世界の五つの気候帯と高山気候", source_pages: [28] },
  { image_number: 19, type: "content", title: "国の三要素・国境・領域", source_pages: [29], source_block_ids: selectedBlockIds(29, ["p0029_b01","p0029_b02","p0029_b03","p0029_b05","p0029_b06","p0029_b15","p0029_b19"]) },
  { image_number: 20, type: "content", title: "世界の六州とさまざまな国", source_pages: [29, 30], source_block_ids: [...pageData.get(29).includedBlocks.map((block) => block.id).filter((id) => !["p0029_b01","p0029_b02","p0029_b03","p0029_b05","p0029_b06","p0029_b15","p0029_b19"].includes(id)), ...blockIdsForPages([30])] },
].map((item) => ({
  ...item,
  unit_id: item.image_number <= 3 ? null : 1,
  source_block_ids: item.source_block_ids ?? blockIdsForPages(item.source_pages),
  source_markdown: item.source_pages.map((page) => `pages_md/page_${String(page).padStart(4, "0")}.md`),
  source_json: item.source_pages.map((page) => `pages/page_${String(page).padStart(4, "0")}.json`),
  direct_assets: assetsForPages(item.source_pages),
  qa_status: item.image_number === 14 ? "needs_correction_remove_antipode" : "validated_existing",
}));

const legacy = JSON.parse(fs.readFileSync(legacyPath, "utf8"));
const legacyItems = legacy.images
  .filter((item) => item.source_page >= 31)
  .sort((a, b) => a.source_page - b.source_page || partNumber(a.source_part) - partNumber(b.source_part));
if (legacyItems.length !== 598) throw new Error(`Expected 598 legacy items from p31 onward, got ${legacyItems.length}`);

const groupsByPage = new Map();
for (const item of legacyItems) {
  if (!groupsByPage.has(item.source_page)) groupsByPage.set(item.source_page, []);
  groupsByPage.get(item.source_page).push(item);
}

const items = [...firstTwenty];
let lastUnit = 1;
for (const legacyItem of legacyItems) {
  const unit = unitFor(legacyItem.source_page);
  if (unit.id !== lastUnit) {
    items.push({
      type: "unit_opener",
      unit_id: unit.id,
      title: `${unit.chapter} ${unit.title}`,
      source_pages: [unit.start],
      source_block_ids: [],
      source_markdown: [`pages_md/page_${String(unit.start).padStart(4, "0")}.md`],
      source_json: [`pages/page_${String(unit.start).padStart(4, "0")}.json`],
      direct_assets: [],
      qa_status: "pending",
    });
    lastUnit = unit.id;
  }

  const siblings = groupsByPage.get(legacyItem.source_page);
  const index = siblings.findIndex((candidate) => candidate === legacyItem);
  const total = siblings.length;
  const blocks = pageData.get(legacyItem.source_page).includedBlocks;
  const start = Math.floor((blocks.length * index) / total);
  const end = Math.floor((blocks.length * (index + 1)) / total);
  const pageAssets = assetsForPages([legacyItem.source_page]);
  const assetStart = Math.floor((pageAssets.length * index) / total);
  const assetEnd = Math.floor((pageAssets.length * (index + 1)) / total);
  const headings = pageData.get(legacyItem.source_page).headings;
  const titleBase = headings[Math.min(index, Math.max(headings.length - 1, 0))] || `元p.${legacyItem.source_page}`;
  items.push({
    type: "content",
    unit_id: unit.id,
    title: total > 1 ? `${titleBase}（${index + 1}/${total}）` : titleBase,
    source_pages: [legacyItem.source_page],
    source_part: `${index + 1}/${total}`,
    source_block_ids: blocks.slice(start, end).map((block) => block.id),
    source_markdown: [legacyItem.source_markdown],
    source_json: [legacyItem.source_json],
    direct_assets: pageAssets.slice(assetStart, assetEnd),
    source_hash: legacyItem.source_hash,
    legacy_item_number: legacyItem.image_number,
    qa_status: "pending",
  });
}

const reviewItems = [
  { title: "地理総復習：地図・産業・地域をつなぐ", unit_id: 7 },
  { title: "政治総復習：憲法・国会・内閣・裁判所・地方自治", unit_id: 9 },
  { title: "歴史総復習：時代の流れと因果関係", unit_id: 15 },
  { title: "国際・資料総復習：世界と日本をデータで考える", unit_id: 19 },
];
for (const review of reviewItems) {
  items.push({ type: "review", ...review, source_pages: [], source_block_ids: [], source_markdown: [], source_json: [], direct_assets: [], qa_status: "pending" });
}

if (items.length !== 640) throw new Error(`Expected 640 locked items, got ${items.length}`);

for (let index = 0; index < items.length; index += 1) {
  const item = items[index];
  item.image_number = index + 1;
  item.batch_number = Math.ceil(item.image_number / 10);
  item.batch_position = ((item.image_number - 1) % 10) + 1;
  const unit = item.unit_id ? units.find((candidate) => candidate.id === item.unit_id) : null;
  item.part = unit?.part ?? "全体";
  item.chapter = unit?.chapter ?? "前付";
  item.unit_title = unit?.title ?? "全体案内";
  item.aspect_ratio = "9:16";
  item.output_file = `image_generation/generated/IMG_${String(item.image_number).padStart(4, "0")}.png`;
}

const assigned = new Map();
for (const item of items) {
  for (const blockId of item.source_block_ids) {
    if (assigned.has(blockId)) throw new Error(`Block ${blockId} assigned to both ${assigned.get(blockId)} and ${item.image_number}`);
    assigned.set(blockId, item.image_number);
  }
}
const unassigned = [...allBlockIds].filter((id) => !assigned.has(id));
if (unassigned.length) throw new Error(`${unassigned.length} source blocks are unassigned; first: ${unassigned.slice(0, 10).join(", ")}`);

const sourceHashes = {};
for (let page = 1; page <= 614; page += 1) {
  for (const relative of [
    `pages/page_${String(page).padStart(4, "0")}.json`,
    `pages_md/page_${String(page).padStart(4, "0")}.md`,
  ]) sourceHashes[relative] = sha256(path.join(root, relative));
}

const plan = {
  schema_version: 3,
  locked: true,
  lock_reason: "User-directed one-understanding-unit 9:16 rebuild preserving validated images 001-020.",
  created_from: "LOCKED_CONTENT_PLAN.json split metadata plus complete pages/page_*.json block coverage",
  image_model: "Image 2.0 built-in",
  aspect_ratio: "9:16",
  output_format: "PNG raster",
  character_reference: "/Users/user/.codex/generated_images/019f5133-5dd0-73f2-9416-f67eea3d4707/exec-203c7fbd-d422-4dd4-b79c-1ef97804edb7.png",
  source_pages: 614,
  source_blocks: allBlockIds.size,
  total_images: items.length,
  images_per_batch: 10,
  total_batches: items.length / 10,
  existing_validated_images: 20,
  units,
  source_hashes: sourceHashes,
  coverage: {
    assigned_source_blocks: assigned.size,
    unassigned_source_blocks: [],
    duplicate_source_block_assignments: [],
  },
  items,
};

if (fs.existsSync(currentPlanPath) && !fs.existsSync(legacySequencePath)) {
  fs.copyFileSync(currentPlanPath, legacySequencePath);
}
fs.writeFileSync(versionedPlanPath, `${JSON.stringify(plan, null, 2)}\n`);
fs.writeFileSync(currentPlanPath, `${JSON.stringify(plan, null, 2)}\n`);

const batchManifest = {
  schema_version: 3,
  locked_plan: "image_generation/LOCKED_PAGE_SEQUENCE.json",
  total_images: plan.total_images,
  images_per_batch: 10,
  total_batches: plan.total_batches,
  batches: Array.from({ length: plan.total_batches }, (_, batchIndex) => {
    const batch = batchIndex + 1;
    const batchItems = items.filter((item) => item.batch_number === batch);
    return {
      batch,
      start_image: batchItems[0].image_number,
      end_image: batchItems.at(-1).image_number,
      item_numbers: batchItems.map((item) => item.image_number),
      manifest: `image_generation/public_batches/BATCH_${String(batch).padStart(2, "0")}.md`,
    };
  }),
};
fs.writeFileSync(batchManifestPath, `${JSON.stringify(batchManifest, null, 2)}\n`);

if (fs.existsSync(batchesDir) && !fs.existsSync(legacyBatchesDir)) fs.renameSync(batchesDir, legacyBatchesDir);
fs.mkdirSync(batchesDir, { recursive: true });
for (let batch = 1; batch <= plan.total_batches; batch += 1) {
  const batchItems = items.filter((item) => item.batch_number === batch);
  const lines = [
    `# V3理解単位バッチ ${String(batch).padStart(2, "0")}`,
    "",
    `- 固定範囲: IMG_${String(batchItems[0].image_number).padStart(4, "0")}〜IMG_${String(batchItems.at(-1).image_number).padStart(4, "0")}`,
    "- 10項目・10枚。1項目につきImage 2.0を1回呼ぶ。合成・後分割禁止。",
    "- 縦9:16 PNG。ユーザー所有の宇宙飛行士ヒョウ先生を同じ姿で使用。",
    "- 元文章・元図版を転載せず、事実・数値・関係を独自の短文と新規図解へ再構成。",
    "- 最大4並列。既存の有効PNGはスキップし、成功ごとに即保存する。",
    "",
    "|画像|分類|理解単位|元ページ|分割|Markdown/JSON|直接参照素材|",
    "|---:|---|---|---|---|---|---|",
  ];
  for (const item of batchItems) {
    lines.push(`|${String(item.image_number).padStart(4, "0")}|${item.type}|${item.title.replaceAll("|", "｜")}|${item.source_pages.join(",") || "構造ページ"}|${item.source_part ?? "1/1"}|${[...item.source_markdown, ...item.source_json].join("<br>") || "固定計画から再構成"}|${item.direct_assets.join("<br>") || "なし"}|`);
  }
  lines.push("", "## 最短再開指示", "", "`Use $source-to-image-deck and continue from image_generation/state.json.`", "");
  fs.writeFileSync(path.join(batchesDir, `BATCH_${String(batch).padStart(2, "0")}.md`), lines.join("\n"));
}

console.log(JSON.stringify({
  plan: path.relative(root, currentPlanPath),
  versioned_plan: path.relative(root, versionedPlanPath),
  total_images: plan.total_images,
  total_batches: plan.total_batches,
  source_blocks: plan.source_blocks,
  assigned_source_blocks: plan.coverage.assigned_source_blocks,
  unassigned: plan.coverage.unassigned_source_blocks.length,
  duplicates: plan.coverage.duplicate_source_block_assignments.length,
}, null, 2));
