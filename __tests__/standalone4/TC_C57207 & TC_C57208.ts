import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("[HTTP Adapter] OAuth 2 Re-design", () => {
  test.beforeEach(async ({ io, page }, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });

  test("TC_C57207_Verify user is able to see  AFE for few fields on iClient form. @Env-All @Zephyr-IO-T6894", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "iClients");
    test.step("Clicked on Iclients button", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    test.step("*** Clicked on Create iClient ***", async () => { });
    await io.homePage.click(selectors.connectionsPagePO.OAUTH_2PT0_OVERRIDES_DROPDOWN);
    test.step("*** Clicked on OAuth 2.0 overrides dropdown ***", async () => { });
    const isAccessTokenUrlVisible = await io.homePage.isVisible(selectors.connectionsPagePO.ACCESS_TOKEN_URL_WDIO);
    await io.assert.expectToBeTrue(isAccessTokenUrlVisible, "Access token URL is not present");
    test.step("*** Access token URL is present ***", async () => { });
    const isRevokeTokenUrlVisible = await io.homePage.isVisible(selectors.connectionsPagePO.REVOKE_TOKEN_URL);
    await io.assert.expectToBeTrue(isRevokeTokenUrlVisible, "Revoke token URL is not present");
    test.step("*** Revoke token URL is present ***", async () => { });
    var value = await page.locator(selectors.connectionsPagePO.ACCESS_TOKEN_HEADERS).locator(selectors.connectionsPagePO.HANDLEBAR_EDITOR).isVisible()
    await io.assert.expectToBeTrue(value, "")
    test.step("*** Override access token HTTP headers is present ***", async () => { });
    await io.assert.checkElementState(selectors.connectionsPagePO.ACCESS_TOKEN_BODY, "isVisible")
    test.step("*** Override access token HTTP request body is present ***", async () => { });
    value = await page.locator(selectors.connectionsPagePO.REVOKE_TOKEN_HEADERS).locator(selectors.connectionsPagePO.HANDLEBAR_EDITOR).isVisible()
    await io.assert.expectToBeTrue(value, "")
    test.step("*** Override revoke token HTTP headers is present ***", async () => { });
    await io.assert.checkElementState(selectors.connectionsPagePO.REVOKE_TOKEN_BODY, "isVisible")
    test.step("*** Override revoke token HTTP request body is present ***", async () => { });
  });

  test("TC_C57208_Verify user is enable to edit the AFE field for few fields in iclient form. @Env-All @Zephyr-IO-T16895", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "iClients");
    test.step("Clicked on Iclients button", async () => { });
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    test.step("*** Clicked on Create iClient ***", async () => { });

    await io.homePage.click(selectors.connectionsPagePO.OAUTH_2PT0_OVERRIDES_DROPDOWN);
    test.step("*** Clicked on OAuth 2.0 overrides dropdown ***", async () => { });

    await io.homePage.clickButtonByIndex(selectors.connectionsPagePO.ACCESS_TOKEN_URL_WDIO, 1);
    test.step("*** Clicked on Access token URL ***", async () => { });

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, "demo-01");

    var saveloc = await page.$$(selectors.basePagePO.SAVE);
    await saveloc[1].click();
    await io.homePage.loadingTime();
    test.step("*** CLICKED ON SAVE BUTTON ***", async () => { });

    var test1 = await page.$$(selectors.basePagePO.CLOSE);
    await test1[1].click();
    await io.homePage.loadingTime();
    test.step("*** CLICKED ON CLOSE BUTTON ***", async () => { });

    await io.homePage.clickButtonByIndex(selectors.connectionsPagePO.REVOKE_TOKEN_URL, 1);
    test.step("*** Clicked on Revoke token URL ***", async () => { });

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, "demo-02");
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.basePagePO.SAVE_AND_CLOSE, 1);
    await io.homePage.loadingTime();
    test.step("*** Value added on Revoke token URL Field ***", async () => { });

    await io.homePage.clickButtonByIndex(selectors.connectionsPagePO.HANDLEBAR_EDITOR, 0);
    test.step("*** Clicked on Override access token HTTP headers ***", async () => { });
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, "demo-03");
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.basePagePO.SAVE_AND_CLOSE, 1);
    await io.homePage.loadingTime();
    test.step("*** Value added on Override access token HTTP headers Field ***", async () => { });

    await io.homePage.clickButtonByIndex(selectors.connectionsPagePO.ACCESS_TOKEN_BODY, 0);
    test.step("*** Clicked on Override access token HTTP request body ***", async () => { });
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, "demo-04");
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.basePagePO.SAVE_AND_CLOSE, 1);
    test.step("*** Value added on Override access token HTTP request body Field ***", async () => { });

    await io.homePage.clickButtonByIndex(selectors.connectionsPagePO.HANDLEBAR_EDITOR, 1);
    test.step("*** Clicked on Override revoke token HTTP headers ***", async () => { });
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, "demo-05");
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.basePagePO.SAVE_AND_CLOSE, 1);
    test.step("*** Value added on Override revoke token HTTP headers Field ***", async () => { });

    await io.homePage.clickButtonByIndex(selectors.connectionsPagePO.REVOKE_TOKEN_BODY, 0);
    test.step("*** Clicked on Override revoke token HTTP request body ***", async () => { });
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, "demo-06");
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.basePagePO.SAVE_AND_CLOSE, 1);
    test.step("*** Value added on Override revoke token HTTP request body Field ***", async () => { });

    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

});
