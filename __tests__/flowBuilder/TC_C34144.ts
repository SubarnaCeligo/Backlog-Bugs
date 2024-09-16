
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C34144.json";


test.describe("TC_C34144", () => {
  let flowId;
  test.afterEach(async ({io}) => {
    flowId = await io.api.getFlowById(TC.name);
    await io.api.deleteFlowsWithId([flowId]);
  });
  test("@Env-All @Zephyr-IO-T3062", async ({io}) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    var flowId = await io.api.getFlowId(TC.name);
    console.log("****",flowId);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId)
    await io.homePage.loadingTime();
    //Run Flow
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    test.step("Navigated to the created flow", async ()=>{});
    var graphCheck = await io.homePage.isVisible(selectors.flowBuilderPagePO.CHARTS);
    var graphHover = await io.homePage.isVisible(selectors.flowBuilderPagePO.JOBS_ROWS);
    await io.assert.expectToBeTrue(graphCheck, "");
    await io.assert.expectToBeTrue(graphHover, "");
  });
});
