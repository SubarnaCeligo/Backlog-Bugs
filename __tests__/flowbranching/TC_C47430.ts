
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import AdmZip from "adm-zip";
import flowbranch from "@testData/flowbranching/TC_C47430.json";

test.describe("@Author-ParthPatel TC_C47430_multipleExports", () => {
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Go to flows page ***", async ()=>{
      await io.goToFlowsPage();
    });
  });
  test.afterEach(async ({io,page}, testInfo) => {
    await test.step("*** Deleting flow.***", async ()=>{
      await io.flowbranching.flowBranchingPage.clickButtonNTimes(
        selectors.flowBranchingPO.FLOW_BUILDER_BOTTOM_DRAWER_DOWN,
        2
      );
      await io.api.deleteFlowsWithId([flowId]);
    });
  });
  test("@Env-All @Zephyr-IO-T17510 TC_C47430_multipleExports", async ({io,page}, testInfo) => {
    flowId = await io.flowbranching.createFlowBranchFromAPI(flowbranch);
    await io.api.checkJobStatusFromAPI(
      flowbranch.name,
      flowId,
      [4, 0, 0]
    );
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.flowbranching.flowBranchingPage.clickButtonNTimes(
      selectors.flowBranchingPO.FLOW_BUILDER_BOTTOM_DRAWER_UP,
      2
    );
    await io.homePage.isPageReady();
    await io.homePage.loadingTime();
    await io.homePage.click(
      selectors.flowBuilderPagePO.RUN_HISTORY
    );
    await io.homePage.click(
      selectors.integrationPagePO.RUNHISTORYOPTIONS
    );
    const downloadPromise = page.waitForEvent("download");
    await io.homePage.click(selectors.basePagePO.MENU_ITEM);

    const download = await downloadPromise;

    // Wait for the download process to complete and save the downloaded file somewhere.
    let fileName = download.suggestedFilename();
    await download.saveAs("../flowbranching/" + fileName);
    const zip = new AdmZip('../flowbranching/' + fileName);
    const zipEntries = zip.getEntries(); // an array of ZipEntry records
    let decompressedData;
    let data;
    zipEntries.forEach(function (zipEntry) {
        if (zipEntry.entryName == "jobs.json") {
          decompressedData = zip.readFile(zipEntry);
        }
    });
    data = Object(JSON.parse(decompressedData));
    expect(data.children[0]._expOrImpId).toBeTruthy();
    expect(data.children[0].oIndex).not.toBeTruthy();
  });
});
