import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify the search results and app counts message with a search term that matches only IAs.", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-QA @Epic-IO-51028 @Priority-P2 @Zephyr-IO-T31826 Verify the search results and app counts message with a search term that matches only IAs.", async ({ io, page }) => {

    //Go to Marketplace
    await io.homePage.click(selectors.basePagePO.MARKETPLACE);

    //Wait for page to load
    await io.marketplacePage.waitForElementAttached(selectors.marketplacePagePO.SEARCH_MARKETPLACE);
    
    //Filter by IAs
    await io.marketplacePage.clickByText("By type");

    await io.marketplacePage.waitForElementAttached(selectors.marketplacePagePO.INTEGRATION_APPS);
    await io.marketplacePage.click(selectors.marketplacePagePO.INTEGRATION_APPS);

    //Search
    await io.marketplacePage.fill(selectors.marketplacePagePO.SEARCH_MARKETPLACE, "IO-56360_DND");
    await io.marketplacePage.loadingTime();

    //Get search results message
    let message = (await io.marketplacePage.getText(selectors.marketplacePagePO.SEARCH_RESULTS_MESSAGE)).toString();

    //Validate the message
    await io.assert.expectToContainValue('integration app(s)', message, '');
    await io.assert.expectNotToContainValue("Search results for 'IO-56360_DND'", message, '');
     
  });
});