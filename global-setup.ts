// global-setup.ts
import { chromium, FullConfig } from "@playwright/test";
import { LoginPage } from "@pages/LoginPage";
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
  const loginPage: LoginPage = new LoginPage(page);
  await page.goto(baseURL!, {
    waitUntil: "domcontentloaded"
  });
  await page.waitForLoadState();
  await loginPage.login();
  await page.context().storageState({ path: "storageState.json" });
}

export default globalSetup;
