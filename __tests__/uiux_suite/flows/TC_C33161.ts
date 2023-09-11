import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C33161 Verify When changes have been made but not yet saved, show 3 buttons - Save, Save & close, and Close for create lookup page`, () => {
  test(`C33161 Verify When changes have been made but not yet saved, show 3 buttons - Save, Save & close, and Close for create lookup page`, async ({
    io,
    page
  }) => {
    await io.exportsPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
    await io.homePage.goToMenu("Tools","Flow builder");
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.flowBuilder.clickByText("REST API (HTTP)");
    await io.flowBuilder.clickByText("Look up additional files (per record)");
    await io.flowBuilder.click(selectors.exportsPagePO.CONNECTIONS_DROPDOWN);
    await io.flowBuilder.clickByText("3PL CONNECTION");
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await io.flowBuilder.delay(2000);
    await page.locator(selectors.exportsPagePO.NAME).fill("C33161");
    await expect(page.locator(selectors.basePagePO.SAVE)).toBeVisible();
    await expect(page.locator(selectors.basePagePO.SAVE_AND_CLOSE)).toBeVisible();
    await expect(page.locator(selectors.basePagePO.CLOSE)).toBeVisible();
  });
});