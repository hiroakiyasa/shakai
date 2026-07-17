import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../..");
const planPath = path.join(root, "image_generation/SERIES_652_SEQUENCE.json");
const outputDir = path.join(root, "image_generation/output/series_652");
const plan = JSON.parse(fs.readFileSync(planPath, "utf8"));

const files = fs.existsSync(outputDir)
  ? fs.readdirSync(outputDir).filter((name) => /^\d{3}_.+\.png$/.test(name)).sort()
  : [];

const errors = [];
const present = new Map();
for (const file of files) {
  const number = Number(file.slice(0, 3));
  if (present.has(number)) errors.push(`duplicate page prefix ${number}: ${present.get(number)}, ${file}`);
  present.set(number, file);
  if (!plan.pages.some((page) => page.page_number === number)) errors.push(`page ${number} is outside the plan`);
}

let contiguous = 0;
for (let number = 1; number <= plan.total_pages; number += 1) {
  if (!present.has(number)) break;
  contiguous = number;
}

console.log(JSON.stringify({
  planned: plan.total_pages,
  generated_files: files.length,
  contiguous_through: contiguous,
  next_page: contiguous + 1,
  errors,
}, null, 2));

if (errors.length) process.exitCode = 1;

