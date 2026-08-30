// Visual QA helper: full-page screenshots at the breakpoints the site must
// hold up at. Run with: node scripts/shoot.mjs [url]
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const BASE = process.argv[2] ?? "http://localhost:3210";
const OUT = "shots";
const EXE =
  process.env.CHROME_PATH ??
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

const widths = [375, 390, 768, 1024, 1280, 1440, 1920];

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: EXE });

for (const width of widths) {
  const context = await browser.newContext({
    viewport: { width, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const overflow = [];

  await page.addInitScript(() => {
  const style = document.createElement("style");
  style.textContent = "html{scroll-behavior:auto !important}";
  document.addEventListener("DOMContentLoaded", () => document.head.append(style));
});
await page.goto(BASE, { waitUntil: "networkidle" });
  // Let scroll reveals settle.
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = () => {
        y += window.innerHeight;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight) requestAnimationFrame(step);
        else {
          window.scrollTo(0, 0);
          setTimeout(resolve, 400);
        }
      };
      step();
    });
  });

  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    offenders: Array.from(document.querySelectorAll("body *"))
      .filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1)
      .slice(0, 8)
      .map((el) => `${el.tagName}.${el.className}`.slice(0, 120)),
  }));

  if (metrics.scrollWidth > metrics.clientWidth) {
    overflow.push(metrics);
  }

  await page.screenshot({ path: `${OUT}/home-${width}.png`, fullPage: true });
  console.log(
    `${width}px  scrollWidth=${metrics.scrollWidth} clientWidth=${metrics.clientWidth}` +
      (overflow.length ? `  OVERFLOW: ${JSON.stringify(metrics.offenders)}` : ""),
  );

  await context.close();
}

await browser.close();
