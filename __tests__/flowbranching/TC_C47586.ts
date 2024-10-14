
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47586.json";

test.describe("@Author-ParthPatel TC_C47586", () => {
  let flowId;

  test.beforeEach(async ({io}, testInfo) => {
    await test.step("*** Go to flows page ***", async ()=>{
      await io.goToFlowsPage();
    });
  });

  test.afterEach(async ({io}, testInfo) => {
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T17665 TC_C47586 Test to add an import and then preview the data on an import added on a branch", async ({io,page}, testInfo) => {
    flowId = await io.flowbranching.createFlowBranchFromAPI(
      flowbranch
    );
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);

    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.IMPORT, 0);
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    await io.homePage.loadingTime();
    var requestBody = await io.homePage.copyResourceData(selectors.importPagePO.PREVIEWDATA);
    expect(requestBody).toContain("field");
    await io.flowbranching.flowBranchingPage.closeDrawer();
  });
});
