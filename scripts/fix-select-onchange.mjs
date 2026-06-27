/**
 * Fix broken SelectField onValueChange from migrate-selects.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, "../src");

const STANDARD_ON_CHANGE =
  "onValueChange={(v) => { setEntriesToShow(Number(v)); setCurrentPage(1); }}";

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith(".jsx")) files.push(full);
  }
  return files;
}

let fixed = 0;
for (const file of walk(srcDir)) {
  let content = fs.readFileSync(file, "utf8");
  const original = content;

  content = content.replace(
    /onValueChange=\{\(v\) => \{ setEntriesToShow\(Number\(v\)\);\s*setCurrentPage\(1\);(?: \/\/[^\n]*)?; \}\}/g,
    STANDARD_ON_CHANGE
  );
  content = content.replace(
    /onValueChange=\{\(v\) => \{ setEntriesToShow\(Number\(v\)\);\s*setCurrentPage\(1\);; \}\}/g,
    STANDARD_ON_CHANGE
  );
  content = content.replace(
    /onValueChange=\{\(v\) => \{ setEntriesToShow\(Number\(v\)\); \}\}/g,
    STANDARD_ON_CHANGE
  );
  content = content.replace(
    /onValueChange=\{\(v\) => \{ setEntriesToShow\(Number\(v\)\); setCurrentPage\(1\);; \}\}/g,
    STANDARD_ON_CHANGE
  );

  if (content !== original) {
    fs.writeFileSync(file, content, "utf8");
    fixed++;
    console.log("fixed:", path.relative(srcDir, file));
  }
}

console.log(`\nFixed ${fixed} files.`);
