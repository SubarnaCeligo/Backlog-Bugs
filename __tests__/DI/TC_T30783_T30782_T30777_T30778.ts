import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30783_T30782_T30777_T30778", () => {
  test("@Env-PLATFORMTHREE @Epic-IO-63085 @pmcases @Priority-P1 @Zephyr-IO-T30783 @Zephyr-IO-T30782 @Zephyr-IO-T30777 @Zephyr-IO-T30778 TC_T30783_T30782_T30777_T30778", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.sync.clickOnCreateSync();
    await io.flowBuilder.click(selectors.syncPagePO.NEW_SYNC_INTEGRATION);
    await io.myAccountPage.loadingTime();

    //T30783 T30782 T30777 T30778
    await io.flowBuilder.fill(
      selectors.syncPagePO.SYNC_INTEGRATION_NAME,
      "Integration!@#$%^&*()_+123"
    );
    await io.flowBuilder.clearTextValue(
      selectors.syncPagePO.SYNC_INTEGRATION_NAME
    );
    await io.myAccountPage.loadingTime();
    await expect(page.getByText("A value must be provided")).toBeVisible();
    await io.flowBuilder.fill(
      selectors.syncPagePO.SYNC_INTEGRATION_NAME,
      "Integration!@#$%^&*()_+123"
    );
    await io.flowBuilder.click(selectors.syncPagePO.SAVE_AND_CREATE_SYNC);
    await io.myAccountPage.loadingTime();
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.WIZARD_TITLE,
      "Title is not displayed"
    );
  });
});
