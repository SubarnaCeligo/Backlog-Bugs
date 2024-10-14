
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47549.json";
  

test.describe("@Author-ParthPatel TC_C47549_Retry_Error_Invalid_Lookup_Filter", () => {
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
      await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
      await io.api.deleteFlowsWithId([flowId]);
    });
  });

  test("@Env-All @Zephyr-IO-T17631 TC_C47549_Retry_Error_Invalid_Lookup_Filter Test to retry an error (error due to invalid lookup filter) on the import added on a branch (All branches match type)", async ({io,page}, testInfo) => {
    flowId = await io.flowbranching.createFlowBranchFromAPI( flowbranch);
    await io.api.checkJobStatusFromAPI(
      flowbranch.name,
      flowId,
      [6, 0, 1]
    );
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.loadingTime();
    
    await io.flowbranching.flowBranchingPage.increaseDrawer();
    await io.homePage.loadingTime();

    let errors = await io.flowbranching.flowBranchingPage.getList(
      selectors.flowBuilderPagePO.JOB_ERRORS
    );
    await io.flowbranching.flowBranchingPage.decreaseDrawer();
    expect(errors.includes("1 error")).toEqual(true);
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    //correcting lookup filter
    await test.step("Opened NS Import of flow. ", async ()=>{
      await io.homePage.clickButtonByIndex(
        selectors.flowBuilderPagePO.IMPORT,
        1
      );
      await io.homePage.loadingTime();
    });
    await io.homePage.click(
      selectors.flowBuilderPagePO.FILTER_UPDATE
    );
    await io.homePage.loadingTime();

    await io.homePage.fill(selectors.flowBuilderPagePO.RULE2, '');
    await io.homePage.fill(selectors.flowBuilderPagePO.RULE2, "{{{Title}}}");
    
    await io.homePage.click(selectors.mappings.REFRESHFILTERS);
    await io.flowBuilderDashboard.clickButtonAtTopOfArray(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowBuilderDashboard.clickButtonAtTopOfArray(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.REFRESH_JOBS_BOARD);
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.increaseDrawer();
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON, 0);
    await io.homePage.loadingTime();

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.myAccountPagePO.ERROR_CHECKBOX);
    
    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN);
    await io.flowBuilder.click(selectors.myAccountPagePO.SELECTED_ERROR);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.integrationPagePO.RESOLVEDERRORS);
    await io.homePage.loadingTime();
    let errs = await io.homePage.getLengthOfElementArray(selectors.myAccountPagePO.ERROR_CHECKBOX);
    expect(errs).toEqual(2);

    await io.homePage.click(selectors.importPagePO.IMPORT_HANDLEBAR_CLOSE_DRAWER);
    await io.homePage.loadingTime();
  });
});
