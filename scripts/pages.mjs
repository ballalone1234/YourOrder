// Screenshots for the footer and secondary pages.
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const BASE = process.argv[2] ?? "http://localhost:3210";
const EXE =
  process.env.CHROME_PATH ??
  "C:/Program Files/Google/Chrome/Application/chrome.exe";
mkdirSync("shots/pages", { recursive: true });

const browser = await chromium.launch({ executablePath: EXE });

for (const width of [1440, 375]) {
  const context = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await context.newPage();

  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.locator("footer").screenshot({ path: `shots/pages/footer-${width}.png` });

  for (const route of ["login", "privacy", "not-a-page"]) {
    await page.goto(`${BASE}/${route}`, { waitUntil: "load" });
    await page.waitForTimeout(700);
    await page.locator("main").screenshot({ path: `shots/pages/${route}-${width}.png` });
  }
  await context.close();
}

await browser.close();
