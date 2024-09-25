import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_C51236.json";

test.describe("TC_C51236", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T22399 TC_C51236 | Verify by removing parent node form 5 level nested struncture", async ({io,page}, testInfo) => {
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
    test.step("*** Mappings Page openend ***", async ()=>{});
    await io.homePage.clickButtonByIndex(
      selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER,
      0
    );
    await page.locator(selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER).nth(0).fill("");
    test.step("*** Cleared parent source ***", async ()=>{});

    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.MAPPER2DOT0BUTTON);
    await io.homePage.click(
      selectors.basePagePO.SAVE_AND_CLOSE
    );
    await io.homePage.loadingTime();

    test.step("*** Obtaining the flowJson ***", async ()=>{});
    const flowJson = await io.api.getFlowById(flowID);
    test.step("*** Obtaining importId from flowJson ***", async ()=>{});
    const importId = flowJson.pageProcessors[0]._importId;

    let importJson = await io.api.getImportById(importId);
    const expectedMapings = TC.pageProcessors[0].qa__import.mappings[0].buildArrayHelper[0].mappings;
    const actualMappings = importJson.mappings[0].buildArrayHelper[0].mappings;
    expect(expectedMapings).toEqual(actualMappings);

    await test.step("*** Verified the child mappings remains undisturbed ***", async ()=>{});
  });
});
