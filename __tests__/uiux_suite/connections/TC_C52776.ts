import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C52776 Verify the Name, Store name and helptexts are displaying as expected for the basic auth along with the new infobar", () => {
  test("C52776 Verify the Name, Store name and helptexts are displaying as expected for the basic auth along with the new infobar", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
      await io.homePage.goToMenu("Resources", "Connections");

      await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
      await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Shopify');
      await io.flowBuilder.click('[data-test="Shopify"]');
      await io.assert.verifyElementText('[id="mui-component-select-/http/auth/type"]', 'Basic');
      await io.assert.verifyElementContainsText('#name', 'Name your connection');
      await io.assert.verifyElementContainsText('[id="http.auth.type"] label', '*');
      await io.assert.verifyElementIsDisplayed('[data-test="Advanced"]', 'Advance section not present');
      await io.assert.verifyElementIsDisplayed('[id="http.auth.basic.username"] a', "Can't find? not present for username");
      await io.assert.verifyElementIsDisplayed('[id="http.auth.basic.password"] a', "Can't find? not present for password");
      await io.assert.verifyElementIsDisplayed('[id="http.storeName"] a', "Can't find? not present for store name");
  });
});