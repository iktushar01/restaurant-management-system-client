/**
 * Migrate standard delete handlers from window.confirm/alert to useConfirmDialog + toast.
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

function ensureImports(content) {
  let updated = content;

  if (
    (updated.includes("window.confirm") || updated.includes("alert(")) &&
    !updated.includes('useConfirmDialog')
  ) {
    updated = updated.replace(
      /^(import React[^\n]*\n)/m,
      `$1import { useConfirmDialog } from "@/Shared/ConfirmDialog/ConfirmDialog";\nimport { toast } from "sonner";\n`
    );
  } else if (updated.includes("alert(") && !updated.includes('from "sonner"')) {
    updated = updated.replace(
      /^(import React[^\n]*\n)/m,
      `$1import { toast } from "sonner";\n`
    );
  }

  return updated;
}

function ensureHook(content) {
  if (!content.includes("window.confirm") || content.includes("useConfirmDialog()")) {
    return content;
  }

  return content.replace(
    /const (\w+) = \(\) => \{\n/,
    "const $1 = () => {\n  const { confirm } = useConfirmDialog();\n"
  );
}

function migrateHandlers(content) {
  let updated = content;

  updated = updated.replace(
    /const (\w+) = \(([^)]*)\) => \{\s*\n\s*if \(window\.confirm\(([^)]+)\)\) \{\s*\n\s*try \{/g,
    "const $1 = async ($2) => {\n    const ok = await confirm({ description: $3 });\n    if (!ok) return;\n    try {"
  );

  updated = updated.replace(
    /if \(window\.confirm\(([^)]+)\)\) \{\s*\n\s*try \{/g,
    "{\n    const ok = await confirm({ description: $1 });\n    if (!ok) return;\n    try {"
  );

  updated = updated.replace(
    /if \(\s*\n\s*window\.confirm\(([\s\S]*?)\)\s*\n\s*\) \{\s*\n\s*try \{/g,
    "{\n    const ok = await confirm({ description: $1 });\n    if (!ok) return;\n    try {"
  );

  updated = updated.replace(/\balert\(([^)]+)\)/g, "toast.error($1)");

  updated = updated.replace(
    /await \w+\.delete\([^)]+\);\s*\n(\s*)refetch\(\);/g,
    (match, indent) => match.replace("refetch();", "toast.success(\"Deleted successfully\");\n" + indent + "refetch();")
  );

  return updated;
}

let changed = 0;
for (const file of walk(pagesDir)) {
  let content = fs.readFileSync(file, "utf8");
  if (!content.includes("window.confirm") && !content.includes("alert(")) continue;

  const original = content;
  content = ensureImports(content);
  content = ensureHook(content);
  content = migrateHandlers(content);

  if (content !== original) {
    fs.writeFileSync(file, content, "utf8");
    changed++;
    console.log("updated:", path.relative(pagesDir, file));
  }
}

console.log(`\nDone. Updated ${changed} files.`);
