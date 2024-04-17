import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C52776 Verify the Name, Store name and helptexts are displaying as expected for the basic auth along with the new infobar", () => {
  test("@Env-All @Zephyr-IO-T1121 C52776 Verify the Name, Store name and helptexts are displaying as expected for the basic auth along with the new infobar", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Shopify');
    await io.flowBuilder.click("[data-test*='hopify']")
    await io.flowBuilder.loadingTime()
    await io.assert.verifyElementText(selectors.connectionsPagePO.MUI_HTTP_AUTH_TYPE, 'OAuth 2.0');
    await io.flowBuilder.click(selectors.connectionsPagePO.MUI_HTTP_AUTH_TYPE)
    await io.flowBuilder.clickByText("Basic")
    await io.flowBuilder.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH)
    await io.assert.verifyElementContainsText(selectors.basePagePO.NAME_ID, 'Name');
    await io.assert.verifyElementContainsText(`${selectors.connectionsPagePO.HTTP_AUTH_TYPE_ID} label`, '*');
    await io.assert.verifyElementIsDisplayed(selectors.importPagePO.ADVANCED, 'Advance section not present');
    await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.AUTH_BASIC_USERNAME, "Can't find? not present for username");
    await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.AUTH_BASIC_PASSWORD, "Can't find? not present for password");
    await io.assert.verifyElementIsDisplayed("label[for='settings.storeName']", "Can't find? not present for store name");
  });
});