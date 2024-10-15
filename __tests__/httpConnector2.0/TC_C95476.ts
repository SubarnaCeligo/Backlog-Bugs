
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C95476_TC_C95477_TC_C95478", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T21506 @Env-All TC_C95476 Verify the values in http iClient form through connection page", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "Meta");
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
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.HTTP_FORM_SWITCH,
      1
    );
    test.step("*** Clicked on HTTP toggle ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    test.step("*** Clicked on General ***", async ()=>{});
    await io.homePage.loadingTime();
    const apiType = await page.locator(
      selectors.myAccountPagePO.PARAGRAPH_BOX
    );
    if (await apiType.isVisible()) {
      expect(await apiType.textContent()).toContain("Facebook Ads");
    }
    const grantType = await io.homePage.getText(
      selectors.connectionsPagePO.OAUTH2_GRANT_TYPE
    );
    expect(grantType).toContain("Authorization code");
    const sendClientCredsVia = await io.homePage.getText(
      selectors.connectionsPagePO.SEND_CLIENT_CREDENTIALS_VIA
    );
    expect(sendClientCredsVia).toContain("Basic auth header");
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.CLOSE,
      1
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(
      selectors.basePagePO.DISCARD_CHANGES
    );
    await test.step(
      "***Verified In http view the iclients values should shown as per api  type we selected in connection form ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T21507 @Env-All TC_C95477 Verify save and close buttons are working fine", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "Meta");
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
    await page.locator(selectors.basePagePO.NAME).nth(1).fill("TC_C95477 FACEBOOK META ICLIENT");
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
      "TC_C95477 FACEBOOK META ICLIENT"
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
      "*** Verified if save and close buttons are working fine in simple form ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T21508 @Env-All TC_C95478 Verify user is able to create Meta connection successfully", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "Meta");
    await io.homePage.click(
      selectors.connectionsPagePO.META
    );
    test.step("*** Selected Meta as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.FACEBOOK_ADS);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      "TC_C95478 FACEBOOK META CONNECTION"
    );
    await io.homePage.click(
      selectors.connectionsPagePO.ICLIENT_ID
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "FACEBOOK META DND"
    );
    await io.homePage.click(
      selectors.connectionsPagePO.CONFISCOPE
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickByText("ads_read");
    await io.homePage.clickByText("pages_show_list");
    await (await io.homePage.findElementByDataTest("moveSelectedRight")).click();
    await io.homePage.click(
      selectors.connectionsPagePO.SAVE_SCOPE
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.basePagePO.SAVE
    );
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
      selectors.integrationPagePO.HOME_SEARCH,
      "TC_C95478 FACEBOOK META CONNECTION"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.homePage.click(selectors.basePagePO.DELETE);
    await test.step(
      "*** Verified if User is able to create connection successfully ***",
      async ()=>{}
    );
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
