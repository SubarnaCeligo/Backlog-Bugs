import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C14294.json";

test.describe("@Env-All @Zephyr-IO-T2764", () => {
  let flowId;
  test.afterEach(async ({io}) => {
    await io.api.deleteFlowsWithId([flowId]);
    test.step("** Deleted flow **", async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T2764 | Verify by modifying the flow which inprogress state,flow should run successfully with curent flow job.", async ({io,page}) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.RUN_NOW);
    await page.getByText('Run in progress');
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
    await io.homePage.loadingTime();
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTION_NAME,"name change");
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    const lastRun = await page.getByText('Last run');
    await io.homePage.loadingTime();
    await lastRun.waitFor({state: 'visible', timeout: 180000});
  });
});
