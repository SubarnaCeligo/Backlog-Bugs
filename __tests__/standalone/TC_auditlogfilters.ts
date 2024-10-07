
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_C56769", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T15136 TC_C56769", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await page.locator(selectors.homePagePO.PROFILE_MENU).isVisible();
    await io.homePage.click(selectors.homePagePO.PROFILE_MENU);
    test.step("*** Clicked on Profile Page ***", async ()=>{});
    await io.homePage.click(selectors.myAccountPagePO.PROFILE);
    test.step("*** Clicked on my account ***", async ()=>{});
    await io.homePage.click(selectors.myAccountPagePO.AUDIT_LOG);
    test.step("*** Clicked on Auditlogs ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await(await page.locator(selectors.integrationPagePO.SELECTFILTERS)).first().isVisible();
    await io.homePage.clickButtonByIndex(selectors.integrationPagePO.SELECTFILTERS, 0);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.mappings.FLOWRESOURCETYPE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.clickButtonByIndex(selectors.integrationPagePO.SELECTFILTERS, 3);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.SOURCE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.clickButtonByIndex(selectors.integrationPagePO.SELECTFILTERS, 4);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.ACTION);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Clicked on filters ***", async ()=>{});

    var source = await io.homePage.getTextFromElement("//tbody/tr/td[2]", "API");
    await io.assert.expectToBeTrue(source, "");

    var resourcetype = await io.homePage.getTextFromElement("//tbody/tr/td[3]", "Flow");
    await io.assert.expectToBeTrue(resourcetype, "");

    var action = await io.homePage.getTextFromElement("//tbody/tr/td[5]", "Create");
    await io.assert.expectToBeTrue(action, "");
    test.step("*** validated the filter values in auditlogs ***", async ()=>{});
    test.step("*** Testcase passed ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
