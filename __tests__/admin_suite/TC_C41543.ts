import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_C41543 To verify create pull button is displayed under "Revisions" tab for DIY integration(users who has Account level admin access)`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
  });
  test(`@Env-All @Zephyr-IO-T424 C41543 To validate create pull button is displayed under Revisions tab`, async ({
    page,
    io
  }) => {
    await io.flowBuilder.clickByText("Create");
    await io.flowBuilder.click(selectors.homePagePO.CREATE_NEW_INTEGRATION);
    await io.flowBuilder.fill(
      selectors.basePagePO.INPUT_NAME_SELECTOR,
      "TC_C41543 Integration"
    );
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION);
    await io.flowBuilder.click(selectors.homePagePO.CLONE_INTEGRATION_BUTTON);
    await io.flowBuilder.click(selectors.basePagePO.INSTALL);
    await io.flowBuilder.clickByText("Revisions");
    await io.assert.verifyElementIsDisplayed(
      selectors.integrationPagePO.CREATE_PULL,
      "Element is not displayed properly"
    );
    await io.flowBuilder.click(selectors.homePagePO.DELETE_INTEGRATION);
    await io.flowBuilder.click(selectors.basePagePO.DELETE);
  });
});
