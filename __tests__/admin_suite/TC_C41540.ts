import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_C41540 To verify create pull button is displayed under ""Revisions"" tab for DIY integration(Account Owner)`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({ io }) => {
    await io.api.deleteIntegrationRecursively("TC_C41540 Integration");
    await io.flowBuilder.loadingTime();
  });
  test(`@Zephyr-IO-T421 @Env-All C41540 To verify create pull button is displayed under ""Revisions"" tab for DIY integration(Account Owner)`, async ({
    page,
    io
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.clickCreateIntegrationButton();
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.basePagePO.INPUT_NAME_SELECTOR, "TC_C41540 Integration");
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION_BUTTON);
    await io.flowBuilder.click(selectors.basePagePO.INSTALL);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText("Revisions");
    await io.flowBuilder.loadingTime();
    await io.assert.verifyElementIsDisplayed(
      selectors.integrationPagePO.CREATE_PULL,
      "Element is not displayed properly"
    );
    await io.flowBuilder.click(selectors.homePagePO.DELETE_INTEGRATION);
    await io.flowBuilder.click(selectors.basePagePO.DELETE);
  });
});
