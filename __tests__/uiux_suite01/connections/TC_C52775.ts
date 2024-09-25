import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C52775 Verify the Shopify connector is defaulting to the basic auth when we open the connection form`, () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      });
    test(`@Env-All @Zephyr-IO-T1120 C52775 Verify the Shopify connector is defaulting to the basic auth when we open the connection form`, async({io,page}) => {
        await io.homePage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL)
        await io.connectionPage.clickByText("Create connection")
        await io.connectionPage.waitForElementAttached(selectors.settingsPagePO.APP_NAME_INPUT)
        await io.connectionPage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Shopify');
        await io.flowBuilder.click(selectors.connectionsPagePO.SHOPIFY_CONNECTION_1)
        await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.AUTH_TYPE)
        await io.assert.verifyElementContainsText(selectors.connectionsPagePO.AUTH_TYPE,"Basic")
        await io.assert.verifyElementIsDisplayed("[data-test='http.unencrypted.version']","API version")
        await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.STORE_NAME,"Store name")
    });
});