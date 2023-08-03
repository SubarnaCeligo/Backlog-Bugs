import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C56649 Verify the Router name field by entering the names of different lengths up to 256 characters`, () => {
  test.beforeEach(async ({ io }) => {
    await io.flowBuilder.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test(`C56649 Verify the Router name field by entering the names of different lengths up to 256 characters`, async ({
    io,
    page
  }) => {
    await io.flowBuilder.clickByText("Flow builder");
    const plusButtonsSelector = `.react-flow__edge .MuiButtonBase-root`;
    await io.flowBuilder.waitForElementAttached(plusButtonsSelector);
    const plusButtonsLocator = await page.$$(plusButtonsSelector);
    await plusButtonsLocator[0].click();
    await io.flowBuilder.clickByText("Add branching");
    const inputSelector =
      ".MuiInputBase-input.MuiFilledInput-input.MuiInputBase-inputMultiline";
    const inputElement = await page.$(inputSelector);
    const boxBefore = await inputElement.boundingBox();
    const heightBefore = boxBefore?.height;
    await io.flowBuilder.fill(
      inputSelector,
      "Verfiy by adding a name for the router in the “Add branching” drawer, Verfiy by adding a name for the router in the “Add branching” drawer"
    );
    const boxAfter = await inputElement.boundingBox();
    const heightAfter = boxAfter?.height;
    expect(heightAfter).toBeGreaterThan(heightBefore);
  });
});
