import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C27340 from "@testData/FlowBuilder/TC_C27340.json";


test.describe("TC_C27340", () => {
  let flowId;
  test.beforeEach(async ({io}) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test.afterEach(async ({io}) => {
    test.step("*** Clean up ***", async ()=>{});
    await io.api.deleteFlowsWithId([flowId]);
  });
  test("@Env-All @Zephyr-IO-T2821|Verify Tracekey is overidden with the Override trace key template value when given any valid handlebar expression ", async ({io,page}) => {
    //Create Flows
    await io.api.createImpOrExpAndFlowsThruAPI(TC_C27340);
    flowId = await io.api.getFlowId(TC_C27340.name);
    //Run Flow
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId, true);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({state: 'visible', timeout: 180000});
    await io.homePage.loadingTime();

    await io.homePage.click(
      selectors.flowBuilderPagePO.EXPORT
    );
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.ADVANCED
    );
    await io.homePage.clickByIndex(
      selectors.basePagePO.HANDLEBAR_EDITOR,
      3
    );
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();

    await io.homePage.click(
      selectors.flowBuilderPagePO.PREVIEW
    );
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    let expectedTracekey = await page.locator(selectors.mappings.RESULTTEXT).textContent();
    expectedTracekey = expectedTracekey.replace(/[\\"]/g, "");
    expectedTracekey = expectedTracekey.slice(0, -1);
    console.log("Expected Tracekey: ", expectedTracekey);
    await io.homePage.click(
      selectors.basePagePO.CLOSE_RIGHT_DRAWER
    );
    await io.homePage.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
    await io.homePage.loadingTime();
    await io.homePage.clickByTextByIndex('1 error', 0);
    await io.homePage.loadingTime();
    await io.homePage.clickByText('Error fields');
    await io.homePage.loadingTime();
    let recentData = (await io.homePage.getText("#ace-editor .ace_layer.ace_text-layer")).toString();
    const recentTraceKey = recentData
      .match(/(?<=Trace\s*key\s*:).*/g)?.[0]
      ?.trim();
    await io.homePage.clickByText('Edit retry data');
    recentData = (await io.homePage.getText(".ace_text-layer")).toString();
    const customTraceKey = recentData
      .match(/(?<="io_custom_trace_key":).*/g)?.[0]
      ?.trim()
      .replace(/[\\"]/g, "");
    console.log("Recent Tracekey: ", recentTraceKey);
    console.log("Custom Tracekey: ", customTraceKey);
    console.log("recent data", recentData);

    expect(recentTraceKey).toContain(expectedTracekey);
    expect(customTraceKey).toContain(expectedTracekey);

await test.step(
      "Trace key value and io_custom_trace_key value got overridden with the result of handlebar expression."
, async ()=>{});
  });
});
