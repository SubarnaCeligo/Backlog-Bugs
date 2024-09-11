import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("[HTTP] Introduce OAuth1.0 auth type without Save & Authorize", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });

  
  test("TC_C56062_Verify (OAuth1.0a) is present under AUTH TYPE dropdown or not. @Env-All @Zephyr-IO-T15568", async ({ io, page }) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    test.step("*** Clicked on CreateConnections Button ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    test.step("*** Clicked on HTTP CONNECTOR ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "HTTP_NewFlow_01");
    test.step("*** Entered Flow Name ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.HTTP_BASE_URI, "https://en.org");
    test.step("*** Entered BASE URI ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SLACK_AUTH_TYPE, "oauth1");
    test.step("*** OAuth 1.0 IS PRESENT UNDER THE AUTH TYPE DROPDOWN ***", async ()=>{});

    await io.homePage.loadingTime();
    const isTestConnectionAvailable = await io.homePage.isVisible(selectors.basePagePO.TEST_CONNECTION);
    await io.assert.expectToBeTrue(isTestConnectionAvailable, "Test Connection button not available");
    const testConnection = await page.locator(selectors.basePagePO.TEST_CONNECTION);
    const isEnabled = await testConnection.isEnabled();
    await io.assert.expectToBeTrue(isEnabled, "Test Connection button is disabled");
    test.step("*** Test Connection button is enabled ***", async () => { });
  });

  
  test("TC_C56069_Verify the [SAVE] button present in Create connection Page. @Env-All @Zephyr-IO-T15569", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    test.step("*** Clicked on CreateConnections Button ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    test.step("*** Clicked on HTTP CONNECTOR ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "HTTP_NewFlow_02");
    test.step("*** Entered Flow Name ***", async ()=>{});

    const isSaveButtonVisible = await io.homePage.isVisible(selectors.basePagePO.SAVE);
    await io.assert.expectToBeTrue(isSaveButtonVisible, "Save button not available");
    const saveButtonAfterChange = await page.locator(selectors.basePagePO.SAVE);
    const isEnabled = await saveButtonAfterChange.isEnabled();
    await io.assert.expectToBeTrue(isEnabled, "Save button is disabled");
  });
  
});
