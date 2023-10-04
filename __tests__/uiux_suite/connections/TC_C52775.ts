import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C52775 Verify the Shopify connector is defaulting to the basic auth when we open the connection form`, () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      });
    test(`C52775 Verify the Shopify connector is defaulting to the basic auth when we open the connection form`, async({io,page}) => {
  
        await io.homePage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL)
        await io.connectionPage.clickByText("Create connection")
        await io.connectionPage.click(selectors.connectionsPagePO.SHOPIFY_CONNECTION)
        await io.assert.verifyElementContainsText('[data-test="http.auth.type"] div[role="button"]',"Basic")
        await io.assert.verifyElementIsDisplayed('[for="http.unencrypted.version"]',"API version")
        await io.assert.verifyElementIsDisplayed('[for="http.storeName"]',"Store name")
    });
});