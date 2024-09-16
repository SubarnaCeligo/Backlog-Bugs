import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C41241_all_auth_type", async () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T9958 @Env-All TC_C41241_all_auth_type", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    test.step("*** clicked on create connection ***", async ()=>{});

    await io.homePage.click(selectors.connectionsPagePO.GRAPHQL_CONNECTOR);
    test.step("*** clicked on adobe Sign adaptor ***", async ()=>{});
    test.step("*** selecting the json as media type   ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    test.step("*** selecting the the auth dropdown field   ***", async ()=>{});

    var Oauth = await page.locator(selectors.connectionsPagePO.OAUTH);
    await Oauth.isVisible();
    test.step("*** selecting the Oauth as auth type  ***", async ()=>{});
    var basic = await page.locator(selectors.connectionsPagePO.BASIC);
    await basic.isVisible();
   
    test.step("*** selecting the basic as auth type  ***", async ()=>{});
    var custom = await page.locator(selectors.connectionsPagePO.CUSTOM);
    await custom.isVisible();
    test.step("*** selecting the Custom as auth type  ***", async ()=>{});
    var digest = await page.locator(selectors.connectionsPagePO.DIGEST);
    await digest.isVisible();
    test.step("*** selecting the digest as auth type  ***", async ()=>{});
    var token = await page.locator( selectors.flowBuilderPagePO.MANUAL);
    await token.isVisible();
    selectors.flowBuilderPagePO.COOKIE_AUTHORIZE
    test.step("*** selecting the token as auth type  ***", async ()=>{});
    var cookie = await page.locator(selectors.flowBuilderPagePO.COOKIE_AUTHORIZE);
    await cookie.isVisible();
    test.step("*** selecting the cookie as auth type  ***", async ()=>{});
    var Wsse = await page.locator( selectors.connectionsPagePO.WSSE);
   
    await Wsse.isVisible();
    test.step("*** selecting the Wsseas auth type  ***", async ()=>{});
    await io.homePage.click( selectors.flowBuilderPagePO.MANUAL);
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** clicking close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** clicking Discard button ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Navigating to Home Page   ***", async ()=>{});
  });
});
