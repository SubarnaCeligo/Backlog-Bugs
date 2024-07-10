import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-Shriti S Verify icon and color change for “How to jump start integrations with templates and apps”", () => {
  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Epic-IO-51028 @Priority-P2 @Zephyr-IO-T31832 Verify icon and color change for “How to jump start integrations with templates and apps”", async ({ io, page }) => {

    //Go to Marketplace
    await io.homePage.click(selectors.basePagePO.MARKETPLACE);

    //Wait for page to load
    await io.marketplacePage.waitForElementAttached(selectors.marketplacePagePO.SEARCH_MARKETPLACE);

    //Verify icon
    let isIconVisible = await io.marketplacePage.isVisible(selectors.marketplacePagePO.MARKETPLACE_DOC_ICON);
    await io.assert.expectToBeTrue(isIconVisible, 'Icon is not visible');

    //Verify hyperlink
    await io.assert.verifyElementAttribute(selectors.marketplacePagePO.MARKETPLACE_DOC_LINK, 'href', 'https://docs.celigo.com/hc/en-us/articles/4403702343195-Jump-start-integrations-with-templates-and-apps');

    
  });
});