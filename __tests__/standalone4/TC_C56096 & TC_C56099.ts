import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("[HTTP] Introduce OAuth1.0 auth type without Save & Authorize", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test("TC_C56096_Verify that these 3 fields[Consumer key,Access token,Consumer private key]are Mandatory. @Env-All @Zephyr-IO-T15578", async ({ io, page }, testInfo) => {
    await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
    test.step("*** Clicked on Production Env. ***", async () => { });

    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    test.step("*** Clicked on CreateConnections Button ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    test.step("*** Clicked on HTTP CONNECTOR ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "HTTP_NewFlow_15");
    test.step("*** Entered Flow Name ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.HTTP_BASE_URI, "https://e.org");
    test.step("*** Entered BASE URI ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SLACK_AUTH_TYPE, "oauth1");
    test.step("*** OAuth 1.0 IS PRESENT UNDER THE AUTH TYPE DROPDOWN ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SIGNATURE_METHOD_DROPDOWN, "rsa-sha1");
    test.step("*** [RSA-SHA1] IS PRESENT UNDER THE AUTH TYPE DROPDOWN ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONSUMERKEY, "abcd");
    test.step("*** consumerKey is Mandatory for [RSA-SHA1] ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.ACCESSTOKEN, "abcd");
    test.step("*** accessToken is Mandatory for [RSA-SHA1] ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONSUMERPRIVATEKEY, "abcd");
    test.step("*** consumerPrivateKey is Mandatory for [RSA-SHA1] ***", async ()=>{});

    const isSaveButtonVisible = await io.homePage.isVisible(selectors.basePagePO.SAVE);
    await io.assert.expectToBeTrue(isSaveButtonVisible, "Save button not available");
    const saveButtonAfterChange = await page.locator(selectors.basePagePO.SAVE);
    const isEnabled = await saveButtonAfterChange.isEnabled();
    await io.assert.expectToBeTrue(isEnabled, "Save button is disabled");
    test.step("*** SAVE BUTTON enabled ***", async () => { });
  });

  test("TC_C56099_Verify that these 4 Mandatory fields [Consumer key,Consume secret,Access token,Token secret] came test.afterEach selecting these (HMAC-SHA1,HMAC-SHA256,HMAC-SHA512,PLAINTEXT) options one by one under Signature Method dropdown. @Env-All @Zephyr-IO-T15579", async ({ io, page }) => {
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

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SLACK_AUTH_TYPE, "oauth1");
    test.step("*** OAuth 1.0 IS PRESENT UNDER THE AUTH TYPE DROPDOWN ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SIGNATURE_METHOD_DROPDOWN, "hmac-sha1");
    test.step("*** [HMAC-SHA1] IS PRESENT UNDER THE AUTH TYPE DROPDOWN ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.CONSUMERKEY);
    test.step("*** consumerKey is present for [HMAC-SHA1] ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.CONSUMERSECRET);
    test.step("*** Consumersecret is present for [HMAC-SHA1] ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.ACCESSTOKEN);
    test.step("*** accessToken is present for [HMAC-SHA1] ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.TOKENSECRET);
    test.step("*** Tokensecret is present for [HMAC-SHA1] ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SIGNATURE_METHOD_DROPDOWN, "hmac-sha256");
    test.step("*** [HMAC-SHA256] IS PRESENT UNDER THE AUTH TYPE DROPDOWN ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.CONSUMERKEY);
    test.step("*** consumerKey is present for [HMAC-SHA256] ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.CONSUMERSECRET);
    test.step("*** Consumersecret is present for [HMAC-SHA256] ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.ACCESSTOKEN);
    test.step("*** accessToken is present for [HMAC-SHA256] ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.TOKENSECRET);
    test.step("*** Tokensecret is present for [HMAC-SHA256] ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SIGNATURE_METHOD_DROPDOWN, "hmac-sha512");
    test.step("*** [HMAC-SHA512] IS PRESENT UNDER THE AUTH TYPE DROPDOWN ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.CONSUMERKEY);
    test.step("*** consumerKey is present for [HMAC-SHA512] ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.CONSUMERSECRET);
    test.step("*** Consumersecret is present for [HMAC-SHA512] ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.ACCESSTOKEN);
    test.step("*** accessToken is present for [HMAC-SHA512] ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.TOKENSECRET);
    test.step("*** Tokensecret is present for [HMAC-SHA512] ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SIGNATURE_METHOD_DROPDOWN, "plaintext");
    test.step("*** [PLAINTEXT] IS PRESENT UNDER THE AUTH TYPE DROPDOWN ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.CONSUMERKEY);
    test.step("*** consumerKey is present for [PLAINTEXT] ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.CONSUMERSECRET);
    test.step("*** Consumersecret is present for [PLAINTEXT] ***", async ()=>{});
    
    await io.homePage.click(selectors.connectionsPagePO.ACCESSTOKEN);
    test.step("*** accessToken is present for [PLAINTEXT] ***", async ()=>{});
    
    await io.homePage.click(selectors.connectionsPagePO.TOKENSECRET);
    test.step("*** Tokensecret is present for [PLAINTEXT] ***", async ()=>{});
  });
});
