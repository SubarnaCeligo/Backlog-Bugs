
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47581.json";
  
test.describe("@Author-ParthPatel TC_C47581_C47586", () => {
  let flowId;

  test.beforeEach(async ({io}, testInfo) => {
    await test.step("*** Go to flows page ***", async ()=>{
      await io.goToFlowsPage();
    });
  });

  test.afterEach(async ({io}, testInfo) => {
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T17660 @Zephyr-IO-T17665 TC_C47581_C47586", async ({io,page}, testInfo) => {
    flowId = await io.flowbranching.createFlowBranchFromAPI(
      flowbranch
    );
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.loadingTime();
    
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.loadingTime();
    
    //TC_C47581 | Test to preview the input data on an http import added on a branch (First branch match type)
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.IMPORT, 1);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    await io.homePage.loadingTime();
    var requestBody = (await io.homePage.getText(selectors.importPagePO.PREVIEWDATA)).toString().replace(/\n/g, '').replace(/\\/g, '').replace(/\s{2,}/g, '');
    await io.assert.expectToContainValue('{"organization": {"name": "Auto', requestBody, "");
    await io.flowbranching.flowBranchingPage.closeDrawer();

    // TC_C47586 | Test to add an import and then preview the data on an import added on a branch
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.IMPORT, 0);
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    await io.homePage.loadingTime();
    requestBody = JSON.parse(await io.homePage.copyResourceData(selectors.importPagePO.PREVIEWDATA));
    expect(requestBody).toHaveProperty("field");
    await io.flowbranching.flowBranchingPage.closeDrawer();
  });
});
