
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C27981_Edit_connection_HTTP.json";

test.describe("TC_C27981_Edit_connection_HTTP", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({io,page}, testInfo) => {
    //*Create Deleted Connection
    test.step("*** Deleting Connection ***", async ()=>{});
    await io.connections.deleteConnection( "Connection_Custom_Setting");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T4496 @Env-All TC_C27981 Verify valid JSON is saved in custom settings for HTTP Connection", async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test ***", async ()=>{});
    await io.connections.createConnectionViaAPI(HTTP.apiJSON);
    await io.homePage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.SEARCHBUTTON, "Connection_Custom_Setting");
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();

    await io.homePage.clickByTextByIndex("Connection_Custom_Setting", 0);
    await io.homePage.click(selectors.connectionsPagePO.AUTH_TYPE);

    await io.homePage.click(selectors.connectionsPagePO.CUSTOM);
    test.step("clicked on connection test.afterEach saving", async ()=>{});
    
    test.step("clicked on custom setting", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.ENCRYPTED_ID, '{"name":"Celigo"}');

    await io.homePage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    test.step("*** Clicking on the Auth  type dropdown   ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.BASIC);
    test.step("*** Selecting the Basic  from the dropdown  ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.BASICUSERNAME, 'test');
    test.step("*** Naming the Username  Field   ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.PASSWORD, 'test');
    test.step("*** Naming the Password Field   ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.TEST_CONNECTION);
    test.step("*** Clicking on Test Connection  ***", async ()=>{});
    await io.homePage.loadingTime();

    var result = await io.homePage.getTextFromElement(selectors.basePagePO.NOTIFICTION_BAR, "Your connection is working great! Nice Job!");

    await io.assert.expectToBeTrue(result, "");
  });
});
