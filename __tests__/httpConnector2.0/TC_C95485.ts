
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C95485_TC_C95486_TC_C95487", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T21514 @Env-All TC_C95485 Verify if user is able to edit the iClient through Resources iClient page", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","iClients");
    test.step("*** Clicked on iClients button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SEARCHBUTTON,
      "INSTAGRAM ADS DND"
    );
    test.step("*** Searched for the desired existing iClients ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await io.homePage.click(selectors.integrationPagePO.EDIT);
    test.step("*** Clicked on Edit button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.OAUTH2_CLIENT_SECRET,
      "SDFF"
    );
    test.step("*** Updated the Client Secret ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await test.step(
      "*** Verified if user is able to edit the iClient through Resources iClient page ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T21515 @Env-All TC_C95486 Verify Save and close buttons are working properly", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","iClients");
    test.step("*** Clicked on iClients button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.integrationPagePO.ADDNEWRESOURCE
    );
    test.step("*** Clicked on Create iClient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.RENAME,
      "TC_C95486 FACEBOOK ADS ICLIENT"
    );
    test.step("*** Entered name of the iClient ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.APPLICATION
    );
    await io.homePage.selectTextfromDropDown(page, "meta")
    test.step("*** Selected Meta as the application ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.FACEBOOK_ADS);
    test.step("*** Selected Facebook Ads as the API type ***", async ()=>{});
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
    test.step("*** Entered Client ID and Client Secret ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    test.step("*** Saving and Closing the iClient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SEARCHBUTTON,
      "TC_C95486 FACEBOOK ADS ICLIENT"
    );
    test.step("*** Searched for the created iClient ***", async ()=>{});
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
      "*** Verified if save and close buttons are working fine ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T21516 @Env-All TC_C95487 Verify if iClient created under Resources is shown in Connection page", async ({io,page}, testInfo) => {
    const iClientName = "TC_C95487 INSTAGRAM ADS ICLIENT";
    await io.homePage.goToMenu("Resources","iClients");
    test.step("*** Clicked on iClients button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.integrationPagePO.ADDNEWRESOURCE
    );
    test.step("*** Clicked on Create iClient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.RENAME,
      iClientName
    );
    test.step("*** Entered name of the iClient ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.APPLICATION
    );
    await io.homePage.selectTextfromDropDown(page, "meta")
    test.step("*** Selected Meta as the application ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.INSTAGRAM_ADS);
    test.step("*** Selected Instagram Ads as the API type ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.OAUTH2_CLIENT_ID,
      "123"
    );
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.OAUTH2_CLIENT_SECRET,
      "123"
    );
    test.step("*** Entered Client ID and Client Secret ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    test.step("*** Saving and Closing the iClient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** Clicked on Connections button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** Clicked on Create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.META);
    test.step("*** Selected Meta as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.INSTAGRAM_ADS);
    test.step("*** Selected Instagram Ads as the API type ***", async ()=>{});
    await io.homePage.click(
      selectors.connectionsPagePO.ICLIENT_ID
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      iClientName
    );
    expect(await io.homePage.getText(selectors.connectionsPagePO.ICLIENT_ID)).toBe(iClientName);
    await test.step(
      "*** Verified if OAuth 2.0 client dropdown contains the iClient which we created under Resources iClient ***",
      async ()=>{}
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    test.step("*** Closing the Create connection drawer ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.DISCARD_CHANGES
    );
    await io.homePage.goToMenu("Resources","iClients");
    test.step("*** Clicked on iClients button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SEARCHBUTTON,
      iClientName
    );
    test.step("*** Searched for the created iClient ***", async ()=>{});
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
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
