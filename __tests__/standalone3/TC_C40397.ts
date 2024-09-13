import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C40398_send_button.json";

test.describe("TC_C40397_Verify_send", () => {
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

  test("@Zephyr-IO-T5923 @Env-All TC_C40397_Verify_send", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()

    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(HTTP, "FLOWS");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
    await io.homePage.loadingTime()
    test.step("*** clicking on the import  ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.CLICKSENDTOGGLE);
    test.step("*** Clicked on send  ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    test.step("*** Clicked on send preview   ***", async ()=>{});
    
    var resul = await io.homePage.isVisible(selectors.mappings.HTTPRESPONSE);
    await io.assert.expectToBeTrue(resul, "");

    var response = await io.homePage.copyResourceData(
      selectors.importPagePO.PREVIEWDATA
    );
    await io.assert.expectToContainValue("channel_not_found",response, "");

    test.step("*** Verified HTTP response tab should show the response from the import application. ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
  });
});
