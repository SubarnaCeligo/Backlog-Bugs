import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C53277 Verify the new "Name" filed in the “Add branching” drawer`, () => {
  test.beforeEach(async ({ io }) => {
    await io.flowBuilder.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
  });

  test(`C53277 Verify the new "Name" filed in the “Add branching” drawer`, async ({
    io,
    page
  }) => {
    const flowBuilderLocator = page.getByText("Flow builder");
    if (await flowBuilderLocator.isVisible()) {
      await io.homePage.clickByText("Flow builder");
      await io.homePage.addStep("Clicked on 'Flow builder'");
    } else {
      await io.homePage.clickByText("Tools");
      await io.homePage.addStep("Clicked on 'Tools'");
      await io.homePage.clickByText("Flow builder");
      await io.homePage.addStep("Clicked on 'Flow builder'");
    }
    const plusButtonsSelector = selectors.flowBuilderPagePO.PLUS_BUTTONS;
    await io.flowBuilder.waitForElementAttached(plusButtonsSelector);
    await io.flowBuilder.addStep("Waited for 'plus' buttons to be visible");
    const plusButtonsLocator = await page.$$(plusButtonsSelector);
    await plusButtonsLocator[0].click();
    await io.flowBuilder.addStep("Clicked on 'plus' button");
    await io.flowBuilder.clickByText("Add branching");
    await io.flowBuilder.addStep("Clicked on 'Add branching'");
    await expect(page.getByText("Branching name")).toBeVisible();
    await io.flowBuilder.addStep("Verified 'Branching name' is visible");
    await io.assert.verifyElementText(
      selectors.flowBuilderPagePO.BRANCH_NAME_INPUT,
      ""
    );
    await io.flowBuilder.addStep("Verified 'Branching name' is empty");
    await io.flowBuilder.clickByText("Save");
    await io.flowBuilder.addStep("Clicked on 'Save'");
    await expect(page.getByText("Branch 1.1").first()).toBeVisible({
      timeout: 10000
    });
    await io.flowBuilder.addStep("Verified 'Branch 1.1' is visible");
  });
});
