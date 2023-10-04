import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C51662 Verify the default view of the Error details drawer`, () => {
  test(`C51662 Verify the default view of the Error details drawer`, async ({
    io,
    page
  }) => {
    const id = await io.fillFormUI("testData", "FLOWS");
    await io.api.runBatchFlowViaAPI("C51662", id);
    const lastRun = page.getByText("Last run");
    await lastRun.waitFor({ state: "visible" });
    await page.getByText("1 error").nth(1).click();
    const tabListLocator = page.locator(
      selectors.flowBuilderPagePO.ERROR_DETAILS_TABLIST
    );
    const firstTabInTablist = tabListLocator.locator("button:nth-of-type(1)");
    const firstTabButton = page.getByRole("tab", { name: "Edit retry data" });
    expect(await firstTabButton.textContent()).toEqual(
      await firstTabInTablist.textContent()
    );
    await expect(firstTabButton).toHaveAttribute("aria-selected", "true");
  });
});
