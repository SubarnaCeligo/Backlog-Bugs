
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C61346.json";

test.describe("TC_C61346", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({io,page}, testInfo) => {
    //*Create Deleted Connection
    test.step("*** Deleting Connection ***", async ()=>{});
    await io.connections.deleteConnection( HTTP.apiJSON.name);
  });
  test("TC_C61346 Unable to click on connection created through API/Postman @Env-All @Zephyr-IO-T7865", async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test ***", async ()=>{});
    await io.connections.createConnectionViaAPI(  HTTP.apiJSON);

    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.RESOURCES);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "Http Zendesk_C61346");
    await io.homePage.loadingTime();
    await io.homePage.clickButtonBasedOnLabelName(selectors.flowBuilderPagePO.CLICKONCONNECTION, "Http Zendesk_C61346");
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("clicked on connection test.afterEach saving", async ()=>{});
    var data = await io.homePage.isVisible(selectors.basePagePO.TEST_CONNECTION);
    await io.assert.expectToBeTrue(data, "");
    test.step("*** Verifying User is able to click on that connection. ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    test.step("*** Clicking on Save and Close ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigate to Home Page ***", async ()=>{});
  });
});
