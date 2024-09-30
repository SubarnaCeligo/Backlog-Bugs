
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C95470_TC_C95471_TC_C95472", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T21500 @Env-All TC_C95470 Verify OAuth 2.0 client field is showing in meta application connection form", async ({io,page}, testInfo) => {
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
    expect(await page.locator(selectors.connectionsPagePO.ICLIENT)).toBeVisible();
    await test.step(
      "*** Verifying OAuth 2.0 client field should be shown in connection page ***",
      async ()=>{}
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(
      selectors.basePagePO.DISCARD_CHANGES
    );
    test.step("*** Clicking on Close   ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T21501 @Env-All TC_C95471 Verify simple/http toggle is showing in iClients page", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
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
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.ADDNEWRESOURCE,
      1
    );
    test.step("*** Clicked on Create iClient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const simpleToggle = await page.locator(selectors.flowBuilderPagePO.SIMPLE_FORM_SWITCH).nth(1);
    const httpToggle = await page.locator(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH).nth(1);
    expect(await simpleToggle).toBeVisible();
    expect(await httpToggle).toBeVisible();
    await httpToggle.click();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await simpleToggle.click();
    await test.step(
      "*** Verifying user should be able to see simple/http toggle in create iClient page ***",
      async ()=>{}
    );
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
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T21502 @Env-All TC_C95472 Verify user is able to create iClient for Instagram Ads", async ({io,page}, testInfo) => {
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
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.ADDNEWRESOURCE,
      1
    );
    test.step("*** Clicked on Create iClient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await page.locator(selectors.basePagePO.NAME).nth(1).fill("TC_C95472 INSTAGRAM META ICLIENT");
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
      "TC_C95472 INSTAGRAM META ICLIENT"
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
      "*** Verified if User is able to create iClient in Simple view for Instagram Ads ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
