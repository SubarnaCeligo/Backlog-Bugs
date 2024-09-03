
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ParthPatel TC_C45154_C45108", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***", async ()=>{
      await io.goToFlowsPage();
    });
  });
  test("@Env-All @Zephyr-IO-T17307 @Zephyr-IO-T17273 TC_C45154_C45108", async ({io,page}, testInfo) => {
    await test.step("Clicking on Create Flow", async ()=>{
      await io.flowBuilder.clickCreateFlowButton();
    });

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await test.step("Opened Add branching drawer", async ()=>{
      await io.homePage.click(
        selectors.flowBranchingPO.ROUTER_BUTTON
      );
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.basePagePO.MENU_ITEM,
        "Add branching"
      );
    });

    // TC_C45108 - Verify the branches once the branching window is open first time
    let ans;
    await test.step("Branches default names are present", async ()=>{
      ans = await page.locator(selectors.flowBranchingPO.BRANCH_NAMES).nth(0).textContent();
      await io.assert.expectToBeValue(String(ans), "Branch 1.0", "First default branch name not matching");

      ans = await page.locator("li .MuiAccordionSummary-content").nth(1).textContent();
      await io.assert.expectToBeValue(String(ans), "Branch 1.1", "Second default branch name not matching");
    });

    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();

    await test.step("Opened Edit branching drawer", async ()=>{
      await io.homePage.click(
        selectors.flowBuilderPagePO.EDIT_BRANCHING
      );
    });

    await test.step("Edit branching title is present", async ()=>{
      ans = await page.locator(selectors.flowBranchingPO.AFE_HEADINGS).textContent();

      await io.assert.expectToBeValue(String(ans), "Edit branching", "");
    });
  });
});
