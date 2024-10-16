
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47974.json";

test.describe("@Author-ParthPatel TC_C47974 | Golden ", () => {
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***", async ()=>{
      await io.goToFlowsPage();
    });
  });

  test.afterEach(async ({io,page}, testInfo) => {
    await test.step("*** Deleting flow.***", async ()=>{
      await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
      await io.homePage.loadingTime();
      await io.flowbranching.flowBranchingPage.decreaseDrawer();
      await io.api.deleteFlowsWithId([flowId]);
    });
  });

  test("@Env-All @Zephyr-IO-T17333 TC_C47974 Verify Job dashboard of flow with flow branching", async ({io,page}, testInfo) => {
    flowId = await io.flowbranching.createFlowBranchFromAPI( flowbranch);
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.reloadPage();
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.RUNFLOW);
    await io.homePage.loadingTime();

    await io.flowbranching.flowBranchingPage.increaseDrawer();
    await io.homePage.loadingTime();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    await page.locator(selectors.flowBuilderPagePO.TRANSFER).click();
    let PG = await page.locator(selectors.basePagePO.NAME).inputValue();
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();

    await page.locator(selectors.flowBuilderPagePO.IMPORT).nth(0).click();
    let PP1 = await page.locator(selectors.basePagePO.NAME).inputValue();
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();

    await page.locator(selectors.flowBuilderPagePO.IMPORT).nth(1).click();
    let PP2 = await page.locator(selectors.basePagePO.NAME).inputValue();
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();

    await page.locator(selectors.flowBuilderPagePO.IMPORT).nth(2).click();
    let PP3 = await page.locator(selectors.basePagePO.NAME).inputValue();
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.homePagePO.RUN_CONSOLE);
    await io.homePage.loadingTime();
    let path = 'tbody th';
    let ans = await io.homePage.getDropDownValue(path, PG);
    await io.assert.expectToBeTrue(ans, "");

    ans = await io.homePage.getDropDownValue(path, PP1);
    await io.assert.expectToBeTrue(ans, "");

    ans = await io.homePage.getDropDownValue(path, PP2);
    await io.assert.expectToBeTrue(ans, "");

    ans = await io.homePage.getDropDownValue(path, PP3);
    await io.assert.expectToBeTrue(ans, "");

    await io.homePage.click(selectors.flowBuilderPagePO.RUN_HISTORY);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.TOGGLE_JOB);
    await io.homePage.loadingTime();

    path = 'tbody td:nth-child(1)';
    ans = await io.homePage.getDropDownValue(path, PG);
    await io.assert.expectToBeTrue(ans, "");

    ans = await io.homePage.getDropDownValue(path, PP1);
    await io.assert.expectToBeTrue(ans, "");

    ans = await io.homePage.getDropDownValue(path, PP2);
    await io.assert.expectToBeTrue(ans, "");

    ans = await io.homePage.getDropDownValue(path, PP3);
    await io.assert.expectToBeTrue(ans, "");
  });
});
