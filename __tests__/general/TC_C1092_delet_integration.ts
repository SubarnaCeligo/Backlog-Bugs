import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C1092_delet_integration", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T6800 @Env-All TC_C1092_delet_integration", async ({io,page}, testInfo) => {
    await io.homePage.clickCreateIntegrationButton();
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "TC_C33341");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime()
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
    const listView = await page.locator(selectors.homePagePO.LIST_VIEW);
    await listView.isVisible();
    await io.homePage.click(selectors.homePagePO.LIST_VIEW);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "TC_C33341");
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.homePagePO.LIST_VIEW);
    await io.homePage.loadingTime()
    test.step("*** clicking on the listview ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 0);
    test.step("*** clicking on the more option ***", async ()=>{});
    await io.homePage.click(selectors.homePagePO.DELETE_INTEGRATION);
    await io.homePage.click(selectors.basePagePO.DELETE);
    test.step("*** deleting the pinned integration ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Recycle bin");
    test.step("Clicked on recycle bin button", async ()=>{});
    await io.homePage.loadingTime();
    test.step("*** Navigate to recyclebin ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.fill(selectors.basePagePO.SEARCH_RECYCLEBIN, "TC_C33341");
    await io.homePage.loadingTime()
    await io.homePage.clickButtonByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 0);
    await io.homePage.loadingTime()
    test.step(" clicking option menu ***", async ()=>{});
    var purge = await page.locator(selectors.basePagePO.PURGE)[0];
    await io.homePage.clickButtonByIndex(selectors.basePagePO.PURGE, 0);
    test.step("*** clicking on the purge option  ***", async ()=>{});
    await io.homePage.loadingTime()
    var purge1 = await page.locator(selectors.basePagePO.CONFIRMPURGE);
    await purge1.click();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clearTextValue(selectors.basePagePO.SEARCH_RECYCLEBIN);
    await io.homePage.fill(selectors.basePagePO.SEARCH_RECYCLEBIN, "TC_C33341");
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** clicking on the purge option and deleting the integration from recyclebin ***", async ()=>{});
    let message = await (await page.$(".MuiBox-root > div > p")).textContent()
    let expMsg = "Your search didn’t return any matching results. Try expanding your search criteria.";
    await io.assert.expectToContainValue(expMsg, message, "");
    test.step("** Verified that inetgration is completely deleted test.afterEach deleting from recycle bin  **", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Naviating to Home Page ***", async ()=>{});
  });
});
