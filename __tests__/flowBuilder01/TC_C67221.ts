import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C67221 Verify For the default value of the ‘What would you like to do?’ field user should not show dropdowns`, () => {
  test(`C67221 Verify For the default value of the ‘What would you like to do?’ field user should not show dropdowns @Env-All @Priority-P3 @Zephyr-IO-T23169`, async ({
    io,
    page
  }) => {
    await io.flowBuilder.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.flowBuilder.clickByText("HTTP");
    await expect(
      page.locator(`${selectors.flowBuilderPagePO.EXPORT_TYPE} input`)
    ).toBeDisabled();
    await io.flowBuilder.addStep(
      'Verified "What would you like to do?" field is disabled'
    );
  });
});
