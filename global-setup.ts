// global-setup.ts
import { chromium, FullConfig } from "@playwright/test";
import * as selectors from "@selectors/Selectors";
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
  await page.locator(selectors.LoginPagePO.EMAIL).fill(process.env["EMAIL"]);
  await page.waitForTimeout(2000);
  await page
    .locator(selectors.LoginPagePO.PASSWORD)
    .fill(process.env["PASSWORD"]);
  await page.waitForTimeout(2000);
  await page.locator(selectors.LoginPagePO.SIGN_IN_BUTTON).click();
  await page.waitForTimeout(2000);
  await page.context().storageState({ path: "storageState.json" });
}

export default globalSetup;
