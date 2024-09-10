import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("[HTTP] Introduce OAuth1.0 auth type without Save & Authorize", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test("TC_C56089_Verify(HMAC-SHA1,HMAC-SHA256,HMAC-SHA512,RSA-SHA1,RSA-SHA256,RSA-SHA512,PLAINTEXT)all these options are present under Signature Method dropdown or not. @Env-All @Zephyr-IO-T15576", async ({ io, page }) => {
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
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "HTTP_NewFlow_13");
    test.step("*** Entered Flow Name ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SLACK_AUTH_TYPE, "oauth1");
    test.step("*** OAuth 1.0 IS PRESENT UNDER THE AUTH TYPE DROPDOWN ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SIGNATURE_METHOD_DROPDOWN, "hmac-sha1");
    test.step("*** [HMAC-SHA1] IS PRESENT UNDER THE AUTH TYPE DROPDOWN ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SIGNATURE_METHOD_DROPDOWN, "hmac-sha256");
    test.step("*** [HMAC-SHA256] IS PRESENT UNDER THE AUTH TYPE DROPDOWN ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SIGNATURE_METHOD_DROPDOWN, "hmac-sha512");
    test.step("*** [HMAC-SHA512] IS PRESENT UNDER THE AUTH TYPE DROPDOWN ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SIGNATURE_METHOD_DROPDOWN, "plaintext");
    test.step("*** [plaintext] IS PRESENT UNDER THE AUTH TYPE DROPDOWN ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SIGNATURE_METHOD_DROPDOWN, "rsa-sha1");
    test.step("*** [RSA-SHA1] IS PRESENT UNDER THE AUTH TYPE DROPDOWN ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SIGNATURE_METHOD_DROPDOWN, "rsa-sha256");
    test.step("*** [RSA-SHA256] IS PRESENT UNDER THE AUTH TYPE DROPDOWN ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SIGNATURE_METHOD_DROPDOWN, "rsa-sha512");
    test.step("*** [RSA-SHA512] IS PRESENT UNDER THE AUTH TYPE DROPDOWN ***", async ()=>{});
  });

  test("TC_C56095_Verify that these 3 Mandatory fields [Consumer key, Access token, Consumer private key] came test.afterEach selecting these(RSA-SHA1,RSA-SHA256,RSA-SHA512) options one by one under Signature Method dropdown. @Env-All @Zephyr-IO-T15577", async ({ io, page }) => {
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
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "HTTP_NewFlow_14");
    test.step("*** Entered Flow Name ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SLACK_AUTH_TYPE, "oauth1");
    test.step("*** OAuth 1.0 IS PRESENT UNDER THE AUTH TYPE DROPDOWN ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SIGNATURE_METHOD_DROPDOWN, "rsa-sha1");
    test.step("*** [RSA-SHA1] IS PRESENT UNDER THE AUTH TYPE DROPDOWN ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.CONSUMERKEY);
    test.step("*** consumerKey is present for [RSA-SHA1] ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.ACCESSTOKEN);
    test.step("*** accessToken is present for [RSA-SHA1] ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.CONSUMERPRIVATEKEY);
    test.step("*** consumerPrivateKey is present for [RSA-SHA1] ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SIGNATURE_METHOD_DROPDOWN, "rsa-sha256");
    test.step("*** [RSA-SHA256] IS PRESENT UNDER THE AUTH TYPE DROPDOWN ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.CONSUMERKEY);
    test.step("*** consumerKey is present for [RSA-SHA256] ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.ACCESSTOKEN);
    test.step("*** accessToken is present for [RSA-SHA256] ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.CONSUMERPRIVATEKEY);
    test.step("*** consumerPrivateKey is present for [RSA-SHA256] ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SIGNATURE_METHOD_DROPDOWN, "rsa-sha512");
    test.step("*** [RSA-SHA512] IS PRESENT UNDER THE AUTH TYPE DROPDOWN ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.CONSUMERKEY);
    test.step("*** consumerKey is present for [RSA-SHA512] ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.ACCESSTOKEN);
    test.step("*** accessToken is present for [RSA-SHA512] ***", async ()=>{});
    
    await io.homePage.click(selectors.connectionsPagePO.CONSUMERPRIVATEKEY);
    test.step("*** consumerPrivateKey is present for [RSA-SHA512] ***", async ()=>{});
  });
});
