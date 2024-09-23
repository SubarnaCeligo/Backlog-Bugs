import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_C51982.json";

test.describe("TC_C51982", () => {
  let flowId;

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test.afterEach(async ({io, page}) => {
    test.step("*** Deleting Flow ***", async ()=>{});
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T22482 TC_C51982 | verify the multiple source settings in sandbox environment", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on import mappings ***", async ()=>{});
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.click(
      selectors.flowBuilderPagePO.IMPORT_MAPPINGS
    );
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("opened import mapping", async ()=>{});

    await io.homePage.clickByIndex(
      selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS,
      3
    );
    await io.homePage.loadingTime();
    test.step("opened settings of a objectarray mapping row", async ()=>{});

    const copyAsIs = await (await page.$(selectors.mappings.MAPPER2DOT0PO.COPYLABEL)).isVisible();
    await io.homePage.clickByIndex(
      selectors.basePagePO.CLOSE_RIGHT_DRAWER,
      2
    );
    await io.homePage.loadingTime();
    test.step("closed the right drawer", async ()=>{});

    await io.homePage.clickByIndex(
      selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS,
      2
    );
    await io.homePage.loadingTime();
    test.step("opened settings of a string mapping row", async ()=>{});

    const sourceDataType =await (await page.$("#sourceDataType")).isVisible();
    const standardAction =await (await page.$("div#standardAction")).isVisible();
    
    await io.assert.expectToBeTrue(copyAsIs,"")
    await io.assert.expectToBeTrue(sourceDataType,"")
    await io.assert.expectToBeTrue(standardAction,"")

    await test.step("*** Verified settings page on the source tab shows following options : \n1. Source data type\n2. Actions to take if the source field has no value\n3. copy as is for non primitive data types ***", async ()=>{});
  });
});
