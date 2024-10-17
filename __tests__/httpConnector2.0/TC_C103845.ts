
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C103845", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T24723 @Zephyr-IO-T24724 @Zephyr-IO-T24726 @Env-All TC_C103845 TC_C103846 TC_C103849 Verify jwt iClient in connection page", async ({io,page}, testInfo) => {
    const iClientName = "TC_C103845 ZOOM ICLIENT";
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (
      await page.locator(selectors.basePagePO.RESOURCES)
    ).click();
    test.step(" Clicking on the icclients option ***", async ()=>{});
    await (
      await page.locator(selectors.connectionsPagePO.ICLIENTSTAB)
    ).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create iclient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.RENAME,
      iClientName
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.APPLICATION
    );
    await io.homePage.selectTextfromDropDown(page, "zoom")
    await io.homePage.click(
      selectors.connectionsPagePO.OAUTH2_GRANT_TYPE
    );
    await io.homePage.selectTextfromDropDown(page, "clientcredentials")
    await io.homePage.click(selectors.connectionsPagePO.JWTENABLE);
    await io.homePage.click(
      selectors.connectionsPagePO.JWTSIGNATURE
    );
    await io.homePage.selectTextfromDropDown(page, "rsa-sha256")
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.JWT_PRIVATE_KEY,
      "test"
    );
    await io.homePage.click(
      selectors.basePagePO.SAVE
    );
    await io.homePage.loadingTime();
    const iClientId = (await io.homePage.getCurrentUrl()).split("/").at(-1);
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.RESOURCES);
    await io.homePage.click(selectors.basePagePO.CONNECTIONS);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await (await io.homePage.findElementByDataTest("Zoom")).click();
    test.step("*** Selected Zoom as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.ICLIENT_ID);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.basePagePO.MENU_ITEM,
      iClientName
    );
    const oAuthId = await io.homePage.getText(
      selectors.connectionsPagePO.ICLIENT_ID
    );
    // TC_C103845
    expect(oAuthId).toContain(iClientName);
    await test.step(
      "*** Verified User should able to see the iclient under OAuth 2.0 client dropdown ***",
      async ()=>{}
    );
    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      "TC_C103846 ZOOM CONNECTION"
    );
    await io.homePage.click(
      selectors.basePagePO.SAVE
    );
    await io.homePage.loadingTime();
    // TC_C103846
    await test.step(
      "*** Verified User should able to create connection successfully ***",
      async ()=>{}
    );
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SEARCHBUTTON,
      "TC_C103846 ZOOM CONNECTION"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await io.homePage.click(selectors.integrationPagePO.EDIT);
    await io.homePage.loadingTime();
    const connectionId = (await io.homePage.getCurrentUrl()).split("/").at(-1);
    await io.homePage.click(
      selectors.integrationPagePO.EDITRESOURCE
    );
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.HTTP_2DOT0,
      1
    );
    await io.homePage.loadingTime();
    const payload = await page.locator(
      selectors.connectionsPagePO.PAYLOAD_JWT
    );
    // TC_C103849
    expect(payload.first()).toBeVisible();
    const headers = await page.locator(
      selectors.connectionsPagePO.JWT_HEADERS_FIELD
    );
    expect(headers.first()).toBeVisible();
    await test.step(
      "*** Verified User should able to see JWT fields in edit case ***",
      async ()=>{}
    );
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.CLOSE,
      1
    );
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.loadingTime();
    await io.api.deleteCall("v1/connections/" + connectionId);
    await io.homePage.loadingTime();
    await io.api.deleteCall("v1/recycleBinTTL/connections/" + connectionId);
    await io.homePage.loadingTime();
    await io.api.deleteiClientViaAPI(iClientId);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
  test("@Zephyr-IO-T24725 @Env-All TC_C103847 Verify user is able to see JWT iclient in Universal HTTP/REST connection", async ({io,page}, testInfo) => {
    const iClientName = "TC_C103847 ZOOM ICLIENT";
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (
      await page.locator(selectors.basePagePO.RESOURCES)
    ).click();
    test.step(" Clicking on the icclients option ***", async ()=>{});
    await (
      await page.locator(selectors.connectionsPagePO.ICLIENTSTAB)
    ).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create iclient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.RENAME,
      iClientName
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.APPLICATION
    );
    await io.homePage.selectTextfromDropDown(page, "zoom")
    await io.homePage.click(
      selectors.connectionsPagePO.OAUTH2_GRANT_TYPE
    );
    await io.homePage.selectTextfromDropDown(page, "clientcredentials")
    await io.homePage.click(selectors.connectionsPagePO.JWTENABLE);
    await io.homePage.click(
      selectors.connectionsPagePO.JWTSIGNATURE
    );
    await io.homePage.selectTextfromDropDown(page, "rsa-sha256")
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.JWT_PRIVATE_KEY,
      "test"
    );
    await io.homePage.click(
      selectors.basePagePO.SAVE
    );
    await io.homePage.loadingTime();
    const iClientId = (await io.homePage.getCurrentUrl()).split("/").at(-1);
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.loadingTime();
    test.step(" Clicking on the Resource option ", async ()=>{});
    await (
      await page.locator(selectors.basePagePO.RESOURCES)
    ).click();
    test.step(" Clicking on the connection option ***", async ()=>{});
    await (await page.locator(selectors.basePagePO.CONNECTIONS)).click();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    await io.homePage.click(
      selectors.connectionsPagePO.APPLICATION_DETAILS
    );
    await io.homePage.click(
      selectors.connectionsPagePO.SLACK_AUTH_TYPE
    );
    await io.homePage.selectTextfromDropDown(page, "oauth")
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.ICLIENT_ID);
    await io.homePage.selectTextfromDropDown(page, iClientId)
    const oAuthId = await io.homePage.getText(
      selectors.connectionsPagePO.ICLIENT_ID
    );
    expect(oAuthId).toContain(iClientName);
    await io.homePage.click(
      selectors.basePagePO.CLOSE
    );
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();
    await test.step(
      "*** Verified User should able to see JWT iclient in Unviersal HTTP/REST connection***",
      async ()=>{}
    );
    await io.api.deleteiClientViaAPI(iClientId);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
  });
});
