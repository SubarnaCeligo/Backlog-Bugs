
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import exportConfig from "@testData/flowbranching/TC_C47436.json";

test.describe("@Author-ParthPatel TC_C47412", () => {
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
  });

  test.afterEach(async ({io,page}, testInfo) => {
    await test.step("*** Deleting flow.***", async ()=>{
      await io.api.deleteFlowsWithId([flowId]);
    });
  });
  test("@Env-All @Zephyr-IO-T17494 TC_C47412 Test to validate if there are any validation errors are shown when the 'setupInProgress' is set to true", async ({io,page}, testInfo) => {
    await test.step("*** Creating Flow ***", async ()=>{
      flowId = await io.api.createFlowFromAPI(exportConfig);
      await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
      await io.homePage.loadingTime();
    });
    await io.homePage.click(selectors.flowBranchingPO.ROUTER_BUTTON);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.flowBuilderPagePO.MENUITEM,
      "Add branching"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.flowbranching.flowBranchingPage.addEmptyNodes(4, 1);
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.addEmptyNodes(4, 1);
    await io.homePage.loadingTime();

    var flowResponse = await io.api.getFlowById(flowId);
    //TC_C47412 | Test to validate if there are any validation errors are shown when the 'setupInProgress' is set to true
    await io.assert.expectToBeTrue(flowResponse?.routers[0].branches[0].pageProcessors[0].setupInProgress, "");
    await io.assert.expectToBeTrue(flowResponse?.routers[0].branches[1].pageProcessors[0].setupInProgress, "");
    await io.assert.expectToBeTrue(flowResponse?.routers[0].branches[1].pageProcessors[1].setupInProgress, "");
    await io.assert.expectToBeTrue(flowResponse?.routers[0].branches[1].pageProcessors[2].setupInProgress, "");
  });
});
