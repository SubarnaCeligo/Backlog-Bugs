
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47432.json";

test.describe("@Author-ParthPatel TC_C47436", () => {
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
  });

  test.afterEach(async ({io,page}, testInfo) => {
    await test.step("*** Deleting flow.***", async ()=>{
      await io.api.deleteFlowsWithId([flowId]);
    });
  });
  test("@Env-All @Zephyr-IO-T17515 TC_C47436 Test to add a router and then add empty bubble in one branch and configure a PP in other branch", async ({io,page}, testInfo) => {
    await test.step("*** Creating Flow ***", async ()=>{
      flowId = await io.flowbranching.createFlowBranchFromAPI(flowbranch);
      await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
      await io.homePage.loadingTime();
    });
    await io.homePage.click(selectors.flowBranchingPO.ROUTERS);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBranchingPO.ADD_BRANCH);
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    var flowResponse = await io.api.getFlowById(flowId);

    //TC_C47436 | Test to add a router and then add empty bubble in one branch and configure a PP in other branch
    flowResponse = await io.api.getFlowById(flowId);
    let flag = JSON.stringify(flowResponse.routers[0].branches[0].pageProcessors);
    await io.assert.expectNotToContainValue("setupInProgress",flag,"")
    flag = JSON.stringify(flowResponse.routers[0].branches[1].pageProcessors);
    await io.assert.expectToContainValue("setupInProgress", flag, "");
    await io.assert.expectToContainValue("true",flag, "");
  });
});
