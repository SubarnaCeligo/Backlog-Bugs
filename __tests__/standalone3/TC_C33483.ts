import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import SF from "@testData/STANDALONE/TC_C33483.json";

test.describe("TC_C33483", () => {
  let flowId: string;
  let pgExportId: string;
  let ppImportId: string;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    // Delete the flow
    await io.api.deleteFlowViaAPI(flowId)
    await io.homePage.loadingTime();
    await io.api.deleteCall("v1/exports/" + pgExportId);
    await io.homePage.loadingTime();
    await io.api.deleteCall("v1/imports/" + ppImportId);
    await io.homePage.loadingTime();
  });

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T9772 @Env-All TC_C33483", async ({io,page}, testInfo) => {
     //*Create flow
     test.step("*** Creating flow ***", async ()=>{});
     flowId = await io.createResourceFromAPI(SF, "FLOWS");
     await io.homePage.loadingTime();
 
     // C33483
     test.step("*** Running Flow ***", async ()=>{});
     await io.homePage.click(selectors.basePagePO.RUNFLOW);
     await io.homePage.loadingTime();
 
     test.step("***Click on the error ***", async ()=>{});
     await io.api.verifyFlowStatusThroughAPI(SF.name, flowId, [2,0,2]);
     await io.homePage.loadingTime();
 
     await io.homePage.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
     await io.homePage.loadingTime();
     test.step("***Validate the error message ***", async ()=>{});
     await io.homePage.click(selectors.flowBuilderPagePO.ERROR_RESPONSE_TAB);
     await io.homePage.click(selectors.flowBuilderPagePO.EM2DOT0PO.OTHER);

     test.step("*** Validation of no column/invalid error ***", async ()=>{});
     var error1 = await io.homePage.copyResourceData(selectors.importPagePO.PREVIEWDATA);
     await io.assert.expectToContainValue('"statusCode": 400',error1, "");
     test.step("*** Closing the error ***", async ()=>{});
     await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
  });
});
