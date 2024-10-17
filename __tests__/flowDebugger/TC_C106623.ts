import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "../../testData/inputData/FlowDebugger/TC_C106623.json";
import TC1 from "../../testData/inputData/FlowDebugger/TC_C106624.json";

test.describe("TC_C106621_C106622_C106623_C106624_C106625_C106626", () => {
  test.beforeEach(async ({ io }) => {
    test.step("*** Go to flows page ***", async () => {});
    await io.goToFlowsPage();
    await io.homePage.loadingTime();
  });
  test("@Env-All @Zephyr-IO-T23753 TC_C106621_C106622_C106623_without_mock_data.", async ({ io, page }) => {
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
    //TC_C106621 Verify Changing the active source should change the sample data being shown in the flow steps(input filter) without mock data.
    //TC_C106622 Verify Changing the active source should change the sample data being shown in the flow steps(Edit Branching) without mock data.
    //TC_C106623 Verify If we have branching flow with multiple branches then also Sample data should be of the selected/active source without mock data.
    var butt = await (
      await page.locator(selectors.flowBuilderPagePO.INPUT_FILTER)
    ).nth(2).isVisible();
    await io.homePage.loadingTime();
    //Before changing source
    //firstFilter
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.INPUT_FILTER,
      0
    );
    test.step("*** Clicking on input filter ***", async () => {});
    await io.homePage.loadingTime();
    var firstFilter = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.ID_DATA_ACE_CONTENT
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();
    //secondFilter
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.INPUT_FILTER,
      0
    );
    test.step("*** Clicking on input filter ***", async () => {});
    await io.homePage.loadingTime();
    var secondFilter = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.ID_DATA_ACE_CONTENT
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();
    //Edit Branching
    await io.homePage.click(selectors.flowBuilderPagePO.EDIT_BRANCHING);
    await io.homePage.loadingTime();
    var editBranching = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.ID_DATA_ACE_CONTENT
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();

    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.RUN_SPECIFIC_SOURCE_DROPDOWN,
      0
    );
    test.step("*** Clicking on dropdown icon ***", async () => {});

    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.MUI_PAPEER_ROUNDED_MUILISTITEMROOT,
      1
    );
    test.step("*** Selecting the another source ***", async () => {});
    //After changing source
    //first Filter
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.INPUT_FILTER,
      0
    );
    test.step("*** Clicking on input filter ***", async () => {});
    await io.homePage.loadingTime();
    var firstFilter1 = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.ID_DATA_ACE_CONTENT
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();

    //secondFilter
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.INPUT_FILTER,
      0
    );
    test.step("*** Clicking on input filter ***", async () => {});
    await io.homePage.loadingTime();
    var secondFilter1 = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.ID_DATA_ACE_CONTENT
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();
    //Edit Branching
    await io.homePage.click(selectors.flowBuilderPagePO.EDIT_BRANCHING);
    await io.homePage.loadingTime();
    var editBranching1 = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.ID_DATA_ACE_CONTENT
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();
    await expect(firstFilter).not.toEqual(firstFilter1);
    await expect(secondFilter).not.toEqual(secondFilter1);
    await expect(editBranching).not.toEqual(editBranching1);
    test.step("*** Verified Changing the active source should change the sample data being shown in the flow steps. ***", async () => {});
  });
  test("@Env-All @Zephyr-IO-T23753 TC_C106624_C106625_C106626_with_mock_data.", async ({
    io,
    page
  }, testInfo) => {
    test.step("*** Creating Flow Branch ***", async () => {});
    const flowID = await io.flowbranching.createFlowBranchFromAPI(TC1);
    await io.homePage.loadingTime();
    await io.flowBuilder.navigateToTheFlow(flowID);
    await io.homePage.loadingTime();
    test.step("*** Opening the flow ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.FLOW_TOGGLE);
    test.step("*** Clicking on disable flow ***", async () => {});
    await io.homePage.click(selectors.flowBuilderPagePO.FLOW_DISABLE);
    test.step("*** Clicking on confirm disable ***", async () => {});
    //TC_C106624 Verify Changing the active source should change the sample data being shown in the flow steps(input filter) without mock data.
    //TC_C106625 Verify Changing the active source should change the sample data being shown in the flow steps(Edit Branching) without mock data.
    //TC_C106626 Verify If we have branching flow with multiple branches then also Sample data should be of the selected/active source without mock data.
    var butt = await (
      await page.locator(selectors.flowBuilderPagePO.INPUT_FILTER)
    ).nth(0).isVisible();
    await io.homePage.loadingTime();
    //Before changing source
    //firstFilter
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.INPUT_FILTER,
      0
    );
    test.step("*** Clicking on input filter ***", async () => {});
    await io.homePage.loadingTime();
    var firstFilter = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.ID_DATA_ACE_CONTENT
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();
    //secondFilter
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.INPUT_FILTER,
      0
    );
    test.step("*** Clicking on input filter ***", async () => {});
    await io.homePage.loadingTime();

    var secondFilter = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.ID_DATA_ACE_CONTENT
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();
    //Edit Branching
    await io.homePage.click(selectors.flowBuilderPagePO.EDIT_BRANCHING);
    await io.homePage.loadingTime();
    var editBranching = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.ID_DATA_ACE_CONTENT
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.RUN_SPECIFIC_SOURCE_DROPDOWN,
      0
    );
    test.step("*** Clicking on dropdown icon ***", async () => {});
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.MUI_PAPEER_ROUNDED_MUILISTITEMROOT,
      1
    );
    test.step("*** Selecting the another source ***", async () => {});
    //After changing source
    //first Filter
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.INPUT_FILTER,
      2
    );
    test.step("*** Clicking on input filter ***", async () => {});
    await io.homePage.loadingTime();
    var firstFilter1 = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.ID_DATA_ACE_CONTENT
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();
    //secondFilter
    await io.homePage.clickByIndex(
      selectors.flowBuilderPagePO.INPUT_FILTER,
      0
    );
    test.step("*** Clicking on input filter ***", async () => {});
    await io.homePage.loadingTime();
    var secondFilter1 = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.ID_DATA_ACE_CONTENT
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();
    //Edit Branching
    await io.homePage.click(selectors.flowBuilderPagePO.EDIT_BRANCHING);
    await io.homePage.loadingTime();
    var editBranching1 = await io.homePage.copyResourceData(
      selectors.flowBuilderPagePO.ID_DATA_ACE_CONTENT
    );
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime();
    await expect(firstFilter).not.toEqual(firstFilter1);
    await expect(secondFilter).not.toEqual(secondFilter1);
    await expect(editBranching).not.toEqual(editBranching1);
    test.step("*** Verified Changing the active source should change the sample data being shown in the flow steps. ***", async () => {});
  });
});
