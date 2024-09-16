import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/STANDALONE/TC_C34356_Verify_immutable_field_removed_for_adapters.json";

test.describe("TC_C34356_Verify_immutable_field_removed_for_adapters", () => {
  let flowId: string;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    const flowDoc = await io.api.getCall("v1/flows/" + flowId);
    const pgExportId = flowDoc?.pageGenerators?.[0]?._exportId;
    const ppImportId1 = flowDoc?.pageProcessors?.[0]?._importId;
    const ppImportId2 = flowDoc?.pageProcessors?.[1]?._importId;
    const ppImportId3 = flowDoc?.pageProcessors?.[2]?._importId;

    // Delete the flow
    await io.api.deleteFlowViaAPI(flowId)
    await io.api.deleteCall("v1/exports/" + pgExportId);
    await io.api.deleteCall("v1/imports/" + ppImportId1);
    await io.api.deleteCall("v1/imports/" + ppImportId2);
    await io.api.deleteCall("v1/imports/" + ppImportId3);
    await io.homePage.loadingTime();
  });

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
  });
  test("@Zephyr-IO-T5892 @Env-All TC_C34356_Verify_immutable_field_removed_for_adapters", async ({io,page}, testInfo) => {
    // *Create flow
    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(FTP, "FLOWS");

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MAP_ZOOM_TO_FIT)
    test.step("*** Clicking on mapping option ***", async ()=>{});
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.IMPORT_MAPPINGS, 0);
    await io.homePage.loadingTime();
    test.step("*** Clicking on settings icon ***", async ()=>{});
    await io.homePage.click(selectors.mappings.DEFAULT_MAPPING_TYPE.FIELD_MAPPING_SETTING);
    test.step("*** Verify the immutable field is not present in S3***", async ()=>{});
    var s3Option = await io.homePage.isVisible(selectors.mappings.IMMUTABLEOPTIONCHECK);
    await io.assert.expectToBeFalse(s3Option, "");

    test.step("*** Closing the import mappings ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    await io.homePage.click(selectors.basePagePO.CLOSE);

    test.step("*** Clicking on mapping option ***", async ()=>{});
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.IMPORT_MAPPINGS, 1);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Clicking on settings icon ***", async ()=>{});
    await io.homePage.click(selectors.mappings.DEFAULT_MAPPING_TYPE.FIELD_MAPPING_SETTING);
    test.step("*** Verify the immutable field is not present in FTP***", async ()=>{});
    var FTPOption = await io.homePage.isVisible(selectors.mappings.IMMUTABLEOPTIONCHECK);
    await io.assert.expectToBeFalse(FTPOption, "");

    test.step("*** Closing the import mappings ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    await io.homePage.click(selectors.basePagePO.CLOSE);

    test.step("*** Clicking on mapping option ***", async ()=>{});
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.IMPORT_MAPPINGS, 2);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    test.step("*** Clicking on settings icon ***", async ()=>{});
    await io.homePage.click(selectors.mappings.DEFAULT_MAPPING_TYPE.FIELD_MAPPING_SETTING);
    test.step("*** Verify the immutable field is not present in Gdrive***", async ()=>{});
    var GdriveOption = await io.homePage.isVisible(selectors.mappings.IMMUTABLEOPTIONCHECK);
    await io.assert.expectToBeFalse(GdriveOption, "");

    test.step("*** Closing the import mappings ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    await io.homePage.click(selectors.basePagePO.CLOSE);
  });
});
