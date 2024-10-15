import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/STANDALONE/TC_C51411_Response_Mapping.json";

test.describe("TC_C51411", () => {
  let flowId: string;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    const flowDoc = await io.api.getCall("v1/flows/" + flowId);
    const pgExportId = flowDoc?.pageGenerators?.[0]?._exportId;
    const ppImportId = flowDoc?.pageProcessors?.[0]?._importId;

    // Delete the flow
    await io.api.deleteFlowViaAPI(flowId)
    await io.api.deleteCall("v1/exports/" + pgExportId);
    await io.api.deleteCall("v1/imports/" + ppImportId);
    await io.homePage.loadingTime();
  });

  test("@Zephyr-IO-T5640 @Env-All TC_C51411", async ({io,page}, testInfo) => {
    //*Create flow
    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(FTP, "FLOWS");
    await io.homePage.loadingTime();

    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1);
    test.step("*** Clicking on response mapping ***", async ()=>{});
    await io.homePage.click(selectors.mappings.DEFAULT_MAPPING_TYPE.RESPONSE_MAPPING);
    await io.homePage.loadingTime();

    await io.myAccountPage.click(selectors.transformationPO.TEXT_EXTRACT + '0"] div');
    await page.keyboard.type("id");
    await io.myAccountPage.doubleClick(selectors.transformationPO.TEXT_GENE + '0"] div');
    await page.keyboard.type("Response");
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    test.step("*** Closing Response Mapping ***", async ()=>{});
    test.step("*** Clicking on response mapping ***", async ()=>{});
    await io.homePage.click(selectors.mappings.DEFAULT_MAPPING_TYPE.RESPONSE_MAPPING);
    await io.homePage.loadingTime();

    await io.myAccountPage.doubleClick(selectors.transformationPO.TEXT_GENE + '0"] div');
    await page.keyboard.type("Previewresponse");
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    test.step("*** Click on preview ***", async ()=>{});
    await io.homePage.loadingTime();
    var data = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    await io.assert.expectToContainValue("Previewresponse",data, "");
    test.step("***Validating the AFE output data ***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Closing Response Mapping ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Discarding the changes ***", async ()=>{});
  });
});
