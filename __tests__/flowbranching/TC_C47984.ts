
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-ParthPatel TC_C47984 | Golden ", () => {
  let flowId;

  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***", async ()=>{
      await io.goToFlowsPage();
    });
  });

  test.afterEach(async ({io,page}, testInfo) => {
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T17343 TC_C47984 - Verify merging at edge between PP and router", async ({io,page}, testInfo) => {
    await test.step("Clicking on Create Flow", async ()=>{
      await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
      await io.homePage.loadingTime();
      await io.homePage.clickButtonByIndex(selectors.flowBranchingPO.ROUTER_BUTTON, 0);
      await io.homePage.clickButtonBasedOnLabelName(
        selectors.flowBuilderPagePO.MENUITEM,
        "Add branching"
      );
      await io.homePage.loadingTime();
    });

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    var handle = await page.locator(selectors.flowBranchingPO.DRAG_TERMINAL).nth(0);
    var target = await page.locator(selectors.flowBranchingPO.ROUTER_BUTTON).nth(3);

    await handle.dragTo(target);

    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.loadingTime();

    let url = await io.homePage.getCurrentUrl();
    flowId = url.split("/").at(-1);
    let res = await io.api.getFlowById(flowId);
    let branch = res?.routers[0].branches[1];
    expect(branch.pageProcessors.length).toEqual(0);
  });
});
