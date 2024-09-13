
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47524.json";

test.describe("@Author-ParthPatel TC_C47524", () => {
  let flowId;

  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Go to flows page ***", async ()=>{
      await io.goToFlowsPage();
    });
  });

  test.afterEach(async ({io,page}, testInfo) => {
    await test.step("*** Deleting Flow ***", async ()=>{
      await io.api.deleteFlowsWithId([flowId]);
    });
  });

  test("@Env-All @Zephyr-IO-T17606 TC_C47524 Test to add an import , add response mapping and then add a router with atleast 2 branches", async ({io,page}, testInfo) => {
    flowId = await io.flowbranching.createFlowBranchFromAPI(flowbranch);
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.loadingTime();
    
    await io.homePage.click(
      selectors.basePagePO.RUNFLOW
    );
    await io.homePage.loadingTime();

    await page.pause();
    var resultJSON = await io.api.validateJobCountFromAPI(
      flowbranch.name,
      flowbranch.qa__expectedDashboardCount
    );

    expect(resultJSON.has(true)).toBeTruthy();
  });
});
