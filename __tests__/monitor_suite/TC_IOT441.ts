import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_IOT441 To verify create pull button is not displayed under ""Revisions"" tab for Integration App(users who has Integration level monitor access)`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test(`@Zephyr-IO-T441 @Env-All C41560 To verify create pull button is not displayed under ""Revisions"" tab for Integration App(users who has Integration level monitor access)`, async ({
    page,
    io
  }) => {
    await io.flowBuilder.clickByTextByIndex("Amazon Connector(Bharath)", 0);
    await io.homePage.addStep("*** Clicked on Integration App  ***")
    await io.homePage.loadingTime();

    const isRevisionsDisplayed = await page.locator('text="Revisons"').isVisible();
    expect(isRevisionsDisplayed).toBeFalsy();
    await io.homePage.addStep("*** Checking if Revision Tab is not displayed  ***")

    const isCreatePullVisible= await page.locator(selectors.integrationPagePO.CREATE_PULL).isVisible()
    expect(isCreatePullVisible).toBeFalsy();
    await io.homePage.addStep("*** Checking Create Pull button is not displayed  ***")
  });
});
