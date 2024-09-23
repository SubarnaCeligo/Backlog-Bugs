import { test, expect } from "@celigo/ui-core-automation";
import RedShift from "@testData/STANDALONE/TC_C50816.json";

test.describe("TC_C50816_Verify_RedShift_FTP_Works_With_MultiFields_Grouping", () => {
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

  test("@Zephyr-IO-T22242 @Env-All TC_C50816_Verify_RedShift_FTP_Works_With_MultiFields_Grouping", async ({io,page}, testInfo) => {
     // *Create flow
    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(RedShift, "FLOWS");
    await io.homePage.loadingTime();

    //Run Flow
    await io.api.checkJobStatusFromAPI(RedShift.name, flowId, [12, 0, 0]);
    await io.homePage.loadingTime();

    //Validation in upstream Apps
    await io.flowBuilder.validateJobCountFromDashBoard(RedShift.name, RedShift.qa__expectedDashboardCount) 
  });
});
