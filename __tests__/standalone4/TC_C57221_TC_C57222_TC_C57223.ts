
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C57221_TC_C57222_TC_C57223", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("TC_C57221 @Env-All @Zephyr-IO-T16907", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","iClients");
    test.step("Clicked on Iclients button", async ()=>{});
    await io.homePage.loadingTime();
    
    io.flowbranching.flowBranchingPage
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.homePage.click(selectors.connectionsPagePO.OAUTH2_GRANT_TYPE);
    await io.homePage.click(selectors.flowBuilderPagePO.OAUTH_AUTHORIZE_CODE);
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    await io.homePage.click(selectors.basePagePO.CONFIGUREOAUTH);
    await io.homePage.click(selectors.connectionsPagePO.OAUTH_2PT0_OVERRIDES_DROPDOWN);
    selectors.connectionsPagePO.OAUTH_2PT0_OVERRIDES_DROPDOWN
    var defaultscope = await io.homePage.isVisible(selectors.basePagePO.DEFAULTSCOPELIMITER);
    await io.assert.expectToBeTrue(defaultscope, "");
    var accessheaders = await io.homePage.isVisible(selectors.basePagePO.ACCESSTOKENHEADERS);
    await io.assert.expectToBeTrue(accessheaders, "");
    var accesstoken = await io.homePage.isVisible(selectors.basePagePO.ACCESSTOKENBODY);
    await io.assert.expectToBeTrue(accesstoken, "");
    var refreshtoken = await io.homePage.isVisible(selectors.basePagePO.REFRESHTOKENHEADERS);
    await io.assert.expectToBeTrue(refreshtoken, "");
    var refreshtokenbody = await io.homePage.isVisible(selectors.basePagePO.REFRESHTOKENBODY);
    await io.assert.expectToBeTrue(refreshtokenbody, "");
    var revoketoken = await io.homePage.isVisible(selectors.basePagePO.REVOKETOKENHEADERS);
    await io.assert.expectToBeTrue(revoketoken, "");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Navigate to home page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Verified OAuth 2.0 Overrides section thes fields should be present in iclient for from resource page ***", async ()=>{});
  });
  test("TC_C57222 @Env-All @Zephyr-IO-T16908", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","iClients");
    test.step("Clicked on Iclients button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    await io.homePage.click(selectors.basePagePO.CONFIGUREOAUTH);
    var accesslocation = await io.homePage.isVisible(selectors.basePagePO.ACCESSTOKENLOCATION);
    await io.assert.expectToBeTrue(accesslocation, "");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Navigate to home page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Verified Configure OAuth token section these fields  should be present in iclient form from resource page ***", async ()=>{});
  });
  test("TC_C57223 @Env-All @Zephyr-IO-T16909", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","iClients");
    test.step("Clicked on Iclients button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    await io.homePage.click(selectors.basePagePO.CONFIGUREOAUTH);
    await io.homePage.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    var httpstatus = await io.homePage.isVisible(selectors.basePagePO.OVERRIDEHTTPSTATUS);
    await io.assert.expectToBeTrue(httpstatus, "");
    var pathtoauth = await io.homePage.isVisible(selectors.basePagePO.PATHOAUTHERRORS);
    await io.assert.expectToBeTrue(pathtoauth, "");
    var oautherrorvalues = await io.homePage.isVisible(selectors.basePagePO.ERRORVALUES);
    await io.assert.expectToBeTrue(oautherrorvalues, "");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Navigate to home page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Verified Non- Standard API Response Pattern section should be present in iclient form from resource page ***", async ()=>{});
  });
});
