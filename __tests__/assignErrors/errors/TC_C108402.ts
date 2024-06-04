import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flow from "@testData/assignErrors/C108402.json";
import fs from "fs";
import csv from "csv-parser";

test.describe("TC_C108402 Verify tags attached to errors are displayed in errors csv file", () => {
  let id;
  test.afterEach(async ({ io }) => {
    await io.api.deleteFlowViaAPI(id);
  });

  test("@Zephyr-IO-IO-IO-T24150 @Env-All C108402 Verify tags attached to errors are displayed in errors csv file", async ({
    io,
    page
  }) => {
    id = await io.createResourceFromAPI(flow, "FLOWS");
    await io.homePage.navigateTo(
      process.env["IO_Integration_URL"] + "flowBuilder/" + id
    );
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.click(selectors.flowBuilderPagePO.RUN_FLOW);
    await io.flowBuilder.delay(1000 * 60 * 2);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByIndex(selectors.integrationPagePO.OPENACTIONSMENU, 2);
    const downloadPromise = page.waitForEvent('download');
    await io.flowBuilder.clickByTextByIndex("Download errors", 0);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2DOT0PO.DOWNLOAD_ERRORS);
    const download = await downloadPromise;

    // Wait for the download process to complete and save the downloaded file somewhere.
    let fileName = download.suggestedFilename()
    await download.saveAs('../errors/' + fileName);  
    const results = [];
    let obj;
    fs.createReadStream('../errors/' + fileName)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      obj = Object.keys(results[0]);
      expect(obj).toContain('traceKey');
    });
    await download.delete();
  });
});