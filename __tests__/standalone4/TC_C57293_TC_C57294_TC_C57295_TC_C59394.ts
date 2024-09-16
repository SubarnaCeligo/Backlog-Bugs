
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C57293_TC_C57294_TC_C57295_TC_C59394", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("TC_C57293 @Env-All @Zephyr-IO-T16912", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "iClients");
    test.step("Clicked on Iclients button", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(selectors.basePagePO.VALIDDOMAIN, "sfsd,dfsd,dsfsd,sfsd");
    var errmsg = await io.homePage.getText(selectors.flowBuilderPagePO.ERRORMESSAGE);
    await io.assert.expectToContainValue("Only 3 domain names are allowed", String(errmsg), "");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Navigate to home page ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Verified Valid domain names field should shown an error ***", async () => { });
  });
  test("TC_C57294 @Env-All @Zephyr-IO-T16913", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "iClients");
    test.step("Clicked on Iclients button", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.connectionsPagePO.GENERAL);
    var asterisk = await io.homePage.getTextFromElement(selectors.basePagePO.VALIDDOMAIN_LABEL, "*");
    await io.assert.expectToBeTrue(asterisk, "");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Navigate to home page ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Verified Valid domain names field name should be mandatory field for OAuth 2 iclients ***", async () => { });
  });
  test("TC_C57295_TC_C59394 @Env-All @Zephyr-IO-T16913 @Zephyr-IO-T16943", async ({ io, page }, testInfo) => {
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources", "iClients");
    test.step("Clicked on Iclients button", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.VALIDHELPTEXT);
    test.step("*** Clicking on the question mark ***", async () => { });
    const validtypehelptext = await page.locator(selectors.importPagePO.HELPTEXT_DATA).textContent();
    expect(validtypehelptext).toContain("Enter each unique domain name for the OAuth URLs (Authorization, Access Token, Revoke Token) as comma-separated values. If your domain name is the same for each URL, only provide it once.    For example, if your URLs are:   https://<AccessTokenURL>.domain.com https://<RevokeTokenURL>.domain1.com https://<AuthorizationURL>.domain2.com  write domain.com, domain1.com, domain2.com.   If your URLs are:  https://<RevokeTokenURL>.domain.com https://<AuthorizationURL>.domain.com https://<AccessTokenURL>.domain.com  write domain.com.");
    // TC_C59394-Verify  submit button and thumbs down under new help text component
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.THUMNSDOWNICON);
    test.step("*** Verified Thumbsdown icon under help text ***", async () => { });
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.TEXTAREA);
    await io.homePage.isPageReady();
    await io.homePage.fill(selectors.flowBuilderPagePO.TEXTAREA, "test");
    test.step("*** Verified placeholder text under help text ***", async () => { });
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.HELPTEXTSUBMIT);
    test.step("*** Verified submit button under help text ***", async () => { });
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Navigate to home page ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Verified Help text should be same as mentioned for Valid domain names field   ***", async () => { });
  });
});
