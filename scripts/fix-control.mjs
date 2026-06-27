/**
 * Add control to useForm destructuring where FormSelect is used.
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
  if (!content.includes("control={control}") || content.includes(" control,") || content.includes(", control")) {
    continue;
  }

  const original = content;
  content = content.replace(
    /(const\s*\{)([\s\S]*?)(\}\s*=\s*useForm\(\))/g,
    (match, start, vars, end) => {
      if (vars.includes("control")) return match;
      return `${start}${vars.trimEnd()}, control${vars.endsWith("\n") ? "\n" : " "}${end}`;
    }
  );

  if (content !== original) {
    fs.writeFileSync(file, content, "utf8");
    changed++;
    console.log("fixed:", path.relative(srcDir, file));
  }
}

console.log(`Done. Fixed ${changed} files.`);
