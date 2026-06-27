/**
 * Fix broken formatMoney migrations.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, "../src");

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith(".jsx")) files.push(full);
  }
  return files;
}

let changed = 0;
for (const file of walk(srcDir)) {
  let content = fs.readFileSync(file, "utf8");
  const original = content;

  content = content.replace(/\{formatMoney\(formatMoney\(/g, "{formatMoney(");
  content = content.replace(/\(row\) => \{formatMoney\(/g, "(row) => formatMoney(");
  content = content.replace(
    /\(row\) => \(row\.amount != null \? \{formatMoney\(row\.amount\)\} : row\.basic \? \{formatMoney\(row\.basic\)\} : ""\)/g,
    "(row) => formatMoney(row.amount ?? row.basic ?? 0)"
  );
  content = content.replace(
    /const formatCurrency = \(value\) => \{formatMoney\(Number\(value \|\| 0\)\.toFixed\(2\)\)\};/g,
    ""
  );
  content = content.replace(/formatCurrency\(/g, "formatMoney(");
  content = content.replace(/€\{formatMoney\(/g, "{formatMoney(");
  content = content.replace(/€ \{formatMoney\(/g, "{formatMoney(");
  content = content.replace(/€\{formatMoney\(/g, "{formatMoney(");
  content = content.replace(/৳ \{/g, "{");
  content = content.replace(/৳ \{/g, "{");
  content = content.replace(/৳ \(/g, "{formatMoney(");
  content = content.replace(/`\$\{formatMoney\(/g, "{formatMoney(");

  if (content !== original) {
    fs.writeFileSync(file, content, "utf8");
    changed++;
    console.log("fixed:", path.relative(srcDir, file));
  }
}

console.log(`Fixed ${changed} files.`);
