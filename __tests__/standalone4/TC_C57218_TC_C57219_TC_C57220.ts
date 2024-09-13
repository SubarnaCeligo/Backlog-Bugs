
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C57218_TC_C57219_TC_C57220", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C57218 @Env-All @Zephyr-IO-T16904", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","iClients");
    test.step("Clicked on Iclients button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    await io.homePage.click(selectors.basePagePO.CONFIGUREOAUTH);
    var general = await io.homePage.isVisible(selectors.connectionsPagePO.GENERAL);
    await io.assert.expectToBeTrue(general, "");
    var configure = await io.homePage.isVisible(selectors.basePagePO.CONFIGUREOAUTH);
    await io.assert.expectToBeTrue(configure, "");
    var overrides = await io.homePage.isVisible(selectors.connectionsPagePO.OAUTH_2PT0_OVERRIDES_DROPDOWN);
    await io.assert.expectToBeTrue(overrides, "");
    var tokenauth = await io.homePage.isVisible(selectors.basePagePO.CONFIGURETOKENAUTH);
    await io.assert.expectToBeTrue(tokenauth, "");
    var nonapi = await io.homePage.isVisible(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    await io.assert.expectToBeTrue(nonapi, "");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Navigate to home page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Verified All the sections should be present in iclient form ***", async ()=>{});
  });
  test("TC_C57219 @Env-All @Zephyr-IO-T16905", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "iClients");
    test.step("Clicked on Iclients button", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var name = await io.homePage.isVisible(selectors.basePagePO.NAME_WDIO);
    await io.assert.expectToBeTrue(name, "");
    await io.homePage.isPageReady();
    var name1 = await io.homePage.isVisible(selectors.basePagePO.APPLICATION_DROP_DOWN);
    await io.assert.expectToBeTrue(name1, "");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Navigate to home page ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Verified General Section should have these fields from resource page ***", async () => { });
  });
  test("TC_C57220 @Env-All @Zephyr-IO-T16906", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","iClients");
    test.step("Clicked on Iclients button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    var clientid = await io.homePage.isVisible(selectors.basePagePO.OAUTH2CLIENTID);
    await io.assert.expectToBeTrue(clientid, "");
    await io.homePage.isPageReady();
    var clientsecret = await io.homePage.isVisible(selectors.basePagePO.OAUTHCLIENTSECRET);
    await io.assert.expectToBeTrue(clientsecret, "");
    var granttype = await io.homePage.isVisible(selectors.basePagePO.OAUTHGRANTTYPE);
    await io.assert.expectToBeTrue(granttype, "");
    var accesstoken = await io.homePage.isVisible(selectors.basePagePO.OAUTH2ACCESSTOKEN);
    await io.assert.expectToBeTrue(accesstoken, "");
    var revoketoken = await io.homePage.isVisible(selectors.basePagePO.REVOKETOKEN);
    await io.assert.expectToBeTrue(revoketoken, "");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Navigate to home page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Verified Configure OAuth 2.0  section these fields should be present in iclient form from resource page ***", async ()=>{});
  });
});
