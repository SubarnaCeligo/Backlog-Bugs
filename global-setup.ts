// global-setup.ts
import { chromium, FullConfig } from "@playwright/test";
import * as selectors from "@selectors/Selectors";
import { getDataFromNodeProcess } from "@utilities/FTPUtil";
const Decrypt = require("atob");

async function globalSetup(config: FullConfig) {
  await getDataFromNodeProcess();
  config.projects[0].use.baseURL = process.env.IOURL;
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
  await page
    .locator(selectors.LoginPagePO.EMAIL)
    .fill(process.env["IO_UserName"]);
  await page.waitForTimeout(2000);
  await page
    .locator(selectors.LoginPagePO.PASSWORD)
    .fill(Decrypt(process.env["IO_Password"]));
  await page.waitForTimeout(2000);
  await page.locator(selectors.LoginPagePO.SIGN_IN_BUTTON).click();
  await page.waitForTimeout(2000);
  await page.context().storageState({ path: "storageState.json" });
}

export default globalSetup;
