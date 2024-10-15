
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47454.json";

test.describe("@Author-ParthPatel TC_C47454", () => {
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
      await io.api.deleteFlowsWithId([flowId]);
    });
  });

  test("@Env-All @Zephyr-IO-T17523 TC_C47454 Test to set 'Proceed to Failure' as true and 'OneToMany' as true on the import on a branch and also retry the failed errors", async ({io,page}, testInfo) => {
    flowId = await io.flowbranching.createFlowBranchFromAPI(flowbranch);
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.RUNFLOW);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.increaseDrawer();
    await io.homePage.loadingTime();
    let errors = await io.flowbranching.flowBranchingPage.getList(selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN2);
    await io.homePage.loadingTime();
    expect(errors.includes("3 errors")).toEqual(true);
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS,
      0
    );
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.mappings.DEFAULT_MAPPING_TYPE.FIELD_MAPPING_GENERATE
    );
    await page.keyboard.type(".name");
    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await test.step("Opened Error Details Table.", async ()=>{
      await io.homePage.clickByIndex(selectors.integrationPagePO.STATUS,1);
      await io.homePage.loadingTime();
    });
    await io.homePage.click(selectors.myAccountPagePO.ERROR_CHECKBOX);

    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY_JOBS_DROPDOWN);
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.DROPDOWN, 2);
    await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.RETRY);

    await io.flowBuilderDashboard.waitTillRetryCompletes();
    await io.homePage.click(selectors.integrationPagePO.RESOLVEDERRORS);
    await io.homePage.loadingTime();
    let errs = await io.homePage.getLengthOfElementArray(selectors.myAccountPagePO.ERROR_CHECKBOX);
    expect(errs).toEqual(4);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.importPagePO.IMPORT_HANDLEBAR_CLOSE_DRAWER);
  });
});
