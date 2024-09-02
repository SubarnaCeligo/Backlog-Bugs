
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("@Author-ParthPatel TC_C45128_C45129_C45117_C45110_C45113_C45112_C45106_C45122_C45156_C45133", () => {

  test.beforeEach(async ({io}) => {
    await test.step("*** Go to flows page ***", async ()=>{
      await io.goToFlowsPage();
    });
  });

  test.afterEach(async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
  });

  test("@Env-All @Zephyr-IO-T17292 @Zephyr-IO-T17293 @Zephyr-IO-T17282 @Zephyr-IO-T17275 @Zephyr-IO-T17278 @Zephyr-IO-T17277 @Zephyr-IO-T17271 @Zephyr-IO-T17286 @Zephyr-IO-T17308 @Zephyr-IO-T17297 TC_C45128_C45129_C45117_C45110_C45113_C45112_C45106_C45122_C45156_C45133", async ({io, page}) => {
    await io.homePage.isPageReady();
    await test.step("Clicking on Create Flow", async ()=>{
      await io.flowBuilder.clickCreateFlowButton();
      await io.homePage.isPageReady();
    });
    await test.step("Clicked On Add branching .", async ()=>{
      await io.homePage.clickByIndex(selectors.flowBranchingPO.ROUTER_BUTTON, 0);
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.MENUITEM,
        "Add branching"
      );
    });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBranchingPO.ALL_MATCHING_BRANCHES);

    //TC_C45128 | Verify the "Add branch" button under “Add branching” window
    const currBranches = (await page.$$(selectors.flowBranchingPO.BRANCH_NAMES)).length;
    await io.assert.verifyElementToBeClickable(selectors.flowBranchingPO.ADD_BRANCH);
    await io.homePage.click(selectors.flowBranchingPO.ADD_BRANCH);
    let list = await io.flowbranching.flowBranchingPage.getList(
      selectors.flowBranchingPO.BRANCH_NAMES
    );
    expect(list.length).toEqual(currBranches + 1);
    await io.assert.expectToBeValue(String(list[2]), "Branch 1.2", "");

    //TC_C45129 | Verify branch index for add branch
    list = await io.flowbranching.flowBranchingPage.getList(
      selectors.flowBranchingPO.FLOW_BRANCH_INDEX
    );
    expect(list).toHaveLength(3);
    await io.assert.expectToBeValue(String(list[0]), "0", "");

    //TC_C45117 | Verify the text if no condition are met under the branch
    list = await io.flowbranching.flowBranchingPage.getList(selectors.flowBranchingPO.FLOW_BRANCH_CONDITION);
    await io.assert.expectToContainValue("No conditions defined.",list[0], "");

    //TC_C45110 | Verify the branches setting
    await io.homePage.clickButtonByIndex(selectors.flowBranchingPO.EDIT_BRANCH_NAME_BTN, 0);
    list = await io.flowbranching.flowBranchingPage.getList(selectors.flowBuilderPagePO.MENUITEM);
    await io.assert.expectToBeValue(String(list[0]), "Edit branch name/description", "");
    await io.assert.expectToBeValue(String(list[1]), "Delete branch", "");

    //TC_C45113 | Verify the info icon for Branches without any description added
    await io.homePage.click(selectors.flowBranchingPO.EDIT_BRANCH_NAME_DESCRIPTION);
    await io.homePage.loadingTime();

    const desc = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.DESCRIPTION);
    expect(desc).toEqual("");
    await io.homePage.clickByIndex(selectors.basePagePO.CLOSE, 1);
    await io.homePage.loadingTime();
    expect(
      await (
        await page.locator(selectors.flowBuilderPagePO.OPEN_PAGE_INFO)
      ).isVisible()
    ).toBeFalsy();

    //TC_C45112 | Verify the info icon for Branches test.afterEach description is added
    await io.homePage.clickButtonByIndex(selectors.flowBranchingPO.EDIT_BRANCH_NAME_BTN, 0);
    await io.homePage.click(selectors.flowBranchingPO.EDIT_BRANCH_NAME_DESCRIPTION);
    await io.homePage.fillWebPage(selectors.mappings.MAPPER2DOT0PO.DESCRIPTION, "Automation");
    await io.homePage.clickButtonByIndex(
      selectors.basePagePO.SAVE_AND_CLOSE,
      1
    );
    await page.locator(selectors.flowBuilderPagePO.OPEN_PAGE_INFO).isVisible();
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.OPEN_PAGE_INFO, 0);
    let text = (await io.homePage.getText(selectors.mappings.TOOLTIP)).toString();
    await io.assert.expectToContainValue("Automation",text, "");
    await io.homePage.click(
      selectors.flowBuilderPagePO.CLOSEBTN
    );
    //TC_C45106 | Verify toggle button under “Add branching” window
    const JavaScript = selectors.basePagePO.JAVASCRIPTWINDOW;
    await io.assert.verifyElementToBeClickable(JavaScript);
    await io.homePage.click(selectors.basePagePO.JAVASCRIPTWINDOW);

    //TC_C45122 | Verify the toggle button when "Javascript" is selected
    let res = await io.homePage.getDropDownValue("label", "Script");
    await io.assert.expectToBeTrue(res, "");
    await io.homePage.click(selectors.flowBuilderPagePO.RULES);

    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.FIT_WINDOW_WITH_BUTTON);

    //TC_45156 | Verify hover text for edit branch window
    await page.mouse.move(0, 0);
    const router = await page.locator(selectors.flowBranchingPO.ROUTERS).nth(0);
    await router.hover();
    let hoverText = await page.locator(selectors.mappings.TOOLTIP).textContent();
    await io.assert.expectToBeValue(String(hoverText), "Edit branching", "");

    //TC_C45133 | Verify branching icon for Branching type = ”All branches where conditions are met”
    const routerText = await router.textContent();
    expect(String(routerText)).toContain("ALL");
  });
});
