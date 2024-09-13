
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C57291_TC_C57292", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("TC_C57291 @Env-All @Zephyr-IO-T16910", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","iClients");
    test.step("Clicked on Iclients button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.homePage.isPageReady();
    var valid = await io.homePage.isVisible(selectors.basePagePO.VALIDDOMAIN);
    await io.assert.expectToBeTrue(valid, "");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Navigate to home page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Verified Valid domain names field should be present test.afterEach revoke token URL under Configure OAuth 2.0 section ***", async ()=>{});
  });
  test("TC_C57292 @Env-All @Zephyr-IO-T16911", async ({ io, page }, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","iClients");
    test.step("Clicked on Iclients button", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.homePage.isPageReady();
    var domain = await io.homePage.getTextFromElement(selectors.basePagePO.VALIDDOMAIN, "");
    await io.assert.expectToBeTrue(domain, "");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Navigate to home page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step("*** Verified Valid domain names field should be default value as empty ***", async ()=>{});
  });
});
