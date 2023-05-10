// global-setup.ts
import { chromium, FullConfig } from "@playwright/test";
const Decrypt = require("atob");

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch({
    logger: {
      isEnabled: (name, severity) => name === "browser",
      log: (name, severity, message, args) => console.log(`${name} ${message}`)
    }
  });
  const page = await browser.newPage();
  await page.goto(baseURL!, {
    waitUntil: "domcontentloaded"
  });
  await page.waitForLoadState();
  await page.locator('[name="email"]').click();
  await page.waitForTimeout(2000);
  await page.locator('[name="email"]').fill(process.env["EMAIL"]);
  await page.waitForTimeout(2000);
  await page.locator('[data-test="password"]').click();
  await page.waitForTimeout(2000);
  await page.locator('[data-test="password"] input').fill(Decrypt(process.env["PASSWORD"]));
  await page.waitForTimeout(2000);
  await page.locator('[data-test="submit"]').click();
  await page.waitForTimeout(2000);
  await page.context().storageState({ path: "storageState.json" });
}

export default globalSetup;
