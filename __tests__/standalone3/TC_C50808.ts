import { test, expect } from "@celigo/ui-core-automation";
import BigQuery from "@testData/STANDALONE/TC_C50808.json";

test.describe("TC_C50808_Verify_BigQuery_FTP_Works_Fine_When_Below_5MB", () => {
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

  test("@Zephyr-IO-T22235 @Env-All TC_C50808_Verify_BigQuery_FTP_Works_Fine_When_Below_5MB", async ({io,page}, testInfo) => {
    // *Create flow
    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(BigQuery, "FLOWS");
    await io.homePage.loadingTime();

    //Run Flow
    await io.api.checkJobStatusFromAPI(BigQuery.name, flowId, [8, 0, 0]);
    await io.homePage.loadingTime();

    //Validation in upstream Apps
    await io.flowBuilder.validateJobCountFromDashBoard(BigQuery.name, BigQuery.qa__expectedDashboardCount)  
  });
});
