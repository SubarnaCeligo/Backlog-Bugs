import { test, expect } from "@celigo/ui-core-automation";
import FTP from "@testData/STANDALONE/TC_C37168_Verify_Skip_Delete_In_S3_Blob_Export.json";

test.describe("Validating Skip Delete In S3 Blob Export ", () => {
  let exportId: string;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    // Delete the export
    await io.api.deleteCall("v1/exports/" + exportId);
    await io.homePage.loadingTime();
  });

  test("@Zephyr-IO-T4748 @Env-All TC_C37168 Verify Skip Delete In S3 Blob Export", async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    //*Create export
    test.step("*** Creating export ***", async ()=>{});
    exportId = await io.api.createExportorImport(FTP.pageGenerators[0].qa__export, FTP.pageGenerators[0].type);
    var expJSON = await io.api.getExportById(exportId);
    expect(expJSON.file.hasOwnProperty("skipDelete")).toBeTruthy();

    test.step("*** Skip delete is available in S3 when output mode is set as Blob-Keys ***", async ()=>{});
  });
});
