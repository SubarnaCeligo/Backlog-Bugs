
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47562.json";

test.describe("@Author-ParthPatel TC_C47562", () => {
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

  test("@Env-All @Zephyr-IO-T17644 TC_C47562 Test to retry errors due to response mapping on the branched flow", async ({io,page}, testInfo) => {
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

    await io.homePage.click(
      selectors.mappings.DEFAULT_MAPPING_TYPE.RESPONSE_MAPPING
    );
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.transformationPO.TEXT_EXTRACT + '0"]');
    await io.homePage.fill(selectors.mappings.MAPPER2DOT0PO.EXTRACTFIRST + ' input', '');
    await io.homePage.fill(selectors.mappings.MAPPER2DOT0PO.EXTRACTFIRST + ' input', 'data.id');
    await io.homePage.click(selectors.transformationPO.TEXT_GENE + '0"]');
    await io.homePage.fill(selectors.flowBuilderPagePO.GENERATE_RULES + ' input', '');
    await io.homePage.fill(selectors.flowBuilderPagePO.GENERATE_RULES + ' input', 'data.Id');

    await io.homePage.loadingTime();
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

    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.DROPDOWN, 2);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.integrationPagePO.RESOLVEDERRORS);
    await io.homePage.loadingTime();

    let errs = await io.homePage.getLengthOfElementArray(selectors.myAccountPagePO.ERROR_CHECKBOX);
    expect(errs).toEqual(2);

    await io.homePage.click(selectors.importPagePO.IMPORT_HANDLEBAR_CLOSE_DRAWER);
    await io.homePage.loadingTime();
  });
});
