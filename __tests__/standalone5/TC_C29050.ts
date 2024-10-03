import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C29050", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T6452 @Env-All TC_C29050", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.basePagePO.DASHBOARD);
    await io.homePage.loadingTime();
    test.step("*** Clicked on Dashboard ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.COMPLETED_FLOWS);
    await io.homePage.loadingTime();
    test.step("*** Clicked on completed flows ***", async ()=>{});

    await io.homePage.click("//button[text()='Last 24 hours']");

    let today = await page.locator("//p[text()='Today']").isVisible();
    await io.assert.expectToBeTrue(today, "");

    let last36Hours = await page.locator("//p[text()='Last 36 hours']").isVisible();
    await io.assert.expectToBeTrue(last36Hours, "");

    let last15Days = await page.locator("//p[text()='Last 15 days']").isVisible();
    await io.assert.expectToBeTrue(last15Days, "");

    let custom = await page.locator("//p[text()='Custom']").isVisible();
    await io.assert.expectToBeTrue(custom, "");

    let last24Hours = await page.locator("//p[text()='Last 24 hours']").isVisible();
    await io.assert.expectToBeTrue(last24Hours, "");

    let last7Days = await page.locator("//p[text()='Last 7 days']").isVisible();
    await io.assert.expectToBeTrue(last7Days, "");

    let last30Days = await page.locator("//p[text()='Last 30 days']").isVisible();
    await io.assert.expectToBeTrue(last30Days, "");

    test.step("*** Verified all the date ranges  ***", async ()=>{});
  });
});
