
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47564.json";

test.describe("@Author-ParthPatel TC_C47564", () => {
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


  test("@Env-All @Zephyr-IO-T17646 TC_C47564 Test to validate the retry data for the errors on the branched flows", async ({io,page}, testInfo) => {
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

    await io.homePage.click(selectors.flowBuilderPagePO.FIT_WINDOW_WITH_BUTTON);

    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS,
      1
    );
    await io.homePage.loadingTime();
    await io.homePage.hover(selectors.mappings.DEFAULT_MAPPING_TYPE.FIELD_MAPPING_GENERATE_1, 0, true);
    await io.homePage.click(selectors.mappings.DELETEFIELD_1);

    await io.flowBuilderDashboard.clickButtonAtTopOfArray(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS,
      0
    );
    await io.homePage.loadingTime();
    await io.homePage.hover(selectors.mappings.DEFAULT_MAPPING_TYPE.FIELD_MAPPING_GENERATE_1, 0, true);
    await io.homePage.click(selectors.mappings.DELETEFIELD_1);
    
    await io.flowBuilderDashboard.clickButtonAtTopOfArray(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON, 0);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.myAccountPagePO.ERROR_CHECKBOX);
    
    await io.homePage.loadingTime();
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
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.RUN_CONSOLE_ERROR_ICON, 1);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.myAccountPagePO.ERROR_CHECKBOX);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN);
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.DROPDOWN, 2);
    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY);

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.integrationPagePO.RESOLVEDERRORS);
    await io.homePage.loadingTime();
    errs = await io.homePage.getLengthOfElementArray(selectors.myAccountPagePO.ERROR_CHECKBOX);
    expect(errs).toEqual(2);
    await io.homePage.click(selectors.importPagePO.IMPORT_HANDLEBAR_CLOSE_DRAWER);
    await io.homePage.loadingTime();
  });
});
