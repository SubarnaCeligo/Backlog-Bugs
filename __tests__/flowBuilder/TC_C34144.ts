
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C34144.json";


test.describe("TC_C34144", () => {
  let flowId;
  test("@Env-All @Zephyr-IO-T3062", async ({io,page}) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name);
    console.log("****",flowId);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId)
    await io.homePage.loadingTime();
    //Run Flow
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    test.step("Navigated to the created flow", async ()=>{});
    var graphCheck = await io.homePage.isVisible(selectors.flowBuilderPagePO.CHARTS);
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({state: 'visible', timeout: 360000});
    var graphHover = await io.homePage.isVisible(selectors.flowBuilderPagePO.JOBS_ROWS);
    await io.assert.expectToBeTrue(graphCheck, "");
    await io.assert.expectToBeTrue(graphHover, "");
    await io.api.deleteFlowsWithId([flowId]);
  });
});
