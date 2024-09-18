
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C62675__TC_C62678_TC_C62680", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T21776 @Env-All TC_C62675 Verify Realm field is an optional field for the user", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
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
    const asterisk = await page.locator(
      selectors.connectionsPagePO.HTTP_AUTH_OAUTH_OAUTH1_REALM_FIELD
      + " " +
      selectors.basePagePO.ASTERISK
    );
    await expect(asterisk).not.toBeVisible();
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
    await test.step(
      "Verified  Realm field is an optional field for the user",
      async ()=>{}
    );
  });
  test("@Zephyr-IO-T21777 @Env-All TC_C62678 Verify Realm field in universal HTTP applications", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.RESTAPI_HTTP);
    test.step("*** Select Rest API  connection ***", async ()=>{});
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
      selectors.connectionsPagePO.HTTP_AUTH_OAUTH_OAUTH1_REALM_FIELD
    );
    await io.assert.expectToBeTrue(realm, "");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
    await test.step(
      "Verified Realm field in universal HTTP applications",
      async ()=>{}
    );
  });
  test("@Zephyr-IO-T21779 @Env-All TC_C62680 Verify Realm field in existing connections", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.integrationPagePO.HOME_SEARCH,
      "HTTP TWITTER CONNECTION"
    );
    test.step("*** Searching for the desired connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Click on the desired connection ***", async ()=>{});
    await io.homePage.click(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await io.homePage.click(selectors.integrationPagePO.EDIT);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    await io.homePage.click(selectors.connectionsPagePO.APPLICATION_DETAILS);
    const realmValue = await page.locator(
      selectors.connectionsPagePO.HTTP_AUTH_OAUTH_OAUTH1_REALM
      + " input"
    ).inputValue();
    expect(realmValue).toBe("twitter");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
    await test.step(
      "Verified Realm field in existing connections",
      async ()=>{}
    );
  });
});
