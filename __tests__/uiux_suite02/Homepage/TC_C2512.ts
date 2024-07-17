import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("Freeze the IO header/top menu bar", () => {
  test.beforeEach(async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T873 Freeze the IO header/top menu bar", async ({ io, page }) => {
    let toolbarSelector = selectors.basePagePO.TOP_MENUBAR_DIV_SELECTOR;
    await page.waitForSelector(toolbarSelector);

    // Use an assertion library to confirm the presence of the div
    let isToolbarPresent = await page.$(toolbarSelector);
    expect(isToolbarPresent).toBeTruthy();

    await io.homePage.click(selectors.basePagePO.RESOURCES);

    await io.homePage.waitForElementAttached(toolbarSelector);


    // Use an assertion library to confirm the presence of the div
    isToolbarPresent = await page.$(toolbarSelector);
    expect(isToolbarPresent).toBeTruthy();

    await io.homePage.clickByText('Imports')

    await io.homePage.waitForElementAttached(toolbarSelector);

    // Use an assertion library to confirm the presence of the div
    isToolbarPresent = await page.$(toolbarSelector);
    expect(isToolbarPresent).toBeTruthy();

  });
})

