
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C14294.json";

test.describe("@Env-All @Zephyr-IO-T2765", () => {
  let flowId;
  test.afterEach(async ({io}) => {
    await io.api.deleteFlowsWithId([flowId]);
    test.step("** Deleted flow **", async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T2765 | Verify by removing the PP/PG from the flow,flow should run successfully without any error.", async ({io,page}) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_NOW);
    await page.getByText('Run in progress');
    await io.homePage.click(selectors.flowBranchingPO.REMOVEPP);
    await io.homePage.click(selectors.flowBranchingPO.REMOVEDIALOG);
    await io.homePage.loadingTime();
    const lastRun = await page.getByText('Last run');
    await lastRun.waitFor({state: 'visible', timeout: 180000});
  });
});
