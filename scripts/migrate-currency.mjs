/**
 * Replace hardcoded currency symbols with formatMoney().
 * Run: node scripts/migrate-currency.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, "../src");

const SKIP_FILES = new Set([
  "lib/currency.js",
  "context/CurrencyProvider.jsx",
  "services/currencyService.js",
  "Pages/Settings_Pages/CurrencyPage/CurrencyIndex.jsx",
  "Pages/Settings_Pages/CurrencyPage/CurrencyCreate.jsx",
  "Pages/Settings_Pages/CurrencyPage/CurrencyEditById.jsx",
]);

const SKIP_PATTERNS = [
  /availableStock\.toFixed/,
  /`\$\{availableStock/,
  /`\$\{unit\}/,
  /Stock Out Amount/,
  /subTotal\.toFixed\(2\)/,
];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.name.endsWith(".jsx") || entry.name.endsWith(".js")) files.push(full);
  }
  return files;
}

function ensureImport(content) {
  const importLine = 'import { formatMoney } from "@/lib/currency";';
  if (content.includes(importLine)) return content;
  if (content.includes('from "@/lib/currency"')) return content;
  return content.replace(/^(import React[^\n]*\n)/m, `$1${importLine}\n`);
}

function shouldSkip(content) {
  return SKIP_PATTERNS.some((p) => p.test(content));
}

function migrateContent(content) {
  if (shouldSkip(content) && !content.includes("฿") && !content.includes("formatCurrency") && !content.includes("`$${")) {
    return content;
  }

  let next = content;

  // Remove local formatCurrency helpers
  next = next.replace(
    /const formatCurrency = \(value\) => `\$\$\{Number\(value \|\| 0\)\.toFixed\(2\)\}`;\n\n?/g,
    ""
  );

  // ฿{expr}
  next = next.replace(/฿\{([^}]+)\}/g, "{formatMoney($1)}");

  // `$${expr}` in JSX or template - common patterns
  next = next.replace(/`\$\$\{([^}]+)\}`/g, "{formatMoney($1)}");
  next = next.replace(/`\$\$\{parseFloat\(([^)]+)\)\.toLocaleString\(\)\}`/g, "{formatMoney($1)}");

  // (row) => `$${row.amount}` etc
  next = next.replace(
    /\(row\) => \(row\.amount != null \? `\$\$\{row\.amount\}` : row\.basic \? `\$\$\{row\.basic\}` : ""\)/g,
    "(row) => formatMoney(row.amount ?? row.basic ?? 0)"
  );
  next = next.replace(/\(row\) => `\$\$\{([^}]+)\}`/g, "(row) => formatMoney($1)");

  // Number(x).toFixed(2) in amount/price/total contexts
  next = next.replace(/Number\((row\.[a-zA-Z]+)\)\.toFixed\(2\)/g, "formatMoney($1)");
  next = next.replace(/Number\(([^)]+)\)\.toFixed\(2\)/g, (match, expr) => {
    if (/transaction\.|entry\.|order\.|item\.|row\.|summary\.|food\.|payment\.|earning\.|expense\.|deposit|withdrawn|balance|total|amount|price|billAmount|advanceAmount|discountedTotal|due|memoTotal|subTotal|credit|basic|openingBalance|closingBalance|totalDeposits|totalWithdrawals/.test(expr)) {
      return `formatMoney(${expr})`;
    }
    return match;
  });

  next = next.replace(/([a-zA-Z0-9_.?]+)\.toFixed\(2\)/g, (match, expr) => {
    if (/availableStock|unit|quantity|percent|vat|serviceCharge/.test(expr)) return match;
    if (/totalPrice|subTotal|discountedTotal|due|memoTotal|deposit|withdrawn|balance|amount|price|billAmount|advanceAmount|openingBalance|closingBalance|totalDeposits|totalWithdrawals|totalExpense|totalAllOrders|totalCancelled|summary\./.test(expr)) {
      return `formatMoney(${expr})`;
    }
    return match;
  });

  // formatCurrency(x) -> formatMoney(x)
  next = next.replace(/formatCurrency\(/g, "formatMoney(");

  if (next.includes("formatMoney") && !next.includes('from "@/lib/currency"')) {
    next = ensureImport(next);
  }

  return next;
}

let changed = 0;
for (const file of walk(srcDir)) {
  const rel = path.relative(srcDir, file).replace(/\\/g, "/");
  if (SKIP_FILES.has(rel)) continue;

  const original = fs.readFileSync(file, "utf8");
  if (!original.includes("฿") && !original.includes("formatCurrency") && !original.includes("`.toFixed(2)`") && !original.match(/\$\{.*amount|price|total|balance|deposit|withdrawn|billAmount|advanceAmount/i) && !original.includes("`${'$'}")) {
    // still check for ${
    if (!original.includes("$${") && !original.match(/Number\([^)]+\)\.toFixed\(2\)/)) continue;
  }

  const updated = migrateContent(original);
  if (updated !== original) {
    fs.writeFileSync(file, updated, "utf8");
    changed++;
    console.log("updated:", rel);
  }
}

console.log(`\nDone. Updated ${changed} files.`);
