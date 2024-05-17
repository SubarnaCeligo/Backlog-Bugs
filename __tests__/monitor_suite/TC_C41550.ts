import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_C41550 To verify create pull button is not displayed under "Revisions" tab for DIY integration(users who has Account level monitor access))`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test(`@Zephyr-IO-T431 @Env-All @Priority-P2 C41550 - To verify create pull button is not displayed under "Revisions" tab for DIY integration(users who has Account level monitor access))`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.clickByText("Revisions");
    await io.assert.checkElementState(
      selectors.integrationPagePO.CREATE_PULL,
      "isHidden"
    );
  });
});
