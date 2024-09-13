
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C57214_TC_C57215_TC_C57216", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("TC_C57214 @Env-All @Zephyr-IO-T16901", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Connections");
    test.step("*** clicked on connection button ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP  as the adaptor ***", async () => { });
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    await io.homePage.click(selectors.connectionsPagePO.APPLICATION_DETAILS);
    await io.homePage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.homePage.click(selectors.connectionsPagePO.OAUTH);
    var scope = await io.homePage.isVisible(selectors.flowBuilderPagePO.SCOPEGDRIVE);
    await io.assert.expectToBeTrue(scope, "");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Navigate to home page ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Verified Scope field should be shown for all OAuth 2 iclients ***", async () => { });
  });
  test("TC_C57215 @Env-All @Zephyr-IO-T16902", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "Connections");
    test.step("*** clicked on connection button ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP  as the adaptor ***", async () => { });
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    await io.homePage.click(selectors.connectionsPagePO.APPLICATION_DETAILS);
    await io.homePage.click(selectors.connectionsPagePO.SLACK_AUTH_TYPE);
    await io.homePage.click(selectors.connectionsPagePO.OAUTH);
    var oauth = await io.homePage.isVisible(selectors.connectionsPagePO.ICLIENT_ID);
    await io.assert.expectToBeTrue(oauth, "");
    var scope1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.SCOPEGDRIVE);
    await io.assert.expectToBeTrue(scope1, "");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Navigate to home page ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Verified OAuth 2.0 fields should be present under Configure OAuth 2.0 ***", async () => { });
  });
  test("TC_C57216 @Env-All @Zephyr-IO-T16903", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Connections");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP  as the adaptor ***", async ()=>{});
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    await io.homePage.click(selectors.connectionsPagePO.APPLICATION_DETAILS);
    await io.homePage.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    var statuscode = await io.homePage.isVisible(selectors.basePagePO.HTTPSTATUSCODE);
    await io.assert.expectToBeTrue(statuscode, "");
    var responsebody = await io.homePage.isVisible(selectors.basePagePO.HTTPRESPONSEBODY);
    await io.assert.expectToBeTrue(responsebody, "");
    var errorvalues = await io.homePage.isVisible(selectors.basePagePO.AUTHERRORVALUES);
    await io.assert.expectToBeTrue(errorvalues, "");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Navigate to home page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Verified Non-Standard API Response Patterns fields ***", async ()=>{});
  });
});
