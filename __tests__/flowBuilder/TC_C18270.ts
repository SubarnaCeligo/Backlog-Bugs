import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C18270.json";

test.describe("TC_C18270", () => {
  let flowId1, flowId2;
  test.beforeEach(async ({io}) => {
    test.step("*** Navigating To Flow Page***", async ()=>{});
    await io.goToFlowsPage();
  });
  test.afterEach(async ({io}) => {
    await io.api.deleteFlowsWithId([flowId1, flowId2]);
    test.step("*** Deleting Flow ***", async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T2773|Verify same end date is shared for daisy chained flows", async ({ io, page }) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await io.homePage.loadingTime();
    flowId1 = await io.api.getFlowId(TC.flowname1);
    flowId2 = await io.api.getFlowId(TC.flowname2);

    await test.step(
          `**Created Flows ${TC.flowname1} and ${TC.flowname2} With IDs ${flowId1} and ${flowId2} **`
    , async ()=>{});
    await io.flowBuilder.navigateToTheFlow(flowId1);
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
    test.step("Configured flow2 as nextRunFlow in flow1", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.RUNFLOW
    );
    await io.homePage.loadingTime();
    var date = await page.locator(
      '[data-test="date"]>div>div>input'
    );
    var dateAutomaticDelta = await date.getAttribute('value');
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN
    );
    //Make sure flow started running
    await io.homePage.loadingTime();
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({ state: 'visible', timeout: 360000 });
    await io.flowBuilder.navigateToTheFlow(flowId2);
    await io.homePage.loadingTime();
    const lastRun2 = page.getByText('Last run');
    await lastRun2.waitFor({ state: 'visible', timeout: 360000 });
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_HISTORY
    );
    await io.homePage.loadingTime();

    const date2 = await page.locator("table > tbody > tr:nth-child(1) > td:nth-child(4)").textContent();

    dateAutomaticDelta = dateAutomaticDelta.replace(/\s+/g, '').toString();
    // Function to clean the string by removing invisible Unicode characters
    const cleanString = (str: string) => str.replace(/[\u2000-\u206F\uFEFF]/g, '').trim();
    const received = cleanString(dateAutomaticDelta);
    expect(date2).toContain(received);
  });
});
