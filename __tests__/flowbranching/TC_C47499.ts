
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C47499 from "@testData/flowbranching/TC_C47499.json";

test.describe("@Author-ParthPatel TC_C47499", () => {
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Go to flows page ***", async ()=>{
      await io.goToFlowsPage();
    });
  });

  test.afterEach(async ({io,page}, testInfo) => {
    await test.step("*** Deleting Flow. ***", async ()=>{
      await io.api.deleteFlowsWithId([flowId]);
    });
  });

  test("@Env-All @Zephyr-IO-T17553 TC_C47499 Test to create a branched flow with Mysql export", async ({io,page}, testInfo) => {
    flowId = await io.flowbranching.createFlowBranchFromAPI(TC_C47499);

    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);

    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.RUNFLOW
    );
    await io.homePage.loadingTime();

    var resultJSON = await io.api.validateJobCountFromAPI(
      TC_C47499.name,
      TC_C47499.qa__expectedDashboardCount
    );

    expect(resultJSON.has(true)).toBeTruthy();
  });
});
