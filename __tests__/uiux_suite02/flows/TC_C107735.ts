import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C107735`, () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
});
  test(`@Env-All @Zephyr-IO-T24122 C107735 check for Error tag can be deleted`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
    await io.integrationPage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.integrationPage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Flow_With_Errors_DND');
    await io.integrationPage.delay(2000); // wait for the search to complete
    //Open the flow
    await io.flowBuilder.clickByText('Flow_With_Errors_DND');
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
    await io.flowBuilder.hover(selectors.flowBuilderPagePO.ERROR_TAG, 2, true);
    await page.locator(selectors.flowBuilderPagePO.ERROR_TAG).nth(2).click();
    await io.flowBuilder.fill(selectors.flowBuilderPagePO.ERROR_TAG_PLACEHOLDER, "107735C");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CREATE_ERROR_TAG);
    await page.locator(selectors.flowBuilderPagePO.DELETE_ERROR_TAG).first().click();
    await io.flowBuilder.click(selectors.basePagePO.DELETE);
    await expect(page.getByText("107735C")).not.toBeVisible();
  });
});