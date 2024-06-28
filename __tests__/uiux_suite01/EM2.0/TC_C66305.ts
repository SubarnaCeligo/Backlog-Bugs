import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/EM2.0/C66305.json";
import AdmZip from "adm-zip";

test.describe("TC_C66305 Verify flow cancel information in diagnostic file", () => {
  let id;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id);
  });

  test("@Zephyr-IO-T20432 @Env-All C66305 Verify flow cancel information in diagnostic file", async ({
    io,
    page
  }) => {
    id = await io.createResourceFromAPI(flow, "FLOWS");
    await io.homePage.navigateTo(
      process.env["IO_Integration_URL"] + "flowBuilder/" + id
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.flowBuilder.click(selectors.integrationPagePO.CANCEL_FLOW_RUN);
    await io.flowBuilder.clickByTextByIndex("Cancel run", 0);
    await io.flowBuilder.clickByIndex(
      selectors.integrationPagePO.OPENACTIONSMENU,
      1
    );
    const downloadPromise = page.waitForEvent("download");
    await io.flowBuilder.clickByTextByIndex("Download diagnostics", 0);
    const download = await downloadPromise;

    // Wait for the download process to complete and save the downloaded file somewhere.
    let fileName = download.suggestedFilename();
    await download.saveAs("../EM2.0/" + fileName);
    const zip = new AdmZip('../EM2.0/' + fileName);
    const zipEntries = zip.getEntries(); // an array of ZipEntry records
    let decompressedData;
    let data;
    zipEntries.forEach(function (zipEntry) {
        if (zipEntry.entryName == "jobs.json") {
            decompressedData = zip.readFile(zipEntry);
        }
    });
    data = Object(JSON.parse(decompressedData));
    await io.assert.expectToBeValue('canceled', data['status'], "Status is not matching");
    await download.delete(); 
  });
});
