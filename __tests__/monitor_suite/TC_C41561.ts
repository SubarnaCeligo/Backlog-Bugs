import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_C41561 To verify create pull button is not displayed under "Revisions" tab for Templates(users who has Integration level monitor access)`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test(`C41561 To verify create pull button is not displayed under "Revisions" tab for Templates(users who has Integration level monitor access)`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.flowBuilder.clickByText("Revisions");
    const createPullBottonLocator = await page.locator(
      selectors.integrationPagePO.CREATE_PULL
    );
    await expect(createPullBottonLocator).toBeHidden();
  });
});
