import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C25797_To verify the Preview label is displayed in the template tile_UI_Backlog", () => {
  test("C25797_To verify the Preview label is displayed in the template tile_UI_Backlog", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.MARKETPLACE)
    await io.homePage.goToMenu("Marketplace");
    await io.homePage.fill(selectors.homePagePO.SEARCH_MARKETPLACE, 'orderful-recharge new http template');
    // Validating preview dislayed
    await io.assert.verifyElementDisplayedByText('Preview', "Preview not visible")
  });
});