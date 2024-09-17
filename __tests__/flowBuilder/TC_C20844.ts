
import { test, expect } from "@celigo/ui-core-automation";
import TC from "@testData/FlowBuilder/TC_C20844.json";
test.describe("TC_C20844", () => {
  let flowId: string;
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T2973|Verify success count should display on the PG step", async ({io, page}) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name);
    test.step("Created Flow " + TC.name + " With ID " + flowId, async ()=>{});
    await io.api.checkJobStatusFromAPI( TC.name, flowId, [118, 0, 0]);
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    const label = await page.locator("table > tbody > tr:nth-child(1) > td:nth-child(5)").textContent();
    expect(label).toContain("Success");
    test.step("*** Verified success count is displayed on PG export.***", async ()=>{});
  });
});
