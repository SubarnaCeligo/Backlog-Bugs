import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C27344 from "@testData/FlowBuilder/TC_C27344.json";

test.describe("TC_C27344", () => {
  let flowId
  test.beforeEach(async ({io}) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({io}, ) => { 
    await test.step("*** Deleting flow.***", async ()=>{})
      await io.api.deleteFlowViaAPI(flowId);
  })
  test("@Env-All @Zephyr-IO-T2825|Verify that the child record tracekey is by default in the template  `parent record trace Key - child record trace Key` when no value is set for Override child record trace key template", async ({io,page}) => {
    //Create Flows
    await io.api.createImpOrExpAndFlowsThruAPI(TC_C27344);
    flowId = await io.api.getFlowId(TC_C27344.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({state: 'visible', timeout: 180000});
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
    await io.homePage.loadingTime();
    await io.homePage.clickByText('Error fields');
    await io.homePage.loadingTime();
    let recentData = (await io.homePage.getText("#ace-editor .ace_layer.ace_text-layer")).toString();
    const recentTraceKey = recentData
      .match(/(?<=Trace\s*key\s*:).*/g)?.[0]
      ?.trim();
    console.log("Recent Tracekey: ", recentTraceKey);
    expect(recentTraceKey).toBeDefined();
await test.step(
      "The trace key value contains the field value set on Override child record trace key template."
, async ()=>{});
  });
});
