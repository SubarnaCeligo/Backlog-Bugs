import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C18204.json";

test.describe("TC_C18204", () => {
  let flowId1, flowId2;

  test.afterEach(async ({io}) => {
    await io.api.deleteFlowsWithId([flowId1, flowId2]);
    test.step("*** Deleting Flow ***", async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T2772 | Verify for all PGs to completed test.beforeEach running the next flow ", async ({io, page}) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId1 = await io.api.getFlowId(TC.flowname1);
    flowId2 = await io.api.getFlowId(TC.flowname2);
    await io.flowBuilder.navigateToTheFlow( flowId1);
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.aliasesPagePO.ALIASES_FLOW_SETTINGS
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.NEXTINTEGRATIONFLOW
    );
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.flowBuilderPagePO.NEXTFLOWSNAME,
      TC.flowname2
    );
    await io.homePage.click(
      selectors.flowBuilderPagePO.NOTIFICATION_CLOSE_SELECT
    );
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.RUNFLOW
    );
    const lastRun = page.getByText('Last run')
    await io.homePage.loadingTime();
    await lastRun.waitFor({state: 'visible', timeout: 180000});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_HISTORY
    );
    await io.homePage.loadingTime();
    const time1 = await page.locator(selectors.flowBuilderPagePO.ERROR_COUNT5).textContent();

     await io.flowBuilder.navigateToTheFlow( flowId2);
     await io.homePage.loadingTime();
     await lastRun.waitFor({state: 'visible', timeout: 180000});
     await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_HISTORY
    );
    await io.homePage.loadingTime()
    const time2 = await page.locator(selectors.flowBuilderPagePO.ERROR_COUNT5).textContent();
   console.log(time1,time2);
    const t1 = new Date(time1).getTime();
    const t2 = new Date(time2).getTime();
    console.log(t1,t2);
    expect(t2).toBeGreaterThanOrEqual(t1);
  });
});
