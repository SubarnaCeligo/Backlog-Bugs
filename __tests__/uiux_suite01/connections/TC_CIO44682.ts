import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Netsuiteversions", () => {
  test("@Env-All Netsuiteversions", async ({io, page}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.waitForElementAttached(selectors.basePagePO.RESOURCES);
      await io.homePage.goToMenu("Resources", "Connections");
      await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
      await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Netsuite');
      await io.flowBuilder.click(selectors.connectionsPagePO.NETSUITE_CONNECTION);
      await io.flowBuilder.click(selectors.connectionsPagePO.WSDLVERSION);
      await io.assert.verifyElementContainsText(selectors.connectionsPagePO.VERSION2023,'2023.1');
      await io.assert.expectNotToBeValue(selectors.connectionsPagePO.VERSION2016, "", "Version 2016.2 is not displayed");

  });
});