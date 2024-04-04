import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C52776 Verify the Name, Store name and helptexts are displaying as expected for the basic auth along with the new infobar", () => {
  test("@Env-All C52776 Verify the Name, Store name and helptexts are displaying as expected for the basic auth along with the new infobar", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
      await io.homePage.goToMenu("Resources", "Connections");

      await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
      await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Shopify');
      await io.flowBuilder.clickByText("shopify")
      await io.flowBuilder.loadingTime()
      await io.assert.verifyElementText(selectors.connectionsPagePO.MUI_HTTP_AUTH_TYPE, 'Basic');
      await io.assert.verifyElementContainsText(selectors.basePagePO.NAME_ID, 'Name your connection');
      await io.assert.verifyElementContainsText(`${selectors.connectionsPagePO.HTTP_AUTH_TYPE_ID} label`, '*');
      await io.assert.verifyElementIsDisplayed(selectors.importPagePO.ADVANCED, 'Advance section not present');
      await io.assert.verifyElementIsDisplayed(`${selectors.connectionsPagePO.AUTH_BASIC_USERNAME} a`, "Can't find? not present for username");
      await io.assert.verifyElementIsDisplayed(`${selectors.connectionsPagePO.AUTH_BASIC_PASSWORD} a`, "Can't find? not present for password");
      await io.assert.verifyElementIsDisplayed(`${selectors.connectionsPagePO.STORE_NAME_ID} a`, "Can't find? not present for store name");
  });
});