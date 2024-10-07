
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C96041_TC_C96043_TC_C96044", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T21441 @Env-All TC_C96041 Verify custom settings are displaying in resource iclient page", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","iClients");
    test.step("Clicked on Iclients button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create iclient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.APPLICATION
    );
    await io.homePage.selectTextfromDropDown(page, "gusto")
    await io.homePage.loadingTime();
    var settings = await io.homePage.isVisible(
      selectors.connectionsPagePO.ENVIRONMENT
    );
    await io.assert.expectToBeTrue(settings, "");
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await test.step(
      "*** User Field should be displayed in resource iclient page as per http metadata 2.0***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T21442 @Env-All TC_C96043 Verify the default values in HTTP view", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.GUSTO_CONNECTION
    );
    test.step("*** Selected Gusto as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.ADDNEWRESOURCE,
      1
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.HTTP_2DOT0,
      1
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var settings1 = await io.homePage.isVisible(
      selectors.connectionsPagePO.ENVIRONMENT
    );
    await io.assert.expectToBeTrue(settings1, "");
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    var code = await io.homePage.getTextFromElement(
      selectors.connectionsPagePO.OAUTH2_GRANT_TYPE,
      "Authorization code"
    );
    await io.assert.expectToBeTrue(code, "");
    await io.homePage.click(
      selectors.basePagePO.CONFIGUREOAUTH
    );
    var code1 = await io.homePage.getTextFromElement(
      selectors.connectionsPagePO.ACCESS_TOKEN,
      "HTTP header"
    );
    await io.assert.expectToBeTrue(code1, "");
    var code2 = await io.homePage.getTextFromElement(
      selectors.connectionsPagePO.OAUTH_SCHEMES,
      "Bearer"
    );
    await io.assert.expectToBeTrue(code2, "");
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.CLOSE,
      1
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await test.step(
      "*** User Fields should be populated by default as per http metadata 2.0***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T21443 @Env-All TC_C96044 Verify the functionality of iclient in simple view", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.GUSTO_CONNECTION
    );
    test.step("*** Selected Gusto as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.ADDNEWRESOURCE,
      1
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const iClientName = await page.locator(selectors.basePagePO.NAME).nth(1);
    await iClientName.fill("TC_C96044_GUSTO");
    await io.homePage.clickButtonByIndex(
      selectors.connectionsPagePO.ENVIRONMENT,
      1
    );
    await io.homePage.click(selectors.flowBuilderPagePO.SANDBOX);
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.OAUTH2_CLIENT_ID,
      "jhbscj"
    );
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.OAUTH2_CLIENT_SECRET,
      "jrtyu"
    );
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.goToMenu("Resources","iClients");
    test.step("*** clicked on iClients button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.integrationPagePO.HOME_SEARCH,
      "TC_C96044_GUSTO"
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
      "*** User iClients functionality in Simple view  by adding conditions to iClients section in the http2.0 metadata ***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
