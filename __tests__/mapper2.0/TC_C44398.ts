
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC_C44398 from "@testData/Mapper2.0/TC_C44398.json";

test.describe(" TC_C44398 ", () => {
  let flowId: string;
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test.afterEach(async ({io, page}) => {
    test.step("*** Delete Flow Using UI ***", async ()=>{});
    await io.api.deleteFlowsWithId([flowId]);
  });

  test("@Env-All @Zephyr-IO-T2375 TC_C44398 Verify delete action for parent mapping", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC_C44398, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();

    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.isPageReady();

    await io.homePage.click(
      selectors.basePagePO.EXPAND_ALL
    );
    test.step("*** Clicked on Expand All option.***", async ()=>{});
    await io.homePage.clickByIndex(
      selectors.mappings.MAPPER2DOT0PO.OPENACTIONSMENU,
      2
    );
    await io.homePage.click(
      selectors.mappings.MAPPER2DOT0PO.DELETE_ALL_OPTION
    );

    test.step("***clicked on deleting the parent row.***", async ()=>{});
    var dest0 = await io.homePage.getText(
      selectors.mappings.MAPPER2DOT0PO.DESTINATIONFIELDS + " input"
    );

    await test.step("*** Got the text from the destination field in the parent row.***", async ()=>{});
    var src0 = await io.homePage.getText(
      selectors.mappings.MAPPER2DOT0PO.SOURCEFIELDS + " input"
    );

    await test.step("*** Got the text from the source field in the parent row.***", async ()=>{});
    await io.assert.expectToBeValue(String(dest0), "", "");
    await io.assert.expectToBeValue(String(src0), "", "");
  });
});
