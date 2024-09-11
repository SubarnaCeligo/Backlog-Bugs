import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Env-All @Zephyr-IO-T3016|@Zephyr-IO-T3034 ", () => {
  test("@Env-All @Zephyr-IO-T3016 | To verify success is displayed under status column if there are no errors in integration/flow", async ({io,page}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH,'3015');
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.homePagePO.LIST_VIEW);
    await io.homePage.loadingTime();
    const label = await page.locator("tr:nth-child(1) > td:nth-child(3) > div> button");
    const succ = await label.textContent();
    expect(succ).toBe('Success');
  });

  test("@Env-All @Zephyr-IO-T3034 | To verify actions menu is not shown for standalone flows", async ({io,page}) => {
    test.step("Navigating to Homepage", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    test.step("Selecting list view", async ()=>{});
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH,'Standalone flows');
    await io.homePage.click(selectors.homePagePO.LIST_VIEW);
    await io.homePage.loadingTime();
    const actionMenu = await page.locator("tr:nth-child(1) > td:nth-child(6) > button");
    const isAvailable = await actionMenu.isVisible();
    expect(isAvailable).toBeFalsy();
  });
});
