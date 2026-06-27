/**
 * Bulk UI class migration for Pages — maps legacy Tailwind palette to semantic tokens.
 * Run: node scripts/migrate-pages-ui.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.join(__dirname, "../src/Pages");

const replacements = [
  [/text-gray-900/g, "text-foreground"],
  [/text-gray-800/g, "text-foreground"],
  [/text-gray-700/g, "text-foreground"],
  [/text-gray-600/g, "text-muted-foreground"],
  [/text-gray-500/g, "text-muted-foreground"],
  [/text-gray-400/g, "text-muted-foreground"],
  [/sm:bg-gray-100/g, "sm:bg-muted/40"],
  [/bg-gray-50/g, "bg-muted/40"],
  [/hover:bg-gray-100/g, "hover:bg-muted/50"],
  [/hover:bg-gray-50/g, "hover:bg-muted/50"],
  [/bg-gray-100/g, "bg-muted"],
  [/bg-white/g, "bg-card"],
  [/border-gray-200/g, "border-border"],
  [/border-gray-300/g, "border-border"],
  [/divide-gray-200/g, "divide-border"],
  [/text-indigo-600 hover:text-indigo-900/g, "text-primary hover:text-primary/80"],
  [/text-red-600 hover:text-red-900/g, "text-destructive hover:text-destructive/80"],
  [/text-rose-600 hover:text-rose-900/g, "text-destructive hover:text-destructive/80"],
  [/text-blue-600 hover:text-blue-900/g, "text-primary hover:text-primary/80"],
  [/text-blue-500/g, "text-primary"],
  [/bg-red-50 text-red-700/g, "bg-destructive/10 text-destructive"],
  [/bg-indigo-50 text-indigo-600/g, "bg-primary/10 text-primary"],
  [/text-red-600/g, "text-destructive"],
  [/text-red-700/g, "text-destructive"],
  [/focus:ring-amber-300/g, "focus-visible:ring-ring"],
  [/focus:ring-yellow-500/g, "focus-visible:ring-ring"],
  [/focus:ring-indigo-200 focus:border-indigo-500/g, "focus-visible:ring-ring focus-visible:border-ring"],
  [/focus:ring-2 focus:ring-amber-300 focus:border-amber-300/g, "focus-visible:ring-ring focus-visible:border-ring"],
  [/hover:from-yellow-300 hover:to-yellow-500/g, "hover:bg-primary/90"],
  [/hover:from-amber-500 hover:to-yellow-600/g, "hover:bg-primary/90"],
  [/from-amber-400 to-yellow-500/g, "bg-primary text-primary-foreground"],
  [/from-yellow-200 to-yellow-400/g, "bg-primary text-primary-foreground"],
  [/bg-gradient-to-r from-yellow-200 to-yellow-400/g, "bg-primary text-primary-foreground"],
  [/bg-gradient-to-r from-amber-400 to-yellow-500/g, "bg-primary text-primary-foreground"],
  [/text-gray-900 font-medium/g, "text-primary-foreground font-medium"],
  [/border-yellow-400/g, "border-primary"],
  [/bg-yellow-400/g, "bg-primary"],
  [/bg-yellow-500/g, "bg-primary"],
  [/text-yellow-400/g, "text-primary"],
  [/hover:bg-yellow-600/g, "hover:bg-primary/90"],
  [/hover:bg-yellow-500/g, "hover:bg-primary/90"],
  [/from-blue-50 to-blue-100/g, ""],
  [/from-blue-900 to-blue-800/g, "bg-muted border-border"],
  [/text-blue-200/g, "text-foreground"],
  [/text-blue-300/g, "text-muted-foreground"],
  [/border-blue-400/g, "border-border"],
  [/border-blue-200/g, "border-border"],
  [/bg-blue-50/g, "bg-primary/5"],
  [/bg-blue-100/g, "bg-primary/10"],
  [/text-blue-800/g, "text-foreground"],
  [/hover:bg-blue-50/g, "hover:bg-muted/50"],
  [/bg-blue-500/g, "bg-primary"],
  [/hover:bg-blue-600/g, "hover:bg-primary/90"],
  [/text-blue-500/g, "text-primary"],
  [/bg-purple-600/g, "bg-accent"],
  [/bg-red-500/g, "bg-destructive"],
  [/bg-green-500/g, "bg-success"],
  [/bg-blue-500/g, "bg-primary"],
  [/border-blue-500/g, "border-primary"],
  [/border-green-500/g, "border-success"],
  [/border-red-500/g, "border-destructive"],
  [/border-purple-500/g, "border-border"],
  [/bg-green-100 text-green-800/g, "bg-success/10 text-success"],
  [/text-green-600 hover:text-green-900/g, "text-success hover:text-success/80"],
  [/min-h-screen mx-auto/g, "mx-auto"],
  [/p-6   min-h-screen mx-auto/g, "  mx-auto"],
  [/p-6    min-h-screen mx-auto/g, "   mx-auto"],
  [/   min-h-screen mx-auto p-6/g, "   mx-auto"],
  [/focus:border-amber-300/g, "focus-visible:border-ring"],
  [/focus:ring-gray-200/g, "focus-visible:ring-ring"],
  [/focus:ring-blue-500/g, "focus-visible:ring-ring"],
  [/focus:ring-red-300 focus:border-red-300/g, "focus-visible:ring-ring focus-visible:border-ring"],
  [/focus:ring-green-300 focus:border-green-300/g, "focus-visible:ring-ring focus-visible:border-ring"],
  [/focus:ring-green-300/g, "focus-visible:ring-ring"],
  [/focus:ring-red-300/g, "focus-visible:ring-ring"],
  [/focus:ring-yellow-300/g, "focus-visible:ring-ring"],
  [/text-red-500/g, "text-destructive"],
  [/text-green-500/g, "text-success"],
  [/text-green-600/g, "text-success"],
  [/text-blue-700/g, "text-primary"],
  [/hover:bg-blue-200/g, "hover:bg-primary/20"],
  [/bg-red-100/g, "bg-destructive/10"],
  [/hover:bg-red-200/g, "hover:bg-destructive/20"],
  [/hover:bg-indigo-50/g, "hover:bg-primary/5"],
  [/hover:bg-red-50/g, "hover:bg-destructive/10"],
  [/from-purple-50 to-purple-100/g, ""],
  [/from-amber-50 to-amber-100/g, ""],
  [/from-red-200 to-red-400/g, "bg-destructive/15 text-foreground"],
  [/from-green-200 to-green-400/g, "bg-success/15 text-foreground"],
  [/from-purple-200 to-purple-400/g, "bg-accent text-accent-foreground"],
  [/from-red-400 to-yellow-500/g, "bg-primary text-primary-foreground"],
  [/from-blue-500 to-indigo-600/g, "bg-primary text-primary-foreground"],
  [/from-blue-500 to-blue-600/g, "bg-primary text-primary-foreground"],
  [/from-green-500 to-green-600/g, "bg-success text-success-foreground"],
  [/from-purple-500 to-purple-600/g, "bg-accent text-accent-foreground"],
  [/from-yellow-500 to-yellow-600/g, "bg-primary text-primary-foreground"],
  [/from-red-500 to-red-600/g, "bg-destructive text-destructive-foreground"],
  [/from-indigo-500 to-indigo-600/g, "bg-primary text-primary-foreground"],
  [/hover:from-blue-600 hover:to-indigo-700/g, "hover:bg-primary/90"],
  [/hover:from-blue-600 hover:to-blue-700/g, "hover:bg-primary/90"],
  [/hover:from-green-600 hover:to-green-700/g, "hover:bg-success/90"],
  [/hover:from-purple-600 hover:to-purple-700/g, "hover:bg-accent/90"],
  [/hover:from-yellow-600 hover:to-yellow-700/g, "hover:bg-primary/90"],
  [/hover:from-red-600 hover:to-red-700/g, "hover:bg-destructive/90"],
  [/hover:from-indigo-600 hover:to-indigo-700/g, "hover:bg-primary/90"],
  [/hover:from-green-300 hover:to-green-500/g, "hover:bg-success/90"],
  [/bg-gradient-to-r from-blue-500 to-blue-600/g, "bg-primary text-primary-foreground"],
  [/bg-gradient-to-r from-green-500 to-green-600/g, "bg-success text-success-foreground"],
  [/bg-gradient-to-r from-purple-500 to-purple-600/g, "bg-accent text-accent-foreground"],
  [/bg-gradient-to-r from-yellow-500 to-yellow-600/g, "bg-primary text-primary-foreground"],
  [/bg-gradient-to-r from-red-500 to-red-600/g, "bg-destructive text-destructive-foreground"],
  [/bg-gradient-to-r from-indigo-500 to-indigo-600/g, "bg-primary text-primary-foreground"],
  [/text-white/g, "text-primary-foreground"],
  [/border-gray-100/g, "border-border"],
  [/hover:bg-cyan-50/g, "hover:bg-primary/5"],
  [/bg-cyan-500/g, "bg-primary"],
  [/hover:bg-cyan-600/g, "hover:bg-primary/90"],
  [/text-cyan-500/g, "text-primary"],
  [/text-gray-300/g, "text-muted-foreground"],
  [/bg-gray-200/g, "bg-muted"],
  [/hover:bg-gray-300/g, "hover:bg-muted/80"],
  [/focus:ring-blue-300 focus:border-blue-300/g, "focus-visible:ring-ring focus-visible:border-ring"],
  [/border-blue-100/g, "border-border"],
  [/text-yellow-500/g, "text-primary"],
  [/text-yellow-800/g, "text-primary-foreground"],
  [/bg-yellow-100/g, "bg-primary/10"],
  [/bg-yellow-50/g, "bg-primary/5"],
  [/border-yellow-200/g, "border-primary/20"],
  [/focus:border-yellow-500/g, "focus-visible:border-ring"],
  [/text-amber-600 hover:text-amber-900/g, "text-primary hover:text-primary/80"],
  [/hover:bg-amber-50/g, "hover:bg-primary/5"],
  [/text-amber-500/g, "text-primary"],
  [/text-indigo-600 hover:text-indigo-800/g, "text-primary hover:text-primary/80"],
  [/text-blue-600/g, "text-primary"],
  [/hover:text-green-800/g, "hover:text-success/80"],
  [/text-red-800/g, "text-destructive"],
  [/bg-purple-100 text-purple-800/g, "bg-accent text-accent-foreground"],
  [/bg-blue-200/g, "bg-primary/20"],
  [/from-blue-100 to-blue-200/g, "bg-primary/10"],
  [/bg-green-50 border border-green-200/g, "bg-success/10 border border-success/20"],
  [/bg-red-50 border border-red-200/g, "bg-destructive/10 border border-destructive/20"],
  [/focus:ring-blue-300/g, "focus-visible:ring-ring"],
  [/ bg-primary text-primary-foreground text-primary-foreground /g, " bg-primary text-primary-foreground "],
];

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

  for (const [pattern, replacement] of replacements) {
    content = content.replace(pattern, replacement);
  }

  if (content !== original) {
    fs.writeFileSync(file, content, "utf8");
    changed++;
    console.log("updated:", path.relative(pagesDir, file));
  }
}

console.log(`\nDone. Updated ${changed} files.`);
