import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30768_T30768_T30769", () => {
  test("@Env-PLATFORMTHREE @Epic-IO-63085 @Priority-P1 @Zephyr-IO-T30768 @Zephyr-IO-T30769 @Zephyr-IO-T30773 TC_T30768_T30768_T30769", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.myAccountPage.loadingTime();
    await io.flowBuilder.clickByText("Create");

    //T30768 T30769
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.CREATE_SYNC_INTEGRATION,
      "Create sync is not displayed"
    );

    //T30773
    await io.flowBuilder.click(selectors.syncPagePO.CREATE_SYNC_INTEGRATION);
    await io.myAccountPage.loadingTime();
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.NEW_SYNC_INTEGRATION,
      "Create integration is not displayed"
    );
  });
});
