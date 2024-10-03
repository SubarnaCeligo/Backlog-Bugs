
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("TC_C29049", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
  });
  test("@Zephyr-IO-T6450 @Env-All TC_C29049", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.basePagePO.DASHBOARD);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Clicked on Dashboard ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Clicked on completed flows ***", async ()=>{});

    await page.locator("//button[text()='Last 24 hours']").isVisible();
    let defaultDateRange1 = await page.locator("//button[text()='Last 24 hours']").isVisible();
    await io.assert.expectToBeTrue(defaultDateRange1, "");
    test.step("*** Verified the default date range  ***", async ()=>{});


    await io.homePage.click("//button[text()='Last 24 hours']");
    await io.homePage.click("//p[text()='Last 36 hours']");
    await io.homePage.click("//button[text()='Apply']");
    test.step("*** Changed the date range to Last 36 hours ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.HOME);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.basePagePO.DASHBOARD);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
    test.step("*** Clicked on completed flows ***", async ()=>{});

    await page.locator("//button[text()='Last 24 hours']").isVisible();
    let defaultDateRange = await page.locator("//button[text()='Last 24 hours']").isVisible();
    await io.assert.expectToBeTrue(defaultDateRange, "");

    test.step("*** Verified the default date range  ***", async ()=>{});
  });
});
