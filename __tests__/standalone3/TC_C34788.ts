import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/STANDALONE/TC_C34788.json";

test.describe("TC_C34788", () => {
  let flowId: string;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    const flowDoc = await io.api.getCall("v1/flows/" + flowId);
    const pgExportId = flowDoc?.pageGenerators?.[0]?._exportId;
    const ppImportId1 = flowDoc?.pageProcessors?.[0]?._importId;

    // Delete the flow
    await io.api.deleteFlowViaAPI(flowId)
    await io.api.deleteCall("v1/exports/" + pgExportId);
    await io.api.deleteCall("v1/imports/" + ppImportId1);
    await io.homePage.loadingTime();
  });

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T5880 @Env-All TC_C34788", async ({io,page}, testInfo) => {
    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(FTP, "FLOWS");

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.clickButtonByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 1);
    await io.homePage.loadingTime();
    test.step("*** Clicking on Import ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.loadingTime();
    test.step("*** Clicking on import mapping ***", async ()=>{});
    await io.homePage.isPageReady();

    await io.myAccountPage.click(selectors.flowBuilderPagePO.FIELD_MAPPING_SOURCE);
    await page.keyboard.type("Phone");

    test.step("*** Writing on source Side ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    await io.homePage.loadingTime();
    test.step("*** Clicking on Preview Button ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    await io.homePage.loadingTime();

    var errorMsg = await io.homePage.copyResourceData(selectors.flowBuilderPagePO.PREVIEWERR)

    await io.assert.expectToContainValue("One or more destination field values not entered.", errorMsg, "");
    test.step("*** error panel is showing for generate field missing error  ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });
});
