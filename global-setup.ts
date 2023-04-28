// global-setup.ts
import { chromium, FullConfig } from "@playwright/test";

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
  await page.getByPlaceholder("Email*").click();
  await page.waitForTimeout(2000);
  await page.getByPlaceholder("Email*").fill("io.auto.qa@celigo.com");
  await page.waitForTimeout(2000);
  await page.getByPlaceholder("Password*").click();
  await page.waitForTimeout(2000);
  await page.getByPlaceholder("Password*").fill("gpgbjMPuK0lLwFX");
  await page.waitForTimeout(2000);
  await page.locator('[data-test="submit"]').click();
  await page.waitForTimeout(2000);
  await page.context().storageState({ path: "storageState.json" });
}

export default globalSetup;
