import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C33165 Verify When changes have been made but not yet saved, show 3 buttons - Save, Save & close, and Close for edit lookup page`, () => {
  test(`@Env-All @Zephyr-IO-T2624 C33165 Verify When changes have been made but not yet saved, show 3 buttons - Save, Save & close, and Close for edit lookup page`, async ({
    io,
    page
  }) => {
    await io.importsPage.navigateTo(io.data.links.IMPORTS_PAGE_URL);
    await io.importsPage.click(selectors.exportsPagePO.ADD_NEW_RESOURCE);
    await io.homePage.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "REST API (HTTP)")
    await io.importsPage.click(selectors.connectionsPagePO.RESTAPI_HTTP);
    await io.importsPage.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.importsPage.selectConnectionDropDown(page,"3PL CONNECTION");
    await page.locator(selectors.exportsPagePO.NAME).fill("C33165");
    await io.importsPage.click(selectors.basePagePO.SAVE);
    await io.importsPage.delay(2000);
    await page.locator(selectors.exportsPagePO.NAME).fill("New C33165");
    await expect(page.locator(selectors.basePagePO.SAVE)).toBeVisible();
    await expect(page.locator(selectors.basePagePO.SAVE_AND_CLOSE)).toBeVisible();
    await expect(page.locator(selectors.basePagePO.CLOSE)).toBeVisible();
  });
});