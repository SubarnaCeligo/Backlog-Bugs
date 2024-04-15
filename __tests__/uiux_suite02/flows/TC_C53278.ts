import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C53278 Verfiy by adding a name for the router in the “Add branching” drawer`, () => {
  test.beforeEach(async ({ io }) => {
    await io.flowBuilder.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.loadingTime()
  });

  test(`@Priority-P2 @Zephyr-IO-T15760 @Env-All C53278`, async ({
    io,
    page
  }) => {
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.homePage.loadingTime()
    const plusButtonsSelector = selectors.flowBuilderPagePO.PLUS_BUTTONS;
    await io.flowBuilder.waitForElementAttached(plusButtonsSelector);
    await io.flowBuilder.clickByIndex(plusButtonsSelector, 0);
    await io.flowBuilder.clickByText("Add branching");
    await io.flowBuilder.fill(
      selectors.flowBuilderPagePO.BRANCH_NAME_INPUT,
      "Custom Branch"
    );
    await io.flowBuilder.clickByText("Save");
    await io.homePage.loadingTime()
    await expect(
      page.locator("span").filter({ hasText: "Custom Branch" })
    ).toBeVisible({ timeout: 10000 });
    await io.flowBuilder.addStep(
      "Verified the 'Custom Branch' name is displayed"
    );
  });
});
