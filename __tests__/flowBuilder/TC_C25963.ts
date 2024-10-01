import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C25963 from "@testData/FlowBuilder/TC_C25963.json";

test.describe("TC_C25963", () => {
  let flowId;
  test.beforeEach(async ({io}) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });

  test("@Env-All @Zephyr-IO-T2811|Verify if user has added only few required mappings and upon clicking on the `Auto-map fields` button , only the left out fields must be added should not create duplicates", async ({io,page}) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC_C25963);
    flowId = await io.api.getFlowId(TC_C25963.name);
    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    let arr=[];
    arr = await page.getByText('Last Modified Date').all();
    expect(arr.length).toBe(1);
    await io.homePage.click(
      selectors.mappings.DEFAULT_MAPPING_TYPE.AUTO_MAP
    );
    await io.homePage.loadingTime();
    arr = await page.getByText('Last Modified Date').all();
    expect(arr.length).toBe(1);
    await io.api.deleteFlowsWithId([flowId]);
  });
});
