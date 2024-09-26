
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C2574 from "@testData/FlowBuilder/TC_C2574.json";

test.describe("TC_C2574", () => {
  let flowId;
  test.beforeEach(async ({ io }) => {
    test.step("*** Navigate to Flow Page ***", async () => { });
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T2744| To verify output filter icons as shown in the mockups.", async ({ io }) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC_C2574);
    flowId = await io.api.getFlowId(TC_C2574.name);
    test.step("*** Navigating to Flow Builder ***", async () => { });
    await io.flowBuilderDashboard.navigateToFlowBuilderInEM2(flowId)
    await io.homePage.loadingTime();
    test.step("open the the flow builder and check for export and PP lookup filter.", async () => { });
    var filterOutputPg = await io.homePage.isVisible(selectors.flowBuilderPagePO.EXPORT_FILTER);
    var filterOutputPp = await io.homePage.isVisible(selectors.flowBuilderPagePO.OUTPUTFILTERPP);
    await io.assert.expectToBeTrue(filterOutputPg, "");
    await io.assert.expectToBeTrue(filterOutputPp, "");
    test.step("Export filter and import filters are present as expected.", async () => { });
    await io.api.deleteFlowsWithId([flowId]);
  });
});
