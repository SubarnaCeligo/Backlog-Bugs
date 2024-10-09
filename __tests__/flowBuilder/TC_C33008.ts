import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C33008 | TC_C33009 | TC_C33015 | TC_C33016", () => {

  // test("@Env-All @Zephyr-IO-T3039| To verify 'Custom' Type is sorted based on number of flows", async ({ io, page }, testInfo) => {
  //   await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  //   await io.homePage.loadingTime();
  //   await io.homePage.loadingTime();
  //   await io.homePage.click(selectors.homePagePO.LIST_VIEW);
  //   await io.homePage.loadingTime();
  //   await io.homePage.clickByText('Type');
  //   await io.homePage.loadingTime();

  //   const box1 = await page.locator("table > tbody > tr:nth-child(1) > td:nth-child(5) > div").textContent();
  //   const num1 = box1.match(/^\d+/)[0];
  //   const box2 = await page.locator("table > tbody > tr:nth-child(2) > td:nth-child(5) > div").textContent();
  //   const num2 = box2.match(/^\d+/)[0];
  //   const num1Converted = Number(num1);
  //   const num2Converted = Number(num2);
  //   expect(num1Converted).toBeGreaterThanOrEqual(num2Converted);
  // });

  // test("@Env-All @Zephyr-IO-T3040| To verify 'Download' integration is removed from main menu", async ({ io, page }, testInfo) => {
  //   test.step("*** Selecting list view ***", async () => { });
  //   await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  //   await io.homePage.loadingTime();
  //   await io.homePage.click(selectors.homePagePO.LIST_VIEW);
  //   await io.homePage.loadingTime();

  //   await test.step(
  //     "*** Verifying if Download integration is removed ***"
  //     , async () => { });
  //   const isDownloadAvailable = await (
  //     await page.locator(selectors.homePagePO.GENERATE_TEMPLATE_ZIP)
  //   ).isVisible();
  //   expect(isDownloadAvailable).toBeFalsy();
  // });

  // test("@Env-All @Zephyr-IO-T3046| To verify sorting order is maintained independently for list view", async ({ io, page }) => {
  //   await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  //   await io.homePage.loadingTime();
  //   await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH,'IA_DND');
  //   await io.homePage.loadingTime();
  //   await io.homePage.click(selectors.homePagePO.LIST_VIEW);
  //   await io.homePage.loadingTime();
  //   await io.homePage.clickByText('Type');
  //   await io.homePage.loadingTime();

  //   const box1 = await page.locator("table > tbody > tr:nth-child(1) > td:nth-child(5)").textContent();
  //   expect(box1).toContain("Custom 0 Flows");
  //   const box2 = await page.locator("table > tbody > tr:nth-child(2) > td:nth-child(5)").textContent();
  //   expect(box2).toContain('Integration app');
  //   await io.homePage.click(selectors.homePagePO.TILE_VIEW);
  //   await io.homePage.loadingTime();
  //   await io.homePage.click(selectors.homePagePO.LIST_VIEW);
  //   await io.homePage.loadingTime();
  //   const box11 = await page.locator("table > tbody > tr:nth-child(1) > td:nth-child(5)").textContent();
  //   expect(box11).toContain("Custom 0 Flows");
  //   const box12 = await page.locator("table > tbody > tr:nth-child(2) > td:nth-child(5)").textContent();
  //   expect(box12).toContain('Integration app');
  // });

  test("@Env-All @Zephyr-IO-T3047 | To verify sorting order is maintained independently for grid view", async ({ io, page }, testInfo) => {
  await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH,'T3015_IA_DND');
    await io.homePage.loadingTime();
    test.step("*** Selecting grid view ***", async () => { });
    await io.homePage.click(selectors.homePagePO.TILE_VIEW);
    await io.homePage.loadingTime();
    const tile1 = await page.locator('[data-test="integration-tiles"]').nth(0).textContent();
    expect(tile1).toContain("SuccessT3015_IA_DND0 Flows");
       await io.homePage.click(selectors.homePagePO.LIST_VIEW);
    await io.homePage.loadingTime();
    await io.homePage.clickByText('Type');
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.TILE_VIEW);
    await io.homePage.loadingTime();
    const tile01 = await page.locator('[data-test="integration-tiles"]').nth(0).textContent();
    expect(tile01).toContain("SuccessT3015_IA_DND0 Flows");
  });
});

