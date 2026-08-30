// Per-section screenshots for design review.
// node scripts/sections.mjs <width> [url]
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const width = Number(process.argv[2] ?? 1440);
const BASE = process.argv[3] ?? "http://localhost:3210";
const OUT = `shots/w${width}`;
const EXE =
  process.env.CHROME_PATH ??
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: EXE });
const context = await browser.newContext({
  viewport: { width, height: 900 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();
await page.addInitScript(() => {
  const style = document.createElement("style");
  style.textContent = "html{scroll-behavior:auto !important}";
  document.addEventListener("DOMContentLoaded", () => document.head.append(style));
});
await page.goto(BASE, { waitUntil: "networkidle" });

await page.evaluate(async () => {
  await new Promise((resolve) => {
    let y = 0;
    const step = () => {
      y += window.innerHeight;
      window.scrollTo(0, y);
      if (y < document.body.scrollHeight) requestAnimationFrame(step);
      else setTimeout(resolve, 500);
    };
    step();
  });
});
await page.evaluate(() => window.scrollTo(0, 0));

const sections = await page.locator("main > * , main section").all();
const seen = new Set();
let index = 0;

for (const section of sections) {
  const box = await section.boundingBox();
  if (!box || box.height < 40) continue;
  const key = `${Math.round(box.y)}-${Math.round(box.height)}`;
  if (seen.has(key)) continue;
  seen.add(key);
  index += 1;
  await section.screenshot({
    path: `${OUT}/${String(index).padStart(2, "0")}.png`,
  });
  console.log(`${index}: y=${Math.round(box.y)} h=${Math.round(box.height)}`);
}

// Header states
await page.setViewportSize({ width, height: 700 });
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(600);
await page.screenshot({ path: `${OUT}/header-top.png` });
await page.evaluate(() => window.scrollTo(0, 900));
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}/header-scrolled.png` });

await browser.close();
