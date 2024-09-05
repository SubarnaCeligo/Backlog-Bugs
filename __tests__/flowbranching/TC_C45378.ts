
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ParthPatel TC_C45378 & TC_C45100 & TC_C47968 & TC_C47969 & TC_C47979 & TC_C47982", () => {

  test.beforeEach(async ({io,page}, testInfo) => {
    await io.goToFlowsPage();
  });

  test.afterEach(async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.FIT_WINDOW_WITH_BUTTON);
  });

  test("@Env-All @Zephyr-IO-T17317 @Zephyr-IO-T17265 @Zephyr-IO-T17329 @Zephyr-IO-T17330 @Zephyr-IO-T17338 @Zephyr-IO-T17341 TC_C45378 & TC_C45100 & TC_C47968 & TC_C47969 & TC_C47979 & TC_C47982", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBranchingPO.ROUTER_BUTTON);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.flowBuilderPagePO.MENUITEM,
      "Add branching"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBranchingPO.ADD_BRANCH);
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.FIT_WINDOW_WITH_BUTTON);
    await io.homePage.click(selectors.flowBranchingPO.ZOOM_OUT);

    await io.homePage.clickByIndex(selectors.flowBranchingPO.ROUTERS, 0);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.flowBuilderPagePO.MENUITEM,
      "Add branching"
    );
    await io.homePage.loadingTime();
    await expect(page.locator(selectors.flowBranchingPO.BRANCH_NAMES).nth(0)).toContainText("Branch 1.0");
    await expect(page.locator(selectors.flowBranchingPO.BRANCH_NAMES).nth(1)).toContainText("Branch 1.1");
    await expect(page.locator(selectors.flowBranchingPO.BRANCH_NAMES).nth(2)).toContainText("Branch 1.2");
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();

    // TC_C45100 - Verify Add destination/lookup icon test.afterEach and test.beforeEach each of the steps
    let elements = await page.$$(selectors.flowBranchingPO.ROUTER_BUTTON);
    await io.assert.expectToBeValue(String(elements.length), "7", "");

    await io.homePage.click(selectors.flowBuilderPagePO.EDIT_BRANCHING);
    await io.homePage.click(selectors.flowBranchingPO.EDIT_BRANCH_NAME_BTN);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.flowBuilderPagePO.MENUITEM,
      "Delete branch"
    );
    await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);

    // TC_C47968 - Verify Branch index number test.afterEach deleting the branch
    let ans = await page.locator(selectors.flowBranchingPO.BRANCH_NAMES).nth(0).textContent();
    await io.assert.expectToBeValue(String(ans), "Branch 1.1", "");

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    // TC_C47969 - Verify the flow test.afterEach deleting the branch
    await io.homePage.click(selectors.basePagePO.LOOKUP_ADD_BUTTON);
    let branches = await io.flowbranching.flowBranchingPage.getList(
      selectors.basePagePO.MENU_ITEM
    );
    await io.assert.expectToBeValue(String(branches[0]), "Branch 1.1", "");
    await io.assert.expectToBeValue(String(branches[1]), "Branch 1.2", "");

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    let elem = await page.locator(selectors.flowBranchingPO.DRAG_TERMINAL).nth(0);
    let target = await page.locator(selectors.flowBranchingPO.DRAG_TERMINAL).nth(1);
    await elem.dragTo(target);

    // TC_C47982 - Verify the merger router
    let merge = await page.locator(selectors.flowBranchingPO.MERGE_POINT);
    await merge.hover();
    let hoverText = await io.homePage.getText(selectors.mappings.TOOLTIP);
    expect(hoverText).toEqual(
      "Merge point (records from branches are merged here)"
    );
  });
});
