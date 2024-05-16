import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/Narvar.json";

test.describe("C68566 Verify Error place in flow builder", () => {
  let id
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowsWithId(id)
  });
  test("@Zephyr-IO-T25931 C68566 Verify Error place in flow builder", async ({ io, page }) => {
    id = await io.createResourceFromAPI(testData, "FLOWS");
    await io.api.runBatchFlowViaAPI("Narvar_Flow", id);
    const lastRun = page.getByText("Last run");
    await lastRun.waitFor({ state: "visible", timeout: 360000 });
    await page
      .getByText("1 error")
      .nth(1)
      .waitFor({ state: "visible", timeout: 180000 });
    await io.flowBuilder.addStep("Comparing screenshot");
    await expect(
      page.locator(selectors.flowBuilderPagePO.STATUS_BAR)
    ).toHaveScreenshot();
    await io.flowBuilder.addStep("Verified error position is correct");
  });
});
