
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C27782", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({io,page}, testInfo) => {
    //*Delete created Connection
    test.step("*** Deleting Connection ***", async ()=>{});
    await io.connections.deleteConnection( "HTTP_Connection_Digest");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T4490 @Env-All TC_C27782 Verify Trying to create SOAP connection using Digest authorization method", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();

    const httpMethod = await page.$(selectors.basePagePO.HTTP_2DOT0);
    if (httpMethod) {
      await io.homePage.click(selectors.basePagePO.HTTP_2DOT0); 
    }
    await io.homePage.loadingTime();
    test.step("*** clicked on HTTP  adaptor ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "HTTP_Connection_Digest");
    test.step("*** Naming the HTTP Connection  ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.HTTP_BASE_URI, 'http://example.com');
    test.step("*** Naming the Base URL Field   ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.homePage.loadingTime();
    test.step("*** Clicking on the Auth  type dropdown   ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.DIGEST);
    test.step("*** Selecting the Digest  Auth   from the dropdown  ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.USERNAME_DIGEST, 'test');
    test.step("*** Naming the Username  Field   ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.PASSWORD_DIGEST, 'test');
    test.step("*** Naming the Password Field   ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.TEST_CONNECTION);
    test.step("*** Clicking on Test Connection  ***", async ()=>{});

    await io.homePage.loadingTime();
    
    var result = await io.homePage.getTextFromElement(selectors.basePagePO.NOTIFICTION_BAR, "Your connection is working great! Nice Job!");

    await io.assert.expectToBeTrue(result, "");
    test.step("*** Validation of Connection is working fine or not ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Saving the Connection ***", async ()=>{});
    await io.homePage.loadingTime();
    var car = await page.$$(selectors.integrationPagePO.OPENACTIONSMENU);
    await car[0].click();
    test.step("*** Clicking on  Action menu     ***", async ()=>{});
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.homePage.loadingTime();
    test.step("*** Deleting the Connection  ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.CLOSEBUTTON);
    test.step("*** Confirm delete  ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
