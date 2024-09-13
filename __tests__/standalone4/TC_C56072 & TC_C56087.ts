import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("[HTTP] Introduce OAuth1.0 auth type without Save & Authorize", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test("TC_C56072_Verify the [Test connection] button. @Env-All @Zephyr-IO-T15572", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    test.step("*** Clicked on CreateConnections Button ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    test.step("*** Clicked on HTTP CONNECTOR ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "HTTP_NewFlow_05");
    test.step("*** Entered Flow Name ***", async ()=>{});

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

  test("TC_C56087_Verify Signature Method dropdown is present or not. @Env-All @Zephyr-IO-T15575", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    test.step("*** Clicked on CreateConnections Button ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.HTTP_2DOT0);
    test.step("*** Clicked on HTTP CONNECTOR ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "HTTP_NewFlow_15");
    test.step("*** Entered Flow Name ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.connectionsPagePO.SLACK_AUTH_TYPE, "oauth1");
    test.step("*** OAuth 1.0 IS PRESENT UNDER THE AUTH TYPE DROPDOWN ***", async ()=>{});

    await io.homePage.loadingTime();
    const isTestConnectionAvailable = await io.homePage.isVisible(selectors.connectionsPagePO.SIGNATURE_METHOD_DROPDOWN);
    await io.assert.expectToBeTrue(isTestConnectionAvailable, "Signature method dropdown is not Present");
  });
});
