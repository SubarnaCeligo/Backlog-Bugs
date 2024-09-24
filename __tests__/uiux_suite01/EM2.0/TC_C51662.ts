import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/EM2.0/C51662.json";

test.describe(`C51662 Verify the default view of the Error details drawer`, () => {
  let id
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowsWithId(id)
  });
  test(`@Zephyr-IO-T19814 @Env-All C51662 Verify the default view of the Error details drawer`, async ({
    io,
    page
  }) => {
    id = await io.createResourceFromAPI(testData, "FLOWS");
    await io.api.runBatchFlowViaAPI("C51662", id);
    const lastRun = page.getByText("Last run");
    await lastRun.waitFor({ state: "visible" ,timeout:360000});
    await io.flowBuilder.reloadPage()
    await io.flowBuilder.loadingTime()
    await page.getByText("1 error").nth(1).click();
    const tabListLocator = page.getByRole("tablist").nth(1);
    const firstTabInTablist = tabListLocator.locator("button").first();
    const firstTabButton = page.getByRole("tab", { name: "Edit retry data" });
    expect(await firstTabButton.textContent()).toEqual(
      await firstTabInTablist.textContent()
    );
    await expect(firstTabButton).toHaveAttribute("aria-selected", "true");
  });
});
