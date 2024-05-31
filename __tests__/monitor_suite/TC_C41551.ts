import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_C41551 To verify create pull button is not displayed under ""Revisions"" tab for Integration App(users who has Account level monitor access)`, () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
  });

  test(`@Env-QA C41551 To verify create pull button is not displayed under ""Revisions"" tab for Integration App(users who has Account level monitor access)`, async ({
    io,
    page
  }) => {
    await io.flowBuilder.clickByText("Transfer_Integration-DND");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click("button[data-test='Revisions']");
    await io.assert.checkElementState(
      selectors.integrationPagePO.CREATE_PULL,
      "isHidden"
    );
  });
});
