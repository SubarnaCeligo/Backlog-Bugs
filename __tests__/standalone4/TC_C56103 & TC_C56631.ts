import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("[HTTP] Introduce OAuth1.0 auth type without Save & Authorize", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test("TC_C56103_Verify that these 4 fields [Consumer key, Consume secret, Access token, Token secret] are Mandatory. @Env-All @Zephyr-IO-T15580", async ({ io, page }, testInfo) => {
    await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
    test.step("*** Clicked on Production Env. ***", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    test.step("*** Clicked on CreateConnections Button ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    test.step("*** Clicked on HTTP CONNECTOR ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "HTTP_NewFlow_16");
    test.step("*** Entered Flow Name ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.HTTP_BASE_URI, "https://e.org");
    test.step("*** Entered BASE URI ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SLACK_AUTH_TYPE, "oauth1");
    test.step("*** OAuth 1.0 IS SELECTED FROM AUTH TYPE DROPDOWN ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SIGNATURE_METHOD_DROPDOWN, "hmac-sha1");
    test.step("*** [hmac-sha1] IS SELECTED FROM Signature method DROPDOWN ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONSUMERKEY, "abcd");
    test.step("*** consumerKey is Mandatory for [hmac-sha1] ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONSUMERSECRET, "abcd");
    test.step("*** Consumersecret is Mandatory for [hmac-sha1] ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.ACCESSTOKEN, "abcd");
    test.step("*** accessToken is Mandatory for [hmac-sha1] ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.TOKENSECRET, "abcd");
    test.step("*** Tokensecret is Mandatory for [hmac-sha1] ***", async ()=>{});

    const isSaveButtonVisible = await io.homePage.isVisible(selectors.basePagePO.SAVE);
    await io.assert.expectToBeTrue(isSaveButtonVisible, "Save button not available");
    const saveButtonAfterChange = await page.locator(selectors.basePagePO.SAVE);
    const isEnabled = await saveButtonAfterChange.isEnabled();
    await io.assert.expectToBeTrue(isEnabled, "Save button is disabled");
    test.step("*** SAVE BUTTON enabled ***", async () => { });
  });

  test("TC_C56631_Create a outh 1.0 connection from the export form and import form page. @Env-All @Zephyr-IO-T15584", async ({ io, page }, testInfo) => {
    await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
    test.step("*** Clicked on Production Env. ***", async () => { });

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Exports");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    test.step("*** Clicked on Create Export Button ***", async () => { });

    await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    test.step("*** Clicked on HTTP CONNECTOR ***", async () => { });
    await io.homePage.loadingTime();
    var Add_connection = await page.$$(
      selectors.integrationPagePO.ADDNEWRESOURCE
    );
    await Add_connection[1].click();
    test.step("*** Clicked on Add Connection ***", async () => { });
    await io.homePage.loadingTime();
    const secondElement = await page.locator(selectors.basePagePO.NAME).nth(1);
    await secondElement.fill("SecondExportConnection_C56631");
    test.step("*** Entered Connection Name as NewExportConnection_C56631 ***", async () => { });

    await io.homePage.fillWebPage(selectors.connectionsPagePO.HTTP_BASE_URI, "https://api.twitter.com/");
    test.step("*** Entered BASE URI ***", async () => { });

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SLACK_AUTH_TYPE, "oauth1");
    test.step("*** OAuth 1.0 IS SELECTED FROM AUTH TYPE DROPDOWN ***", async () => { });

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SIGNATURE_METHOD_DROPDOWN, "hmac-sha1");
    test.step("*** [HMAC-SHA1] IS SELECTED FROM Signature method DROPDOWN ***", async () => { });

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONSUMERKEY, "bhNVuCchoggo1ZNO5G4vUoWsf");
    test.step("*** consumerKey is Mandatory for [HMAC-SHA1] ***", async () => { });

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONSUMERSECRET, "KW9XzNU8cGVHSc8CnEFaESjiuH3zC0Eg1Gr9Dl7xsRlOKTYPKa");
    test.step("*** Consumersecret is Mandatory for [HMAC-SHA1] ***", async () => { });

    await io.homePage.fillWebPage(selectors.connectionsPagePO.ACCESSTOKEN, "1600079794242490368-OQX1DWndwnDfXmkAMaWRAzN4DWcHcs");
    test.step("*** accessToken is Mandatory for [HMAC-SHA1] ***", async () => { });

    await io.homePage.fillWebPage(selectors.connectionsPagePO.TOKENSECRET, "jY4SAZz2gXhily5abADRLUCZWvrOYQuMltZIEfoh8EP2v");
    test.step("*** Tokensecret is Mandatory for [HMAC-SHA1] ***", async () => { });

    await io.homePage.click(selectors.connectionsPagePO.HOW_TO_TESTCONNECTION);
    test.step("*** Clicked on HOW TO TEST THIS CONNECTION ***", async () => { });

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPMETHOD, "GET");
    test.step("*** [GET] IS SELECTED FROM HTTP METHOD DROPDOWN ***", async () => { });

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RELATIVEURI, "2/tweets/1578084770172600322?tweet.fields=attachments,author_id,created_at,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,referenced_tweets,source,text,withheld");
    test.step("*** Entered Relative URI ***", async () => { });

    await io.homePage.click(selectors.basePagePO.TEST_CONNECTION);
    test.step("*** Clicked on Test connection Button ***", async () => { });

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicked on SAVE AND CLOSE BUTTON ***", async () => { });

    const closePopUpButton = await page.locator(selectors.flowBuilderPagePO.CLOSEPOPUP);
    await closePopUpButton.waitFor({ state: "visible", timeout: 10000 });
    await closePopUpButton.click();
    await io.homePage.loadingTime();

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Imports");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    test.step("*** Clicked on Create Import Button ***", async () => { });

    await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    test.step("*** Clicked on HTTP CONNECTOR ***", async () => { });
    await io.homePage.loadingTime();
    var Add_connection = await page.$$(
      selectors.integrationPagePO.ADDNEWRESOURCE
    );
    await Add_connection[1].click();
    test.step("*** Clicked on Add Connection ***", async () => { });
    await io.homePage.loadingTime();
    const secondImportElement = await page.locator(selectors.basePagePO.NAME).nth(1);
    await secondImportElement.fill("SecondImportConnection_C56631");
    test.step("*** Entered Connection Name as NewImportConnection_C56631 ***", async () => { });

    await io.homePage.fillWebPage(selectors.connectionsPagePO.HTTP_BASE_URI, "https://api.twitter.com/");
    test.step("*** Entered BASE URI ***", async () => { });

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SLACK_AUTH_TYPE, "oauth1");
    test.step("*** OAuth 1.0 IS SELECTED FROM AUTH TYPE DROPDOWN ***", async () => { });

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SIGNATURE_METHOD_DROPDOWN, "hmac-sha1");
    test.step("*** [HMAC-SHA1] IS SELECTED FROM Signature method DROPDOWN ***", async () => { });

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONSUMERKEY, "bhNVuCchoggo1ZNO5G4vUoWsf");
    test.step("*** consumerKey is Mandatory for [HMAC-SHA1] ***", async () => { });

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONSUMERSECRET, "KW9XzNU8cGVHSc8CnEFaESjiuH3zC0Eg1Gr9Dl7xsRlOKTYPKa");
    test.step("*** Consumersecret is Mandatory for [HMAC-SHA1] ***", async () => { });

    await io.homePage.fillWebPage(selectors.connectionsPagePO.ACCESSTOKEN, "1600079794242490368-OQX1DWndwnDfXmkAMaWRAzN4DWcHcs");
    test.step("*** accessToken is Mandatory for [HMAC-SHA1] ***", async () => { });

    await io.homePage.fillWebPage(selectors.connectionsPagePO.TOKENSECRET, "jY4SAZz2gXhily5abADRLUCZWvrOYQuMltZIEfoh8EP2v");
    test.step("*** Tokensecret is Mandatory for [HMAC-SHA1] ***", async () => { });

    await io.homePage.click(selectors.connectionsPagePO.HOW_TO_TESTCONNECTION);
    test.step("*** Clicked on HOW TO TEST THIS CONNECTION ***", async () => { });

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPMETHOD, "GET");
    test.step("*** [GET] IS SELECTED FROM HTTP METHOD DROPDOWN ***", async () => { });

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RELATIVEURI, "2/tweets/1578084770172600322?tweet.fields=attachments,author_id,created_at,entities,geo,id,in_reply_to_user_id,lang,possibly_sensitive,referenced_tweets,source,text,withheld");
    test.step("*** Entered Relative URI ***", async () => { });

    await io.homePage.click(selectors.basePagePO.TEST_CONNECTION);
    test.step("*** Clicked on Test connection Button ***", async () => { });

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Clicked on SAVE AND CLOSE BUTTON ***", async () => { });

    const closePopUpButtonImport = await page.locator(selectors.flowBuilderPagePO.CLOSEPOPUP);
    await closePopUpButtonImport.waitFor({ state: "visible", timeout: 10000 });
    await closePopUpButtonImport.click();
    await io.homePage.loadingTime();

  });
});
