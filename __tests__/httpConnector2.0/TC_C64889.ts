
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C64889_TC_C64896_TC_C64897_TC_C64901_TC_C64905_TC_C64906_TC_C64907_TC_C68274", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T17576 @Env-All TC_C64889 Verify while creating the iClient user should navigates to the older view of iClient creation form ", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "Acumatica");
    await (await io.homePage.findElementByDataTest('Acumatica')).click();
    test.step("*** Selected Acumatica as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.SLACK_AUTH_TYPE
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "OAuth 2.0"
    );
    test.step("*** Selected Authentication type ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.ADD_NEW_RESOURCE,
      1
    );
    test.step("*** Clicked on create iClient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const name = await page.locator(selectors.basePagePO.NAME).nth(1);
    expect(name).toBeVisible();
    const clientId = await io.homePage.isVisible(
      selectors.connectionsPagePO.OAUTH2_CLIENT_ID
    );
    await io.assert.expectToBeTrue(clientId, "");
    const secret = await io.homePage.isVisible(
      selectors.connectionsPagePO.OAUTH2_CLIENT_SECRET
    );
    await io.assert.expectToBeTrue(secret, "");
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.CLOSE,
      1
    );
    test.step("Clicked On Close", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("Clicked On Close", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
    await test.step(
      "Verified while creating the iClient user should navigates to the older view of iClient creation form",
      async ()=>{}
    );
  });
  test("@Zephyr-IO-T17584 @Env-All TC_C64896 Verify Create iClient with default application value 'Custom OAuth2.0'", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","iClients");
    test.step("Clicked on iClients button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create iclient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.basePagePO.ADD_NAME,
      "TC_C64896 3PL Custom OAuth2.0"
    );
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.OAUTH2_CLIENT_ID,
      "123"
    );
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.OAUTH2_CLIENT_SECRET,
      "123"
    );
    await io.homePage.click(
      selectors.connectionsPagePO.OAUTH2_GRANT_TYPE
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Client credentials"
    );
    await io.homePage.click(
      selectors.connectionsPagePO.SEND_CLIENT_CREDENTIALS_VIA
    );
    await io.homePage
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "Basic auth header"
    );
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.ACCESS_TOKEN_URL_WDIO,
      "123"
    );
    await io.homePage.fillWebPage(
      selectors.basePagePO.VALIDDOMAIN,
      "123"
    );
    await io.homePage.click(
      selectors.connectionsPagePO.ACCESS_TOKEN
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.CUSTOM_REQUEST_BODY
    );
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.integrationPagePO.HOME_SEARCH,
      "TC_C64896 3PL Custom OAuth2.0"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.DELETE
    );
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
    await test.step(
      "Verified User should be able to create an iClient sucessfully with deafult value Custom OAuth2.0",
      async ()=>{}
    );
  });
  test("@Zephyr-IO-T17585 @Env-All TC_C64897 Verify edit iClient under resources", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","iClients");
    test.step("*** Clicked on iClients button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Searching for the desired iClients ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.integrationPagePO.HOME_SEARCH,
      "OAUTH CLIENT DND"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.integrationPagePO.OPENACTIONSMENU
    );
    test.step("*** Clicking on the Edit button ***", async ()=>{});
    await io.homePage.click(selectors.integrationPagePO.EDIT);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Updating the fields ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.ACCESS_TOKEN_URL_WDIO,
      "kjhbgvfc"
    );
    await io.homePage.fillWebPage(
      selectors.connectionsPagePO.OAUTH2_CLIENT_SECRET,
      "jhguytr"
    );
    test.step("*** Saving and closing ***", async ()=>{});
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
    await test.step(
      "Verified User should be able to edit a iClient",
      async ()=>{}
    );
  });
  test("@Zephyr-IO-T17591 @Env-All TC_C64901 Verify Application name for the iClient created under connection form", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","iClients");
    test.step("*** Clicked on iClients button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Searching for the desired iClients ***", async ()=>{});
    await io.homePage.fillWebPage(
      selectors.integrationPagePO.HOME_SEARCH,
      "3PL iClient"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    const rowIndex = (await io.homePage.getElementOrIndex(
      "tbody th",
      "3PL iClient",
      true
    )) as number;
    const colIndex = (await io.homePage.getElementOrIndex(
      "thead th",
      "Application",
      true
    )) as number;

    test.step("Verifying Application column", async ()=>{});
    const application = await io.homePage.getText(
      await io.homePage.getCellLocator(rowIndex + 1, colIndex + 1)
    );
    await io.assert.expectToBeValue(String(application), "3PL Central", "");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
    await test.step(
      "Verified Application name for the iClient created under connection form",
      async ()=>{}
    );
  });
  test("@Zephyr-IO-T17594 @Env-All TC_C64905 Verify application field for iClient under resources", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","iClients");
    test.step("*** Clicked on iClients button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Searching for the desired iClients ***", async ()=>{});
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

    test.step("Verifying the Application column", async ()=>{});
    const applicataion = await io.homePage.getText(
      await io.homePage.getCellLocator(rowIndex + 1, colIndex + 1)
    );
    await io.assert.expectToBeValue(String(applicataion), "Custom OAuth2.0", "");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
    await test.step(
      "Verified Provider should be update with the name applicataion",
      async ()=>{}
    );
  });
  test("@Zephyr-IO-T17596 @Env-All TC_C64906 Verify iClients created for 1.0 apps will be listed as Custom OAuth2.0", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","iClients");
    test.step("*** Clicked on iClients button ***", async ()=>{});
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

    test.step("*** Verifying Application column ***", async ()=>{});
    const application = await io.homePage.getText(
      await io.homePage.getCellLocator(rowIndex + 1, colIndex + 1)
    );
    await io.assert.expectToBeValue(String(application), "Custom OAuth2.0", "");
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
    await test.step(
      "Verified iClients created for 1.0 apps will be listed as Custom OAuth2.0",
      async ()=>{}
    );
  });
  test("@Zephyr-IO-T17597 @Env-All TC_C64907 Verify iClient form for 1.0 apps", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await (await io.homePage.findElementByDataTest('Acumatica')).click();
    test.step("*** Selected Acumatica as the adaptor ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.connectionsPagePO.SLACK_AUTH_TYPE
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.myAccountPagePO.SELECTTYPE,
      "OAuth 2.0"
    );
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.ADD_NEW_RESOURCE,
      1
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const name = await page.locator(selectors.basePagePO.NAME).nth(1);
    expect(name).toBeVisible();
    const clientId = await io.homePage.isVisible(
      selectors.connectionsPagePO.OAUTH2_CLIENT_ID
    );
    await io.assert.expectToBeTrue(clientId, "");
    const secret = await io.homePage.isVisible(
      selectors.connectionsPagePO.OAUTH2_CLIENT_SECRET
    );
    await io.assert.expectToBeTrue(secret, "");
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.CLOSE,
      1
    );
    test.step("*** Clicked On Close ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicked On Close ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Clicking on  Discard Changes    ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
    await test.step(
      "Verified No change in the connection form its should be same as production ",
      async ()=>{}
    );
  });
  test("@Zephyr-IO-T17600 @Env-All TC_C68274 Verify application field is enabled under iClient", async ({io,page}, testInfo) => {
    await io.homePage.goToMenu("Resources","iClients");
    test.step("Clicked on iClients button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create iclient ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(
      selectors.flowBuilderPagePO.APPLICATION,
      "zoom"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    const application = await io.homePage.getTextFromElement(
      selectors.flowBuilderPagePO.APPLICATION,
      "Zoom"
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.assert.expectToBeTrue(application, "");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("Clicked On Close", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page ***", async ()=>{});
    await test.step(
      "Verified Application field should be enabled to select any application under dropdown and modify it",
      async ()=>{}
    );
  });
});
