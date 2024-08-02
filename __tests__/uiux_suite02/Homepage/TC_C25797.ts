import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C25797_To verify the Preview label is displayed in the template tile", () => {
  test("@Env-All @Zephyr-IO-T2179 C25797_To verify the Preview label is displayed in the template tile UI_Backlog", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.MARKETPLACE)
    await io.homePage.goToMenu("Marketplace");
    await io.homePage.fill(selectors.homePagePO.SEARCH_MARKETPLACE, 'Orderful - NetSuite');
    // Validating preview dislayed
    await io.homePage.loadingTime()
    await io.homePage.waitForElementAttached(selectors.homePagePO.INSTALL_TEMPLATE)
    let preview = await page.locator(selectors.homePagePO.INSTALL_TEMPLATE).first()
    await io.assert.expectToContainValue( "Preview",await preview.textContent(), "Preview Button not visisble")
  });
});