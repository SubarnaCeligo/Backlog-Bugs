import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_C41554 To verify create pull button is not displayed under ""Revisions"" tab for Integration App(users who has Integration level admin access)`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test(`@Zephyr-IO-T435 @Env-All C41554 To verify create pull button is not displayed under ""Revisions"" tab for Integration App(users who has Integration level admin access)`, async ({
    page,
    io
  }) => {
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH,'Amazon Connector(Bharath)');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByTextByIndex("Amazon Connector(Bharath)", 0);
    await io.homePage.loadingTime();
    const isRevisionsDisplayed = await io.flowBuilder.isVisible('text="Revisons"');
    await io.assert.expectToBeFalse(isRevisionsDisplayed, "Revisons Tab is displayed");
    await io.assert.checkElementState(selectors.integrationPagePO.CREATE_PULL,"isHidden");
  });
});
