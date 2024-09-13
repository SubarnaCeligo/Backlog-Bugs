import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C40389.json";

test.describe("TC_C40389", () => {
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

  test("@Zephyr-IO-T5915 @Env-All TC_C40389", async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();

    var flows = await io.api.createImpOrExpAndFlowsThruAPI(HTTP);
    await test.step("Created Flow " + flows.get(HTTP.flowname)["flowName"],async ()=>{});
    flowId = flows.get(HTTP.name)["flowId"];
    await io.flowBuilder.navigateToTheFlow( flowId);
    selectors.flowBranchingPO.EDIT_MOCK_INPUT
    test.step(" Navigating to flow ", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
    test.step(" Clicking on HTTP import ", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBranchingPO.EDIT_MOCK_INPUT);
    await io.homePage.loadingTime();
    test.step(" Clicking on editmock input ", async ()=>{});
    var result = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("record",result, "");
    await io.assert.expectToContainValue('"accountname": "automation"',result, "");
    await io.assert.expectToContainValue('"email": "automate@gmail.com",',result, "");
    await io.assert.expectToContainValue('"phone": "123456789"',result, "");
    test.step(" Verifying Sample data should be displayed from the export side  in canonical format ", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.INPUTDATA);
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step(" Clicking on Close ", async ()=>{});
  });
});
