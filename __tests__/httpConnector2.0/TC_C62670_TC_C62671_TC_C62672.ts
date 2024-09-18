
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C62670_TC_C62671_TC_C62672", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T21773 @Env-All TC_C62670 Verify Realm field is showing in OAuth 1.0 connecion page for all signature methods", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Select HTTP connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
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
    var realm = await io.homePage.isVisible(
      selectors.connectionsPagePO.HTTP_AUTH_OAUTH_OAUTH1_REALM
    );
    await io.assert.expectToBeTrue(realm, "");
    await io.homePage.click(
      selectors.connectionsPagePO.SIGNATURE_METHOD_DROPDOWN
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "HMAC-SHA256"
    );
    var realm1 = await io.homePage.isVisible(
      selectors.connectionsPagePO.HTTP_AUTH_OAUTH_OAUTH1_REALM
    );
    await io.assert.expectToBeTrue(realm1, "");
    await io.homePage.click(
      selectors.connectionsPagePO.SIGNATURE_METHOD_DROPDOWN
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "HMAC-SHA512"
    );
    var realm2 = await io.homePage.isVisible(
      selectors.connectionsPagePO.HTTP_AUTH_OAUTH_OAUTH1_REALM
    );
    await io.assert.expectToBeTrue(realm2, "");
    await io.homePage.click(
      selectors.connectionsPagePO.SIGNATURE_METHOD_DROPDOWN
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "PLAINTEXT"
    );
    var realm3 = await io.homePage.isVisible(
      selectors.connectionsPagePO.HTTP_AUTH_OAUTH_OAUTH1_REALM
    );
    await io.assert.expectToBeTrue(realm3, "");
    await io.homePage.click(
      selectors.connectionsPagePO.SIGNATURE_METHOD_DROPDOWN
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "RSA-SHA1"
    );
    var realm4 = await io.homePage.isVisible(
      selectors.connectionsPagePO.HTTP_AUTH_OAUTH_OAUTH1_REALM
    );
    await io.assert.expectToBeTrue(realm4, "");
    await io.homePage.click(
      selectors.connectionsPagePO.SIGNATURE_METHOD_DROPDOWN
    );

    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "RSA-SHA256"
    );
    var realm5 = await io.homePage.isVisible(
      selectors.connectionsPagePO.HTTP_AUTH_OAUTH_OAUTH1_REALM
    );
    await io.assert.expectToBeTrue(realm5, "");
    await io.homePage.click(
      selectors.connectionsPagePO.SIGNATURE_METHOD_DROPDOWN
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "RSA-SHA512"
    );
    var realm6 = await io.homePage.isVisible(
      selectors.connectionsPagePO.HTTP_AUTH_OAUTH_OAUTH1_REALM
    );
    await io.assert.expectToBeTrue(realm6, "");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
    await test.step(
      "Verified Realm field is showing in OAuth 1.0 connecion page for all signature methods",
      async ()=>{}
    );
  });
  test("@Zephyr-IO-T21774 @Env-All TC_C62671 Verify Realm help text in OAuth 1.0 connection page", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Select HTTP connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
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
    await io.homePage.click(
      selectors.connectionsPagePO.HTTP_AUTH_OAUTH_OAUTH1_REALM_FIELD
      + " " +
      selectors.flowBuilderPagePO.HELP_TEXT_ICON
    );
    test.step("*** Clicking on the question mark ***", async ()=>{});
    const appidhelptext = await page.locator(
      selectors.flowBuilderPagePO.HELP_BUBBLE
    ).first().textContent();
    expect(appidhelptext).toEqual(
      "This is a string specified by the server in the WWW-" +
      "Authenticate response header. It should contain at least the " +
      "name of the host performing the authentication and might " +
      "additionally indicate the collection of users who might have access."
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
    await test.step(
      "Verified Realm help text in OAuth 1.0 connection page",
      async ()=>{}
    );
  });
  test("@Zephyr-IO-T21775 @Env-All TC_C62672 Verify Realm field supporting AFE", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Select HTTP connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
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
    await io.homePage.clickButtonByIndex(
      selectors.connectionsPagePO.HTTP_AUTH_OAUTH_OAUTH1_REALM,
      1
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.CLOSE,
      1
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.CLOSE,
      0
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
    test.step("Verified Realm field supporting AFE", async ()=>{});
  });
});
