import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import SF from "@testData/STANDALONE/TC_C33459_C33465.json";

test.describe("TC_C33459_C33465", () => {
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
  test("@Zephyr-IO-T9751 @Zephyr-IO-T9756 @Env-All TC_C33459_C33465", async ({io,page}, testInfo) => {
    //*Create flow
    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(SF, "FLOWS");
    await io.homePage.loadingTime();

    // C33459
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
    var error1 = await io.homePage.copyResourceData(selectors.importPagePO.PREVIEWDATA);
    await io.assert.expectToContainValue("MALFORMED_QUERY",error1, "");
    test.step("*** Closing the error ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);

    // C33465
    const flowDoc = await io.api.getCall("v1/flows/" + flowId);
    pgExportId = flowDoc?.pageGenerators?.[0]?._exportId;
    ppImportId = flowDoc?.pageProcessors?.[0]?._importId;
    const importDoc = await io.api.getCall("v1/imports/" + ppImportId);
    await io.api.putCall("v1/imports/" + ppImportId, {...importDoc, "salesforce": {
            "operation": "update",
            "sObjectType": "Contact",
            "api": "compositerecord",
            "idLookup": {
                "whereClause": "(FirstName = dummy)"
            }
        }});

    await io.homePage.loadingTime();
    test.step("*** Running Flow ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.RUNFLOW);
    await io.homePage.loadingTime();

    test.step("***Click on the error ***", async ()=>{});
    await io.api.verifyFlowStatusThroughAPI(SF.name, flowId, [2,0,2]);
    await io.homePage.loadingTime();

    await page.waitForTimeout(15000);
    await io.homePage.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);

    await io.homePage.loadingTime();
    test.step("***Validate the error message ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ERROR_RESPONSE_TAB);
    var error2 = await io.homePage.copyResourceData(selectors.importPagePO.PREVIEWDATA);
    await io.assert.expectToContainValue("MALFORMED_QUERY",error2, "");

    test.step("*** Closing the error ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
  });
});
