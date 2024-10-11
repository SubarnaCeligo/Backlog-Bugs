
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47573.json";

test.describe("@Author-ParthPatel TC_C47573_Flowbranching", () => {
  let flowId;

  test.beforeEach(async ({io}, testInfo) => {
    await test.step("*** Go to flows page ***", async ()=>{
      await io.goToFlowsPage();
    });
  });

  test.afterEach(async ({io}, testInfo) => {
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T17655 TC_C47573_Flowbranching Test to add router with skip aggregation not checked on first branch PP and skip aggregation checked on second branch and then verify file aggregation on both the branches (FTP & S3)", async ({io,page}, testInfo) => {
    flowId = await io.flowbranching.createFlowBranchFromAPI(
      flowbranch
    );
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.RUNFLOW);
    await io.homePage.loadingTime();

    var resultJSON = await io.api.validateJobCountFromAPI(
      flowbranch.name,
      flowbranch.qa__expectedDashboardCount
    )
    expect(resultJSON.has(true)).toBeTruthy();
  });
});
