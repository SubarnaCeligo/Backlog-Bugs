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
    await io.flowBuilder.fill(
      selectors.flowBuilderPagePO.BRANCH_NAME_INPUT,
      "Custom Branch"
    );
    await io.flowBuilder.clickByText("Save");
    await expect(
      page.locator("span").filter({ hasText: "Custom Branch" })
    ).toBeVisible({ timeout: 10000 });
  });
});
