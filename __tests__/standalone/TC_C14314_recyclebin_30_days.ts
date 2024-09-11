import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C14314_recyclebin_30_days", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  
  test("@Env-All @Zephyr-IO-T6801 TC_C14314_recyclebin_30_days", async ({io,page}, testInfo) => {
    await io.homePage.clickCreateIntegrationButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "TC_C33341");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.click(selectors.homePagePO.LIST_VIEW);
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C33341");
    await io.homePage.loadingTime();
    // await io.homePage.click(selectors.homePagePO.LIST_VIEW);
    test.step("*** clicking on the listview ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 0);
    test.step("*** clicking on the more option ***", async ()=>{});
    
    await io.homePage.click(selectors.homePagePO.DELETE_INTEGRATION);
    await io.homePage.click(selectors.basePagePO.DELETE);
    await page.waitForTimeout(8000);
    await io.homePage.loadingTime();
    test.step("*** deleting the pinned integration ***", async ()=>{});
    
    await io.homePage.goToMenu("Resources","Recycle bin");
    test.step("Clicked on recycle bin button", async ()=>{});
    
    await io.homePage.loadingTime();
    test.step("*** Navigate to recyclebin ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.click(selectors.flowBuilderPagePO.SEARCHBUTTON);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON,"TC_C33341");
    await io.homePage.loadingTime();

    await page.waitForTimeout(2000);
    await io.homePage.loadingTime();
    test.step(" clicking on the deleted date column ***", async ()=>{});

    const autopurge2 = await io.homePage.getText(await io.homePage.getCellLocator(1, 4, "", null, ""))
    await io.assert.expectToContainValue("30 days",String(autopurge2), "");
    test.step(" Verified Last updated Autopurge coulumn are near to 30 days ***", async ()=>{});
    
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Naviating to Home Page ***", async ()=>{});
  });
});
