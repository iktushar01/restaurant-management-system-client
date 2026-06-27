/**
 * Fix confirm migration: inject useConfirmDialog hook and clean duplicate braces.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.join(__dirname, "../src/Pages");

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith(".jsx")) files.push(full);
  }
  return files;
}

let changed = 0;

for (const file of walk(pagesDir)) {
  let content = fs.readFileSync(file, "utf8");
  const original = content;

  if (content.includes('useConfirmDialog') && !content.includes("const { confirm } = useConfirmDialog()")) {
    content = content.replace(
      /(const \w+ = \(\) => \{\n)/,
      `$1  const { confirm } = useConfirmDialog();\n`
    );
  }

  content = content.replace(
    /async \(([^)]*)\) => \{\s*\n\s*\{\s*\n\s*const ok = await confirm/g,
    "async ($1) => {\n    const ok = await confirm"
  );

  content = content.replace(
    /= async \(([^)]*)\) => \{\s*\n\s*\{\s*\n\s*const ok = await confirm/g,
    "= async ($1) => {\n    const ok = await confirm"
  );

  if (content !== original) {
    fs.writeFileSync(file, content, "utf8");
    changed++;
    console.log("fixed:", path.relative(pagesDir, file));
  }
}

console.log(`\nDone. Fixed ${changed} files.`);
