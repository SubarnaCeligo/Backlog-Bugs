import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C52775 Verify the Shopify connector is defaulting to the basic auth when we open the connection form`, () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      });
    test(`C52775 Verify the Shopify connector is defaulting to the basic auth when we open the connection form`, async({io,page}) => {
  
        await io.homePage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL)
        await io.homePage.loadingTime()
        await io.connectionPage.clickByText("Create connection")
        await io.homePage.loadingTime()
        await io.connectionPage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'shopify');
        await io.connectionPage.click("[data-test='shopify']")
        await io.homePage.loadingTime()
        await io.assert.verifyElementContainsText(selectors.connectionsPagePO.AUTH_TYPE,"Basic")
        await io.assert.verifyElementIsDisplayed( selectors.connectionsPagePO.VERSION_TYPE,"API version")
        await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.STORE_NAME,"Store name")
    });
});