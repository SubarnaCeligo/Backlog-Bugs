
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47542.json";

test.describe("@Author-ParthPatel TC_C47542_C47604", () => {
  let flowId;

  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Go to flows page ***", async ()=>{
      await io.goToFlowsPage();
      let scriptId = await io.api.getScriptId(flowbranch.scriptBody.name);
      if (!scriptId) {
        scriptId = await io.api.createScriptViaAPI(
          flowbranch.scriptBody
        );
      }
      flowbranch.pageGenerators[0].qa__export.hooks.preSavePage._scriptId = scriptId;
    });
  });

  test.afterEach(async ({io,page}, testInfo) => {
    await test.step("*** Deleting flow.***", async ()=>{
      await io.homePage.loadingTime();
      await io.flowbranching.flowBranchingPage.decreaseDrawer();
      await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
      await io.api.deleteFlowsWithId([flowId]);
    });
  });

  test("@Env-All @Zephyr-IO-T17624 @Zephyr-IO-T17676 TC_C47542_C47604_Retry_Error_Shopify_Export_AND_Setupinprogress_Flag Test to retry an error on the shopify export which is added on a branched flow", async ({io,page}, testInfo) => {
    flowId = await io.flowbranching.createFlowBranchFromAPI( flowbranch);
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(
      selectors.basePagePO.RUNFLOW
    );

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

    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_HOOK);
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(selectors.basePagePO.SCRIPT_DEBUGGER_SELECTOR, 0);
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
    await io.flowbranching.flowBranchingPage.increaseDrawer();
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON, 0);
    await io.homePage.loadingTime();

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.myAccountPagePO.ERROR_CHECKBOX);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN);
    await io.flowBuilder.click(selectors.myAccountPagePO.SELECTED_ERROR);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.integrationPagePO.RESOLVEDERRORS);
    await io.homePage.loadingTime();
    let errs = await io.homePage.getLengthOfElementArray(selectors.myAccountPagePO.ERROR_CHECKBOX);
    expect(errs).toEqual(2);

    await io.homePage.click(selectors.importPagePO.IMPORT_HANDLEBAR_CLOSE_DRAWER);
    await io.homePage.loadingTime();

    //TC_C47604 |Test to validate if there are any validation errors are shown when the 'setupInProgress' is set to true
    await io.flowbranching.flowBranchingPage.decreaseDrawer();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.flowBuilderDashboard.clickButtonAtTopOfArray(selectors.flowBranchingPO.ROUTER_BUTTON);
    await test.step("Clicked On Add branching .", async ()=>{
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.MENUITEM,
        "Add branching"
      );
    });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBranchingPO.ADD_BRANCH);
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    let flowResponse = await io.api.getFlowById(flowId);
    let flag = JSON.stringify(flowResponse);
    await io.assert.expectToContainValue("setupInProgress", flag, "");
  });
});
