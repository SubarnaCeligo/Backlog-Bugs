import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C108853 Changing the implementation for uploading template zip.", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("C108853 @Zephyr-IO-T26356 @Env-All", async ({ io, page }) => {
    await io.homePage.addStep("*** Navigated to home page ***");
    await io.homePage.goToMenu("Resources", "Templates");
    await io.homePage.addStep("*** Navigated to templates page ***");
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH, "C108853");
    await io.flowBuilder.loadingTime();

    const previousTimeString = await (
        await page.$(selectors.myAccountPagePO.RELATIVE_DATE_TIME)
      ).evaluate(el => el.textContent);

    await io.flowBuilder.click(selectors.integrationPagePO.OPENACTIONSMENU);
    await page.waitForTimeout(30000)
    await io.flowBuilder.clickByText("Upload template zip");
    let fileInput = await page.$(selectors.basePagePO.UPLOAD_FILE);
    await io.homePage.zipUpload("testData/inputData/Templates/C108853.zip");
    await io.flowBuilder.loadingTime();
    const timeString = await (
      await page.$(selectors.myAccountPagePO.RELATIVE_DATE_TIME)
    ).evaluate(el => el.textContent);

    io.assert.expectNotToBeValue(previousTimeString, timeString, "time strings are matched, but they should not");
  });
});
