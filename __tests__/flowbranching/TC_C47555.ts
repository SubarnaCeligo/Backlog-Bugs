
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47555.json";

test.describe("@Author-ParthPatel TC_C47555_Retry_Error_Invalid_Lookup", () => {
  let flowId;

  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Go to flows page ***", async ()=>{
      await io.goToFlowsPage();
    });
  });

  test.afterEach(async ({io,page}, testInfo) => {
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.decreaseDrawer();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T17637 TC_C47555_Retry_Error_Invalid_Lookup Test to retry an error occured on a lookup added before a router on a branched flow", async ({io,page}, testInfo) => {
    flowId = await io.flowbranching.createFlowBranchFromAPI(flowbranch);
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    await io.homePage.click(
      selectors.basePagePO.RUNFLOW
    );
    await io.homePage.loadingTime();

    await io.flowbranching.flowBranchingPage.increaseDrawer();
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.REFRESH_JOBS_BOARD);
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
    
    let errors = await io.flowbranching.flowBranchingPage.getList(
      selectors.flowBuilderPagePO.JOB_ERRORS
    );
    expect(errors.includes("1 error")).toEqual(true);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.FIT_WINDOW_WITH_BUTTON);

    //remove transformation
    await io.homePage.click(selectors.flowGroupingPagePO.LOOKTRANSFORMATION);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.mappings.DELETEFIRST);
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    await test.step("Open error drawer", async ()=>{
      await io.homePage.reloadPage();
      await io.homePage.loadingTime();
      await io.flowbranching.flowBranchingPage.increaseDrawer();
      await io.homePage.loadingTime();
      await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON);
      await io.homePage.clickByIndex(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON, 0);
    });

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.myAccountPagePO.ERROR_CHECKBOX);

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN);

    await io.flowBuilder.click(selectors.myAccountPagePO.SELECTED_ERROR);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.integrationPagePO.RESOLVEDERRORS);
    await io.homePage.loadingTime();

    let errs = await io.homePage.getLengthOfElementArray(selectors.myAccountPagePO.ERROR_CHECKBOX);
    expect(errs).toEqual(2);

    await io.homePage.click(selectors.importPagePO.IMPORT_HANDLEBAR_CLOSE_DRAWER);
    await io.homePage.loadingTime();

    var resultJSON = await io.api.validateJobCountFromAPI(
      flowbranch.name,
      flowbranch.qa__expectedDashboardCount
    );
    expect(resultJSON.has(true)).toBeTruthy();
  });
});
