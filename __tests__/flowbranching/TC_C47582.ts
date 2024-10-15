
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47582.json";

test.describe("@Author-ParthPatel TC_C47582_C47583", () => {
  let flowId;

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Go to flows page ***", async ()=>{});
    await io.goToFlowsPage();
    let scriptId = await io.api.getScriptId(flowbranch.scriptBody.name);
    if (!scriptId) {
      scriptId = await io.api.createScriptViaAPI(
        flowbranch.scriptBody
      );
    }
    flowbranch.routers[0].script._scriptId = scriptId;
  });

  test.afterEach(async ({io,page}, testInfo) => {
    await test.step("*** Deleting flow.***", async ()=>{
      await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
      await io.homePage.loadingTime();
      await io.flowbranching.flowBranchingPage.decreaseDrawer();
      await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
      await io.api.deleteFlowsWithId([flowId]);
    });
  });

  test("@Env-All @Zephyr-IO-T17661 @Zephyr-IO-T17662 TC_C47582_C47583", async ({io,page}, testInfo) => {
    //TC_C47582 Test to preview the input data on an rest api import added on a branch (All branches match type)
    //TC_C47583 Test to preview the input data on the import added on a branch (for row based data)
    flowId = await io.flowbranching.createFlowBranchFromAPI(flowbranch);
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.loadingTime();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.IMPORT, 0);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    await io.homePage.loadingTime();

    const requestBody = (await io.homePage.getText(selectors.importPagePO.PREVIEWDATA)).toString().replace(/\n/g, '').replace(/\\/g, '').replace(/\s{2,}/g, '');
    await io.assert.expectToContainValue('{"organization": {"name": "Auto', requestBody, "");
    await io.flowbranching.flowBranchingPage.closeDrawer();
  });
});
