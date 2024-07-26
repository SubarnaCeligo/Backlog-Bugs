import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_IO-T7209 Verify dropdowns in different browsers`, () => {
  test(`@Zephyr-IO-T7209 @Env-All C24489 Verify dropdowns in different browsers`, async ({
    io,
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.flowBuilder.waitForElementAttached(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR
    );
    await io.homePage.fill(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
      "Tags 1000 errors- Mysql to mysql flow5_DND"
    );
    await io.flowBuilder.loadingTime();
    await io.homePage.clickByText("Tags 1000 errors- Mysql to mysql flow5_DND");
    await io.flowBuilder.loadingTime();
    await io.homePage.clickByText("Mysql to mysql flow_DND");

    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS
    );
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS
    );
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RESOLVE_JOBS);
    await io.assert.verifyElementDisplayedByText(
      "1000 errors",
      "Error not available"
    );
    
    await io.homePage.reloadPage();
    
    await io.flowBuilder.waitForElementAttached(
      selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN
    );
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN
    );
    await io.assert.verifyElementDisplayedByText(
      "1000 retriable errors",
      "Error not available"
    );
  });
});
