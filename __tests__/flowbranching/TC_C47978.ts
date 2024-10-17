
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47978.json";

test.describe("@Author-ParthPatel TC_C47978_C47989_C47961", () => {
  let flowId;

  test.beforeEach(async ({io}) => {
    await io.goToFlowsPage();
  });

  test.afterEach(async ({io,page}, testInfo) => {
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.decreaseDrawer();
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T17337 @Zephyr-IO-T17347 @Zephyr-IO-T17322 TC_C47978_C47989_C47961 Verify branch names on bubbles for user defined branches", async ({io,page}, testInfo) => {
    flowId = await io.flowbranching.createFlowBranchFromAPI(flowbranch);

    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.loadingTime();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.loadingTime();

    //TC_C47978 
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.IMPORT, 0);
    await io.homePage.loadingTime();

    const imp1 = await page.url().split('edit/imports/')[1].split('?')[0];
    await io.flowbranching.flowBranchingPage.closeDrawer(); 

    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.IMPORT, 1);
    await io.homePage.loadingTime();
    const imp2 = await page.url().split('edit/imports/')[1].split('?')[0];
    await io.flowbranching.flowBranchingPage.closeDrawer();

    const actualName = await page.locator(`[data-id='${imp1}'] span`).nth(0).textContent();
    const branchName = await page.locator(`[data-id='${imp2}'] span`).nth(0).textContent();
    expect(branchName).toEqual(actualName);

    //TC_C47989 | Verify Merge scenario 2 where user merge branch into subbranch of same branching
    await io.homePage.click(selectors.flowBranchingPO.ROUTERS);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBranchingPO.ADD_BRANCH);

    await page.locator(selectors.flowBranchingPO.BRANCH_NAMES).nth(1).click({clickCount: 3})
    await page.keyboard.press('Backspace');
    await page.keyboard.type("R1B2");
    await page.keyboard.press('Enter');

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    
    await io.homePage.clickButtonByIndex(selectors.flowBranchingPO.ROUTER_BUTTON, 3);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.flowBuilderPagePO.MENUITEM,
      "Add branching"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    const prevNodes = await io.homePage.getLengthOfElementArray(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    var handle = await page.locator(selectors.flowBranchingPO.DRAG_TERMINAL).nth(2);
    var target = await page.locator(selectors.flowBranchingPO.ROUTER_BUTTON).nth(5);
    await handle.dragTo(target);

    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    
    const secondRouter = await page.locator(selectors.flowBranchingPO.ROUTERS).nth(1);
    const routerId = await (
      await secondRouter.getAttribute("data-test")
    ).split("-")[1];
    let path = await io.homePage.getElementLocatorById(routerId, imp2);
    let unlinks = await io.homePage.getLengthOfElementArray(selectors.flowBranchingPO.UNMERGE_BRANCHING);
    let merges = await io.homePage.getLengthOfElementArray(selectors.flowBranchingPO.MERGE_POINT);
    let currNodes = await io.homePage.getLengthOfElementArray(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    expect(unlinks).toEqual(2);
    expect(merges).toEqual(1);
    expect(currNodes).toEqual(prevNodes);

    //TC_C47961 | Verify the unmerging scenario where users unmerge branch into subbranch of same branching
    await io.homePage.clickButtonByIndex(selectors.flowBranchingPO.UNMERGE_BRANCHING, 1);
    await io.homePage.click(selectors.basePagePO.MENU_ITEM);
    await io.homePage.loadingTime();
    path = await io.homePage.getElementLocatorById(routerId, imp2);
    unlinks = await io.homePage.getLengthOfElementArray(selectors.flowBranchingPO.UNMERGE_BRANCHING);
    merges = await io.homePage.getLengthOfElementArray(selectors.flowBranchingPO.MERGE_POINT);
    currNodes = await io.homePage.getLengthOfElementArray(
      selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP
    );
    expect(unlinks).toEqual(0);
    expect(merges).toEqual(0);
    expect(currNodes).toEqual(prevNodes);
  });
});
