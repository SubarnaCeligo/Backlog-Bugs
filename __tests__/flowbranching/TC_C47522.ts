
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/flowbranching/TC_C47522.json";

test.describe("@Author-ParthPatel TC_C47522", () => {
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

  test("@Env-All @Zephyr-IO-T17604 TC_C47522 Test to create a Mongodb lookup and then add router with atleast 2 branches", async ({io,page}, testInfo) => {
    flowId = await io.flowbranching.createFlowBranchFromAPI(TC);
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.RUNFLOW
    );

    await io.homePage.loadingTime();

    var resultJSON = await io.api.validateJobCountFromAPI(
      TC.name,
      TC.qa__expectedDashboardCount
    );

    expect(resultJSON.has(true)).toBeTruthy();
  });
});
