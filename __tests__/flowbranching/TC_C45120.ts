
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("@Author-ParthPatel TC_C45120", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***", async ()=>{
      await io.goToFlowsPage();
    });
  });
  test('@Env-All @Zephyr-IO-T17284 C45120 - Verify the branches when "First branch where conditions are met" and Javascript is selcted', async ({io,page}, testInfo) => {
    await test.step("Clicking on Create Flow", async ()=>{
      await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.homePage.loadingTime();
    });
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(selectors.flowBranchingPO.ROUTER_BUTTON);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.flowBuilderPagePO.MENUITEM,
      "Add branching"
    );
    await io.homePage.loadingTime();

    //Verify first maching is selected by default
    await io.assert.verifyElementAttributeContainsText(
      selectors.flowBranchingPO.FIRSTMATCHINGBRANCH,
      "data-state",
      "checked",
      0
    );
    //Verify if the branches are draggable/sortable
    let dragHandle = await page.locator(selectors.flowBranchingPO.SVG_CURSOR_DRAG_ICON).first();
    let draggable = await dragHandle.evaluate(element => getComputedStyle(element).cursor);
    await io.assert.expectToBeValue(String(draggable), "grab", "");
  });
});
