import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("IO-T26357 Magento2 Token Proxy (TC_C109195)", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("IO-T26357 Magento2 Token Proxy (TC_C109195) @Env-All @Priority-P2", async ({ io, page }) => {
    await io.homePage.navigateTo(process.env["IO_Integration_URL"]);

    // Search for a flow
    await io.integrationPage.waitForElementAttached(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR
    );
    await io.integrationPage.fill(
      selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR,
      "Magento2 Token Proxy_DND"
    );

    //Wait for search to complete
    await io.integrationPage.waitForElementAttached(
      selectors.flowBuilderPagePO.ACTIONS_SELECTOR
    );

    //Open the flow
    await io.flowBuilder.clickByText("Magento2 Token Proxy_DND");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    await test.step("*** Enable and run the Flow *** ", async () => {
      await io.flowBuilder.saveandRunFlow("Magento2 Token Proxy_DND");
      await io.api.validateJobCountFromAPI("Magento2 Token Proxy_DND", {
        ignoreCount: "0",
        successCount: "2",
        errorCount: "0"
      });
    });
  });
});
