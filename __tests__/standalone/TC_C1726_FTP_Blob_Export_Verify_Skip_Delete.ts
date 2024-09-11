
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";
import FTP from "@testData/STANDALONE/TC_C1726_FTP_Blob_Export_Skip_delete.json";

test.describe("Validating Skip Delete In FTP Blob Export ", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Env-All @Zephyr-IO-T11398 TC_C1726 Verify Skip Delete In FTP Blob Export", async ({io,page}, testInfo) => {
    //*Create Page Generators
    test.step("*** Creating PageGenerator ***", async ()=>{});
    var expId;
    if(process.env["ENVIRONMENT"] == "QA" || process.env["ENVIRONMENT"] == "qaprod") {
      expId = await io.api.createExportorImport(FTP.pageGenerators_qa[0].qa__export, FTP.pageGenerators_qa[0].type);
    } else {
      expId = await io.api.createExportorImport(FTP.pageGenerators_staging[0].qa__export, FTP.pageGenerators_staging[0].type);
    }
    var expJSON = await io.api.getExportById( expId);
    await io.assert.expectToBeFalse(expJSON.file.skipDelete,"")
    test.step("*** Skip delete is available in FTP  when output mode is set as Blob-Keys ***", async ()=>{});
  });
});
