
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C95481_TC_C95482_TC_C95483_TC_C95484", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T21510 @Env-All TC_C95481 Verify API Type is showing in Resources iClient page", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","iClients");
    test.step("*** Clicked on iClients button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on Create iClient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.APPLICATION
    );
    test.step("*** Clicked on Application ***", async ()=>{});
    await io.homePage.selectTextfromDropDown(page, "meta")
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    expect(page.getByText("API type")).toBeVisible();
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(
      selectors.basePagePO.DISCARD_CHANGES
    );
    await test.step(
      "*** Verified if API Type field is shown after application in Resources iClient page ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
  test("@Zephyr-IO-T21511 @Env-All TC_C95482 Verify able to select the different API Types", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","iClients");
    test.step("*** Clicked on iClients button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.integrationPagePO.ADDNEWRESOURCE
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.APPLICATION
    );
    await io.homePage.selectTextfromDropDown(page, "meta")
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const apiType1 = await page.locator(selectors.connectionsPagePO.INSTAGRAM_ADS);
    const apiType2 = await page.locator(selectors.connectionsPagePO.FACEBOOK_ADS);
    expect(apiType1).toBeVisible();
    expect(apiType2).toBeVisible();
    await test.step(
      "*** Verified if API Types are getting displayed ***",
      async ()=>{}
    );
    await apiType1.click();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await apiType2.click();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await test.step(
      "*** Verified if user is able to select different API Types ***",
      async ()=>{}
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(
      selectors.basePagePO.DISCARD_CHANGES
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T21512 @Env-All TC_C95483 Verify the pre-configured values as per 2.0 metadata", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","iClients");
    test.step("*** Clicked on iClients button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.integrationPagePO.ADDNEWRESOURCE
    );
    test.step("*** Clicked on Create iClient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.APPLICATION
    );
    await io.homePage.selectTextfromDropDown(page, "meta")
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.FACEBOOK_ADS);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    var granttype = await io.homePage.getTextFromElement(
      selectors.connectionsPagePO.OAUTH2_GRANT_TYPE,
      "Authorization code"
    );
    await io.assert.expectToBeTrue(granttype, "");

    var basicheader = await io.homePage.getTextFromElement(
      selectors.connectionsPagePO.SEND_CLIENT_CREDENTIALS_VIA,
      "Basic auth header"
    );
    await io.assert.expectToBeTrue(basicheader, "");
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(
      selectors.basePagePO.DISCARD_CHANGES
    );
    await test.step(
      "*** Verified Pre-configured values should be shown as per 2.0 metadata ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T21513 @Env-All TC_C95484 Verify user is able to create an iClient through Resources iClient page", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","iClients");
    test.step("*** Clicked on iClients button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.integrationPagePO.ADDNEWRESOURCE
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.RENAME,
      "TC_C95484 FACEBOOK META ICLIENT"
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.APPLICATION
    );
    await io.homePage.selectTextfromDropDown(page, "meta")
    await io.homePage.click(selectors.connectionsPagePO.FACEBOOK_ADS);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.OAUTH2_CLIENT_ID,
      "dfsf"
    );
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.OAUTH2_CLIENT_SECRET,
      "dfsf"
    );
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SEARCHBUTTON,
      "TC_C95484 FACEBOOK META ICLIENT"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.homePage.click(selectors.basePagePO.DELETE);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await test.step(
      "***Verified if user is able to create an iClient through Resources iClient page ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
