// Accessibility audit with axe-core across the site's routes and breakpoints.
// node scripts/a11y.mjs [url]
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const axeSource = readFileSync(require.resolve("axe-core"), "utf8");

const BASE = process.argv[2] ?? "http://localhost:3210";
const EXE =
  process.env.CHROME_PATH ??
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

const browser = await chromium.launch({ executablePath: EXE });
let total = 0;

for (const width of [375, 1440]) {
  for (const route of ["/", "/login", "/privacy", "/terms"]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.addScriptTag({ content: axeSource });

    const results = await page.evaluate(async () => {
      // @ts-expect-error injected global
      return await window.axe.run(document, {
        runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"] },
      });
    });

    for (const violation of results.violations) {
      total += 1;
      console.log(
        `\n[${width}px ${route}] ${violation.id} (${violation.impact}) — ${violation.help}`,
      );
      for (const node of violation.nodes.slice(0, 4)) {
        console.log("   ", node.target.join(" "));
        console.log("   ", node.failureSummary?.replace(/\n/g, " | ").slice(0, 220));
      }
      if (violation.nodes.length > 4) {
        console.log(`    …and ${violation.nodes.length - 4} more nodes`);
      }
    }
    await context.close();
  }
}

console.log(total === 0 ? "\nNo axe violations." : `\n${total} violation types.`);
await browser.close();
