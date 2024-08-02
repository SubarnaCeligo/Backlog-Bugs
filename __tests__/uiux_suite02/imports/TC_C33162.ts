import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C33162 Verify save saveAndClose close button are present in footer for create lookup page`, () => {
  test(`@Env-All @Zephyr-IO-T2622 C33162 Verify save saveAndClose close button are present in footer for create lookup page`, async ({
    io,
    page
  }) => {
    await io.exportsPage.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
    await io.homePage.goToMenu("Tools","Flow builder");
    await io.flowBuilder.click(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    await io.homePage.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "REST API (HTTP)")
    await io.flowBuilder.clickByText("REST API (HTTP)");
    await io.flowBuilder.clickByText("Look up additional files (per record)");
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.homePage.selectConnectionDropDown(page, '3PL CONNECTION');
    await io.flowBuilder.delay(2000);
    await page.locator(selectors.exportsPagePO.NAME).fill("C33162");
    await expect(page.locator(selectors.basePagePO.SAVE)).toBeVisible();
    await expect(page.locator(selectors.basePagePO.SAVE_AND_CLOSE)).toBeVisible();
    await expect(page.locator(selectors.basePagePO.CLOSE)).toBeVisible();
  });
});
