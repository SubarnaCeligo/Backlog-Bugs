import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import DDB from "@testData/STANDALONE/TC_C50819.json";

test.describe("TC_C50819_Verify_DynamoDB_FTP_Works_With_Grouping", () => {
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

  test("@Zephyr-IO-T22245 @Env-All TC_C50819_Verify_DynamoDB_FTP_Works_With_Grouping", async ({io,page}, testInfo) => {
    // *Create flow
    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(DDB, "FLOWS");
    await io.homePage.loadingTime();

    test.step("*** Clicking on PageGenerator ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on group records drodown ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.WOULD_YOU_LIKE_TO_GROUP_RECORD);
    await io.homePage.click(selectors.flowBuilderPagePO.GROUP_RECORD_FIELD_INPUT);
    await io.homePage.click(selectors.flowBuilderPagePO.GROUPBYID);
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    //Run Flow
    await io.api.checkJobStatusFromAPI(DDB.name, flowId, [6, 0, 0]);
    await io.homePage.loadingTime();

    //Validation in upstream Apps
    await io.flowBuilder.validateJobCountFromDashBoard(DDB.name, DDB.qa__expectedDashboardCount) 
  });
});
