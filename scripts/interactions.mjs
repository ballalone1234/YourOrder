// Interaction QA: mobile nav, accordion, form validation and success state.
// node scripts/interactions.mjs [url]
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const BASE = process.argv[2] ?? "http://localhost:3210";
const OUT = "shots/interaction";
const EXE =
  process.env.CHROME_PATH ??
  "C:/Program Files/Google/Chrome/Application/chrome.exe";

mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: EXE });
const errors = [];

async function newPage(width, height = 800) {
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`[${width}] ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`[${width}] ${error.message}`));
  return { context, page };
}

// --- mobile navigation -----------------------------------------------------
{
  const { context, page } = await newPage(375);
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "เปิดเมนู" }).click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${OUT}/mobile-nav-open.png` });

  const expanded = await page
    .getByRole("button", { name: "ปิดเมนู" })
    .getAttribute("aria-expanded");
  console.log("mobile nav aria-expanded:", expanded);

  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);
  const hidden = await page.locator("#mobile-nav").getAttribute("aria-hidden");
  console.log("after Escape aria-hidden:", hidden);
  await context.close();
}

// --- accordion -------------------------------------------------------------
{
  const { context, page } = await newPage(1280, 900);
  await page.goto(BASE, { waitUntil: "networkidle" });
  const third = page.getByRole("button", {
    name: "สามารถเชื่อมกับระบบเดิมได้หรือไม่?",
  });
  await third.click();
  await page.waitForTimeout(500);
  console.log("faq aria-expanded:", await third.getAttribute("aria-expanded"));
  await page.locator("#faq").screenshot({ path: `${OUT}/faq-open.png` });
  await context.close();
}

// --- form validation -------------------------------------------------------
{
  const { context, page } = await newPage(1280, 900);
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: /ส่งข้อมูลเพื่อประเมิน/ }).click();
  await page.waitForTimeout(300);
  const alerts = await page.getByRole("alert").count();
  const focused = await page.evaluate(
    () => document.activeElement?.getAttribute("name"),
  );
  console.log("validation alerts:", alerts, "focus moved to:", focused);
  await page.locator("form").screenshot({ path: `${OUT}/form-errors.png` });

  // fill in and submit
  await page.fill('input[name="company"]', "บริษัท สยามพาร์ท จำกัด");
  await page.fill('input[name="name"]', "สมชาย ใจดี");
  await page.fill('input[name="phone"]', "081-234-5678");
  await page.fill('input[name="lineId"]', "@siampart");
  await page.fill('input[name="email"]', "somchai@siampart.co.th");
  await page.fill('input[name="industry"]', "ผู้ผลิตชิ้นส่วนยานยนต์");
  await page.selectOption('select[name="size"]', "21–50");
  await page.fill(
    'textarea[name="process"]',
    "ทีมขายรับออเดอร์ทาง LINE แล้วคีย์ลง Excel อีกครั้ง ทำให้ข้อมูลตกหล่นและตามสถานะงานไม่ได้",
  );
  await page.fill('input[name="tools"]', "Excel, LINE, ระบบบัญชี Express");
  await page.check('input[name="consent"]');
  await page.getByRole("button", { name: /ส่งข้อมูลเพื่อประเมิน/ }).click();
  await page.waitForTimeout(1200);
  const success = await page.getByRole("status").count();
  console.log("success panel:", success);
  await page.locator("#contact").screenshot({ path: `${OUT}/form-success.png` });
  await context.close();
}

// --- keyboard focus --------------------------------------------------------
{
  const { context, page } = await newPage(1280, 900);
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  await page.waitForTimeout(200);
  await page.screenshot({ path: `${OUT}/skip-link.png`, clip: { x: 0, y: 0, width: 600, height: 140 } });
  for (let i = 0; i < 4; i += 1) await page.keyboard.press("Tab");
  await page.waitForTimeout(200);
  console.log(
    "focused after tabbing:",
    await page.evaluate(() => document.activeElement?.textContent?.trim().slice(0, 30)),
  );
  await page.screenshot({ path: `${OUT}/focus-nav.png`, clip: { x: 0, y: 0, width: 1280, height: 120 } });
  await context.close();
}

console.log(
  errors.length ? `CONSOLE ERRORS:\n${errors.join("\n")}` : "no console errors",
);

await browser.close();
