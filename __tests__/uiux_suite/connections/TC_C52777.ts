import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C52777 Verify the new info banner and links under the banner are navigating their respective pages as specified on the links", () => {
  test("C52777 Verify the new info banner and links under the banner are navigating their respective pages as specified on the links", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
      await io.homePage.goToMenu("Resources", "Connections");

      await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
      await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Shopify');
      await io.flowBuilder.click(selectors.connectionsPagePO.SHOPIFY_CONNECTION);
      await io.flowBuilder.click(selectors.connectionsPagePO.MUI_HTTP_AUTH_TYPE);
      await io.flowBuilder.click(selectors.connectionsPagePO.OAUTH);
      await io.assert.verifyElementText(`${selectors.connectionsPagePO.SHOPIFY_FORM_HEADER_LINK} ${selectors.loginPagePO.CLIENT_SNACKBAR}`, 'Shopify recommends creating connections directly from the Shopify App Store');
      await io.assert.verifyElementText(`${selectors.connectionsPagePO.SHOPIFY_HEADER_LINK} ${selectors.loginPagePO.CLIENT_SNACKBAR}`, 'Shopify requires creating OAuth 2.0 connections directly from the Shopify App Store');
      await io.assert.verifyElementAttribute(selectors.connectionsPagePO.VIEW_MARKETPLACE, 'href', 'https://apps.shopify.com/app92143');
      await io.assert.verifyElementAttribute('text="View instructions"', 'href', 'https://docs.celigo.com/hc/en-us/articles/360038755451');
  });
});
