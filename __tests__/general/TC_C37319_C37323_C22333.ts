import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C37319_C37323_C22333", () => {
  test.beforeEach(async ({ io, page }, testInfo) => {
    await test.step("*** Beginning of Test Suite ***", () => { });
    await io.goToFlowsPage();
  });
  test("@Zephyr-IO-T2326 @Zephyr-IO-T2333 @zephyr-IO-T2337 @Env-All  TC_C37319_C37323_C22333", async ({ io, page }, testInfo) => {
    await io.homePage.click(selectors.basePagePO.HOME);
    await test.step("*** Click on home Page ***", () => { });
    //Connections Tab
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Connections");
    await io.homePage.loadingTime();
    await test.step("*** clicked on connection button", () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await test.step("*** Click on create Connection ***", () => { });
    var ConnOverlay = await page.locator(
      '.MuiModal-backdrop'
    ).getAttribute("style");
    if (ConnOverlay.indexOf("opacity: 1;")) {
      await test.step("*** Connection overlay top is disabled ***", () => { });
    }
    

    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await test.step("*** Close Connection ***", () => { });

    //Imports Tab
    await io.homePage.click(selectors.basePagePO.IMPORTS);
    await io.homePage.loadingTime();
    await test.step("*** Clicked on Imports ***", () => { });
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await test.step("*** Click on create Imports ***", () => { });
    var importOverlay = await page.locator(
      '.MuiModal-backdrop'
    ).getAttribute("style");
    if (importOverlay.indexOf("opacity: 1;")) {
      await test.step("*** import overlay top is disabled ***", () => { });
    }

    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await test.step("*** Close Import ***", () => { });

    //Exports Tab
    await io.homePage.click(selectors.basePagePO.EXPORTS);
    await test.step("*** Clicked on Exports ***", () => { });
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await test.step("*** Click on create Exports ***", () => { });
    var eportOverlay = await page.locator(
      '.MuiModal-backdrop'
    ).getAttribute("style");
    if (eportOverlay.indexOf("opacity: 1;")) {
      await test.step("*** import overlay top is disabled ***", () => { });
    }

    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);

    await test.step("*** Close Export ***", () => { });

    //TC_C22333
    await io.homePage.goToMenu("Resources", "Connections");
    await io.homePage.loadingTime();
    await test.step("*** Clicked on Connection ***", () => { });
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "FTP");
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON, 0);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await test.step("*** Open Action Menu on Connection ***", () => { });
    const res = await io.homePage.getText(selectors.flowBuilderPagePO.TRADINGPARTNER);
    await io.assert.expectToContainValue(res.toString(), "Mark as trading partner", "");
    await test.step("*** Mark as  trading partner is exist in Action Menu ***", () => { });
  });
});
