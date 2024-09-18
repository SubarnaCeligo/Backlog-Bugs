import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import TC45294 from "@testData/STANDALONE/TC_C45294_Verify_XML_Sample_File_Option_For_FTP_S3_Gdrive.json";

test.describe("TC_C45294_Verify_XML_Sample_File_Option_For_FTP_S3_Gdrive", () => {
  let flowId: string;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    const flowDoc = await io.api.getCall("v1/flows/" + flowId);
    const ppImportId1 = flowDoc?.pageProcessors?.[0]?._importId;
    const ppImportId2 = flowDoc?.pageProcessors?.[1]?._importId;
    const ppImportId3 = flowDoc?.pageProcessors?.[2]?._importId;

    // Delete the flow
    await io.api.deleteFlowViaAPI(flowId)
    await io.api.deleteCall("v1/imports/" + ppImportId1);
    await io.api.deleteCall("v1/imports/" + ppImportId2);
    await io.api.deleteCall("v1/imports/" + ppImportId3);
    await io.homePage.loadingTime();
  });

  test("@Zephyr-IO-T18455 @Env-All TC_C45294_Verify_XML_Sample_File_Option_For_FTP_S3_Gdrive", async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()

    // *Create flow
    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(TC45294, "FLOWS");

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.MAP_ZOOM_TO_FIT)
    test.step("*** Clicking on import1 ***", async ()=>{});
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.TRANSFER, 0);
    await io.homePage.loadingTime();
    test.step("*** Validating the sample file option for FTP***", async ()=>{});
    var FTPdata = await io.homePage.isVisible(selectors.flowBuilderPagePO.UPLOAD_FILE);
    await io.assert.expectToBeTrue(FTPdata, "");

    test.step("*** Close the import ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);

    test.step("*** Clicking on import2 ***", async ()=>{});
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.TRANSFER, 1);
    await io.homePage.loadingTime();
    test.step("*** Validating the sample file option for gdrive***", async ()=>{});
    var gdrive = await io.homePage.isVisible(selectors.flowBuilderPagePO.UPLOAD_FILE);
    await io.assert.expectToBeTrue(gdrive, "");

    test.step("*** Close the import ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);

    test.step("*** Clicking on import2 ***", async ()=>{});
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.TRANSFER, 2);
    await io.homePage.loadingTime();
    test.step("*** Validating the sample file option for s3***", async ()=>{});
    var s3 = await io.homePage.isVisible(selectors.flowBuilderPagePO.UPLOAD_FILE);
    await io.assert.expectToBeTrue(s3, "");

    test.step("*** Close the import ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
  });
});
