
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C29938_HTTP_connection_type.", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({io,page}, testInfo) => {
    //*Create Deleted Connection
    test.step("*** Deleting Connection ***", async ()=>{});
    await io.connections.deleteConnection( "HTTP_Connection");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T4559 @Env-All TC_C29938_HTTP_connection_type ", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** clicked on HTTP  adaptor ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "HTTP_Connection");
    test.step("*** Naming the HTTP Connection  ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.connectionsPagePO.HTTP_BASE_URI, "https://slack.com/api"
    );
    test.step("*** Naming the Base URL Field   ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    test.step("*** Clicking on the Auth  type dropdown   ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.OAUTH);
    test.step("*** Selecting the Oauth 2.0   from the dropdown  ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.ICLIENT_ID);
    test.step("*** Clicking on Oauth 2.o client dropdown***   ***", async ()=>{});
    await io.homePage.click("//div[text()='TC_C29938_DND']");
    test.step("*** Selecting the Oauth 2.0 client from the dropdown  ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.ADVANCED);
    test.step("*** clicking on advanced section   ***", async ()=>{});
    
    await io.homePage.click(selectors.connectionsPagePO.BORROWCONCURRENCY);
    await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.SCRIPTS_LIST, 1);
    
    test.step("*** Clicking on borrow concurrency    ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.TEST_CONNECTION);
    await io.homePage.loadingTime();
    test.step("*** Clicking on Test Connection  ***", async ()=>{});
    var result = await io.homePage.getTextFromElement(selectors.basePagePO.NOTIFICTION_BAR, "Your connection is working great! Nice Job!");
    await io.assert.expectToBeTrue(result, "");
    test.step("*** Validation of Connection is working fine or not ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.BORROWCONCURRENCY);
    test.step("*** Clicking on borrow concurrency    ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.SELECTPAGINGMETHOD, 0);
    test.step("*** selecting the  Please select     ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.TEST_CONNECTION);
    await io.homePage.loadingTime();
    test.step("*** Clicking on Test Connection  ***", async ()=>{});
    var resultss = await io.homePage.getTextFromElement(selectors.basePagePO.NOTIFICTION_BAR, "Your connection is working great! Nice Job!");
    await io.assert.expectToBeTrue(resultss, "");
    test.step("*** Validation of Connection is working fine or not ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
