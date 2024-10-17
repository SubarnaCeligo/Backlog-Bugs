import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import SF from "@testData/STANDALONE/TC_C33450_C33456_C33462.json";

test.describe("TC_C33450_C33456_C33462", () => {
  let flowId1: string;
  let flowId2: string;
  let flowId3: string;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    // Delete the flow1
    const flowDoc1 = await io.api.getCall("v1/flows/" + flowId1);
    const pgExportId1 = flowDoc1?.pageGenerators?.[0]?._exportId;
    const ppImportId1 = flowDoc1?.pageProcessors?.[0]?._importId;

    await io.api.deleteFlowViaAPI(flowId1)
    await io.homePage.loadingTime();
    await io.api.deleteCall("v1/exports/" + pgExportId1);
    await io.homePage.loadingTime();
    await io.api.deleteCall("v1/imports/" + ppImportId1);
    await io.homePage.loadingTime();

    // Delete the flow2
    const flowDoc2 = await io.api.getCall("v1/flows/" + flowId2);
    const pgExportId2 = flowDoc2?.pageGenerators?.[0]?._exportId;
    const ppImportId2 = flowDoc2?.pageProcessors?.[0]?._importId;

    await io.api.deleteFlowViaAPI(flowId2)
    await io.homePage.loadingTime();
    await io.api.deleteCall("v1/exports/" + pgExportId2);
    await io.homePage.loadingTime();
    await io.api.deleteCall("v1/imports/" + ppImportId2);
    await io.homePage.loadingTime();

    // Delete the flow3
    const flowDoc3 = await io.api.getCall("v1/flows/" + flowId3);
    const pgExportId3 = flowDoc3?.pageGenerators?.[0]?._exportId;
    const ppImportId3 = flowDoc3?.pageProcessors?.[0]?._importId;

    await io.api.deleteFlowViaAPI(flowId3)
    await io.homePage.loadingTime();
    await io.api.deleteCall("v1/exports/" + pgExportId3);
    await io.homePage.loadingTime();
    await io.api.deleteCall("v1/imports/" + ppImportId3);
    await io.homePage.loadingTime();
  });

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T9743 @Zephyr-IO-T9748 @Zephyr-IO-T9753 @Env-All TC_C33450_C33456_C33462", async ({io,page}, testInfo) => {
    // C33450
    //*Create soap flow
    test.step("*** Creating flow ***", async ()=>{});
    flowId1 = await io.createResourceFromAPI(SF.soapFlow, "FLOWS");
    await io.homePage.loadingTime();

    test.step("*** Running Flow ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.RUNFLOW);
    await io.homePage.loadingTime();

    test.step("***Click on the error ***", async ()=>{});
    await io.api.verifyFlowStatusThroughAPI(SF.soapFlow.name, flowId1, [2,0,2]);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
    await io.homePage.loadingTime();
    test.step("***Validate the error message ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ERROR_RESPONSE_TAB);
    var error1 = await io.homePage.copyResourceData(selectors.importPagePO.PREVIEWDATA);
    await io.assert.expectToContainValue("REQUIRED_FIELD_MISSING",error1, "");
    test.step("*** Closing the error ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);

    // C33456
    //*Create rest flow
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    test.step("*** Creating flow ***", async ()=>{});
    flowId2 = await io.createResourceFromAPI(SF.restFlow, "FLOWS");
    await io.homePage.loadingTime();

    test.step("*** Running Flow ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.RUNFLOW);
    await io.homePage.loadingTime();

    test.step("***Click on the error ***", async ()=>{});
    await io.api.verifyFlowStatusThroughAPI(SF.restFlow.name, flowId2, [2,0,2]);
    await io.homePage.loadingTime();

    await page.waitForTimeout(15000);
    await io.homePage.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
    await io.homePage.loadingTime();
    test.step("***Validate the error message ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ERROR_RESPONSE_TAB);
    var error2 = await io.homePage.copyResourceData(selectors.importPagePO.PREVIEWDATA);
    await io.assert.expectToContainValue("INVALID_FIELD",error2, "");

    test.step("*** Closing the error ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);

    // C33462
    //*Create composite flow
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    test.step("*** Creating flow ***", async ()=>{});
    flowId3 = await io.createResourceFromAPI(SF.compositeFlow, "FLOWS");
    await io.homePage.loadingTime();
    
    test.step("*** Running Flow ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.RUNFLOW);
    await io.homePage.loadingTime();

    test.step("***Click on the error ***", async ()=>{});
    await io.api.verifyFlowStatusThroughAPI(SF.compositeFlow.name, flowId3, [2,0,2]);
    await io.homePage.loadingTime();

    await page.waitForTimeout(15000);
    await io.homePage.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
    await io.homePage.loadingTime();
    test.step("*** Validate the error message ***", async ()=>{});
    var data = await io.homePage.getText(selectors.integrationPagePO.FORMULA_ERROR)
    await io.assert.expectToContainValue("COMPOSITE_REQUEST_VALIDATION_ERROR", String(data), "");

    test.step("*** Closing the error ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
  });
});
