
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C95473_TC_C95474_TC_C95475", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T21503 @Env-All TC_C95473 Verify user is able to create iclient for Facebook Ads", async ({io,page}, testInfo) => {
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
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.ADDNEWRESOURCE,
      1
    );
    test.step("*** Clicked on Create iClient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await page.locator(selectors.basePagePO.NAME).nth(1).fill("TC_C95473 FACEBOOK META ICLIENT");
    test.step("*** Entered Name ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.OAUTH2_CLIENT_ID,
      "jhbscj"
    );
    test.step("*** Entered Client ID ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.OAUTH2_CLIENT_SECRET,
      "jrtyu"
    );
    test.step("*** Entered Client Secret ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    test.step("*** Saving and Closing iClient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(
      selectors.basePagePO.DISCARD_CHANGES
    );
    test.step("*** Clicked on Close ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.goToMenu("Resources","iClients");
    test.step("*** Clicked on iClients tab ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.integrationPagePO.HOME_SEARCH,
      "TC_C95473 FACEBOOK META ICLIENT"
    );
    test.step("*** Searched for created iClient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.homePage.click(selectors.basePagePO.DELETE);
    test.step("*** Deleted the created iClient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await test.step(
      "*** Verified if User is able to create iClient in simple view for Facebook Ads ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T21504 @Env-All TC_C95474 Verify user is able to see only three fields in simple form", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.click(
      selectors.connectionsPagePO.META
    );
    test.step("*** Selected Meta as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.FACEBOOK_ADS);
    test.step("*** Selected Facebook Ads as the API type ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.ADDNEWRESOURCE,
      1
    );
    test.step("*** Clicked on Create iClient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    expect(await page.locator(selectors.basePagePO.NAME).nth(1)).toBeVisible();
    expect(await page.locator(selectors.connectionsPagePO.OAUTH2_CLIENT_ID)).toBeVisible();
    expect(await page.locator(selectors.connectionsPagePO.OAUTH2_CLIENT_SECRET)).toBeVisible();
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.CLOSE,
      1
    );
    test.step("*** Clicked on Close ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(
      selectors.basePagePO.DISCARD_CHANGES
    );
    test.step("*** Clicked on Close ***", async ()=>{});
    await test.step(
      "*** Verified if user is able to see only three fields in simple form ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T21505 @Env-All TC_C95475 Verify user is able to edit the iclient in connection page", async ({io,page}, testInfo) => {
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
    test.step("*** Selected OAuth 2.0 client ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.EDIT_RESOURCE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.OAUTH2_CLIENT_SECRET,
      "SDFF"
    );
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    expect(await page.locator(selectors.connectionsPagePO.OAUTH2_CLIENT_ID)).not.toBeVisible();
    expect(await page.locator(selectors.connectionsPagePO.ICLIENT_ID)).toBeVisible();
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await test.step(
      "*** Verified if User is able to edit the iClient through connection page ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
