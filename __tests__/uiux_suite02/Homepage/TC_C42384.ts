import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C42384_Verify Hover test , Button & confirmation dialog changes for Request demo on Integration app in Marketplace", () => {
  test("@Env-All @Zephyr-IO-T916 C42384_Verify Hover test , Button & confirmation dialog changes for Request demo on Integration app in Marketplace UI_Backlog", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.MARKETPLACE)
    await io.homePage.goToMenu("Marketplace");
    await io.flowBuilder.loadingTime();
    let hoverButton = await page.locator(selectors.marketplacePagePO.CONTACTLESS_REQUEST_DEMO).first();
    hoverButton.hover();
    // Validating text showing correctly
    await io.assert.verifyElementDisplayedByText('Have a solutions consultant contact me to demonstrate how this Integration App will automate my business processes.', "Not showing correctly")

  });
});