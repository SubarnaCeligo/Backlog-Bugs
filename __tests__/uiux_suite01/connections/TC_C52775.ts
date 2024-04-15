import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C52775 Verify the Shopify connector is defaulting to the basic auth when we open the connection form`, () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      });
    test(`@Env-All C52775 Verify the Shopify connector is defaulting to the basic auth when we open the connection form`, async({io,page}) => {
  
        await io.homePage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL)
        await io.connectionPage.clickByText("Create connection")
        await io.connectionPage.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT)
        await io.connectionPage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Shopify');
        await io.flowBuilder.click("[data-test*='hopify']")
        await io.assert.verifyElementContainsText(selectors.connectionsPagePO.AUTH_TYPE,"OAuth 2.0")
        await io.assert.verifyElementIsDisplayed( "[for='http._httpConnectorVersionId']","API version")
        await io.assert.verifyElementIsDisplayed("[for='settings.storeName']","Store name")
    });
});