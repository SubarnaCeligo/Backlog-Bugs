import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("TC_32983", () => {
  test("@Env-All @Zephyr-IO-T3015|To verify 'Continue uninstall' is displayed for pending IA tiles under status column ", async ({ io, page }) => {
    test.step("*** Navigating to home page ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    test.step("*** Clicking on grid view ***", async () => { });
    await io.homePage.click(selectors.homePagePO.TILE_VIEW);
    await io.homePage.loadingTime();
    test.step("*** Searching for IA in the home page ***", async () => { });
    await page.locator(selectors.integrationPagePO.HOME_SEARCH).fill('32983_DND');
    await io.homePage.loadingTime();
    test.step("*** verifying the status message ***", async () => { });
    expect(await page.getByText("Continue uninstall >").isVisible()).toBeTruthy();
  });
});