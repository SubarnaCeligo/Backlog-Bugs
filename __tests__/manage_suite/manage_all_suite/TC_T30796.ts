import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ladimanish TC_T30796", () => {
  test("@Env-PLATFORMTHREE @Epic-IO-63085 @Priority-P1 @Zephyr-IO-T30796 TC_T30796", async ({
    page,
    io
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.myAccountPage.loadingTime();
    await io.flowBuilder.clickByText("Create");
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.CREATE_SYNC_INTEGRATION,
      "Create sync is not displayed"
    );
    await io.flowBuilder.click(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
      "DND_SYNC_INTEGRATION"
    );
    await io.myAccountPage.loadingTime();
    await io.flowBuilder.clickByText("DND_SYNC_INTEGRATION");
    await io.myAccountPage.loadingTime();
    await io.assert.verifyElementIsDisplayed(
      selectors.syncPagePO.CREATE_SYNC_BUTTON,
      "Create sync is not displayed"
    );

  });
});