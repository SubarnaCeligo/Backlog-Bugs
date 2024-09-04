
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("@Author-ParthPatel  TC_C45111 ", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***", async ()=>{
      await io.goToFlowsPage();
    });
  });

  test("@Env-All @Zephyr-IO-T17276 TC_C45111 Verify branch setting 'Edit branch name/description' ", async ({io,page}, testInfo) => {
    await test.step("Clicking on Create Flow", async ()=>{
      await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.homePage.loadingTime();
    });
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(selectors.flowBranchingPO.ROUTER_BUTTON);
    await test.step("Clicked on Add branching", async ()=>{
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.MENUITEM,
        "Add branching"
      );
    });
    await io.homePage.loadingTime();
    await io.homePage.click(".MuiAccordionSummary-content button");
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.flowBuilderPagePO.MENUITEM,
      "Edit branch name/description"
    );
    await io.homePage.loadingTime();
    const cont = await page.locator(selectors.flowBuilderPagePO.RENAME+" div").nth(1);
    
    let flag =  (await cont.getAttribute("class")).includes("Mui-focused")
    await io.assert.expectToBeTrue(flag,"")
  });
});
