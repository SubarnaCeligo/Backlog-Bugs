import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify the search results and app counts message with a search term that matches both IAs and templates", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Epic-IO-51028 @Priority-P2 @Zephyr-IO-T31825 Verify the search results and app counts message with a search term that matches both IAs and templates", async ({ io, page }) => {

    //Go to Marketplace
    await io.homePage.click(selectors.basePagePO.MARKETPLACE);

    //Wait for page to load
    await io.marketplacePage.waitForElementAttached(selectors.marketplacePagePO.SEARCH_MARKETPLACE);
    await io.marketplacePage.fill(selectors.marketplacePagePO.SEARCH_MARKETPLACE, "http");
    await io.marketplacePage.loadingTime();

    //Get search results message
    let message = (await io.marketplacePage.getText(selectors.marketplacePagePO.SEARCH_RESULTS_MESSAGE)).toString();

    //Validate the message
    await io.assert.expectToContainValue('integration app(s) and template(s)', message, '');
    await io.assert.expectNotToContainValue("Search results for 'http'", message, '');
    

  });
});