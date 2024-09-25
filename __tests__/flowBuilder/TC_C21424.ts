import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C21424 from "@testData/FlowBuilder/TC_C21424.json";

test.describe("TC_C21424", () => {
  let flowId;
  test.beforeEach(async ({io}) => {
    test.step("*** Navigate to Flow Page ***", async ()=>{});
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T2984|As soon as the export is configured,clicking on the transformation shown 'no sample data", async ({io}) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC_C21424);
    await io.homePage.loadingTime();
    test.step("*** Navigating to Flow Builder ***", async ()=>{});
    flowId = await io.api.getFlowId(TC_C21424.name);
    await io.flowBuilder.navigateToTheFlow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(
      selectors.basePagePO.ADD_DATA_PROCESSOR,
      1
    );
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.LOOKUPTRANSFORMATION);
    await io.homePage.loadingTime();
    var paste = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.PREVIEW
    );
    expect(paste).toBeDefined();
    await io.api.deleteFlowsWithId([flowId]);
  });
});
