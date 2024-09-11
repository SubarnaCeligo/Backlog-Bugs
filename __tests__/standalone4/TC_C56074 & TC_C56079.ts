import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("[HTTP] Introduce OAuth1.0 auth type without Save & Authorize", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test("TC_C56074_Verify [Help text] for [CONSUMER KEY],[CONSUMER SECRET],[ACCESS TOKEN],[TOKEN SECRET],[SIGNATURE METHOD] @Env-All @Zephyr-IO-T15573", async ({ io, page }, testInfo) => {
    await io.homePage.click(selectors.homePagePO.PRODUCTION_BUTTON);
    test.step("*** Clicked on Production Env. ***", async ()=>{});

    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    test.step("*** Clicked on CreateConnections Button ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    test.step("*** Application HTTP is selected ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.connectionsPagePO.SLACK_AUTH_TYPE, "oauth1");
    test.step("*** OAuth 1.0 IS SELECTED ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SIGNATURE_METHOD_DROPDOWN, "hmac-sha1");
    test.step("*** [HMAC-SHA1] IS SELECTED FROM SIGNATURE METHOD DROPDOWN ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.connectionsPagePO.CONSUMER_SECRET_HELPTEXT);
    await io.homePage.loadingTime();
    test.step("*** Clicking on the question mark ***", async ()=>{});
    const Consumer_secret = await page.locator(selectors.importPagePO.HELPTEXT_DATA).textContent();
    await io.assert.expectToContainValue("Enter your consumer secret. The consumer uses this password to establish ownership of the consumer key. Multiple layers of protection, including AES 256 encryption, are in place to keep your secret safe. When editing this connection, you must re-enter this value each time; it is stored only when the connection is saved and never displayed as text.", Consumer_secret, "");
    test.step("*** Verified Helptext is present for [CONSUMER SECRET] Field. ***", async () => { });

    await io.homePage.click(selectors.connectionsPagePO.ACCESS_TOKEN_HELPTEXT);
    await io.homePage.loadingTime();
    test.step("*** Clicking on the question mark ***", async () => { });
    const Access_token = await page.locator(selectors.importPagePO.HELPTEXT_DATA).textContent();
    expect(Access_token).toEqual("Enter the access token. The consumer uses this token to gain access to the protected resources on user's behalf.Multiple layers of protection, including AES 256 encryption, are in place to keep your token safe. When editing this connection, you must re-enter this value each time; it is stored only when the connection is saved and never displayed as text.");
    test.step("*** Verified Helptext is present for [ACCESS TOKEN] Field. ***", async () => { });

    await io.homePage.click(selectors.connectionsPagePO.TOKEN_SECRET_HELPTEXT);
    await io.homePage.loadingTime();
    test.step("*** Clicking on the question mark ***", async () => { });
    const Token_secret = await page.locator(selectors.importPagePO.HELPTEXT_DATA).textContent();
    expect(Token_secret).toEqual("Enter the token secret. The consumer uses this secret to establish ownership of a provided token.Multiple layers of protection, including AES 256 encryption, are in place to keep your secret safe. When editing this connection, you must re-enter this value each time; it is stored only when the connection is saved and never displayed as text.");
    test.step("*** Verified Helptext is present for [TOKEN SECRET] Field. ***", async () => { });

    await io.homePage.click(selectors.connectionsPagePO.CONSUMER_KEY_HELPTEXT);
    await io.homePage.loadingTime();
    test.step("*** Clicking on the question mark ***", async () => { });
    const Consumer_key = await page.locator(selectors.connectionsPagePO.CONNHELPTEXT).textContent();
    expect(Consumer_key).toContain("Enter your consumer key. The consumer uses this value to identify itself to the service provider.");
    test.step("*** Verified Helptext is present for [CONSUMER KEY] Field. ***", async () => { });

    await io.homePage.click(selectors.connectionsPagePO.SIGNATURE_METHOD_HELPTEXT);
    await io.homePage.loadingTime();
    test.step("*** Clicking on the question mark ***", async ()=>{});
    const Signature = await page.locator(selectors.importPagePO.HELPTEXT_DATA).textContent();
    await io.assert.expectToBeValue(String(Signature), "Select the required method to sign the API call:HMAC-SHA1HMAC-SHA256HMAC-SHA512RSA-SHA1RSA-SHA256RSA-SHA512PLAINTEXT", "");
    test.step("*** Verified Helptext is present for [Signature method] Field. ***", async ()=>{});
  });


  test("TC_C56079_Verify [Help text] for [CONSUMER PRIVATE KEY] @Env-All @Zephyr-IO-T15574", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Connections");
    test.step("*** clicked on connection button ***", async () => { });
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    test.step("*** Clicked on CreateConnections Button ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    test.step("*** Application HTTP is selected ***", async () => { });
    await io.homePage.loadingTime();

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SLACK_AUTH_TYPE, "oauth1");
    test.step("*** OAuth 1.0 IS SELECTED ***", async () => { });

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SIGNATURE_METHOD_DROPDOWN, "rsa-sha1");
    test.step("*** [RSA-SHA1] IS SELECTED FROM SIGNATURE METHOD DROPDOWN ***", async () => { });

    await io.homePage.click(selectors.connectionsPagePO.CONSUMER_PRIVATE_KEY_HELPTEXT);
    await io.homePage.loadingTime();
    test.step("*** Clicking on the question mark ***", async ()=>{});
    const Consumer_private_key = await page.locator(selectors.connectionsPagePO.CONNHELPTEXT).textContent();
    expect(Consumer_private_key).toContain("Enter the consumer private RSA key. This key is used to sign the API call request.");
    test.step("*** Verified Helptext is present for [CONSUMER PRIVATE KEY] Field. ***", async ()=>{});

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  
});
