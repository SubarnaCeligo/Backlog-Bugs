import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/STANDALONE/TC_C51094.json";

test.describe("TC_C51094 | Golden", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({io,page}, testInfo) => {
    //*Create Deleted Connection
    test.step("*** Deleting Connection ***", async ()=>{});
    await io.connections.deleteConnection(TC.Name);
  });
  test("@Zephyr-IO-T23347 @Env-All TC_C51094", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** clicked on HTTP  adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_C51094");
    test.step("*** Naming the HTTP Connection  ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.HTTP_BASE_URI, TC.BASEuri);
    test.step("*** Filling Base Url  ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    test.step("*** Clicking on auth type  ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.CUSTOM);
    test.step("*** Clicking on custom type  ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.ENCRYPTED_ID, TC.encryptedID);
    test.step("*** Writing in encrypted field  ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.UNENCRYPTED_ID, TC.unencryptedID);
    test.step("*** Writing in unencrypted field  ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.REFRESH_TOKEN_CUSTOM);
    test.step("*** Clicking on configure refresh token  ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.connectionsPagePO.REFRESH_TOKEN, TC.refreshtoken);
    test.step("*** Writing on refresh token  ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.REFRESH_HTTP_METHOD);
    test.step("*** Clicking on http method  ***", async ()=>{});

    await io.homePage.click(selectors.importPagePO.HTTPPOSTMETHOD);
    test.step("*** Clicking on http post method  ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.fill(selectors.flowBuilderPagePO.REFRETOKRELURL, TC.relativeURI);
    test.step("*** Writing relative url  ***", async ()=>{});
    
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.PATH_TO_TOKEN, "1234");
    test.step("*** Writing on Path To Token  ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.PATHS_ENCRYPTED, TC.paths_encrypted);
    test.step("*** Writing on Path Encrypted  ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.NON_STANDARD_API_TAB)
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.FAILPATH, "message");
    test.step("*** Writing on path to auth error field  ***", async ()=>{});
    
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTP_STATUS_CODE, "403");
    test.step("*** Writing on override http status code  ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicking on save and close  ***", async ()=>{});
    await io.homePage.loadingTime();

    var verify = await io.homePage.getText(selectors.myAccountPagePO.CONN_NAME);
    await io.assert.expectToContainValue("TC_C51094",String(verify), "");
    test.step("*** Connection is saved successfully ***", async ()=>{});
    var status = await io.homePage.getText(selectors.basePagePO.CONNSTATUS);

    await io.assert.expectToContainValue("Online",String(status), "");
    test.step("*** Verified that the connection is online ***", async ()=>{});
  });
});
