import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify the help message when an application name is searched for which we have a prebuilt connector but we don’t have any marketplace templates or apps.", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Epic-IO-51028 @Priority-P2 @Zephyr-IO-T31830 Verify the help message when an application name is searched for which we have a prebuilt connector but we don’t have any marketplace templates or apps.", async ({ io, page }) => {

    //Go to Marketplace
    await io.homePage.click(selectors.basePagePO.MARKETPLACE);

    //Wait for page to load
    await io.marketplacePage.waitForElementAttached(selectors.marketplacePagePO.SEARCH_MARKETPLACE);
    await io.marketplacePage.fill(selectors.marketplacePagePO.SEARCH_MARKETPLACE, "adobe");
    await io.marketplacePage.loadingTime();

    //Get search results message
    let message = (await io.marketplacePage.getText(selectors.marketplacePagePO.SEARCH_RESULTS_MESSAGE)).toString();

    //Validate the message
    await io.assert.expectToContainValue("We could not find anything related to 'adobe'", message, '');
    await io.assert.verifyElementDisplayedByText("Don't see integration apps and templates related to adobe ? Integrate with our prebuilt connector(s).", 'Invalid message');
   
    //Verify Hyperlink
    await io.assert.verifyElementAttribute(selectors.marketplacePagePO.MESSAGE_HYPERLINK, 'href', 'https://docs.celigo.com/hc/en-us/articles/226974368-Create-a-connection-to-an-application');
    
  });
});