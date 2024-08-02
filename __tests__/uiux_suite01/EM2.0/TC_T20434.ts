import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C66296 from "@testData/EM2.0/C66296.json";

test.describe("T20434 Verify status of flow runs is color-coded in case of Dashboard", () => {
  let flowId;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowsWithId(flowId);
  });
  test("@Zephyr-IO-T20434 @Env-All @Priority-P2 T20434 Verify status of flow runs is color-coded in case of Dashboard", async ({
    io,
    page
  }) => {
    flowId = await io.createResourceFromAPI(C66296, "FLOWS");
    await io.homePage.navigateTo(
      process.env["IO_Integration_URL"] + "flowBuilder/" + flowId
    );
    await io.flowBuilder.loadingTime();
    
    //Click on Run flow
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await page.getByLabel("Cancel flow run").click();
    await io.flowBuilder.addStep("Clicked on Cancel flow run");
    await io.flowBuilder.clickByText("Cancel run");
    await io.flowBuilder.clickByText("Run history");

    const runConsoleRows = await page
      .locator(selectors.flowBuilderPagePO.COLUMNS)
      .all();
    runConsoleRows.forEach(async row => {
      const status = row.locator("td div").nth(0);
      const color = await status.evaluate(
        el => getComputedStyle(el).backgroundColor
      );
      await io.assert.expectToBeValue(
        color,
        "rgb(255, 179, 12)",
        "The status is not correctly colored"
      );
    });
  });
});
