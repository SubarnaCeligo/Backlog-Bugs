
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";


test.describe("@Author-ParthPatel TC_C49535_C49536", () => {
  test.beforeEach(async ({io}) => {
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T17262 @Zephyr-IO-T17263 TC_C49535_C49536 Verify dropdown header of destination/lookup", async ({io, page}) => {
    await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.flowBranchingPO.ROUTER_BUTTON, 0);
    await test.step("Clicked On Add branching .", async ()=>{
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.MENUITEM,
        "Add branching"
      );
      await io.homePage.loadingTime();
    });

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBranchingPO.FLOW_BUILDER_BOTTOM_DRAWER_DOWN);
    await io.homePage.click(selectors.flowBuilderPagePO.FIT_WINDOW_WITH_BUTTON);
    await io.homePage.click(selectors.flowBuilderPagePO.PAGE_PROCESSOR);
    const [first, second] = await io.flowbranching.flowBranchingPage.getList(
      selectors.flowBuilderPagePO.MENUITEM
    );
    await io.assert.expectToBeValue(String(first), "Branch 1.0", "");
    await io.assert.expectToBeValue(String(second), "Branch 1.1", "");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBranchingPO.ZOOM_OUT);
    // TC_C49536 | Verify the branch name if user removes any pageProcessor
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.FIT_WINDOW_WITH_BUTTON);
    await io.homePage.click(selectors.flowBranchingPO.ZOOM_OUT);

    await io.homePage.clickButtonByIndex(selectors.flowBranchingPO.REMOVEPP, 1);

    await page.pause();

    let namesInLayout = await io.flowbranching.flowBranchingPage.getList(selectors.flowBranchingPO.BRANCH_NAME_HEADER);
    await io.assert.expectToBeValue(String(namesInLayout[0]), "Branch 1.0", "");
    await expect(page.locator(selectors.flowBranchingPO.DRAG_TERMINAL).nth(1)).toContainText("Branch 1.1");

    // TC_C49535 | Verify dropdown header of destination/lookup
    await io.homePage.click(selectors.flowBranchingPO.ROUTERS);
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(selectors.flowBranchingPO.EDIT_BRANCH_NAME_BTN, 1);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.flowBuilderPagePO.MENUITEM,
      "Delete branch"
    );

    await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.click(selectors.flowBuilderPagePO.PAGE_PROCESSOR);
    const applicationDrawer = await io.homePage.getText(selectors.flowBranchingPO.AFE_HEADINGS);
    await io.assert.expectToBeValue(String(applicationDrawer), "Create destination / lookup", "");
    await io.flowbranching.flowBranchingPage.closeDrawer();
  });
});
