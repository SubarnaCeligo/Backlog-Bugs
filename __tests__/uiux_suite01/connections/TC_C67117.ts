import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C67117 Verify There should be a horizontal line above the control, see the mock`, () => {
  //Skipped as per discussion with TC Owner and QA team
  test.skip(`@Zephyr-IO-T21662 C67117 Verify There should be a horizontal line above the control, see the mock`, async ({
    io,
    page
  }) => {
    await io.flowBuilder.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.fill(
      selectors.settingsPagePO.APP_NAME_INPUT,
      "HTTP"
    );
    await io.flowBuilder.clickByText("HTTP");
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH)
    await io.flowBuilder.fill(
      selectors.exportsPagePO.CONNECTIONS_DROPDOWN,
      "HTTP SHOPIFY CONNECTION"
    );
    await io.flowBuilder.clickByText("HTTP SHOPIFY CONNECTION");
    await page
      .getByText("Use existing export", { exact: true })
      .waitFor({ state: "visible" });
    const borderTop = await page
      .locator(selectors.connectionsPagePO.CHECK_EXISTING_EXPORT)
      .first()
      .evaluate(el => {
        return getComputedStyle(el).borderTop;
      });
    await io.assert.expectToBeValue(
      "1px solid rgb(214, 228, 237)",
      borderTop,
      "Horizontal line not found"
    );
  });
});
