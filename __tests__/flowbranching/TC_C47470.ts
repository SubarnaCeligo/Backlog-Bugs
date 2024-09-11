
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import partialFlow from "@testData/flowbranching/TC_C47466.json";
import TC from "@testData/flowbranching/TC_C47470.json";

test.describe("@Author-ParthPatel TC_C47470_C47466_C47467", () => {
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***", async ()=>{
      await io.goToFlowsPage();
    });
  });

  test.afterEach(async ({io,page}, testInfo) => {
    await test.step("*** Deleting flow.***", async ()=>{
      await io.api.deleteFlowsWithId([flowId]);
    });
  });

  test("@Env-All @Zephyr-IO-T17532 @Zephyr-IO-T17529 @Zephyr-IO-T17530 TC_C47470_C47466_C47467", async ({io,page}, testInfo) => {
    flowId = await io.flowbranching.createFlowBranchFromAPI(TC);
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.flowBuilder.removePgOrPp(0, "remove-pp");
    await io.homePage.click(selectors.flowBranchingPO.ROUTERS);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBranchingPO.ROUTER_MENU);
    await io.homePage.click(selectors.flowBranchingPO.DELETE_BRANCHING);
    await io.homePage.click(
      selectors.basePagePO.DELETE
    );
    await io.homePage.loadingTime();
    
    //TC_C47470 | Test to verify that user is not able to trigger the flow when there are partially configured branches
    await test.step("Clicked On Add branching .", async ()=>{
      await io.homePage.clickByIndex(selectors.flowBranchingPO.ROUTER_BUTTON, 0);
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.MENUITEM,
        "Add branching"
      );
    });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBranchingPO.ALL_MATCHING_BRANCHES);
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    const runFlow = selectors.basePagePO.RUNFLOW;
    await expect(await page.locator(runFlow).nth(0)).toBeDisabled();
    await io.api.deleteFlowsWithId(flowId);
    await io.homePage.loadingTime();

    
    //TC_C47466 | Test to verify that scheduled flow is not triggered when there are partially configured branches (when both the branches do not have imports configured)
    await io.homePage.hover(selectors.flowBuilderPagePO.SCHEDULEICON, 0, true);
    await io.homePage.loadingTime();
    let text = await io.homePage.getText(selectors.mappings.TOOLTIP);
    expect(text).toEqual("Remove or configure all unconfigured flow steps to edit the flow schedule");
    await io.api.deleteFlowsWithId(flowId);

    //TC_C47467 | Test to verify that scheduled flow is not triggered when there are partially configured branches (one of the branche do not have imports configured)
    flowId = await io.flowbranching.createFlowBranchFromAPI(partialFlow);
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.clickButtonByIndex(selectors.flowBranchingPO.ROUTERS, 0);
    await io.homePage.clickButtonBasedOnLabelName(selectors.basePagePO.MENU_ITEM, "Add branching");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBranchingPO.ADD_BRANCH);
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await expect(await page.locator(runFlow).nth(0)).toBeDisabled();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
  });
});
