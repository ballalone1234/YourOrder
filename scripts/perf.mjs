// Weight + resilience checks: transferred bytes, reduced motion, and the
// no-JavaScript fallback for scroll reveals.
import { chromium } from "playwright-core";

const BASE = process.argv[2] ?? "http://localhost:3210";
const EXE =
  process.env.CHROME_PATH ??
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

const browser = await chromium.launch({ executablePath: EXE });

// --- transferred weight ----------------------------------------------------
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const byType = new Map();

  page.on("response", async (response) => {
    const headers = response.headers();
    const length = Number(headers["content-length"] ?? 0);
    const type = (headers["content-type"] ?? "other").split(";")[0];
    byType.set(type, (byType.get(type) ?? 0) + length);
  });

  await page.goto(BASE, { waitUntil: "networkidle" });
  let total = 0;
  for (const [type, bytes] of [...byType].sort((a, b) => b[1] - a[1])) {
    total += bytes;
    console.log(`${type.padEnd(28)} ${(bytes / 1024).toFixed(1)} KB`);
  }
  console.log(`${"TOTAL".padEnd(28)} ${(total / 1024).toFixed(1)} KB`);
  await context.close();
}

// --- reduced motion --------------------------------------------------------
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  const opacity = await page
    .locator(".reveal")
    .last()
    .evaluate((el) => getComputedStyle(el).opacity);
  console.log("reduced-motion: last reveal opacity =", opacity);
  await context.close();
}

// --- no JavaScript ---------------------------------------------------------
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    javaScriptEnabled: false,
  });
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: "load" });
  const opacity = await page
    .locator(".reveal")
    .last()
    .evaluate((el) => getComputedStyle(el).opacity);
  const headline = await page.locator("h1").innerText();
  console.log("no-js: last reveal opacity =", opacity);
  console.log("no-js: h1 =", headline.replace(/\s+/g, " ").slice(0, 60));
  await context.close();
}

await browser.close();
