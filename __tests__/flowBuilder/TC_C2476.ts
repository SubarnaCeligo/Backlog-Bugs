
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C19779.json"

test.describe("TC_C2476", () => {
  let flowId;
  test.beforeEach(async ({ io }) => {
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    test.step("*** Go to flows page ***", async () => { });
    await io.homePage.loadingTime();
  });

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowsWithId([flowId]);
    test.step("** Deleted flow **", async () => { });
  });

  test("@Env-All @Zephyr-IO-T2743| To verify flow name,last saved,run button graph etc are shown in Flow Builder header ", async ({ io, page }) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name);
    test.step("Created Flow " + TC.name + " With ID " + flowId, async () => { });
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    test.step("Opened Flowbuilder of flow. ", async () => { });
    await io.homePage.loadingTime();
    let flowName = await io.homePage.getText(selectors.integrationPagePO.INTEGRATIONNAME + " >div >div");
    expect(flowName).toContain(TC.name);
    expect(await page.getByText('Last saved:')).toBeTruthy();
    expect(await page.locator(selectors.flowBuilderPagePO.FLOW_ON_OFF).isVisible()).toBeTruthy();
    const flowschedule = await page.locator(selectors.flowBuilderPagePO.SCHEDULEICON);
    expect(flowschedule.isVisible()).toBeTruthy();
    const flowSettings = await page.locator(selectors.aliasesPagePO.ALIASES_FLOW_SETTINGS);
    expect(flowSettings.isVisible()).toBeTruthy();
    const lineGraphs = await page.locator(selectors.flowBuilderPagePO.CHARTS);
    expect(lineGraphs.isVisible()).toBeTruthy();
    const runButton = await page.$$(selectors.basePagePO.RUNFLOW);
    const run = runButton[0];
    expect(run.isVisible()).toBeTruthy();
  });
});
