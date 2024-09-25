import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/STANDALONE/TC_C50805.json";

test.describe("TC_C50805_Verify_MySQL_FTP_Export_Error_Details", () => {
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

  test("@Zephyr-IO-T22232 @Env-All TC_C50805_Verify_MySQL_FTP_Export_Error_Details", async ({io,page}, testInfo) => {
    // *Create flow
    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(FTP, "FLOWS");
    await io.homePage.loadingTime();

    // *Running the flow
    test.step("*** Running Flow ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.RUNFLOW);
    await io.homePage.loadingTime();

    test.step("***Click on the error ***", async ()=>{});
    await io.api.verifyFlowStatusThroughAPI('TC_C50805_Verify_MySQL_FTP_Export_Error_Details', flowId, [4,0,1]);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
    test.step("***Validate the error message ***", async ()=>{});
    var data = await io.homePage.getText(selectors.integrationPagePO.ERRORMESSAGEDATABASE);
    await io.assert.expectToContainValue("Failed to export group as it exceeded the max size of 5.0000 MB.",String(data), "");
    test.step("*** Closing the error ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
  });
});
