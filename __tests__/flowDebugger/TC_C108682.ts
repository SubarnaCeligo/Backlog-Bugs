import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "../../testData/inputData/FlowDebugger/TC_C108682.json";

test.describe("TC_C108682_C108676_C108672", () => {
  test.beforeEach(async ({ io }) => {
    test.step("*** Go to flows page ***", async () => {});
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T23941 TC_108682_C108676_C108672", async ({ io, page }, testInfo) => {
    test.step("*** Creating Flow Branch ***", async () => {});
    const flowID = await io.flowbranching.createFlowBranchFromAPI(TC);
    await io.homePage.loadingTime();
    await io.flowBuilder.navigateToTheFlow(flowID);
    await io.homePage.loadingTime();
    test.step("*** Opening the flow ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    test.step("*** Clicking on disable flow ***", async () => {});

    await io.homePage.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    test.step("*** Clicking on confirm disable ***", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.RUNTEST_BUTTON,
      0
    );
    test.step("*** Clicking on run test button ***", async () => {});
    await io.homePage.loadingTime();
    //Edit Branching
    await io.homePage.click(selectors.flowBuilderPagePO.EDIT_BRANCHING);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.TAB_RULES);
    test.step("*** Clicking on rules tab ***", async () => {});
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "Branching");
    await io.homePage.click(selectors.flowBranchingPO.FIRSTMATCHINGBRANCH);
    test.step("Clicked On first_matching_branch", async () => {});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.AUTO_PREVIEW);
    await io.homePage.loadingTime();
    var resultOut = await io.homePage.getText(selectors.mappings.RESULTTEXT);
    await io.assert.expectToContainValue(
      "The record will pass through branch 0: Branch 1.0",
      resultOut.toString(),
      ""
    );
    let warningMsg1 = await (
      await page.locator(selectors.basePagePO.NOTIFICATION_ID)
    ).textContent();
    await expect(warningMsg1).toContain(
      "Making edits to a flow (including modifying a step, changing step options, changing the test run source, or reordering steps) will clear all test results."
    );
    //   "Run a new test test.afterEach making edits to see accurate results"
    test.step("*** Verified Changing the active source should change the sample data being shown in the flow steps. ***", async () => {});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("Clicked On Save", async () => {});
    await io.homePage.loadingTime();
    ////TC_C108682-outputfilter
    var OutputFiltericon = await io.homePage.isVisible(
      selectors.exportsPagePO.EXPORT_FILTER_HOTSPOT_ICON
    );
    await io.assert.expectToBeFalse(OutputFiltericon, "");
    ////TC_C108676-Transformation
    var transformationfiltericon = await io.homePage.isVisible(
      selectors.exportsPagePO.EXPORT_TRANSFORMATION_HOTSPOT_ICON
    );
    await io.assert.expectToBeFalse(transformationfiltericon, "");
    var importicon = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.IMPORT_DATA_TEST_MUI_BADGE
    );
    await io.assert.expectToBeFalse(importicon, "");
    var importmappingicon = await io.homePage.isVisible(
      selectors.importPagePO.IMPORT_MAPPINGS_HOTSPOT_ICON
    );
    await io.assert.expectToBeFalse(importmappingicon, "");
    //TC_C108672-Verify whether Hotspot icons when response mapping is properly configured
    var responsemappingicon = await io.homePage.isVisible(
      selectors.flowBuilderPagePO.RESPONSE_MAPPING_MUIBADGE
    );
    await io.assert.expectToBeFalse(responsemappingicon, "");
    test.step("*** Verify whether Hotspot icons when output filter is errored out ***", async () => {});
    await io.homePage.loadingTime();
  });
});
