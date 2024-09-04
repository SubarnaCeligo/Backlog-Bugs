
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("@Author-ParthPatel TC_C45160_C45130_C45101 | Golden ", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***", async ()=>{
      await io.goToFlowsPage();
    });
  });
  test("@Env-All @Zephyr-IO-T17310 TC_C45160| Verify the run icon for unconfigured flow  ", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await test.step("Clicking on Create Flow", async ()=>{
      await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.homePage.loadingTime();
    });
    await io.homePage.click(selectors.flowBranchingPO.ROUTER_BUTTON);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.flowBuilderPagePO.MENUITEM,
      "Add branching"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.hover(selectors.flowBuilderPagePO.RUNTEST_BUTTON, 0, true);
    await expect(page.locator(selectors.flowBuilderPagePO.RUNTEST_BUTTON).nth(0)).toBeDisabled();
    await io.homePage.loadingTime();
    let hoverTooltip = selectors.flowBuilderPagePO.EM2DOT0PO.COMPLETED_ROWS_HOVER
    
    let text = await io.homePage.getText(hoverTooltip);
    await io.assert.expectToBeValue(String(text), "Configure all flow steps to enable test runs.", "");
  });

  test("@Env-All @Zephyr-IO-T17294 TC_C45130| Verify whether user is able to re-order the branches ", async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    await test.step("Clicking on Create Flow", async ()=>{
      await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.homePage.loadingTime();
    });
    await io.homePage.click(selectors.flowBranchingPO.ROUTER_BUTTON);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.flowBuilderPagePO.MENUITEM,
      "Add branching"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBranchingPO.ADD_BRANCH);
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.BRANCH_TOGGLE,
      2
    );
    const firstDragHandle = await page.locator(selectors.flowBranchingPO.DRAG_HANDLE).nth(0);
    const secondDragHandle = await page.locator(selectors.flowBranchingPO.DRAG_HANDLE).nth(1);

    // Rearranging the branch order
    await firstDragHandle.dragTo(secondDragHandle);

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(selectors.basePagePO.LOOKUP_ADD_BUTTON);
    let branches = await io.flowbranching.flowBranchingPage.getList(
      selectors.basePagePO.MENU_ITEM
    );
    await io.assert.expectToBeValue(String(branches[0]), "Branch 1.1", "");
    await io.assert.expectToBeValue(String(branches[1]), "Branch 1.0", "");
    await io.assert.expectToBeValue(String(branches[2]), "Branch 1.2", "");
  });

  test("@Env-All @Zephyr-IO-T17266 TC_C45101| Verify Add branching and Add destination/lookup icon  ", async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
    await test.step("Clicking on Create Flow", async ()=>{
      await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.homePage.loadingTime();
    });
    await io.homePage.click(selectors.flowBranchingPO.ROUTER_BUTTON);
    let options = await io.flowbranching.flowBranchingPage.getList(
      selectors.basePagePO.MENU_ITEM
    );
    await io.assert.expectToBeValue(String(options[0]), "Add destination / lookup", "");
    await io.assert.expectToBeValue(String(options[1]), "Add branching", "");
    const icons = await io.homePage.getLengthOfElementArray(
      selectors.basePagePO.MENU_ITEM + " svg"
    );
    expect(icons).toEqual(2);
  });
});
