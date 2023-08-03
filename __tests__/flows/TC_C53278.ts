import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C53278 Verfiy by adding a name for the router in the “Add branching” drawer`, () => {
  test.beforeEach(async ({ io }) => {
    await io.flowBuilder.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test(`C53278 Verfiy by adding a name for the router in the “Add branching” drawer`, async ({
    io,
    page
  }) => {
    await io.flowBuilder.clickByText("Flow builder");
    const plusButtonsSelector = `.react-flow__edge .MuiButtonBase-root`;
    await io.flowBuilder.waitForElementAttached(plusButtonsSelector);
    const plusButtonsLocator = await page.$$(plusButtonsSelector);
    await plusButtonsLocator[0].click();
    await io.flowBuilder.clickByText("Add branching");
    await io.flowBuilder.fill(
      ".MuiInputBase-input.MuiFilledInput-input.MuiInputBase-inputMultiline",
      "Custom Branch"
    );
    await io.flowBuilder.clickByText("Save");
    await expect(
      page.locator("span").filter({ hasText: "Custom Branch" })
    ).toBeVisible({ timeout: 10000 });
  });
});
