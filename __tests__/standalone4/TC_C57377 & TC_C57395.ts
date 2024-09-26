import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Create Flow While Creating Integration", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({ io, page }, testInfo) => {
    test.step("*** End of Test Suite ***", async () => { });
    const tiles = await io.api.getCall("v1/tiles");
    if (!tiles) {
      return;
    }
    for (let tile of tiles) {
      if (tile.name.includes("TC_C57377") || tile.name.includes("TC_C57395")) {
        await io.api.deleteCall(`v1/integrations/${tile._integrationId}`);
      }
    }
  });
  test("TC_C57377_Validate the message appears on Integration screen test.afterEach creating an Integration. @Env-All @Zephyr-IO-T15065", async ({ io, page }, testInfo) => {
    await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
    await io.homePage.loadingTime();
    test.step("*** Clicked on Production Env. ***", async ()=>{});
    await io.homePage.clickCreateIntegrationButton();
    test.step("*** Clicked on CreateIntegrationButton ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "TC_C57377");
    test.step("*** Entered Flow Name ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicked on Save And Close button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.assert.verifyElementDisplayedByText("You don’t have any flows yet", "");
    test.step("*** {'You don’t have any flows yet'} MESSAGE IS PRESENT ***", async ()=>{});
  });
  test("TC_C57395_Validate the Search box present on Integration screen test.afterEach creating an Integration .(Negative). @Env-All @Zephyr-IO-T15066", async ({ io, page }, testInfo) => {
    await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
    test.step("*** Clicked on Production Env. ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.clickCreateIntegrationButton();
    test.step("*** Clicked on CreateIntegrationButton ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "TC_C57395");
    test.step("*** Entered Flow Name ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicked on Save And Close button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fill(selectors.basePagePO.SEARCH_RECYCLEBIN, "xyz");
    test.step("*** Clicked on Search box and provided a flow name which is not present in that particular page ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.assert.verifyElementDisplayedByText("Your search didn’t return any matching results. Try expanding your search criteria.", "");
    test.step("*** {'Your search didn’t return any matching results. Try expanding your search criteria.'} MESSAGE IS PRESENT ***", async ()=>{});
    
  });
  
});
