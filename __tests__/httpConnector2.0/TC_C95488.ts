
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C95488_TC_C95489_TC_C95490_TC_C95491_TC_C95492", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T21517 @Env-All TC_C95488 Verify if user is able to see only Instagram Ads iclients under OAuth2.0 client", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.META
    );
    test.step("*** Selected Meta as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.INSTAGRAM_ADS);
    test.step("*** Selected Instagram Ads as the API type ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.ICLIENT_ID
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "INSTAGRAM ADS DND"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const clientId = await io.homePage.getText(
      selectors.connectionsPagePO.ICLIENT_ID
    );
    await io.assert.expectToBeValue(String(clientId), "INSTAGRAM ADS DND", "");

    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(
      selectors.basePagePO.DISCARD_CHANGES
    );
    await test.step(
      "*** Verified if user is able to see only Instagram Ads iclients under OAuth2.0 client ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
  test("@Zephyr-IO-T21518 @Env-All TC_C95489 Verify if user is able to see only Facebook Ads iclients under OAuth2.0 client", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.META
    );
    test.step("*** Selected Meta as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.FACEBOOK_ADS);
    test.step("*** Selected Facebook Ads as the API type ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.ICLIENT_ID
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "FACEBOOK META DND"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const clientId = await io.homePage.getText(
      selectors.connectionsPagePO.ICLIENT_ID
    );
    await io.assert.expectToBeValue(String(clientId), "FACEBOOK META DND", "");
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(
      selectors.basePagePO.DISCARD_CHANGES
    );
    await test.step(
      "*** Verified if user is able to see only Facebook Ads iclients under OAuth2.0 client ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
  test("@Zephyr-IO-T21519 @Env-All TC_C95490 Verify if user should not be able to see Facebook Ads related iclients under OAuth 2.0 client ", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.META
    );
    test.step("*** Selected Meta as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.INSTAGRAM_ADS);
    test.step("*** Selected Instagram Ads as the API type ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.ICLIENT_ID
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const iClient = await io.homePage.getText(selectors.myAccountPagePO.SELECTTYPE);
    expect(iClient).not.toContain("FACEBOOK META DND");
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "INSTAGRAM ADS DND"
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(
      selectors.basePagePO.DISCARD_CHANGES
    );
    await test.step(
      "*** Verified if user should not be able to see Facebook Ads related iclients under OAuth 2.0 client ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T21520 @Env-All TC_C95491 Verify if user should not be able to see Instagram Ads related iclients under OAuth 2.0 client", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.META
    );
    test.step("*** Selected Meta as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.FACEBOOK_ADS);
    test.step("*** Selected Facebook Ads as the API type ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.ICLIENT_ID
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const iClient = await io.homePage.getText(selectors.myAccountPagePO.SELECTTYPE);
    expect(iClient).not.toContain("INSTAGRAM ADS DND");
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "FACEBOOK META DND"
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(
      selectors.basePagePO.DISCARD_CHANGES
    );
    await test.step(
      "*** Verified if user should not be able to see Instagram Ads related iclients under OAuth 2.0 client ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T21521 @Env-All TC_C95492 Verify iClient related to that application should not be shown in connection form for the applications where api doesn't support", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.LOOP_RETURN_CONNECTION
    );
    await test.step(
      "*** Selected loop returns as the adaptor ***",
      async ()=>{}
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const apiType = await page.locator(
      selectors.connectionsPagePO.HTTP_CONNECTOR_API_ID
    );
    expect(apiType).not.toBeVisible();
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await test.step(
      "*** Verified iClient related to that application should not be shown in connection form for the applications where api doesn't support ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
