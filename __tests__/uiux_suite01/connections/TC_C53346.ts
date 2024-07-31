import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C53346 Verify Base URI is not present in Shopify Edit Connection page", () => {
  test("@Env-All @Zephyr-IO-T16954 C53346 Verify Base URI is not present in Shopify Edit Connection page", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
    await io.connectionPage.waitForElementAttached(selectors.homePagePO.PRODUCTION_BUTTON)
    await io.connectionPage.click(selectors.homePagePO.PRODUCTION_BUTTON)
    let isConnectionsVisible = await io.homePage.isVisible(
      selectors.basePagePO.CONNECTIONS
    );
    if (!isConnectionsVisible) await io.homePage.clickByText("Resources");
    await io.homePage.click(selectors.basePagePO.CONNECTIONS);
    await io.homePage.waitForElementAttached(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR)
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR,"SHOPIFY CONNECTION")
    await io.connectionPage.clickByText("SHOPIFY CONNECTION");
    await expect(page.getByText("Base URI")).not.toBeVisible();
  });
});
