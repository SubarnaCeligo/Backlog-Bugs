
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC from "@testData/Mapper2.0/TC_51130.json";

test.describe("TC_C51130", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T22359 TC_C51130 | Verify the existing mapper 2.0 imports must be updated with status as 'Active' after migration", async ({io,page}, testInfo) => {
    test.step("*** Creating flow through API ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on import mapping ***", async ()=>{});
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS)
    await io.flowBuilder.loadingTime();

    test.step("*** Obtaining the flowJson ***", async ()=>{});
    const flowJson = await io.api.getFlowById(flowID);
    test.step("*** Obtaining importId from flowJson ***", async ()=>{});
    const importId = flowJson.pageProcessors[0]._importId;

    await test.step("*** Obtaining the importJson using importId***", async ()=>{});
    const importJson = await io.api.getImportById(importId);

    test.step("*** Obtaining the parentMapping status ***", async ()=>{});
    let StatusParameter = true;
    let mappings = importJson.mappings;
    for (let index = 0; index < importJson.mappings.length; index++) {
      if (mappings[index].status == undefined || mappings[index].status != "Active") {
        StatusParameter = false;
        break;
      }
    }

    await test.step("*** Verifying that status of all the completed mapping fields is active ***", async ()=>{});
    await io.assert.expectToBeTrue(StatusParameter, "");
  });
});
