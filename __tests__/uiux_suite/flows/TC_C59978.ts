import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C59978 To verify that the browser URL while creating a new flow should load properly when we open the same URL in another browser/Tab`, () => {
  test(`C59978 To verify that the browser URL while creating a new flow should load properly when we open the same URL in another browser/Tab`, async ({
    io,
    page,
    context
  }) => {
    await io.flowBuilder.navigateTo(process.env["IO_UI_CONNECTOR_URL"]+"home");
    await io.homePage.goToMenu("Tools","Flow builder");
    const plusButtonsSelector = selectors.flowBuilderPagePO.PLUS_BUTTONS;
    await io.flowBuilder.waitForElementAttached(plusButtonsSelector);
    const plusButtonsLocator = await page.$$(plusButtonsSelector);
    await plusButtonsLocator[0].click();
    await io.flowBuilder.clickByText("Add branching");
    await io.flowBuilder.fill(
      selectors.flowBuilderPagePO.BRANCH_NAME_INPUT,
      "Branch C59978"
    );
    await io.flowBuilder.click(selectors.basePagePO.SAVE);
    await page
      .locator("span")
      .filter({ hasText: "Branch C59978" })
      .waitFor({ state: "visible" });
    await io.flowBuilder.delay(2000);
    const url = new URL(page.url());
    const newPage = await context.newPage();
    await newPage.goto(url.href);
    await expect(
      newPage.locator("span").filter({ hasText: "Branch C59978" })
    ).toBeVisible({
      timeout: 10000
    });
  });
});
