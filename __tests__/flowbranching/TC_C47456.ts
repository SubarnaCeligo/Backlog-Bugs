
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47456.json";

test.describe("@Author-ParthPatel TC_C47456_oneToMany Test to set 'Proceed to Failure' as false and 'One To many' as true on the import on a branch and then also validate the error retry", () => {
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
    flowbranch.routers[0].branches[0].pageProcessors[0].qa__import[
      "hooks"
    ].postMap._scriptId = scriptId;
  });

  test.afterEach(async ({io,page}, testInfo) => {
    await test.step("*** Deleting flow.***", async ()=>{
      await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
      await io.homePage.loadingTime();
      await io.flowbranching.flowBranchingPage.decreaseDrawer();
      await io.api.deleteFlowsWithId([flowId]);
    });
  });
  
  test("@Env-All @Zephyr-IO-T17525 TC_C47456_oneToMany", async ({io,page}, testInfo) => {
    flowId = await io.flowbranching.createFlowBranchFromAPI(flowbranch);
    await io.api.checkJobStatusFromAPI(
      flowbranch.name,
      flowId,
      [3, 0, 2]
    );
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.increaseDrawer();
    await io.homePage.loadingTime();
    let errors = await io.flowbranching.flowBranchingPage.getList(
      selectors.flowBuilderPagePO.JOB_ERRORS
    );
    expect(errors.includes("1 error")).toEqual(true);
    await io.homePage.loadingTime();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch()

    await io.homePage.click(
      selectors.flowBuilderPagePO.PAGE_PROCESSOR_HOOKS
    );
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(selectors.basePagePO.SCRIPT_DEBUGGER_SELECTOR, 1);
    await page.locator(selectors.flowBuilderPagePO.SCROLL_TOP).nth(0).evaluate((el) => {
      el.scrollTop = 0
    });
    await io.connectionPage.selectTextfromDropDown(page, '');
    await io.homePage.loadingTime();
    await io.flowBuilderDashboard.clickButtonAtTopOfArray(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.REFRESH_JOBS_BOARD);
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON, 0);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.myAccountPagePO.ERROR_CHECKBOX);
    await io.homePage.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN);
    await io.flowBuilder.click(selectors.myAccountPagePO.SELECTED_ERROR);
    await io.flowBuilderDashboard.waitTillRetryCompletes();
    await io.homePage.click(selectors.integrationPagePO.RESOLVEDERRORS);
    await io.homePage.loadingTime();
    let errs = await io.homePage.getLengthOfElementArray(selectors.myAccountPagePO.ERROR_CHECKBOX);
    expect(errs).toEqual(4);
    await io.homePage.click(selectors.importPagePO.IMPORT_HANDLEBAR_CLOSE_DRAWER);
    await io.homePage.loadingTime();
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();
    //Validation in upstream Apps
    await io.flowBuilder.validateJobCountFromDashBoard(
      flowbranch.name,
      flowbranch.qa__expectedDashboardCount
    )
  });
});
