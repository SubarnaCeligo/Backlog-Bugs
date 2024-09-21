import { test, expect } from "@celigo/ui-core-automation";
import MSSQL from "@testData/STANDALONE/TC_C50813.json";

test.describe("TC_C50813_Verify_MSSQL_FTP_Works_With_Grouping | Golden", () => {
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

  test("@Zephyr-IO-T22239 @Env-All TC_C50813_Verify_MSSQL_FTP_Works_With_Grouping", async ({io,page}, testInfo) => {
    // *Create flow
    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(MSSQL, "FLOWS");
    await io.homePage.loadingTime();

    //Run Flow
    await io.api.checkJobStatusFromAPI(MSSQL.name, flowId, [10, 0, 0]);
    await io.homePage.loadingTime();

    //Validation in upstream Apps
    await io.flowBuilder.validateJobCountFromDashBoard(MSSQL.name, MSSQL.qa__expectedDashboardCount)
  });
});
