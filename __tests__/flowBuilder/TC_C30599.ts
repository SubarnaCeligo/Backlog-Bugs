import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C30599.json";

test.describe("TC_C30599", () => {
  let flowId;
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test.afterEach(async ({ io }) => {
    test.step("Navigating to Homepage", async () => { });
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T2901|To verify records are ignored based on dynamic lookup ", async ({io,page}) => {
    // Creating a flow
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.waitForElementAttached(selectors.basePagePO.RUNFLOW);
    await io.homePage.click(
      selectors.basePagePO.RUNFLOW
    );
    await io.homePage.loadingTime();
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({state: 'visible', timeout: 360000});
    test.step("Running the flow", async ()=>{});
    const label1 = await io.homePage.getText("tbody > tr:nth-child(1) > td:nth-child(5)");
    const label2 = await io.homePage.getText("tbody > tr:nth-child(1) > td:nth-child(5)");

    expect(label1).toContain("Success");
    expect(label2).toContain("Success");
    await io.api.deleteFlowsWithId([flowId]);
  });
});
