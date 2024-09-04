import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("@Env-All @Zephyr-IO-T3014 | @Env-All @Zephyr-IO-T3022 | @Env-All @Zephyr-IO-T3031", () => {

  test("@Env-All @Zephyr-IO-T3014|To verify 'Continue setup' is displayed for pending IA tiles under status column|@Env-All @Zephyr-IO-T3031| To verify 'Uninstall Integration' is displayed under actions options for IA's", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH, 'T3015_IA_DND');
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.homePagePO.LIST_VIEW
    );
    await io.homePage.loadingTime();
    const statusButton = await page.locator("tr:nth-child(2) > td:nth-child(3) > div> button");
    const label = await statusButton.textContent();
    expect(label).toBe('Continue setup >');
    await io.homePage.clickButtonByIndex(
      selectors.integrationPagePO.OPENACTIONSMENU,
      1
    );
    await io.homePage.loadingTime();
    await (await page.locator(selectors.integrationPagePO.UNINSTALL_CONNECTOR)).isVisible();
  });

  test("@Env-All @Zephyr-IO-T3022|To verify 'Integration app' is displayed under 'Type' column if it is an Integration App", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH, 'IA_DND');
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.homePagePO.LIST_VIEW
    );
    await io.homePage.loadingTime();
    const statusButton = await page.locator("tr:nth-child(1) > td:nth-child(5)");
    const label = await statusButton.textContent();
    expect(label).toBe('Integration app');
  });
});
