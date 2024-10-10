
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C23540 from "@testData/FlowBuilder/TC_C23540.json";

test.describe("TC_C23540", () => {
  let flowId;
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });

  test.afterEach(async ({io}) => {
    test.step("*** Delete Flow Using UI***", async ()=>{});
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T2803", async ({io,page}) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC_C23540);
    test.step("Navigated to flow builder page", async ()=>{});
    flowId = await io.api.getFlowId(TC_C23540.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);

    //Run Flow
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    const lastRun = page.getByText('Last run');
    await io.homePage.loadingTime();
    await lastRun.waitFor({state: 'visible', timeout: 180000});
   const success = await page.locator("tbody > tr:nth-child(1) > td:nth-child(5)").textContent();
   expect(success).toContain("Success");
  });
});
