import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/STANDALONE/TC_C37479.json";

test.describe("TC_C37479", () => {
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

  test("@Zephyr-IO-T8462 @Env-All TC_C37479", async ({io,page}, testInfo) => {
    test.step("*** Navigate to Home Page ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
    
    flowId = await io.createResourceFromAPI(FTP, "FLOWS");

    test.step("*** Running Flow ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.RUNFLOW);
    await io.homePage.loadingTime();

    test.step("*** Wait for the flow to complete ***", async ()=>{});
    await io.api.verifyFlowStatusThroughAPI('C37479_flow_errors', flowId, [0,0,1]);
    await io.homePage.loadingTime();

    test.step("*** click on the error ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ACCOUNT_DASHBOARD_OPEN_ERRORS);
    test.step("*** Validate the erroe message ***", async ()=>{});
    var data = await io.homePage.getText(selectors.flowBuilderPagePO.TEST_RUN_STATUS)
    await io.assert.expectToContainValue( "cannot_evaluate_handlebars", String(data), "");

    test.step("*** Closing the error window ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
  });
});
