
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C34144.json"


test.describe("TC_C36424", () => {
  let flowId;
  test.afterEach(async ({io}) => { 
    await io.api.deleteFlowsWithId([flowId]);
    test.step("** Deleted flow **", async ()=>{});
  }
  );

  test("@Env-All @Zephyr-IO-T3074", async ({io,page}) => {
    //Create Flows
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId("TC_027_C34144");
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({state: 'visible', timeout: 180000});
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_HISTORY);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.TOGGLE_JOB);
    await io.homePage.loadingTime();
    await io.homePage.click("tbody > tr:nth-child(2) > td:nth-child(8)");
    await io.homePage.loadingTime();
    test.step("Navigated to the created flow", async ()=>{});
    await io.homePage.loadingTime();
    var errorTitle = await page.locator(
    selectors.flowBuilderPagePO.ERROR_DRAWER_RUN_DETAILS
    );
    expect (errorTitle).toContainText("Run completed:");
    test.step("*** Error dashborad title and run details are showing as expected.***", async ()=>{});
  });
});
