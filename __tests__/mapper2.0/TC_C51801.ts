import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C51801 from "@testData/Mapper2.0/TC_C51801.json";

test.describe("TC_C51801", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Env-All @Zephyr-IO-T22448 TC_C51801 | verify by adding any tree structure in between the mapping rows", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC_C51801, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.isPageReady();
    test.step("*** Mappings open ***", async ()=>{});

    const destinationFields = await page.$$(
      selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER
    );
    await io.assert.expectToBeValue(String(destinationFields.length), "6", "");
    const sourceFields = await page.$$(
      selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER
    );
    await io.assert.expectToBeValue(String(sourceFields.length), "6", "");
    // if input fields count is as expected then test will mean that all the children are by default open
    test.step("*** Verified the numbers of inputfields ***", async ()=>{});
  });
});
