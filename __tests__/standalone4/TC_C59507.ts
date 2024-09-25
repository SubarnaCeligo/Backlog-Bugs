
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C59507", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C59507 @Env-All @Zephyr-IO-T2340", async ({ io, page }, testInfo) => {
    //Connections Tab
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** Click on Create Connectios ***", async ()=>{});
    await io.homePage.isPageReady();
    var URL = await io.homePage.getCurrentUrl();
    let newID = URL.split("/").at(-1);
    await io.assert.expectToContainValue("new-",newID, "");

    let newLen = URL.split("new-").at(-1);
    let idLength = newLen.length;
    await expect(idLength).toEqual(11);
    test.step("*** Verified User should see 11-digit char id in the URL which starts with 'new-' in the URL while creating connections ***", async ()=>{});

    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    test.step("*** Clicked on Close ***", async ()=>{});

    //Import
    await io.homePage.goToMenu("Resources", "Imports");
    test.step("*** Click on Import ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** Click on Create Import ***", async ()=>{});
    await io.homePage.isPageReady();
    var URL1 = await io.homePage.getCurrentUrl();
    let newID1 = URL1.split("/").at(-1);
    await io.assert.expectToContainValue("new-",newID1, "");

    let newLen1 = URL1.split("new-").at(-1);
    let idLength1 = newLen1.length;
    await expect(idLength1).toEqual(11);
    test.step("*** Verified User should see 11-digit char id in the URL which starts with 'new-' in the URL while creating import ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    test.step("*** Clicked on Close ***", async ()=>{});

    //Exports
    await io.homePage.isPageReady();
    await io.homePage.goToMenu("Resources", "Exports");
    test.step("*** Click on Exports ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** Click on Create Exports ***", async ()=>{});
    await io.homePage.isPageReady();
    var URL2 = await io.homePage.getCurrentUrl();
    let newID2 = URL2.split("/").at(-1);
    await io.assert.expectToContainValue("new-",newID2, "");

    let newLen2 = URL2.split("new-").at(-1);
    let idLength2 = newLen2.length;
    await expect(idLength2).toEqual(11);
    test.step("*** Verified User should see 11-digit char id in the URL which starts with 'new-' in the URL while creating Export ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    test.step("*** Clicked on Close ***", async ()=>{});

    //Agents
    await io.homePage.isPageReady();
    await io.homePage.goToMenu("Resources", "Agents");
    test.step("*** Click on Agents ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** Click on Create Agents ***", async ()=>{});
    await io.homePage.isPageReady();
    var URL3 = await io.homePage.getCurrentUrl();
    let newID3 = URL3.split("/").at(-1);
    await io.assert.expectToContainValue("new-",newID3, "");

    let newLen3 = URL3.split("new-").at(-1);
    let idLength3 = newLen3.length;
    await expect(idLength3).toEqual(11);
    test.step("*** Verified User should see 11-digit char id in the URL which starts with 'new-' in the URL while creating Agents ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    test.step("*** Clicked on Close ***", async ()=>{});

    //IClients
    await io.homePage.isPageReady();
    await io.homePage.goToMenu("Resources", "iClients");
    test.step("*** Click on IClients ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** Click on Create IClients ***", async ()=>{});
    await io.homePage.isPageReady();
    var URL4 = await io.homePage.getCurrentUrl();
    let newID4 = URL4.split("/").at(-1);
    await io.assert.expectToContainValue("new-",newID4, "");

    let newLen4 = URL4.split("new-").at(-1);
    let idLength4 = newLen4.length;
    await expect(idLength4).toEqual(11);
    test.step("*** Verified User should see 11-digit char id in the URL which starts with 'new-' in the URL while creating iClients ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    test.step("*** Clicked on Close ***", async ()=>{});

    //Api Tokens
    await io.homePage.isPageReady();
    await io.homePage.goToMenu("Resources","API tokens");
    test.step("*** Click on Exports ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.CREATEAPITOKEN);
    test.step("*** Click on Create Api Token ***", async ()=>{});
    await io.homePage.isPageReady();
    var URL5 = await io.homePage.getCurrentUrl();
    let newID5 = URL5.split("/").at(-1);
    await io.assert.expectToContainValue("new-",newID5, "");

    let newLen5 = URL5.split("new-").at(-1);
    let idLength5 = newLen5.length;
    await expect(idLength5).toEqual(11);
    test.step("*** Verified User should see 11-digit char id in the URL which starts with 'new-' in the URL while creating Api Token ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    test.step("*** Clicked on Close ***", async ()=>{});

    // Stacks
    await io.homePage.isPageReady();
    await io.homePage.goToMenu("Resources", "Stacks");
    test.step("*** Click on Stacks ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** Click on Create Stacks ***", async ()=>{});
    await io.homePage.isPageReady();
    var URL6 = await io.homePage.getCurrentUrl();
    let newID6 = URL6.split("/").at(-1);
    await io.assert.expectToContainValue("new-",newID6, "");

    let newLen6 = URL6.split("new-").at(-1);
    let idLength6 = newLen6.length;
    await expect(idLength6).toEqual(11);
    test.step("*** Verified User should see 11-digit char id in the URL which starts with 'new-' in the URL while creating Stacks ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    test.step("*** Clicked on Close ***", async ()=>{});

    // My APIs
    await io.homePage.isPageReady();
    await io.homePage.goToMenu("Resources", "My APIs");
    test.step("*** Click on My APIs ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** Click on Create My APIs ***", async ()=>{});
    await io.homePage.isPageReady();
    var URL7 = await io.homePage.getCurrentUrl();
    let newID7 = URL7.split("/").at(-1);
    await io.assert.expectToContainValue("new-",newID7, "");

    let newLen7 = URL7.split("new-").at(-1);
    let idLength7 = newLen7.length;
    await expect(idLength7).toEqual(11);
    test.step("*** Verified User should see 11-digit char id in the URL which starts with 'new-' in the URL while creating My APIs ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    test.step("*** Clicked on Close ***", async ()=>{});

    //Flow Builder
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Tools","Flow builder");
    test.step("Clicked on Dev playground button", async ()=>{});
    await io.homePage.loadingTime();
    var URL8 = await io.homePage.getCurrentUrl();
    let newID8 = URL8.split("/").at(-1);
    await io.assert.expectToContainValue("new-",newID8, "");

    let newLen8 = URL8.split("new-").at(-1);
    let idLength8 = newLen8.length;
    await expect(idLength8).toEqual(11);
    test.step("*** Verified User should see 11-digit char id in the URL which starts with 'new-' in the URL on Flow builder Page ***", async ()=>{});

    // Data loader
    await io.homePage.isPageReady();
    await io.homePage.goToMenu("Tools","Data loader");
    test.step("*** Click on Data loader ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var URL9 = await io.homePage.getCurrentUrl();
    let newID9 = URL9.split("/").at(-1);
    await io.assert.expectToContainValue("new-",newID9, "");

    let newLen9 = URL9.split("new-").at(-1);
    let idLength9 = newLen9.length;
    await expect(idLength9).toEqual(11);
    test.step("*** Verified User should see 11-digit char id in the URL which starts with 'new-' in the URL On Data loader Page ***", async ()=>{});

    // Reports
    await io.homePage.isPageReady();
    await io.homePage.goToMenu("Tools","Reports");
    test.step("*** Click on Reports ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** Click on Run Reports ***", async ()=>{});
    await io.homePage.isPageReady();
    var URL10 = await io.homePage.getCurrentUrl();
    let newID10 = URL10.split("/").at(-1);
    await io.assert.expectToContainValue("new-",newID10, "");

    let newLen10 = URL10.split("new-").at(-1);
    let idLength10 = newLen10.length;
    await expect(idLength10).toEqual(11);
    test.step("*** Verified User should see 11-digit char id in the URL which starts with 'new-' in the URL On Run Reports Page ***", async ()=>{});

    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    test.step("*** Clicked on Close ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step(" Navigating to Home Page ", async ()=>{});
  });
});
