import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify the search results and app counts message with a search term that does not match with any IA or template.", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-QA @Epic-IO-51028 @Priority-P2 @Zephyr-IO-T31828 @Zephyr-IO-T31829 @Zephyr-IO-T31831 Verify the search results and app counts message with a search term that does not match with any IA or template", async ({ io, page }) => {

    //Go to Marketplace
    await io.homePage.click(selectors.basePagePO.MARKETPLACE);

    //Wait for page to load
    await io.marketplacePage.waitForElementAttached(selectors.marketplacePagePO.SEARCH_MARKETPLACE);
    await io.marketplacePage.fill(selectors.marketplacePagePO.SEARCH_MARKETPLACE, "xyzabcinvalidterm");
    await io.marketplacePage.loadingTime();

    //Get search results message
    let message = (await io.marketplacePage.getText(selectors.marketplacePagePO.SEARCH_RESULTS_MESSAGE)).toString();

    //Validate the message
    await io.assert.expectToContainValue("We could not find anything related to 'xyzabcinvalidterm'", message, '');

    await io.marketplacePage.addStep("Verify that 'you might be interested in' text is bold and readable");
    await io.assert.expectToContainValue("You might be interested in these popular integration apps and templates...", message, 'Invalid message');

    await io.marketplacePage.addStep("Verify the help message when when no application is found in the marketplace.");
    await io.assert.verifyElementDisplayedByText("Don't see your application? Integrate with thousands of apps easily using our universal connectors.", 'Invalid message');
   
    //Verify Hyperlink
    await io.assert.verifyElementAttribute(selectors.marketplacePagePO.MESSAGE_HYPERLINK, 'href', 'https://docs.celigo.com/hc/en-us/categories/5926399756187');
    
  });
});