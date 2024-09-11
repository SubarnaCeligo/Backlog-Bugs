import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C24272", () => {
  test("@Epic-IO-54539 @Priority-P2 @Zephyr-IO-T24272 @Env-All C24272", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);

    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'FTP');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FTP);

    await page.waitForTimeout(5000);
    await io.homePage.loadingTime()
    await io.homePage.loadingTime()
    await io.homePage.loadingTime()
    await io.homePage.loadingTime()
    let elements = await page.$$(selectors.flowBuilderPagePO.EXISTING_RESOURCE_APPLICATIONS);
    let result = undefined;
    for (let element of elements) {
      let src = await page.evaluate(el => el.getAttribute('src'), element);
      if (!src.includes('ftp')) {
        result = false;
        return;
      }
      else
        result = true;
    }
    expect(result).toBe(true);

  });
});
