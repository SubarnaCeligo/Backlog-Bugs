import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/EM2.0/C52048.json";

test.describe("C52048 Verify the Resolved errors tab, when no results are returned for filter selections", () => {
  let id
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowsWithId(id)
  });
  test("@Zephyr-IO-T19829 @@Env-All C52048 Verify the Resolved errors tab, when no results are returned for filter selections", async ({
    io,
    page
  }) => {
    id = await io.createResourceFromAPI(testData, "FLOWS");
    await io.api.runBatchFlowViaAPI("C52048", id);
    const lastRun = page.getByText("Last run");
    await lastRun.waitFor({ state: "visible" ,timeout:360000});
    await io.flowBuilder.reloadPage()
    await io.flowBuilder.loadingTime()
    await page.getByText("1 error").nth(1).click();
    await io.flowBuilder.clickByText("Resolved errors");
    const classification = await page.getByText("Classification").elementHandle();
    const btn = await classification.$("button");
    await btn.click();
    await io.flowBuilder.clickByText("Connection");
    await io.flowBuilder.clickByText("Apply");
    await expect(
      page.getByText(
        "You don't have any errors that match the filters you applied."
      )
    ).toBeVisible();
    await expect(
      page.getByText("Clear all filters to see any errors for this step.")
    ).toBeVisible();
  });
});
