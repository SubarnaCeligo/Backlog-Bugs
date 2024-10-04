
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_51798.json";

test.describe("TC_51798", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T22445 | Verify when there are existing mappings the tree structures should expand all rows by default [Record to record]", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.isPageReady();
    test.step("*** Mappings open ***", async ()=>{});


    await test.step("*** Obtaining the number of destination fields ***", async ()=>{});
    let DestinationFields = await page.$$(
      selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER
    );
    await test.step("*** Obtaining the number of source fields ***", async ()=>{});
    let SourceFields = await page.$$(
      selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER
    );
    await test.step("*** verifying the number of source and destination fields ***", async ()=>{});
    expect(DestinationFields).toHaveLength(12);
    expect(SourceFields).toHaveLength(12);
    await test.step("*** Clicking on collapse button on the first destinatioon field ***", async ()=>{});
    await io.homePage.click(
      "[date-test='collapseAll']"
    );

    await test.step("*** Obtaining the number of source fields ***", async ()=>{});
    DestinationFields = await page.$$(
      selectors.flowBuilderPagePO.DESTINATION_MAPPING_PLACEHOLDER
    );
    SourceFields = await page.$$(
      selectors.flowBuilderPagePO.SOURCE_MAPPING_PLACEHOLDER
    );

    await test.step("*** Verifying the number of fields to be 1 indicating the presence expanded structure when the mappings are opened ***", async ()=>{});
    expect(DestinationFields).toHaveLength(1);
    expect(SourceFields).toHaveLength(1);
  });
});
