import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C27529 from "@testData/FlowBuilder/TC_C27529.json";

test.describe("TC_C27529", () => {
  let flowId;
  test.beforeEach(async ({io}) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T2839|Verify generating PG trackey template for input data with batch of records", async ({io,page}) => {
    //Create Flows
    await io.api.createImpOrExpAndFlowsThruAPI(TC_C27529);
    flowId = await io.api.getFlowId(TC_C27529.name);
    //Run Flow
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
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.basePagePO.HANDLEBAR_EDITOR);
    await io.homePage.clickByIndex(
      '[data-test="traceKeyTemplate"]',
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
    await io.api.deleteFlowsWithId([flowId]);
  });
});
