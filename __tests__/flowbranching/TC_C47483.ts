
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import flowbranch from "@testData/flowbranching/TC_C47483.json";
import AdmZip from "adm-zip";

test.describe("@Author-ParthPatel TC_C47483_orchestrated_flows", () => {
  let flowId;
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Go to flows page ***", async ()=>{
      await io.goToFlowsPage();
    });
  });
  test.afterEach(async ({io,page}, testInfo) => {
    await test.step("*** Deleting flow.***", async ()=>{
      await io.flowbranching.flowBranchingPage.decreaseDrawer();
      await io.api.deleteFlowsWithId([flowId]);
    });
  });
  test("@Env-All @Zephyr-IO-T17537 TC_C47483_orchestrated_flows Test to create a non branched flow, run the flow and validate the flow job schema", async ({io,page}, testInfo) => {
    var flow = await io.api.createImpOrExpAndFlowsThruAPI(flowbranch);
    flowId = flow.get(flowbranch.name)["flowId"];
    await io.api.checkJobStatusFromAPI(
      flowbranch.name,
      flowId,
      [3, 0, 0]
    );
    await io.flowBuilderDashboard.navigateToEm2Flow(flowId);
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.fitScreenViewInFlowBranch();
    await io.homePage.loadingTime();
    await io.flowbranching.flowBranchingPage.increaseDrawer(400);
    await io.homePage.loadingTime();
    let errors = await io.flowbranching.flowBranchingPage.getList(
      selectors.flowBuilderPagePO.JOB_ERRORS
    );
    expect(errors.includes("Success")).toEqual(true);
    expect(errors.includes("1 error")).toEqual(false);
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
    expect(data.numSuccess).toEqual(3);
    /*
    Commenting out the below code as this expecting result is yet to confirm by Vikram
    expect(data.children[0].oIndex).toEqual(0);
    expect(data.children[1].oIndex).toEqual(1);
    expect(data.children[2].oIndex).toEqual(2);
    */
  });
});
