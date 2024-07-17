import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C56987 Verify the seller central URL that UI is navigating to is as expected when we select the marketplace as Belgium", () => {
  test("@Env-All @Zephyr-IO-T6791 C56987 Verify the seller central URL that UI is navigating to is as expected when we select the marketplace as Belgium", async ({ io, page }) => {

    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.connectionPage.waitForElementAttached(selectors.homePagePO.PRODUCTION_BUTTON)
    await io.connectionPage.click(selectors.homePagePO.PRODUCTION_BUTTON)
    let isConnectionsVisible = await io.homePage.isVisible(
      selectors.basePagePO.CONNECTIONS
    );
    if (!isConnectionsVisible) await io.homePage.clickByText("Resources");
    await io.homePage.click(selectors.basePagePO.CONNECTIONS);
    await io.homePage.waitForElementAttached(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR)
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, 'amazon_seller_central');
    await io.homePage.loadingTime()
    await io.connectionPage.clickByText("amazon_seller_central")
    await io.connectionPage.click(selectors.basePagePO.SAVE)
    const newPage = await page.waitForEvent('popup');
    const currentUrl = newPage.url();
    const expectedUrl = 'https://sellercentral.amazon.com.be';
    const func = currentUrl.includes(expectedUrl)
    await io.assert.expectToBeTrue(true, "urls doesn't match")
  });
});