/**
 * Migrate native <select> to shadcn SelectField / FormSelect.
 * Run: node scripts/migrate-selects.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, "../src");

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== "components") walk(full, files);
    else if (entry.name.endsWith(".jsx")) files.push(full);
  }
  return files;
}

function ensureImport(content, importLine) {
  if (content.includes(importLine)) return content;
  return content.replace(/^(import React[^\n]*\n)/m, `$1${importLine}\n`);
}

function addControlToUseForm(content) {
  if (!content.includes("useForm(") || content.includes(" control,") || content.includes("{ control,")) {
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
  const onChangeMatch = block.match(/onChange=\{\(e\)\s*=>\s*([^}]+)\}/);

  const staticOptions = [];
  const optionRegex = /<option\s+value=["']([^"']*)["'][^>]*>([\s\S]*?)<\/option>/g;
  let m;
  while ((m = optionRegex.exec(block)) !== null) {
    if (!m[0].includes("{")) {
      staticOptions.push({ value: m[1], label: m[2].trim() });
    }
  }

  const mapMatch = block.match(/\{(\w+)\.map\(\((\w+)\)\s*=>\s*\(\s*<option\s+key=\{[^}]+\}\s+value=\{(\2\.\w+)\}>\{(\2\.\w+)\}<\/option>\s*\)\)\}/);
  const placeholderMatch = block.match(/<option value="">([^<]*)<\/option>/);

  return {
    registerMatch,
    valueMatch,
    onChangeMatch,
    staticOptions,
    mapMatch,
    placeholder: placeholderMatch?.[1] ?? "Select...",
    block,
  };
}

function convertSelectBlock(parsed, indent) {
  const { registerMatch, valueMatch, onChangeMatch, staticOptions, mapMatch, placeholder } = parsed;

  if (registerMatch && staticOptions.length > 0 && !mapMatch) {
    const name = registerMatch[1];
    const rules = registerMatch[2] ?? "";
    return `${indent}<FormSelect
${indent}  name="${name}"
${indent}  control={control}${rules ? `\n${indent}  rules={${rules.trim()}}` : ""}
${indent}  errors={errors}
${indent}  placeholder="${placeholder}"
${indent}  options={[${staticOptions.filter((o) => o.value !== "").map((o) => `\n${indent}    { value: "${o.value}", label: "${o.label}" },`).join("")}${staticOptions.some((o) => o.value === "") ? "" : ""}
${indent}  ]}
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

  if (valueMatch && onChangeMatch && staticOptions.length > 0) {
    const value = valueMatch[1].trim();
    const onChangeBody = onChangeMatch[1].trim();
    const optionsStr = staticOptions
      .filter((o) => o.value !== "")
      .map((o) => `{ value: "${o.value}", label: "${o.label}" }`)
      .join(", ");
    return `${indent}<SelectField
${indent}  value={${value}}
${indent}  onValueChange={(v) => ${onChangeBody.replace(/e\.target\.value/g, "v")}}
${indent}  placeholder="${placeholder}"
${indent}  options={[${optionsStr}]}
${indent}/>`;
  }

  if (valueMatch && onChangeMatch && mapMatch) {
    const value = valueMatch[1].trim();
    const onChangeBody = onChangeMatch[1].trim();
    const arrayName = mapMatch[1];
    const item = mapMatch[2];
    const valueExpr = mapMatch[3];
    const labelExpr = mapMatch[4];
    return `${indent}<SelectField
${indent}  value={${value}}
${indent}  onValueChange={(v) => ${onChangeBody.replace(/e\.target\.value/g, "v")}}
${indent}  placeholder="${placeholder}"
${indent}  options={${arrayName}.map((${item}) => ({ value: String(${valueExpr}), label: String(${labelExpr}) }))}
${indent}/>`;
  }

  return null;
}

let changed = 0;

for (const file of walk(srcDir)) {
  if (!fs.readFileSync(file, "utf8").includes("<select")) continue;

  let content = fs.readFileSync(file, "utf8");
  const original = content;

  const selectRegex = /[ \t]*<select[\s\S]*?<\/select>/g;
  let convertedAny = false;

  content = content.replace(selectRegex, (block) => {
    const indent = block.match(/^(\s*)</)?.[1] ?? "              ";
    const parsed = parseSelectBlock(block);
    const converted = convertSelectBlock(parsed, indent);
    if (converted) {
      convertedAny = true;
      return converted;
    }
    return block;
  });

  if (!convertedAny) continue;

  if (content.includes("FormSelect")) {
    content = ensureImport(
      content,
      'import FormSelect from "@/Shared/FormSelect/FormSelect";'
    );
    content = addControlToUseForm(content);
  }
  if (content.includes("SelectField")) {
    content = ensureImport(
      content,
      'import FormSelect, { SelectField } from "@/Shared/FormSelect/FormSelect";'
    );
    if (content.includes("FormSelect") && !content.includes('import FormSelect from "@/Shared/FormSelect/FormSelect";')) {
      // already has combined import
    }
  }

  // Fix duplicate imports
  content = content.replace(
    /import FormSelect from "@\/Shared\/FormSelect\/FormSelect";\nimport FormSelect, \{ SelectField \} from "@\/Shared\/FormSelect\/FormSelect";\n/g,
    'import FormSelect, { SelectField } from "@/Shared/FormSelect/FormSelect";\n'
  );

  if (content !== original) {
    fs.writeFileSync(file, content, "utf8");
    changed++;
    console.log("updated:", path.relative(srcDir, file));
  }
}

console.log(`\nDone. Updated ${changed} files.`);
