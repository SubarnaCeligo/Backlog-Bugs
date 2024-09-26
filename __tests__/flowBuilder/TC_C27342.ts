import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C27342.json";

test.describe("TC_C27342 | TC_C27334 ", () => {
  let flowId;
  test.beforeEach(async ({ io }) => {
    await io.goToFlowsPage();
    test.step("*** Go to flows page ***", async () => { });
  });

  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowsWithId([flowId]);
    test.step("** Deleted flow **", async () => { });
  });

  test("@Env-All @Zephyr-IO-T2823 |  Verify Tracekey is overidden with the Override trace key template value when given field reference. ", async ({ io, page }, testInfo) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name);
    await test.step(
      "Created Flow " + TC.name + " With ID " + flowId
      , async () => { });
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId, true);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({state: 'visible', timeout: 180000});
    test.step("Opened Flowbuilder of flow. ", async () => { });
    await io.homePage.loadingTime();

    await io.homePage.click(
      selectors.flowBuilderPagePO.EXPORT
    );
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.ADVANCED
    );
    await io.homePage.clickButtonByIndex(
      '[aria-label="Open handlebars editor"]',
      1
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
  });

  test('@Env-All @Zephyr-IO-T2819| Verify the Page processor import form does not have "Override trace key template" field in the Advanced section when the one to many is set to false', async ({ io, page }) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    flowId = await io.api.getFlowId(TC.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId, true);
    test.step("Opened Flowbuilder of flow. ", async () => { });
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.IMPORT,
      0
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.ADVANCED
    );
    await io.homePage.loadingTime();
    expect(await page.locator(selectors.flowBuilderPagePO.TRACEKAY_TEMPLATEHANDLER).isVisible()).toBeFalsy();
  });
});
