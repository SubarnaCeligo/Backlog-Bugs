import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C40394.json";

test.describe("TC_C40395", () => {
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

  test("@Zephyr-IO-T5921 @Env-All TC_C40395", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()

    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(HTTP, "FLOWS");

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
    await io.homePage.loadingTime()
    test.step("*** clicking on the import  ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    test.step(" Clicking on HTTP import preview ", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.click(selectors.mappings.HTTPRESPONSE);
    var responseBody = await io.homePage.getTextFromElement(
      selectors.importPagePO.PREVIEWDATA
    );
    await io.assert.expectToBeFalse(responseBody, "");

    await io.homePage.click(selectors.exportsPagePO.PARSED_OUTPUT);
    var output = await io.homePage.getTextFromElement(selectors.importPagePO.PREVIEWDATA);
    await io.assert.expectToBeFalse(output, "");
    test.step(" Verifying HTTP Response and parsed output tab should be empty when previewing an input ", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step(" Clicking on Close ", async ()=>{});
  });
});
