
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("@Author-ParthPatel TC_C45105", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***", async ()=>{
      await io.goToFlowsPage();
    });
  });

  test("@Env-All @Zephyr-IO-T17270 C45105 - Verify '+' button at the destination /lookup when there is a router and only 1 branch", async ({io,page}, testInfo) => {
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
    await test.step("Deleted a branch", async ()=>{
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.MENUITEM,
        "Delete branch"
      );
  
      await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
    });

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(selectors.flowBuilderPagePO.PAGE_PROCESSOR);

    let url = await io.homePage.getCurrentUrl();
    test.step("Fetching the URL", async ()=>{});

    await io.assert.expectToContainValue("pageProcessor",url, "");
await test.step(
      "*** Verified '+' button at the destination /lookup when there is a router and only 1 branch ***"
, async ()=>{});
  });
});
