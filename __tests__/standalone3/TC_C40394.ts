import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C40394.json";

test.describe("TC_C40394_Verify HTTP request for preview call", () => {
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

  test("@Zephyr-IO-T5920 @Env-All TC_C40394_Verify HTTP request for preview call", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()

    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(HTTP, "FLOWS");

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
    await io.homePage.loadingTime()
    test.step("*** clicking on the import  ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    test.step("*** Clicked on Preview   ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.exportsPagePO.HTTPREQUEST);
    test.step("*** Clicked on HTTP Request   ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.DEBUG_LOGS_BODY);
    test.step("*** Clicked on HTTP Request Body ***", async ()=>{});

    var reqBody = await io.homePage.copyResourceData(
      selectors.importPagePO.PREVIEWDATA
    );
    await io.assert.expectToContainValue("\"name\": \"SLACK CONNECTION\"",reqBody, "");

    await io.homePage.click(selectors.flowBuilderPagePO.PREVIEW_HEADERS);
    var headers = await io.homePage.copyResourceData(
      selectors.importPagePO.PREVIEWDATA
    );
    await io.assert.expectToContainValue("application/x-www-form-urlencoded",headers, "");

    test.step("*** Verified HTTP request for preview call. ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
  });
});
