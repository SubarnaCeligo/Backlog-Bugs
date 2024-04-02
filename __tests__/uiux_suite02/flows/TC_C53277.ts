import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C53277 Verify the new "Name" filed in the “Add branching” drawer`, () => {
  test.beforeEach(async ({ io }) => {
    await io.flowBuilder.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.loadingTime()
  });

  test(`C53277 Verify the new "Name" filed in the “Add branching” drawer`, async ({
    io,
    page
  }) => {
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.homePage.loadingTime()
    const plusButtonsSelector = selectors.flowBuilderPagePO.PLUS_BUTTONS;
    await io.flowBuilder.waitForElementAttached(plusButtonsSelector);
    await io.flowBuilder.clickByIndex(plusButtonsSelector, 0);
    await io.flowBuilder.clickByText("Add branching");
    await io.assert.verifyElementDisplayedByText(
      "Branching name",
      "'Branching name' not visible"
    );
    await io.flowBuilder.addStep("Verified 'Branching name' is visible");
    await io.assert.verifyElementText(
      selectors.flowBuilderPagePO.BRANCH_NAME_INPUT,
      ""
    );
    await io.flowBuilder.clickByText("Save");
    await io.homePage.loadingTime()
    await expect(page.getByText("Branch 1.1").first()).toBeVisible({
      timeout: 10000
    });
    await io.flowBuilder.addStep("Verified the default branch name is displayed");
  });
});
