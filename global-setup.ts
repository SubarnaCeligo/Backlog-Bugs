// global-setup.ts
import { chromium, FullConfig } from "@playwright/test";
import { LoginPagePO } from "@objects/LoginPagePO";
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
  const loginPagePO: LoginPagePO = new LoginPagePO();
  await page.goto(baseURL!, {
    waitUntil: "domcontentloaded"
  });
  await page.waitForLoadState();
  await page.locator(loginPagePO.EMAIL).click();
  await page.waitForTimeout(2000);
  await page.locator(loginPagePO.EMAIL).fill(process.env["EMAIL"]);
  await page.waitForTimeout(2000);
  await page.locator(loginPagePO.PASSWORD).click();
  await page.waitForTimeout(2000);
  await page.locator(loginPagePO.PASSWORD).fill(Decrypt(process.env["PASSWORD"]));
  await page.waitForTimeout(2000);
  await page.locator(loginPagePO.SIGN_IN_BUTTON).click();
  await page.waitForTimeout(2000);
  await page.context().storageState({ path: "storageState.json" });
}

export default globalSetup;
