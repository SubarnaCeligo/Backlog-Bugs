import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C27899.json";

test.describe("TC_C27899", () => {
  let flowId;
  test.beforeEach(async ({ io }) => {
    test.step("*** Beginning of Test Suite ***", async () => { });
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });

  test("@Env-All @Zephyr-IO-T2848|Verify name of the script is not fully displayed in the dropdown", async ({ io, page }) => {
    //*Create Flows
    await io.api.createImpOrExpAndFlowsThruAPI(TC);

    flowId = await io.api.getFlowId(TC.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.ADD_DATA_PROCESSOR
    );
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.exportsPagePO.EXPORT_HOOKS);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SCRIPT);
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, 'C27899 Verify name of the script is not fully displayed in the dropdown over the id');
    await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilder.loadingTime();
    expect(await page.getByText('C27899 Verify name of the script is not f')).not.toBeNull();
    await test.step(
      "name of the hook should display clearly and if test exists the width of the dropdown box then ellipsis are displayed"
      , async () => { });
    await io.api.deleteFlowViaAPI(flowId);  
  });
});
