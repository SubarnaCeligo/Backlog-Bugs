
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("@Author-ParthPatel TC_C47406", () => {
  var flowId;
  test.beforeEach(async ({io}) => {
    await io.goToFlowsPage();
  });

  test.afterEach(async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.FIT_WINDOW_WITH_BUTTON);
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T17488 TC_C47406 | Test to create a flow with overlapping edges and validate the schema  ", async ({io, page}) => {
    await test.step("Clicked On Add branching .", async ()=>{
      await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.homePage.loadingTime();
      await io.homePage.clickButtonByIndex(selectors.flowBranchingPO.ROUTER_BUTTON, 0);
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.MENUITEM,
        "Add branching"
      );
    });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBranchingPO.ADD_BRANCH);
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    var handle = await page.locator(selectors.flowBranchingPO.DRAG_TERMINAL).nth(0);
    var target = await page.locator(selectors.flowBranchingPO.DRAG_TERMINAL).nth(1);
    await handle.dragTo(target);
    await io.homePage.loadingTime();
    
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(selectors.flowBranchingPO.ZOOM_OUT);
    handle = await page.locator(selectors.flowBranchingPO.DRAG_TERMINAL).nth(0);
    target = await page.locator(selectors.flowBranchingPO.MERGE_POINT);
    await handle.dragTo(target);
    await io.homePage.click(selectors.flowBranchingPO.ZOOM_OUT);
    await test.step("Clicked On Add branching .", async ()=>{
      await io.homePage.loadingTime();
      await io.homePage.clickByIndex(selectors.flowBranchingPO.ROUTER_BUTTON, 4);
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.MENUITEM,
        "Add branching"
      );
    });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    flowId = await page.url().split('flowBuilder/')[1];
    var flowResponse = await io.api.getFlowById(flowId);
    expect(flowResponse.routers.length).toEqual(3);
    expect(flowResponse.routers[0]).toHaveProperty("routeRecordsUsing");
    expect(flowResponse.routers[0]).toHaveProperty("routeRecordsTo");
    expect(flowResponse.routers[0]).toHaveProperty("script");
    expect(flowResponse.routers[1]).not.toHaveProperty("routeRecordsUsing");

    expect(flowResponse.pageProcessors).toEqual(undefined);

    var branch = flowResponse.routers[0].branches[0];
    expect(branch).toHaveProperty("name", "Branch 1.0");
    expect(branch).toHaveProperty("nextRouterId");
    expect(branch).toHaveProperty("pageProcessors");
  });
});
