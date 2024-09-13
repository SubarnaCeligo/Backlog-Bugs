
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47473.json";

test.describe("@Author-ParthPatel TC_C47473_C47529_C47468_C47976", () => {
  let flowId;
  test.beforeEach(async ({ io, page }, testInfo) => {
    await test.step("*** Beginning of Test Suite ***", async () => {
      await io.goToFlowsPage();
    });
  });

  test.afterEach(async ({ io, page }, testInfo) => {
    await test.step("*** Deleting flow.***", async () => {
      await io.api.deleteFlowsWithId([flowId]);
    });
  });

  test("@Env-All @Zephyr-IO-T17534 @Zephyr-IO-T17611 @Zephyr-IO-T17531 @Zephyr-IO-T17335 TC_C47473_C47529_C47468_C47976", async ({ io, page }, testInfo) => {
    // TC_C47473 | Test to verify that user is able to run the flow test.afterEach the partially configured branches are updated and fully configured
    flowId = await io.flowbranching.createFlowBranchFromAPI(flowbranch);
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.loadingTime();
    await expect(await page.locator(selectors.basePagePO.RUNFLOW).nth(0)).toBeEnabled();
    await io.homePage.clickByIndex(selectors.basePagePO.RUNFLOW, 0);
    await io.homePage.loadingTime();
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.increaseDrawer();

    await io.homePage.click(selectors.flowBuilderPagePO.RUN_HISTORY);
    await io.flowbranching.flowBranchingPage.clickButtonNTimes(selectors.flowBuilderPagePO.RUN_HISTORY, 2);
    const status = await io.homePage.getText(await io.homePage.getCellLocator(1, 2, "", null, ""));
    await io.assert.expectToBeValue(String(status), "Completed", "");

    //TC_C47529 | Test to create a branched flow, run the flow and then validate the results in run console
    await io.homePage.click(selectors.homePagePO.RUN_CONSOLE);
    const rec1 = await io.homePage.getText(await io.homePage.getCellLocator(1, 3, "", null, ""));
    const rec2 = await io.homePage.getText(await io.homePage.getCellLocator(2, 3, "", null, ""));
    const rec3 = await io.homePage.getText(await io.homePage.getCellLocator(3, 3, "", null, ""));
    await io.assert.expectToBeValue(String(rec1), "1", "");
    await io.assert.expectToBeValue(String(rec2), "1", "");
    await io.assert.expectToBeValue(String(rec3), "0", "");

    //TC_C47468 | Test to verify that scheduled flow is not triggered when there are partially configured branches (branches on the second router added in the flow)
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.flowbranching.flowBranchingPage.decreaseDrawer();
    await io.homePage.click(selectors.flowBranchingPO.ROUTERS);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBranchingPO.FIRSTMATCHINGBRANCH);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.loadingTime();
    var handle = await page.locator(selectors.flowBranchingPO.DRAG_TERMINAL).nth(0);
    var target = await page.locator(selectors.flowBranchingPO.DRAG_TERMINAL).nth(1);
    await handle.dragTo(target);
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.clickButtonByIndex(selectors.flowBranchingPO.ROUTER_BUTTON, 3);
    await io.homePage.clickButtonBasedOnLabelName(
      selectors.flowBuilderPagePO.MENUITEM,
      "Add branching"
    );
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    //TC_C47976 | Verify preview data for imports with flow branching.
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.IMPORT, 0);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    await io.homePage.loadingTime();
    let requestBody = (await io.homePage.getText(selectors.importPagePO.PREVIEWDATA)).toString();
    requestBody = requestBody.replace(/\n/g, '').replace(/\\/g, '').replace(/\s{2,}/g, '')
    await io.assert.expectToContainValue('{"organization": {"name": "Auto', requestBody, "");
    await io.homePage.click(selectors.importPagePO.CLICKSENDTOGGLE);
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    await io.homePage.loadingTime();
    const responseBody = (await io.homePage.getText(selectors.importPagePO.PREVIEWDATA)).toString();
    await io.assert.expectToContainValue('"organization":', responseBody, "");
    await io.homePage.click(selectors.exportsPagePO.PARSED_OUTPUT);
    let output = JSON.stringify(
      await io.homePage.getText(selectors.importPagePO.PREVIEWDATA)
    );
    output = JSON.parse(output);
    await io.assert.expectToContainValue("id", output, "");
    await io.flowbranching.flowBranchingPage.closeDrawer();
  });
});
