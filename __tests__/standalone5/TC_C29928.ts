import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C29928_REST_connection_type.", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({io,page}, testInfo) => {
    //*Delete created Connection
    test.step("*** Deleting Connection ***", async ()=>{});
    await io.connections.deleteConnection( "REST_Connection_Custom");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T4558 @Env-All TC_C29928_REST_connection_authtype_as_custom ", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.RESTAPI_HTTP);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** clicked on Rest   adaptor ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "REST_Connection_Custom");
    test.step("*** Naming the REST Connection  ***", async ()=>{});
    // await io.myAccountPage.waitForElementAttached(selectors.basePagePO.NOTIFICTION_BAR);
    await io.homePage.fillWebPage(selectors.connectionsPagePO.HTTP_BASE_URI, "https://slack.com/api"
    );
    test.step("*** Naming the Base URL Field   ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    test.step("*** Clicking on the Auth  type dropdown   ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.CUSTOM);
    test.step("*** Selecting the Custom Auth   from the dropdown  ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.HOW_TO_TESTCONNECTION);
    test.step("*** Clicking on How to test this connection  ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.PING_METHOD);
    test.step("*** Clicking on HTTP Method   ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.HTTP_METHOD_GET);
    test.step("*** Selecting the GET method   ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RELATIVEURI, "/users");
    test.step("*** Naming the relative URL  ***", async ()=>{});
    
    await io.homePage.click(selectors.basePagePO.TEST_CONNECTION);
    test.step("*** Clicking on Test Connection  ***", async ()=>{});
    
    var result = await io.homePage.getTextFromElement(selectors.basePagePO.NOTIFICTION_BAR, "Your connection is working great! Nice Job!");
    await io.assert.expectToBeTrue(result, "");
    test.step("*** Validation of Connection is working fine or not ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Saving the Connection ***", async ()=>{});
    
    var car = await page.$$(selectors.integrationPagePO.OPENACTIONSMENU);
    await car[0].click();
    test.step("*** Clicking on  Action menu     ***", async ()=>{});
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    test.step("*** Deleting the Connection  ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.CLOSEBUTTON);
    test.step("*** Confirm delete  ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
