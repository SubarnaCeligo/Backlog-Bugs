
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt, randomNumber } from "@celigo/aut-utilities";


test.describe("TC_C2454_Magento2_labelIn_allDropdowns", () => {
  test.beforeEach(async ({ io, page }, testInfo) => {
    await test.step("*** Beginning of Test Suite ***", () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("TC_C2454_Magento2_labelIn_allDropdowns", async ({ io, page }, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Connections");
    await test.step("*** clicked on connection button", () => { });
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await test.step("*** Clicked on create connection ***", () => { });

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTION_SEARCH, "Magento");
    await test.step("*** Searching for Magento adaptor ***", () => { });
    var heading1 = selectors.flowBuilderPagePO.APPLICATION
    await io.assert.expectToContainValue(heading1, "Magento 2", "");
    await test.step("*** Closing the create connection page ***", () => { });

    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    await test.step("*** Clicked on the imports in resources ***", () => { });
    await io.homePage.goToMenu("Resources", "Imports");
    await test.step("*** Clicked on create import ***", () => { });
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await test.step("*** Searching for Magento adaptor ***", () => { });

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTION_SEARCH, "Magento");
    var heading2 = selectors.flowBuilderPagePO.APPLICATION
    await io.assert.expectToContainValue(heading2, "Magento 2", "");
    await test.step("*** Closing the create import page ***", () => { });

    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();

    await test.step("*** Clicked on the exports in resources ***", () => { });
    await io.homePage.goToMenu("Resources", "Exports");
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await test.step("*** Clicked on create exports ***", () => { });

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTION_SEARCH, "Magento");
    await test.step("*** Searching for Magento adaptor ***", () => { });
    var heading3 = selectors.flowBuilderPagePO.APPLICATION
    await io.assert.expectToContainValue(heading3, "Magento 2", "");

    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await test.step("*** Closing the create exports page ***", () => { });
    await test.step("*** Verfied Magento adaptor is labeled Magento 2 in all dropdowns ***", () => { });

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
