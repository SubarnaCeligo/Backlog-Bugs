
import { test } from "@celigo/ui-core-automation";
import flowbranch from "@testData/flowbranching/TC_C47432.json";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ParthPatel TC_C47432_Flowbranching_TO_Validte_setupInProgress_Field_Value_For_Empty_PP_Bubbles", () => {
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Go to flows page ***", async ()=>{
      await io.goToFlowsPage();
    });
  });
  test.afterEach(async ({io,page}, testInfo) => {
    await test.step("*** Deleting flow.***", async ()=>{
      await io.api.deleteFlowsWithId([flowId]);
    });
  });
  test("@Env-All @Zephyr-IO-T17512 TC_C47432", async ({io,page}, testInfo) => {
    await test.step("*** Creating Flow ***", async ()=>{
      flowId = await io.flowbranching.createFlowBranchFromAPI( flowbranch);
      await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
      await io.homePage.loadingTime();
    });
    await io.homePage.click(selectors.flowBranchingPO.ROUTERS);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBranchingPO.ADD_BRANCH);
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.addEmptyNodes(4, 1);
    await io.homePage.loadingTime();
    await test.step("***getting the flowID and verified the setup in progress for the imports ***", async ()=>{
      var flowResponse = await io.api.getFlowById(flowId);
      await io.assert.expectToBeTrue(
        flowResponse.routers[0].branches[1].pageProcessors[0].setupInProgress
      , "");
      await io.assert.expectToBeTrue(
        flowResponse.routers[0].branches[1].pageProcessors[1].setupInProgress
      , "");
    });
  });
});
