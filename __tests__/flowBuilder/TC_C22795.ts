import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/FlowBuilder/TC_C22795.json";

test.describe("TC_C22795", () => {
  let flowId;
  test.beforeEach(async ({io}) => {
    test.step("*** Navigating To Flow Page ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test.afterEach(async ({io, page}) => {
    await io.api.deleteFlowsWithId([flowId]);
    test.step("** Deleted flow **", async ()=>{});
  });

  test("@Env-All @Zephyr-IO-T2786| Verify that the transformed data from the lookup is showing on the import mappings of the flow ", async ({io,page}, testInfo) => {
    await io.api.createImpOrExpAndFlowsThruAPI(TC);
    await io.homePage.loadingTime();
    flowId = await io.api.getFlowId(TC.name);

    await io.flowBuilderDashboard.navigateToFlowBuilderInFB(flowId);
    await io.homePage.isPageReady();
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS,
      1
    );

    let list = await io.flowbranching.flowBranchingPage.getList(
      "[id*='react-select']"
    );
    expect(list.includes("testData[*].companyUnique")).toBeTruthy();
    expect(list.includes("testData[*].companyUnique")).toBeTruthy();
    expect(list.includes("id")).toBeTruthy();
  });
});
