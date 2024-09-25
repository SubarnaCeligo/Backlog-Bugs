
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C64890_TC_C64891_TC_C64894_TC_C64898_TC_C64899", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T17578 @Env-All TC_C64890 Verify the application list under resources iClient", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","iClients");
    test.step("Clicked on iClients button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.integrationPagePO.HOME_SEARCH,
      "OAUTH CLIENT DND"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const rowIndex = (await io.homePage.getElementOrIndex(
      "tbody th",
      "OAUTH CLIENT DND",
      true
    )) as number;
    const colIndex = (await io.homePage.getElementOrIndex(
      "thead th",
      "Application",
      true
    )) as number;

    test.step("Verifying Application field column", async ()=>{});
    const application = await io.homePage.getText(
      await io.homePage.getCellLocator(rowIndex + 1, colIndex + 1)
    );
    await io.assert.expectToBeValue(String(application), "Custom OAuth2.0", "");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
    await test.step(
      "Verified list should contain the existing providers Custom Oauth 2.0",
      async ()=>{}
    );
  });
  test("@Zephyr-IO-T17579 @Env-All TC_C64891 Verify User is able to create iClient from resource Page", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","iClients");
    test.step("Clicked on iClients button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create iClient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const application = await io.homePage.getTextFromElement(
      selectors.flowBuilderPagePO.APPLICATION,
      "Custom OAuth2.0"
    );
    await io.assert.expectToBeTrue(application, "");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("Clicked On Close", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
    await test.step(
      "Verified default option should be “Custom OAuth2.0” and should present the existing view",
      async ()=>{}
    );
  });
  test("@Zephyr-IO-T17581 @Env-All TC_C64894 Verify whether user is able to select application under iClient", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","iClients");
    test.step("Clicked on iClients button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create iClient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.APPLICATION);
    await page.locator(selectors.flowBuilderPagePO.SCROLL_TOP).nth(0).evaluate((el) => {
      el.scrollTop = 0
    });
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await (await io.homePage.findElementByDataValue("3plcentral")).click();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const grantType = await io.homePage.getTextFromElement(
      selectors.connectionsPagePO.OAUTH2_GRANT_TYPE,
      "Client credentials"
    );
    await io.assert.expectToBeTrue(grantType, "");
    const sendClientCredsVia = await io.homePage.getTextFromElement(
      selectors.connectionsPagePO.SEND_CLIENT_CREDENTIALS_VIA,
      "Basic auth header"
    );
    await io.assert.expectToBeTrue(sendClientCredsVia, "");
    const limit = await page.$(selectors.connectionsPagePO.SEND_CLIENT_CREDENTIALS_VIA);
    await limit.focus();
    const sendTokenVia = await io.homePage.getTextFromElement(
      selectors.connectionsPagePO.ACCESS_TOKEN,
      "HTTP header"
    );
    await io.assert.expectToBeTrue(sendTokenVia, "");
    const headerScheme = await io.homePage.getTextFromElement(
      selectors.connectionsPagePO.OAUTH_SCHEMES,
      "Bearer"
    );
    await io.assert.expectToBeTrue(headerScheme, "");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("Clicked On Close", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
    await test.step(
      "Verified Users should be able to select an application and iClient form should be pre-populated with the preconfigured values as per the application",
      async ()=>{}
    );
  });
  test("@Zephyr-IO-T17587 @Env-All TC_C64898 Verify user can able to edit the pre-configured fields", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","iClients");
    test.step("Clicked on iClients button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create iClient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.APPLICATION);
    await page.locator(selectors.flowBuilderPagePO.SCROLL_TOP).nth(0).evaluate((el) => {
      el.scrollTop = 0
    });
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await (await io.homePage.findElementByDataValue("3plcentral")).click();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.OAUTH2_GRANT_TYPE
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.OAUTH_AUTHORIZE_CODE
    );
    const grantType = await io.homePage.getTextFromElement(
      selectors.connectionsPagePO.OAUTH2_GRANT_TYPE,
      "Authorization code"
    );
    await io.assert.expectToBeTrue(grantType, "");
    await io.homePage.click(
      selectors.connectionsPagePO.SEND_CLIENT_CREDENTIALS_VIA
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.CUSTOM_REQUEST_BODY
    );
    const sendClientCredsVia = await io.homePage.getTextFromElement(
      selectors.connectionsPagePO.SEND_CLIENT_CREDENTIALS_VIA,
      "HTTP body"
    );
    await io.assert.expectToBeTrue(sendClientCredsVia, "");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("Clicked On Close", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
    await test.step(
      "Verified Users should be able to modify pre-configured values for OAuth related fields ",
      async ()=>{}
    );
  });
  test("@Zephyr-IO-T17588 @Env-All TC_C64899 Verfy the handelbar under access token url", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","iClients");
    test.step("Clicked on Iclients button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create iClient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.APPLICATION);
    await page.locator(selectors.flowBuilderPagePO.SCROLL_TOP).nth(0).evaluate((el) => {
      el.scrollTop = 0
    });
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await (await io.homePage.findElementByDataValue("3plcentral")).click();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(
      selectors.connectionsPagePO.ACCESS_TOKEN_URL_WDIO,
      1
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.SOURCEFIELD,
      "httpbody"
    );
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(
      selectors.connectionsPagePO.ACCESS_TOKEN_URL_WDIO,
      1
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.HANDLEBAR
    );
    const handlebarText = await io.homePage.getText(selectors.flowBuilderPagePO.HANDLEBAR);
    expect(handlebarText).toContain("httpbody");
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("Clicked On Close", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
    await test.step(
      "Verified Users should be able to modify pre-configured values using handelbars for OAuth related fields ",
      async ()=>{}
    );
  });
});
