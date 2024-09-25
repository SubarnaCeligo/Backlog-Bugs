import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C21054", () => {
  test.beforeEach(async ({io}) => {
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T2982|To verify as soon as export is opened the preview should not work automatically", async ({io,page}) => {
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.click(selectors.basePagePO.ADD_SOURCE_BUTTON);
    await io.homePage.loadingTime();
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'HTTP');
    await io.homePage.click(selectors.connectionsPagePO.HTTP_CNNECTOR);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    const preBtn = await page.locator(selectors.importPagePO.CLICKPREVIEW);
    await expect(preBtn).toHaveAttribute('disabled');
  });
});
