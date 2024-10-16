import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C27525 from "@testData/FlowBuilder/TC_C27525.json";

test.describe("TC_C27525", () => {
  let flowId;
  test.beforeEach(async ({io}) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test.afterEach(async ({io}) => {
    await test.step("*** Deleting flow.***", async ()=>{
      await io.api.deleteFlowViaAPI(flowId);
    });
  });
  test("@Env-All @Zephyr-IO-T2837|Verify on updating the child trackey template field , the new trackey value is generated based on the updated template", async ({io,page}) => {
    //Create Flows
    await io.api.createImpOrExpAndFlowsThruAPI(TC_C27525);
    var flowId = await io.api.getFlowId(TC_C27525.name);
    //Run Flow
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.IMPORT,0
    );
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.ADVANCED
    );
    await io.homePage.fill('[name="/traceKeyTemplate"]','{{record.customer.id}}');
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    const lastRun = page.getByText('Last run');
    await lastRun.waitFor({state: 'visible', timeout: 180000});
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.IMPORT,0
    );
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    

    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.ADVANCED
    );
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.basePagePO.HANDLEBAR_EDITOR);
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.TRACEKAY_TEMPLATEHANDLER,
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
    console.log("Recent Tracekey: ", recentTraceKey);
    console.log("recent data", recentData);
    expect(recentTraceKey).toContain(expectedTracekey);
    await test.step(
      "Recent Tracekey should contain the expected tracekey."
      , async () => { });
  });
});
