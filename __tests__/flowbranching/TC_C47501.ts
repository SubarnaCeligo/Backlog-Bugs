
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C47501 from "@testData/flowbranching/TC_C47501.json";

test.describe("@Author-ParthPatel TC_C47501", () => {
  let flowId;
  test.beforeEach(async ({ io, page }, testInfo) => {
    await test.step("*** Go to flows page ***", async () => {
      await io.goToFlowsPage();
    });
  });

  test.afterEach(async ({ io, page }, testInfo) => {
    await test.step("*** Deleting Flow. ***", async () => {
      await io.api.deleteFlowsWithId([flowId]);
    });
  });

  test("@Env-All @Zephyr-IO-T17555 TC_C47501 Test to create a branched flow with Amazon seller central export", async ({ io, page }, testInfo) => {
    flowId = await io.flowbranching.createFlowBranchFromAPI(TC_C47501);

    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);

    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.basePagePO.RUNFLOW
    );
    await io.homePage.loadingTime();

    var resultJSON = await io.api.validateJobCountFromAPI(
      TC_C47501.name,
      TC_C47501.qa__expectedDashboardCount
    )

    expect(resultJSON.has(true)).toBeTruthy();
  });
});
