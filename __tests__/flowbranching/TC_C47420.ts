
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47420.json";

test.describe("@Author-ParthPatel TC_C47420", () => {
  let flowId;
  test.afterEach(async ({io,page}, testInfo) => {
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T17501 TC_C47420", async ({io,page}, testInfo) => {
    flowId = await io.flowbranching.createFlowBranchFromAPI(
      flowbranch
    );
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.click(selectors.basePagePO.RUNFLOW);
    await io.homePage.loadingTime();

    //Validation in upstream Apps;
    await test.step("Validate the job count from API", async () => {
      const result  = await io.api.validateJobCountFromAPI(flowbranch.name, flowbranch.qa__expectedDashboardCount);
      expect(result.has(true)).toBeTruthy();
    });
  });
});
