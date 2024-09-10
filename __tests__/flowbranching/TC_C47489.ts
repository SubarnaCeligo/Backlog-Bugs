
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47489.json";

test.describe("@Author-ParthPatel TC_C47489_Flowbranching", () => {
  let flowId;

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Go to flows page ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test.afterEach(async ({io,page}, testInfo) => {
    await test.step("*** Deleting Flow. ***", async ()=>{
      await io.api.deleteFlowsWithId([flowId]);
    });
  });

  test("@Env-All @Zephyr-IO-T17543 TC_C47489_Flowbranching Test to create a branched flow with FTP export (file type as json)", async ({io,page}, testInfo) => {
    await test.step("*** Creating Flow ***", async ()=>{
      flowId = await io.flowbranching.createFlowBranchFromAPI(flowbranch);

      await io.flowBuilderDashboard.navigateToEm2Flow(flowId);

      await io.homePage.loadingTime();
    });

    await io.homePage.click(
      selectors.basePagePO.RUNFLOW
    );
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();

    var resultJSON = await io.api.validateJobCountFromAPI(flowbranch.name, flowbranch.qa__expectedDashboardCount)
    expect(resultJSON.has(true)).toBeTruthy();
  });
});
