import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C56649 Verify the Router name field by entering the names of different lengths up to 256 characters`, () => {
  test.beforeEach(async ({ io }) => {
    await io.flowBuilder.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
  });

  test(`C56649 Verify the Router name field by entering the names of different lengths up to 256 characters`, async ({
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
    const plusButtonsLocator = await page.$$(plusButtonsSelector);
    await plusButtonsLocator[0].click();
    await io.flowBuilder.addStep("Clicked on 'plus' button");
    await io.flowBuilder.clickByText("Add branching");
    await io.flowBuilder.addStep("Clicked on 'Add branching'");
    const inputSelector = selectors.flowBuilderPagePO.BRANCH_NAME_INPUT;
    const inputElement = await page.$(inputSelector);
    const boxBefore = await inputElement.boundingBox();
    const heightBefore = boxBefore?.height;
    await io.flowBuilder.fill(
      inputSelector,
      "Verfiy by adding a name for the router in the “Add branching” drawer, Verfiy by adding a name for the router in the “Add branching” drawer"
    );
    await io.flowBuilder.addStep(
      "Entered a long name for the router in the “Add branching” drawer"
    );
    const boxAfter = await inputElement.boundingBox();
    const heightAfter = boxAfter?.height;
    expect(heightAfter).toBeGreaterThan(heightBefore);
    await io.flowBuilder.addStep(
      "Verified the height of the input field is increased"
    );
  });
});
