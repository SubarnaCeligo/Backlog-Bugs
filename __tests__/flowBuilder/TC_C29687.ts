import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C29687 from "@testData/FlowBuilder/TC_C29687.json";
  // clearValue,

test.describe("@Env-All @Zephyr-IO-T2884|Verify the preview is working fine for the realtime exports", () => {

  test("@Env-All @Zephyr-IO-T2884|Verify the preview is working fine for the realtime exports ", async ({io}) => {
    // Creating Page Generators
    let flowId
    test.step("*** Creating PageGenerator ***", async ()=>{});
    await io.api.createImpOrExpAndFlowsThruAPI(TC_C29687);
    flowId = await io.api.getFlowId(TC_C29687.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    test.step("*** Opening the flow ***", async ()=>{});
    await io.homePage.click(
      selectors.flowBuilderPagePO.LISTENER
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.importPagePO.FETCH_PREVIEW
    );
    await io.homePage.loadingTime();
    var previewResource = await io.homePage.getText(
      selectors.mappings.PREVIEW_RESULT
    );
    expect(previewResource).toBeTruthy;
    await io.api.deleteFlowsWithId([flowId]);
  });
});
