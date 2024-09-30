import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C27345 from "@testData/FlowBuilder/TC_C27345.json";

test.describe("TC_C27345", () => {
  let flowId;
  test.beforeEach(async ({ io }) => {
    test.step("*** Navigate to Home Page ***", async () => { });
    await io.goToFlowsPage();
  });
  test.afterEach(async ({io}) => {
    await io.api.deleteFlowViaAPI(flowId);
    test.step("**** Deleted flow. ***", async ()=>{});
  });
  test("@Env-All @Zephyr-IO-T2832|If we cannot find a traceKey for either the parent or the child, Verify that we should NOT emit a traceKey at all for the child record", async ({ io, page }) => {
    //Create Flows
    await io.api.createImpOrExpAndFlowsThruAPI(TC_C27345);
    flowId = await io.api.getFlowId(TC_C27345.name);
    //Run Flow
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({ state: 'visible', timeout: 180000 });
    test.step("Opened Flowbuilder of flow. ", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.clickByTextByIndex('1 error', 0);
    await io.homePage.loadingTime();
    test.step("*** Clicking on View Error Details ***", async () => { });
    await io.homePage.clickByText(
      'Error fields'
    );
    var res = (await io.homePage.getText("#ace-editor .ace_layer.ace_text-layer")).toString();
    expect(res).not.toContain("Trace key");
    await test.step(
      "No trace key should be present as one of the parent or child record trace key is absent."
      , async () => { });
  });
});
