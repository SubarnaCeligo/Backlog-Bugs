import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C53277 Verify the new "Name" filed in the “Add branching” drawer`, () => {
  test.beforeEach(async ({ io }) => {
    await io.flowBuilder.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test(`C53277 Verify the new "Name" filed in the “Add branching” drawer`, async ({
    io,
    page
  }) => {
    const flowBuilderLocator = page.getByText("Flow builder");
    if (await flowBuilderLocator.isVisible()) {
      await io.homePage.clickByText("Flow builder");
    } else {
      await io.homePage.clickByText("Tools");
      await io.homePage.clickByText("Flow builder");
    }
    const plusButtonsSelector = selectors.flowBuilderPagePO.PLUS_BUTTONS;
    await io.flowBuilder.waitForElementAttached(plusButtonsSelector);
    const plusButtonsLocator = await page.$$(plusButtonsSelector);
    await plusButtonsLocator[0].click();
    await io.flowBuilder.clickByText("Add branching");
    await expect(page.getByText("Branching name")).toBeVisible();
    await io.assert.verifyElementText(
      selectors.flowBuilderPagePO.BRANCH_NAME_INPUT,
      ""
    );
    await io.flowBuilder.clickByText("Save");
    await expect(
      page.locator("span").filter({ hasText: "Branch 1.1" })
    ).toBeVisible({
      timeout: 10000
    });
  });
});
