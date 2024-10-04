
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C96035_TC_C96036_TC_C96037_TC_C96039", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T21435 @Env-All TC_C96035 Verify custom settings are displaying for iclient simple page", async ({io,page}, testInfo) => {
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
    var name = await io.homePage.isVisible(
      selectors.basePagePO.NAME
    );
    await io.assert.expectToBeTrue(name, "");
    var settings = await io.homePage.isVisible(
      selectors.connectionsPagePO.ENVIRONMENT
    );
    await io.assert.expectToBeTrue(settings, "");
    var clientid = await io.homePage.isVisible(
      selectors.connectionsPagePO.OAUTH2_CLIENT_ID
    );
    await io.assert.expectToBeTrue(clientid, "");
    var clientsecret = await io.homePage.isVisible(
      selectors.connectionsPagePO.OAUTH2_CLIENT_SECRET
    );
    await io.assert.expectToBeTrue(clientsecret, "");
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.CLOSE,
      1
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    test.step("*** Clicking on Close   ***", async ()=>{});
    await test.step(
      "*** User should be able to displayed in simple view as per http metadata 2.0***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T21436 @Env-All TC_C96036 Verify custom settings are displaying for flow level", async ({io, page}) => {
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    // Navigate to flowspage
    await io.homePage.click(selectors.basePagePO.SEARCH);
    await io.homePage.fillWebPage(
      selectors.basePagePO.SEARCH,
      "TC_C96036_DND"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.OPENACTIONSMENU,
      1
    );
    await (await io.homePage.findElementByDataTest("editFlow")).click();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.NOTIFICATION_CONNECTIONS
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(
      selectors.connectionsPagePO.ACTIONS_MENU_BUTTON,
      1
    );
    await io.homePage.click(selectors.integrationPagePO.EDIT);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.ADDNEWRESOURCE,
      0
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var settings1 = await io.homePage.isVisible(
      selectors.connectionsPagePO.ENVIRONMENT
    );
    await io.assert.expectToBeTrue(settings1, "");
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.CLOSE,
      1
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await test.step(
      "*** User Custom settings should be shown flow level***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T21437 @Env-All TC_C96037 Verify custom settings are displaying for integration level", async ({io}) => {
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    // Navigate to flowspage
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.CONNECTIONS,
      0
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(
      selectors.myAccountPagePO.INVITE_USER_BUTTON,
      2
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.GUSTO_CONNECTION
    );
    test.step("*** Selected Gusto as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.integrationPagePO.ADDNEWRESOURCE
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var settings2 = await io.homePage.isVisible(
      selectors.connectionsPagePO.ENVIRONMENT
    );
    await io.assert.expectToBeTrue(settings2, "");
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.CLOSE,
      1
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await test.step(
      "*** User Custom settings should be shown integration level***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T21439 @Env-All TC_C96039 Verify custom settings are displaying for iclient HTTP page", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
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
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.HTTP_2DOT0,
      2
    );
    await io.homePage.loadingTime();
    var settings3 = await io.homePage.isVisible(
      selectors.connectionsPagePO.ENVIRONMENT
    );
    await io.assert.expectToBeTrue(settings3, "");
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.CLOSE,
      1
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await test.step(
      "*** User Fields should be displayed in HTTP view as per http metadata 2.0***",
      async ()=>{}
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
