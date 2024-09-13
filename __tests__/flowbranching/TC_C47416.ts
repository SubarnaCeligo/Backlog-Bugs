
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47416.json";

test.describe("@Author-ParthPatel TC_C47416", () => {
  let flowId;
  test.beforeEach(async ({ io, page }, testInfo) => {
    await test.step("*** Go to flows page ***", async () => { 
      await io.goToFlowsPage();
      let scriptId = await io.api.getScriptId(flowbranch.scriptBody.name);
      if (!scriptId) {
        scriptId = await io.api.createScriptViaAPI(
          flowbranch.scriptBody
        );
      }
      flowbranch.routers[1].branches[0].pageProcessors[0].qa__import[
        "hooks"
      ].preMap._scriptId = scriptId;
    });
  });

  test.afterEach(async ({ io, page }, testInfo) => {
    await test.step("*** Deleting flow.***", async () => {
      await io.flowbranching.flowBranchingPage.decreaseDrawer();
      await io.api.deleteFlowsWithId([flowId]);
    });
  });

  test("@Env-All @Zephyr-IO-T17497 TC_C47416", async ({ io, page }, testInfo) => {
    // Test to retry the error caused on the PP(with file aggregation) added test.afterEach a merge
    flowId = await io.flowbranching.createFlowBranchFromAPI(flowbranch);
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(
      selectors.basePagePO.RUNFLOW
    );
    await io.homePage.loadingTime();
    //Removing the pendo badge from the page as due to this we are not able to increase the height of the Run panel
    await io.flowbranching.flowBranchingPage.increaseDrawer();
    await io.homePage.loadingTime();
    let errors = await io.flowbranching.flowBranchingPage.getList(
      selectors.flowBuilderPagePO.JOB_ERRORS
    );
    expect(errors.includes("Success")).toEqual(true);
    expect(errors.includes("2 errors")).toEqual(true);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.FIT_WINDOW_WITH_BUTTON);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS)
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.myAccountPagePO.ERROR_CHECKBOX);

    await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN);
    await io.flowBuilder.click(selectors.myAccountPagePO.SELECTED_ERROR);
    await io.flowBuilderDashboard.waitTillRetryCompletes();
    await io.homePage.click(selectors.integrationPagePO.RESOLVEDERRORS);
    await io.homePage.loadingTime();
    let errs = await io.homePage.getLengthOfElementArray(selectors.myAccountPagePO.ERROR_CHECKBOX);
    expect(errs).toEqual(3);
    await io.homePage.click(selectors.importPagePO.IMPORT_HANDLEBAR_CLOSE_DRAWER);
  });
})
