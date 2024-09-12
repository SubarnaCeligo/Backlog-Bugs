import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_C50642.json";

test.describe("TC_C50642", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({io,page}, testInfo) => {
    //*Create Deleted Connection
    test.step("*** Deleting Connection ***", async ()=>{});
    await io.connections.deleteConnection(TC.Name);
  });
  test("@Zephyr-IO-T23340 @Env-All TC_C50642", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** clicked on HTTP  adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_C50642");
    test.step("*** Naming the HTTP Connection  ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.HTTP_BASE_URI, TC.BASEuri);
    test.step("*** Naming the HTTP Connection  ***", async ()=>{});

    await io.homePage.fill(selectors.flowBuilderPagePO.HEADER_NAME, TC["name-0"]);
    test.step("*** Writing name 1  ***", async ()=>{});
    
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HEADERS_2, TC["name-1"]);
    test.step("*** Writing name 2  ***", async ()=>{});
    
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HEADERS_3, TC["name-2"]);
    test.step("*** Writing name 3  ***", async ()=>{});
    
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HEADERS_4, TC["name-3"]);
    test.step("*** Writing name 4  ***", async ()=>{});

    await io.homePage.fill(selectors.connectionsPagePO.APPLICATION_VALUE0,TC["value-0"]);
    test.step("*** Writing value 1  ***", async ()=>{});

    await io.homePage.fill(selectors.connectionsPagePO.APPLICATION_VALUE1, TC["value-1"]);
    test.step("*** Writing value 2  ***", async ()=>{});

    await io.homePage.fill(selectors.connectionsPagePO.APPLICATION_VALUE2, TC["value-2"]);
    test.step("*** Writing value 3  ***", async ()=>{});
   
    await io.homePage.fill( selectors.flowBuilderPagePO.VALUE_4, TC["value-3"]);
    test.step("*** Writing value 4  ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    test.step("*** Clicking on auth type  ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.CUSTOM);
    test.step("*** Clicking on custom type  ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.connectionsPagePO.ENCRYPTED_ID, TC.encryptedID);
    test.step("*** Writing in encrypted field  ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.UNENCRYPTED_ID);
    test.step("*** Writing in unencrypted field  ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.REFRESH_TOKEN_CUSTOM);
    test.step("*** Clicking on configure refresh token  ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.REFRESH_TOKEN, TC.refreshtoken);
    test.step("*** Writing on refresh token  ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.REFRESH_HTTP_METHOD);
    test.step("*** Clicking on http method  ***", async ()=>{});

    await io.homePage.click(selectors.importPagePO.HTTPPOSTMETHOD);
    test.step("*** Clicking on http post method  ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTP_REQUEST_BODY, TC.HTTPrequestbody);
    test.step("*** Writing on http request body  ***", async ()=>{});

    await io.homePage.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTP_STATUS_CODE, "403");
    test.step("*** Writing on override http status code  ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.FAILPATH, "message");
    test.step("*** Writing on path to auth error field  ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicking on save and close  ***", async ()=>{});
    await io.homePage.loadingTime();

    var verify = await io.homePage.getText(selectors.connectionsPagePO.CONNECTIONNAMEFROMROW);
    await io.assert.expectToContainValue("TC_C50642",String(verify), "");
    test.step("*** Connection is saved successfully ***", async ()=>{});
  });
});
