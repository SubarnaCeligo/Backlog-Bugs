
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";


test.describe("@Author-ParthPatel TC_C45141_C47973_C47964 | Golden ", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***", async ()=>{
      await io.goToFlowsPage();
    });
  });
  test("@Env-All @Zephyr-IO-T17301 @Zephyr-IO-T17332 @Zephyr-IO-T17325 TC_C45141_C47973_C47964 - Verify adding branches test.beforeEach routers", async ({io,page}, testInfo) => {
    await test.step("Clicking on Create Flow", async ()=>{
      await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.homePage.isPageReady();
      await io.homePage.loadingTime();
    });
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(selectors.flowBranchingPO.ROUTER_BUTTON);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.flowBuilderPagePO.MENUITEM,
      "Add branching"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.homePage.loadingTime();
    let url = await io.homePage.getCurrentUrl();
    let flowId = url.split("/").at(-1);
    let res = await io.api.getFlowById(flowId);
    let branch = res?.routers[0].branches[0];
    await io.assert.expectToBeTrue(branch.pageProcessors[0].setupInProgress, "");

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await test.step("Merged the two branches", async ()=>{
      let elem = await page.locator(selectors.flowBranchingPO.DRAG_TERMINAL).nth(0);
      let target = await page.locator(selectors.flowBranchingPO.DRAG_TERMINAL).nth(1);
      await elem.dragTo(target);
      await io.homePage.loadingTime();
    });

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(selectors.flowBuilderPagePO.EDIT_BRANCHING);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBranchingPO.ROUTER_MENU);
    await io.homePage.loadingTime();

    let ans = await io.homePage.getTextFromElement(
      selectors.basePagePO.MENU_ITEM,
      "Delete branching"
    );
    await io.assert.expectToBeTrue(ans, "");

    await io.homePage.clickButtonBasedOnLabelName(
      selectors.basePagePO.MENU_ITEM,
      "Delete branching"
    );
    await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
    url = await io.homePage.getCurrentUrl();
    flowId = url.split("/").at(-1);

    res = await io.api.getFlowById(flowId);
    ans = res?.hasOwnProperty("routers");
    expect(ans).not.toBeTruthy();
  });
});
