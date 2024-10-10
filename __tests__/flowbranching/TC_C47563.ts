
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47563.json";
  

test.describe("@Author-ParthPatel TC_C47563_Flowbranching", () => {
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
      flowbranch.routers[0].branches[0].pageProcessors[0].qa__import[
        "hooks"
      ].postMap._scriptId = scriptId;
    });
  });

  test.afterEach(async ({io,page}) => {
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.decreaseDrawer();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T17645 TC_C47563 Test to retry errors due to post map hook on the branched flow", async ({io,page}, testInfo) => {
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
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.JOB_ERRORS);
    let errors = await io.flowbranching.flowBranchingPage.getList(
      selectors.flowBuilderPagePO.JOB_ERRORS
    );
    await io.homePage.loadingTime();

    expect(errors.includes("1 error")).toEqual(true);
    await io.homePage.loadingTime();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.PAGE_PROCESSOR_HOOKS,
      0
    );

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.HOOK_TYPE_STACK_OPTION);
    await io.homePage.loadingTime();

    await io.flowBuilderDashboard.clickButtonAtTopOfArray(selectors.basePagePO.SAVE_AND_CLOSE);
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

    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN);
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.DROPDOWN, 2);

    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY);
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
    )
    expect(resultJSON.has(true)).toBeTruthy();
  });
});
