import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C29689 from "@testData/FlowBuilder/TC_C29689.json";

test.describe("@Env-All @Zephyr-IO-T2886|Verify the preview is working fine for the Non realtime exports", () => {
  test("@Env-All @Zephyr-IO-T2886|Verify the preview is working fine for the Non realtime exports", async ({io}) => {
    //Create Flows
    var flows = await io.api.createImpOrExpAndFlowsThruAPI(TC_C29689);
    await io.flowBuilder.navigateToTheFlow(
      flows.get(TC_C29689.name)["flowId"]
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.EXPORT
    );
    test.step("***Navigated To Exports Page***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.importPagePO.FETCH_PREVIEW
    );
    var actual_data = await io.homePage.getText(
      selectors.mappings.PREVIEW_RESULT
    );
await test.step(
      "***Export Preview Panel Is Shown As Expected***"
, async ()=>{});
// data values from testData/inputData/FlowBuilder/TC_001_C29689.json is used to validate the preview data
    expect(actual_data).toContain("democustomer6@example.com");
    expect(actual_data).toContain("malla");
    expect(actual_data).toContain("customer6");
    expect(actual_data).toContain("Company B");
    expect(actual_data).toBeTruthy;   
  });
});
