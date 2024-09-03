
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import TC from "@testData/Mapper2.0/TC_51518.json";

test.describe("TC_51518", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });

  test("@Env-All @Zephyr-IO-T22428 | Verify For objectarray mapping, have 2 sources and for each tabbed source add 1 child each.", async ({io,page}, testInfo) => {
    test.step("*** Creating flow ***", async ()=>{});
    let flowID = await io.createResourceFromAPI(TC, 'FLOWS');
    await io.flowBuilder.navigateToTheFlow(flowID);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Opened mappings ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.IMPORT_MAPPING);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Clicking on import mapping ***", async ()=>{});
    test.step("*** Obtaining the flowJson ***", async ()=>{});
    const flowJson = await io.api.getFlowById(flowID);
    test.step("*** Obtaining importId from flowJson ***", async ()=>{});
    const importId = flowJson.pageProcessors[0]._importId;
    await test.step("*** Obtaining the importJson using importId***", async ()=>{});
    const importJson = await io.api.getImportById(importId);
    test.step("*** Obtaining the parentMapping status ***", async ()=>{});
    const parentMappingStatus = importJson.mappings[0].status;
    await test.step("*** Obtaining the first sourcetab Mapping status ***", async ()=>{});
    const firstSourceTabStatus = importJson.mappings[0].buildArrayHelper[0].mappings[0].status;
    await test.step("*** Obtaining the second sourcetab Mapping status ***", async ()=>{});
    const secondSourceTabStatus = importJson.mappings[0].buildArrayHelper[1].mappings[0].status;
    await test.step("*** verifying that parent mapping status and first sourcetab status is 'Active'  ***", async ()=>{});
    await io.assert.expectToBeValue("Active", parentMappingStatus, "");
    await io.assert.expectToBeValue("Active", firstSourceTabStatus, "");
    await test.step("*** Verifying that incomplete mapping status is 'Draft' ***", async ()=>{});
    await io.assert.expectToBeValue("Draft", secondSourceTabStatus, "");
  });
});
