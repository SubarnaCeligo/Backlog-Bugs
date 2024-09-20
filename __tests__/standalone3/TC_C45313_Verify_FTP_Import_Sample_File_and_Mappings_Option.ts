import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC45313 from "@testData/STANDALONE/TC_C45313_Verify_FTP_Import_Sample_File_and_Mappings_Option.json";

test.describe("TC_C45313_Verify_FTP_Import_Sample_File_and_Mappings_Option", () => {
  let flowId: string;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    const flowDoc = await io.api.getCall("v1/flows/" + flowId);
    const ppImportId = flowDoc?.pageProcessors?.[0]?._importId;

    // Delete the flow
    await io.api.deleteFlowViaAPI(flowId)
    await io.api.deleteCall("v1/imports/" + ppImportId);
    await io.homePage.loadingTime();
  });

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T18451 @Env-All TC_C45313_Verify_FTP_Import_Sample_File_and_Mappings_Option", async ({io,page}, testInfo) => {
    // *Create flow
    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(TC45313, "FLOWS");
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Click on import ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    test.step("*** Validating the sample file option ***", async ()=>{});
    var uploadOption = await io.homePage.isVisible(selectors.flowBuilderPagePO.UPLOAD_FILE);
    await io.assert.expectToBeTrue(uploadOption, "");

    test.step("*** Close the import ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Click on add data processor options ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR);
    test.step("*** Validating the mapping option ***", async ()=>{});
    var mappingOption = await io.homePage.isVisible(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.assert.expectToBeTrue(mappingOption, "");
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.loadingTime();
    test.step("*** Validating the mapping window ***", async ()=>{});

    var previewOption = await io.homePage.isVisible(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    await io.assert.expectToBeTrue(previewOption, "");

    test.step("*** Closing the mappings ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);

    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
});
