
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47448.json";

test.describe("@Author-ParthPatel TC_C47448_Flowbranching_To_Validate_the_Preview_Fucntionality_At_Add Branchs", () => {
  let flowId;
  test.afterEach(async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
  });
  
  test.afterEach(async ({io,page}, testInfo) => {
    await test.step("*** Deleting flow.***", async ()=>{
      await io.api.deleteFlowsWithId([flowId]);
    });
  });
  test("@Env-All @Zephyr-IO-T17517 TC_C47448", async ({io,page}, testInfo) => {
    await test.step("*** Creating Flow ***", async ()=>{
      flowId = await io.flowbranching.createFlowBranchFromAPI( flowbranch);
      await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
      await io.homePage.loadingTime();
    });
    await page.pause();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(selectors.flowBuilderPagePO.EDIT_BRANCHING);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
    await io.homePage.loadingTime();

    var result = (await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT)).toString();
    await io.assert.expectToContainValue("The record will pass through branches:branch 0: Branch 1.0branch 1: Branch 1.1",result, "");
    await io.homePage.loadingTime();
  });
});
