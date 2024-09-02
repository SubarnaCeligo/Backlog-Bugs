
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47394.json";  

test.describe("@Author-ParthPatel TC_C47394", () => {
  var FlowID;
  test.beforeEach(async ({io}) => {
    await io.goToFlowsPage();
    let scriptId = await io.api.getScriptId(flowbranch.scriptBody.name);
    if (!scriptId) {
      scriptId = await io.api.createScriptViaAPI(
        flowbranch.scriptBody
      );
    }
  });

  test.afterEach(async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.api.deleteFlowsWithId([FlowID]);
  });

  test("@Env-All @Zephyr-IO-T17476 TC_C47394 | Test to create a branched flow and validate its schema", async ({io, page}) => {
    // Create Page Generator and Saving Flow
    await test.step("*** Creating Flow ***", async ()=>{
      FlowID = await io.flowbranching.createFlowBranchFromAPI(flowbranch);
      await io.flowBuilderDashboard.navigateToEm2Flow(FlowID);
    });
    await io.homePage.loadingTime();
    
    var handle = await page.locator(selectors.flowBranchingPO.DRAG_TERMINAL).nth(0);
    var target = await page.locator(selectors.flowBranchingPO.DRAG_TERMINAL).nth(1);
    await handle.dragTo(target);
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.clickByIndex(selectors.flowBranchingPO.ROUTER_BUTTON, 4);
    await test.step("Clicked On Add branching .", async ()=>{
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.MENUITEM,
        "Add branching"
      );
      await io.homePage.loadingTime();
    });
    await io.homePage.click(selectors.basePagePO.JAVASCRIPTWINDOW);
    await io.homePage.click(selectors.basePagePO.SCRIPT_ID);
    await page.getByRole('option', { name: flowbranch.scriptBody.name }).nth(0).click();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.isPageReady();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    var flowResponse = await io.api.getFlowById(FlowID);
    await test.step("*** validating Routers length and Pageprocessors data ***", async ()=>{
      expect(flowResponse.routers.length).toEqual(3);
      var branch = flowResponse.routers[0].branches[0];
      var Flag = JSON.stringify(branch.pageProcessors);
      await io.assert.expectToContainValue('"type\":\"import\"', Flag, "");
      expect(flowResponse.pageProcessors).toEqual(undefined);
      expect(branch).toHaveProperty("name", "Branch 1.0");
      expect(branch).toHaveProperty("nextRouterId");
      expect(branch).toHaveProperty("pageProcessors");
    });
  });
});
