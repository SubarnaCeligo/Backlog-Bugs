
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";
import TC_C63681 from "@testData/HTTPConnector2.0/TC_C63681.json";

test.describe("TC_C62681_TC_C62683", () => {
  test.beforeEach(async ({ io, page }, testInfo) => {
    test.step("*** Navigate to Home Page ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T21780 @Env-All TC_C62681 Verify if able to create twitter connection successfully", async ({ io, page }, testInfo) => {
    await io.homePage.goToMenu("Resources", "Connections");
    test.step("*** clicked on connection button", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Select HTTP connection ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      "twitter"
    );
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.HTTP_BASE_URI,
      TC_C63681.baseURI
    );
    await io.homePage.click(
      selectors.connectionsPagePO.APPLICATION_DETAILS
    );
    await io.homePage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "OAuth 1.0"
    );
    await io.homePage.click(
      selectors.connectionsPagePO.SIGNATURE_METHOD_DROPDOWN
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "HMAC-SHA1"
    );
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.CONSUMERKEY,
      decrypt(TC_C63681.consumerKey)
    );
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.CONSUMERSECRET,
      decrypt(TC_C63681.consumerSecret)
    );
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.ACCESSTOKEN,
      decrypt(TC_C63681.accessToken)
    );
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.TOKENSECRET,
      decrypt(TC_C63681.tokenSecret)
    );
    await io.homePage.click(
      selectors.basePagePO.TEST_CONNECTION
    );
    var test1 = await io.homePage.getText(
      selectors.basePagePO.NOTIFICATION_ID
    );
    var success = "Your connection is working great! Nice Job!";
    expect(test1).toContain(success);
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async () => { });
    await test.step(
      "Verified able to create Twitter connection successfully"
      , async () => { });
  });
  test("@Zephyr-IO-T21782 @Env-All TC_C62683 Verify Realm field for OAuth 1.0 type supported Twitter connection", async ({ io, page }, testInfo) => {
    await io.homePage.goToMenu("Resources", "Connections");
    test.step("*** clicked on connection button", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Select HTTP connection ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.basePagePO.ADD_NAME
    );
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.HTTP_BASE_URI,
      TC_C63681.baseURI
    );
    await io.homePage.click(
      selectors.connectionsPagePO.APPLICATION_DETAILS
    );
    await io.homePage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "OAuth 1.0"
    );
    await io.homePage.click(
      selectors.connectionsPagePO.SIGNATURE_METHOD_DROPDOWN
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "HMAC-SHA1"
    );
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.CONSUMERKEY,
      decrypt(TC_C63681.consumerKey)
    );
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.CONSUMERSECRET,
      decrypt(TC_C63681.consumerSecret)
    );
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.ACCESSTOKEN,
      decrypt(TC_C63681.accessToken)
    );
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.TOKENSECRET,
      decrypt(TC_C63681.tokenSecret)
    );
    var realm = await io.homePage.isVisible(
      selectors.connectionsPagePO.HTTP_AUTH_OAUTH_OAUTH1_REALM_FIELD
    );
    await io.assert.expectToBeTrue(realm, "");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async () => { });
    await test.step(
      "Verified Realm field for OAuth 1.0 type supported connection"
      , async () => { });
  });
});
