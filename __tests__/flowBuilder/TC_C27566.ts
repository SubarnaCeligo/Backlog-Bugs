
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C27566 from "@testData/FlowBuilder/TC_C27566.json";

test.describe("TC_C27566", () => {
  let flowId;

  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });

  test.afterEach(async ({io}) => {
    await io.api.deleteFlowViaAPI(flowId)
    test.step("**** Deleted flow. ***", async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T2842|To verify the functionality of Override tracekey on PP Export when the data is in `Rows` format", async ({io,page}) => {
    const flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C27566);
    flowId = await io.api.getFlowId(TC_C27566.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({state: 'visible', timeout: 180000});
    await io.homePage.loadingTime();

    await io.homePage.click(
      selectors.flowBuilderPagePO.LOOKUP
    );
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.ADVANCED
    );
    await io.homePage.clickByIndex(
      selectors.basePagePO.HANDLEBAR_EDITOR,
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
    await io.homePage.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
    await io.homePage.loadingTime();
    await io.homePage.clickByText('Error fields');
    await io.homePage.loadingTime();
    let recentData = (await io.homePage.getText("#ace-editor .ace_layer.ace_text-layer")).toString();
    const recentTraceKey = recentData
      .match(/(?<=Trace\s*key\s*:).*/g)?.[0]
      ?.trim();
    console.log("Recent Tracekey: ", recentTraceKey);
    expect(recentTraceKey).toContain(expectedTracekey);
  });
});
