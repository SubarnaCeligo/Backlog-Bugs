import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import ID from "@testData/STANDALONE/TC_C28152.json";

test.describe("TC_C28152", () => {
  let connId;
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({io,page}, testInfo) => {
    //*Create Deleted Connection
    test.step("*** Deleting Connection ***", async ()=>{});
    await io.connections.deleteConnection("1", connId);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T4522 @Env-All TC_C28152", async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.CONNECTIONS);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.connectionPage.clickByText('Create connection');
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** clicked on HTTP  adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    // Purposely naming it to "1" ao it remains on top.
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "1");
    test.step("*** Naming the HTTP Connection  ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.HTTP_BASE_URI, "https://slack.com/api");
    test.step("*** Naming the Base URL Field   ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    test.step("*** Clicking on the Auth  type dropdown   ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.DIGEST);
    test.step("*** Selecting the Digest   from the dropdown  ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.USERNAME_DIGEST, "test");
    test.step("*** Naming the Username  Field   ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.PASSWORD_DIGEST, "test");
    test.step("*** Naming the Password Field   ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Saving the Connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    connId = await page.url().split('edit/connections/')[1].split('?')[0];

    await io.homePage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);

    await io.homePage.click(selectors.flowBuilderPagePO.COOKIE_AUTH);
    
    await io.homePage.click(selectors.flowBuilderPagePO.COOKIE_HTTP_METHOD);
    
    await io.homePage.click(selectors.importPagePO.HTTPPOSTMETHOD);
    
    await io.homePage.click(selectors.flowBuilderPagePO.COOKIE_HTTP_REQUEST);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    var verify = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectNotToBeNull(verify, "");

    var paste = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("settings",paste, "");
    await io.assert.expectToContainValue("integration",paste, "");
    await io.assert.expectToContainValue("flow",paste, "");
    await io.assert.expectToContainValue("flowGrouping",paste, "");
    await io.assert.expectToContainValue("connection",paste, "");


    var imp = await io.homePage.getTextFromElement(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE, "import");
    var exp = await io.homePage.getTextFromElement(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE, "export");

    await io.assert.expectToBeFalse(imp, "");
    await io.assert.expectToBeFalse(exp, "");


    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);

    await io.homePage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);

    await io.homePage.click(selectors.flowBuilderPagePO.MANUAL);
    
    await io.homePage.click(selectors.connectionsPagePO.LOCATION);

    await io.homePage.click(selectors.flowBuilderPagePO.CUSTOM_REQUEST_BODY);

    let checked = await page.locator(
      selectors.flowBuilderPagePO.CONFIGURE_REFRESH_TOKEN
    ).isChecked();
    await io.homePage.loadingTime();

    if (checked === false) {
      await io.homePage.click(selectors.flowBuilderPagePO.CONFIGURE_REFRESH_TOKEN);
      test.step("*** Clicking on Configure Refresh Token ***", async ()=>{});
    }
    
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.REFRESH_RELATIVE_URI);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    var verify2 = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectNotToBeNull(verify2, "");

    var paste2 = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("settings",paste2, "");
    await io.assert.expectToContainValue("integration",paste2, "");
    await io.assert.expectToContainValue("flow",paste2, "");
    await io.assert.expectToContainValue("flowGrouping",paste2, "");
    await io.assert.expectToContainValue("connection",paste2, "");


    var imp2 = await io.homePage.getTextFromElement(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE, "import");
    var exp2 = await io.homePage.getTextFromElement(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE, "export");

    await io.assert.expectToBeFalse(imp2, "");
    await io.assert.expectToBeFalse(exp2, "");


    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);

    await io.homePage.click(selectors.flowBuilderPagePO.REFRESH_HTTP_METHOD);

    await io.homePage.click(selectors.importPagePO.HTTPPOSTMETHOD);
    
    await io.homePage.click(selectors.flowBuilderPagePO.REFRESH_HTTP_REQUEST_BODY);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    var verify3 = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectNotToBeNull(verify3, "");
    await io.homePage.loadingTime();

    var paste3 = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("settings",paste3, "");
    await io.assert.expectToContainValue("integration",paste3, "");
    await io.assert.expectToContainValue("flow",paste3, "");
    await io.assert.expectToContainValue("flowGrouping",paste3, "");
    await io.assert.expectToContainValue("connection",paste3, "");


    var imp3 = await io.homePage.getTextFromElement(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE, "import");
    var exp3 = await io.homePage.getTextFromElement(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE, "export");

    await io.assert.expectToBeFalse(imp3, "");
    await io.assert.expectToBeFalse(exp3, "");

    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);

    await io.homePage.click(selectors.connectionsPagePO.HOW_TO_TESTCONNECTION);

    await io.homePage.click(selectors.flowBuilderPagePO.CONNECTION_RELATIVE_URI);
    await io.homePage.loadingTime();
    var verify4 = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectNotToBeNull(verify4, "");
    await io.homePage.loadingTime();

    var paste4 = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("settings",paste4, "");
    await io.assert.expectToContainValue("integration",paste4, "");
    await io.assert.expectToContainValue("flow",paste4, "");
    await io.assert.expectToContainValue("flowGrouping",paste4, "");
    await io.assert.expectToContainValue("connection",paste4, "");


    var imp4 = await io.homePage.getTextFromElement(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE, "import");
    var exp4 = await io.homePage.getTextFromElement(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE, "export");

    await io.assert.expectToBeFalse(imp4, "");
    await io.assert.expectToBeFalse(exp4, "");


    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);

    await io.homePage.click(selectors.connectionsPagePO.PING_METHOD);

    await io.homePage.click(selectors.importPagePO.HTTPPOSTMETHOD);
    
    await io.homePage.click(selectors.flowBuilderPagePO.CLICK_CONNECTION_REQUEST_BODY);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    var verify5 = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectNotToBeNull(verify5, "");
    var paste5 = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("settings",paste5, "");
    await io.assert.expectToContainValue("integration",paste5, "");
    await io.assert.expectToContainValue("flow",paste5, "");
    await io.assert.expectToContainValue("flowGrouping",paste5, "");
    await io.assert.expectToContainValue("connection",paste5, "");


    var imp5 = await io.homePage.getTextFromElement(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE, "import");
    var exp5 = await io.homePage.getTextFromElement(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE, "export");

    await io.assert.expectToBeFalse(imp5, "");
    await io.assert.expectToBeFalse(exp5,  "");

    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSINGDRAWER);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Closing the drawer ***", async ()=>{});
    await io.homePage.loadingTime();

    var car = await page.$$(selectors.integrationPagePO.OPENACTIONSMENU);
    await car[0].click();
    test.step("*** Clicking on Action menu ***", async ()=>{});

    await io.homePage.click(selectors.aliasesPagePO.DEREGSTERCONNNECTION);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.exportsPagePO.DEGISTERBUTTON);
    test.step("*** deregistering the Connection  ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
});
