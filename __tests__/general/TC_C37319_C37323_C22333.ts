
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";

test.describe("TC_C37319_C37323_C22333", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***",()=>{});
    await io.goToFlowsPage();
  });
  test("TC_C37319_C37323_C22333", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.basePagePO.HOME);
    await test.step("*** Click on home Page ***",()=>{});
    //Connections Tab
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    await test.step("*** clicked on connection button",()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await test.step("*** Click on create Connection ***",()=>{});
    var Conntop = await page.locator(
      selectors.importPagePO.OVERLAY_TOP
    ).getAttribute("style");
    if(Conntop.indexOf("hidden")) {
      await test.step("*** Connection overlay top is disabled ***",()=>{});
    }
    var Connbottom = await page.locator(
      selectors.importPagePO.OVERLAY_BOTTOM
    ).getAttribute("style");
    if(Connbottom.indexOf("hidden")) {
      await test.step("*** Connection overlay bottom is disabled ***",()=>{});
    }

    var Connleft = await page.locator(
      selectors.importPagePO.OVERLAY_LEFT
    ).getAttribute("style");
    if(Connleft.indexOf("hidden")) {
      await test.step("*** Connection overlay left is disabled ***",()=>{});
    }

    var Connright = await page.locator(
      selectors.importPagePO.OVERLAY_RIGHT
    ).getAttribute("style");
    if(Connright.indexOf("hidden")) {
      await test.step("*** Connection overlay right is disabled ***",()=>{});
    }

    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await test.step("*** Close Connection ***",()=>{});

    //Imports Tab
    await io.homePage.click(selectors.basePagePO.IMPORTS);
    await test.step("*** Clicked on Imports ***",()=>{});
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await test.step("*** Click on create Imports ***",()=>{});
    var Importtop = await page.locator(
      selectors.importPagePO.OVERLAY_TOP
    ).getAttribute("style");
    if(Importtop.indexOf("hidden")) {
      await test.step("*** Imports overlay top is disabled ***",()=>{});
    }
    var Importbottom = await page.locator(
      selectors.importPagePO.OVERLAY_BOTTOM
    ).getAttribute("style");
    if(Importbottom.indexOf("hidden")) {
      await test.step("*** Imports overlay bottom is disabled ***",()=>{});
    }

    var Importleft = await page.locator(
      selectors.importPagePO.OVERLAY_LEFT
    ).getAttribute("style");
    if(Importleft.indexOf("hidden")) {
      await test.step("*** Imports overlay left is disabled ***",()=>{});
    }

    var Importright = await page.locator(
      selectors.importPagePO.OVERLAY_RIGHT
    ).getAttribute("style");
    if(Importright.indexOf("hidden")) {
      await test.step("*** Import overlay right is disabled ***",()=>{});
    }

    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await test.step("*** Close Import ***",()=>{});

    //Exports Tab
    await io.homePage.click(selectors.basePagePO.EXPORTS);
    await test.step("*** Clicked on Exports ***",()=>{});
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await test.step("*** Click on create Exports ***",()=>{});
    var exporttop = await page.locator(
      selectors.importPagePO.OVERLAY_TOP
    ).getAttribute("style");
    if(exporttop.indexOf("hidden")) {
      await test.step("*** Exports overlay top is disabled ***",()=>{});
    }
    var Exportbottom = await page.locator(
      selectors.importPagePO.OVERLAY_BOTTOM
    ).getAttribute("style");
    if(Exportbottom.indexOf("hidden")) {
      await test.step("*** Exports overlay bottom is disabled ***",()=>{});
    }

    var Exportleft = await page.locator(
      selectors.importPagePO.OVERLAY_LEFT
    ).getAttribute("style");
    if(Exportleft.indexOf("hidden")) {
      await test.step("*** Exports overlay left is disabled ***",()=>{});
    }

    var Exportright = await page.locator(
      selectors.importPagePO.OVERLAY_RIGHT
    ).getAttribute("style");
    if(Exportright.indexOf("hidden")) {
      await test.step("*** Export overlay right is disabled ***",()=>{});
    }

    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await test.step("*** Close Export ***",()=>{});

    //TC_C22333
    await io.homePage.click(selectors.basePagePO.CONNECTIONS);
    await test.step("*** Clicked on Connection ***",()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "FTP");
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON, 0);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await test.step("*** Open Action Menu on Connection ***",()=>{});
    var res = selectors.flowBuilderPagePO.TRADINGPARTNER
    console.log("1.", res);
    await io.assert.expectToContainValue(res, "Mark as  trading partner", "");
    await test.step("*** Mark as  trading partner is exist in Action Menu ***",()=>{});
  });
});
