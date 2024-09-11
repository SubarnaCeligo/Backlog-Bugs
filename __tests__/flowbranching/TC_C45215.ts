
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C45215.json";  

test.describe("@Author-ParthPatel TC_C45215_C45216_C45116_C45118_C45121_C45135_C45143_C47959_C47960_C45145 | Golden ", () => {
  let flowId;

  test.afterEach(async ({io,page}, testInfo) => {
    await test.step("*** Deleting flow.***", async ()=>{
      await io.api.deleteFlowsWithId([flowId]);
    });
  });

  test("@Env-All @Zephyr-IO-T17315 @Zephyr-IO-T17316 @Zephyr-IO-T17281 @Zephyr-IO-T17283 @Zephyr-IO-T17285 @Zephyr-IO-T17298 @Zephyr-IO-T17302 @Zephyr-IO-T17320 @Zephyr-IO-T17321 @Zephyr-IO-T17303 TC_C45215_C45216_C45116_C45118_C45121_C45135_C45143_C47959_C47960_C45145", async ({io,page}, testInfo) => {
    await test.step("*** Creating Flow ***", async ()=>{
      flowId = await io.flowbranching.createFlowBranchFromAPI( flowbranch);
      await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    });
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.FITVIEW);
    await io.homePage.click(selectors.flowBranchingPO.ZOOM_OUT);

    await io.homePage.reloadPage();
    await io.homePage.loadingTime();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    //TC_C45215 | Verify the run icon for configured flow
    expect(await page.locator(selectors.basePagePO.RUNFLOW).nth(0)).toBeEditable();

    //TC_C45216 | Verify the schedule icon for configured flow
    const icon = await page.locator(selectors.flowBuilderPagePO.SCHEDULEICON);
    await icon.hover();
    
    let text = await io.homePage.getText(selectors.mappings.TOOLTIP);
    await io.assert.expectToContainValue("Add schedule", String(text), "");

    // TC_C45116 | Verify the condition option for different branches
    await io.homePage.clickButtonByIndex(selectors.flowBranchingPO.ROUTERS, 0);
    await io.homePage.click(selectors.flowBranchingPO.ADD_BRANCH);
    await page.locator(selectors.flowBranchingPO.BRANCH_NAMES).nth(2).click({clickCount: 3})
    await page.keyboard.press('Backspace');
    await page.keyboard.type("R1B3");
    await page.keyboard.press('Enter');

    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW);
    await io.homePage.loadingTime();
    var result = await io.homePage.getText(selectors.mappings.RESULTTEXT);
    let expPreview =
      "The record will pass through branches:branch 0: R1B1branch 2: R1B3";
    expect(result).toEqual(expPreview);

    //TC_C45118 | Verify the branches when "all matching branches" and rules is selected
    let ind = (await page.$$(selectors.flowBranchingPO.BRANCH_NAMES)).length;
    let isDraggable = (await (page.$$(selectors.flowBranchingPO.DRAG_HANDLE))).length;
    expect(isDraggable).toEqual(0);
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    //TC_C45121 | Verify the branches when "all matching branches" and javascript is selected
    await io.homePage.clickButtonByIndex(selectors.flowBranchingPO.ROUTERS, 0);
    while (ind++ < 8)
      await io.homePage.click(selectors.flowBranchingPO.ADD_BRANCH);
    expect(await page.locator(selectors.flowBranchingPO.BRANCH_NAMES).nth(7)).toBeVisible();
    isDraggable = (await (page.$$(selectors.flowBranchingPO.DRAG_HANDLE))).length;
    expect(isDraggable).toEqual(0);

    //Closing drawer and fitting viewport
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    //TC_C45135 | Verify a branch when AFE is saved and toggle button is at "Rules"
    let namesInLayout = await io.flowbranching.flowBranchingPage.getList(selectors.flowBranchingPO.BRANCH_NAME_HEADER);
    await io.assert.expectToBeValue(String(namesInLayout[0]), "R1B1", "");
    await io.assert.expectToBeValue(String(namesInLayout[1]), "R1B2", "");
    await io.assert.expectToBeValue(String(namesInLayout[2]), "R1B3", "");

    // TC_C45143 | Verify adding branches test.afterEach router
    await io.homePage.clickByIndex(selectors.flowBranchingPO.ROUTER_BUTTON, 8);
    text = await io.homePage.getText(selectors.mappings.TOOLTIP);
    await io.assert.expectToContainValue("Add destination / lookup", String(text), "");
    await io.homePage.click(selectors.basePagePO.MENU_ITEM);
    const applicationDrawer = await io.homePage.getText(selectors.flowBranchingPO.AFE_HEADINGS);
    await io.assert.expectToBeValue(String(applicationDrawer), "Create destination / lookup", "");
    await io.flowbranching.flowBranchingPage.closeDrawer();

    //TC_C47959 | Verify unmerge/unlink icon and hover text
    let merges = await io.homePage.getLengthOfElementArray(selectors.flowBranchingPO.MERGE_POINT);
    expect(merges).toEqual(1);
    
    await io.flowbranching.flowBranchingPage.clickButtonNTimes(
      selectors.flowBranchingPO.FLOW_BUILDER_BOTTOM_DRAWER_DOWN,
      2
    );
    await io.homePage.click(selectors.flowBuilderPagePO.FIT_WINDOW_WITH_BUTTON);
    await io.homePage.loadingTime();
    await io.homePage.clickByIndex(selectors.flowBranchingPO.UNMERGE_BRANCHING, 0);
    text = await io.homePage.getText(selectors.mappings.TOOLTIP);
    await io.assert.expectToContainValue("Unmerge branch", String(text), "");
    await io.homePage.click(selectors.basePagePO.MENU_ITEM);
    await io.homePage.loadingTime();

    //TC_C47960 | Verify the unmerging scenario if branch is unmerge between the two edges
    await io.homePage.loadingTime();
    merges = await io.homePage.getLengthOfElementArray(selectors.flowBranchingPO.MERGE_POINT);
    expect(merges).toEqual(0);

    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.IMPORT, 1);
    await io.homePage.loadingTime();

    const imp1 = await page.url().split('edit/imports/')[1].split('?')[0];
    await io.flowbranching.flowBranchingPage.closeDrawer(); 

    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.IMPORT, 2);
    await io.homePage.loadingTime();
    const imp2 = await page.url().split('edit/imports/')[1].split('?')[0];
    await io.flowbranching.flowBranchingPage.closeDrawer();

    let path = await io.homePage.getElementLocatorById(imp1, imp2);
    let count = await page.locator(path).count() > 0;
    expect(count).toBeTruthy();

    //TC_C45145 | Verify adding branches between page processor
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.clickButtonByIndex(selectors.flowBranchingPO.ROUTER_BUTTON, 5);
    await test.step("Clicked On Add branching .", async ()=>{
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.MENUITEM,
        "Add branching"
      );
      await io.homePage.loadingTime();
    });
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    const newRouter = await page.locator(selectors.flowBranchingPO.ROUTERS).nth(1).getAttribute("data-test");
    const routerId = newRouter.split("-")[1];
    path = await io.homePage.getElementLocatorById(routerId, imp2);
    count = await page.locator(path).count() > 0;
    expect(count).toBeTruthy();
  });
});
