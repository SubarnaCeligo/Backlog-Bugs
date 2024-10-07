import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C29235_Salesforce_connection_type.", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T4547 @Env-All TC_C29235_Salesforce_connection_type", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.importPagePO.SALESFORCE_IMPORT);
    await io.homePage.loadingTime();
    test.step("*** clicked on Salesforce  adaptor ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "Salesforce_Connection");
    await io.homePage.loadingTime();
    test.step("*** Naming the Salesforce Connection  ***", async ()=>{});

    var results = await io.homePage.getTextFromElement(selectors.flowBuilderPagePO.CONCURRENCY_LEVEL, "Concurrency level");
    await io.assert.expectToBeTrue(results, "");
    test.step("*** Validation of 'Concurrency level' field  is displaying or not  ***", async ()=>{});
    
    var resk = await io.homePage.isVisible(selectors.importPagePO.CONCURRENCY_LEVEL_);
    await io.assert.expectToBeTrue(resk, "");
    test.step("*** Checking that the concurrency level is set to 5  is getting displayed or not ***", async ()=>{});

    test.step("*** Clicking on Close   ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
