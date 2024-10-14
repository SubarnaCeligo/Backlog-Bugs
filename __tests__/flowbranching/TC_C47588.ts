
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47588.json";

test.describe("@Author-ParthPatel TC_C47588", () => {
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Go to flows page ***", async ()=>{
      await io.goToFlowsPage();
    });
  });

  test.afterEach(async ({io,page}, testInfo) => {
    await test.step("*** Deleting flow.***", async ()=>{
      await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
      await io.homePage.loadingTime();
      await io.flowbranching.flowBranchingPage.decreaseDrawer();
      await io.api.deleteFlowsWithId([flowId]);
    });
  });

  test("@Env-All @Zephyr-IO-T17667 TC_C47588 | Test to create a branched flow with overlapping edges/multiple routers and validate the preview of a import added on the branch of a last router.  ", async ({io,page}, testInfo) => {
    flowId = await io.flowbranching.createFlowBranchFromAPI( flowbranch);
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.IMPORT, 0);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    await io.homePage.loadingTime();

    const requestBody = (await io.homePage.getText(selectors.importPagePO.PREVIEWDATA)).toString()
    await io.assert.expectToContainValue("id",requestBody, "");
    await io.flowbranching.flowBranchingPage.closeDrawer();
    await io.homePage.loadingTime();
  });
});
