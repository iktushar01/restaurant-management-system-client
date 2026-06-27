/**
 * Migrate native <select> to shadcn SelectField / FormSelect.
 * Run: node scripts/migrate-selects.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, "../src");

const ENTRIES_OPTIONS = [
  { value: "10", label: "10" },
  { value: "25", label: "25" },
  { value: "50", label: "50" },
  { value: "100", label: "100" },
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== "components") walk(full, files);
    else if (entry.name.endsWith(".jsx")) files.push(full);
  }
  return files;
}

function ensureImport(content) {
  const needsFormSelect = content.includes("<FormSelect") || content.includes("FormSelect\n");
  const needsSelectField = content.includes("<SelectField") || content.includes("SelectField\n");

  if (!needsFormSelect && !needsSelectField) return content;

  const importLine = needsFormSelect && needsSelectField
    ? 'import FormSelect, { SelectField } from "@/Shared/FormSelect/FormSelect";'
    : needsSelectField
      ? 'import { SelectField } from "@/Shared/FormSelect/FormSelect";'
      : 'import FormSelect from "@/Shared/FormSelect/FormSelect";';

  if (content.includes("@/Shared/FormSelect/FormSelect")) {
    return content.replace(
      /import (?:FormSelect, \{ SelectField \}|FormSelect|\{ SelectField \}) from "@\/Shared\/FormSelect\/FormSelect";\n/g,
      ""
    ).replace(/^(import React[^\n]*\n)/m, `$1${importLine}\n`);
  }

  return content.replace(/^(import React[^\n]*\n)/m, `$1${importLine}\n`);
}

function addControlToUseForm(content) {
  if (!content.includes("useForm(") || /\bcontrol\b/.test(content.slice(0, content.indexOf("useForm(") + 200))) {
    return content;
  }
  return content.replace(
    /const \{([^}]*)\} = useForm\(/g,
    (match, vars) => {
      if (vars.includes("control")) return match;
      const trimmed = vars.trim();
      return `const { ${trimmed}${trimmed ? ", " : ""}control } = useForm(`;
    }
  );
}

function parseSelectBlock(block) {
  const registerMatch = block.match(/\{\.\.\.register\(\s*["']([^"']+)["'](?:,\s*(\{[\s\S]*?\}))?\s*\)\}/);
  const valueMatch = block.match(/value=\{([^}]+)\}/);
  const onChangeMatch =
    block.match(/onChange=\{\(e\)\s*=>\s*\{([\s\S]*?)\}\s*\}/) ||
    block.match(/onChange=\{\(e\)\s*=>\s*([^}]+)\}/);

  const staticOptions = [];
  const optionRegex = /<option\s+value=["']([^"']*)["'][^>]*>([\s\S]*?)<\/option>/g;
  let m;
  while ((m = optionRegex.exec(block)) !== null) {
    if (!m[0].includes("{")) {
      staticOptions.push({ value: m[1], label: m[2].trim() });
    }
  }

  const numericOptions = [];
  const numericRegex = /<option\s+value=\{(\d+)\}>(\d+)<\/option>/g;
  while ((m = numericRegex.exec(block)) !== null) {
    numericOptions.push({ value: m[1], label: m[2] });
  }

  const mapMatch = block.match(
    /\{(\w+)\.map\(\((\w+)\)\s*=>\s*\(\s*<option\s+key=\{[^}]+\}\s+value=\{(\2\.\w+)\}>\{(\2\.\w+)\}<\/option>\s*\)\)\}/
  );
  const sameVarMapMatch = block.match(
    /\{(\w+)\.map\(\((\w+)\)\s*=>\s*\(\s*<option\s+key=\{\2\}\s+value=\{\2\}>\{\2\}<\/option>\s*\)\)\}/
  );
  const optionsArrayMapMatch = block.match(
    /\{(\w+)\.map\(\((\w+)\)\s*=>\s*\(\s*<option\s+key=\{\2\.\w+\}\s+value=\{\2\.\w+\}>\{\2\.\w+\}<\/option>\s*\)\)\}/
  );

  const placeholderMatch = block.match(/<option value="">([^<]*)<\/option>/);

  const isEntriesSelect =
    numericOptions.length === 4 &&
    numericOptions.every((o, i) => ENTRIES_OPTIONS[i]?.value === o.value);

  return {
    registerMatch,
    valueMatch,
    onChangeMatch,
    staticOptions,
    numericOptions,
    mapMatch,
    sameVarMapMatch,
    optionsArrayMapMatch,
    placeholder: placeholderMatch?.[1] ?? "Select...",
    isEntriesSelect,
    block,
  };
}

function formatOnValueChange(onChangeBody) {
  return onChangeBody
    .replace(/e\.target\.value/g, "v")
    .replace(/Number\(e\.target\.value\)/g, "Number(v)")
    .trim();
}

function convertSelectBlockInner(parsed, indent) {
  const {
    registerMatch,
    valueMatch,
    onChangeMatch,
    staticOptions,
    numericOptions,
    mapMatch,
    sameVarMapMatch,
    optionsArrayMapMatch,
    placeholder,
    isEntriesSelect,
  } = parsed;

  if (isEntriesSelect && valueMatch && onChangeMatch) {
    const value = valueMatch[1].trim();
    let body = formatOnValueChange(onChangeMatch[1]);
    if (!body.startsWith("{")) body = `{ ${body}; }`;
    body = body.replace(/Number\(e\.target\.value\)/g, "Number(v)").replace(/e\.target\.value/g, "v");
    return `${indent}<SelectField
${indent}  value={${value}}
${indent}  onValueChange={(v) => ${body}}
${indent}  className="w-20"
${indent}  options={[${ENTRIES_OPTIONS.map((o) => `{ value: "${o.value}", label: "${o.label}" }`).join(", ")}]}
${indent}/>`;
  }

  if (registerMatch && optionsArrayMapMatch) {
    const name = registerMatch[1];
    const rules = registerMatch[2] ?? "";
    const arrayName = optionsArrayMapMatch[1];
    return `${indent}<FormSelect
${indent}  name="${name}"
${indent}  control={control}${rules ? `\n${indent}  rules={${rules.trim()}}` : ""}
${indent}  errors={errors}
${indent}  placeholder="${placeholder}"
${indent}  options={${arrayName}.filter((o) => o.value !== "").map((o) => ({ value: String(o.value), label: o.label }))}
${indent}/>`;
  }

  if (registerMatch && staticOptions.length > 0 && !mapMatch) {
    const name = registerMatch[1];
    const rules = registerMatch[2] ?? "";
    const opts = staticOptions.filter((o) => o.value !== "");
    return `${indent}<FormSelect
${indent}  name="${name}"
${indent}  control={control}${rules ? `\n${indent}  rules={${rules.trim()}}` : ""}
${indent}  errors={errors}
${indent}  placeholder="${placeholder}"
${indent}  options={[${opts.map((o) => `\n${indent}    { value: "${o.value}", label: "${o.label}" },`).join("")}\n${indent}  ]}
${indent}/>`;
  }

  if (registerMatch && mapMatch) {
    const name = registerMatch[1];
    const rules = registerMatch[2] ?? "";
    const arrayName = mapMatch[1];
    const item = mapMatch[2];
    const valueExpr = mapMatch[3];
    const labelExpr = mapMatch[4];
    return `${indent}<FormSelect
${indent}  name="${name}"
${indent}  control={control}${rules ? `\n${indent}  rules={${rules.trim()}}` : ""}
${indent}  errors={errors}
${indent}  placeholder="${placeholder}"
${indent}  options={${arrayName}.map((${item}) => ({ value: String(${valueExpr}), label: String(${labelExpr}) }))}
${indent}/>`;
  }

  if (valueMatch && onChangeMatch && sameVarMapMatch) {
    const value = valueMatch[1].trim();
    let body = formatOnValueChange(onChangeMatch[1]);
    if (!body.startsWith("{")) body = `{ ${body}; }`;
    body = body.replace(/e\.target\.value/g, "v");
    const arrayName = sameVarMapMatch[1];
    const item = sameVarMapMatch[2];
    return `${indent}<SelectField
${indent}  value={${value}}
${indent}  onValueChange={(v) => ${body}}
${indent}  placeholder="${placeholder}"
${indent}  options={${arrayName}.map((${item}) => ({ value: String(${item}), label: String(${item}) }))}
${indent}/>`;
  }

  if (valueMatch && onChangeMatch && staticOptions.length > 0) {
    const value = valueMatch[1].trim();
    let body = formatOnValueChange(onChangeMatch[1]);
    if (!body.startsWith("{")) body = `{ ${body}; }`;
    body = body.replace(/Number\(e\.target\.value\)/g, "Number(v)").replace(/e\.target\.value/g, "v");
    const optionsStr = staticOptions
      .filter((o) => o.value !== "")
      .map((o) => `{ value: "${o.value}", label: "${o.label}" }`)
      .join(", ");
    return `${indent}<SelectField
${indent}  value={${value}}
${indent}  onValueChange={(v) => ${body}}
${indent}  placeholder="${placeholder}"
${indent}  options={[${optionsStr}]}
${indent}/>`;
  }

  if (valueMatch && onChangeMatch && mapMatch) {
    const value = valueMatch[1].trim();
    let body = formatOnValueChange(onChangeMatch[1]);
    if (!body.startsWith("{")) body = `{ ${body}; }`;
    body = body.replace(/e\.target\.value/g, "v");
    const arrayName = mapMatch[1];
    const item = mapMatch[2];
    const valueExpr = mapMatch[3];
    const labelExpr = mapMatch[4];
    return `${indent}<SelectField
${indent}  value={${value}}
${indent}  onValueChange={(v) => ${body}}
${indent}  placeholder="${placeholder}"
${indent}  options={${arrayName}.map((${item}) => ({ value: String(${valueExpr}), label: String(${labelExpr}) }))}
${indent}/>`;
  }

  return null;
}

let changed = 0;
let skipped = [];

for (const file of walk(srcDir)) {
  if (!fs.readFileSync(file, "utf8").includes("<select")) continue;

  let content = fs.readFileSync(file, "utf8");
  const original = content;

  const selectRegex = /[ \t]*<select[\s\S]*?<\/select>/g;
  let convertedAny = false;

  content = content.replace(selectRegex, (block) => {
    const indent = block.match(/^(\s*)</)?.[1] ?? "              ";
    const parsed = parseSelectBlock(block);
    const converted = convertSelectBlockInner(parsed, indent);
    if (converted) {
      convertedAny = true;
      return converted;
    }
    skipped.push(path.relative(srcDir, file));
    return block;
  });

  if (!convertedAny) continue;

  content = ensureImport(content);
  if (content.includes("FormSelect")) {
    content = addControlToUseForm(content);
  }

  if (content !== original) {
    fs.writeFileSync(file, content, "utf8");
    changed++;
    console.log("updated:", path.relative(srcDir, file));
  }
}

console.log(`\nDone. Updated ${changed} files.`);
if (skipped.length) {
  console.log(`Skipped blocks in: ${[...new Set(skipped)].join(", ")}`);
}
