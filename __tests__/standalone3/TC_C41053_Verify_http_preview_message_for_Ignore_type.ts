import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/STANDALONE/TC_C41053_Verify_http_preview_message_for_Ignore_type.json";

test.describe("TC_C41053_Verify_http_preview_message_for_Ignore_type", () => {
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

  test("@Zephyr-IO-T5936 @Env-All TC_C41053_Verify_http_preview_message_for_Ignore_type", async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
    flowId = await io.createResourceFromAPI(FTP, "FLOWS");
    await io.homePage.loadingTime()
    await io.homePage.isPageReady();
    
    test.step("*** Opening the flow ***", async ()=>{});
    test.step("*** Clicking on the created import ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);
    await io.homePage.loadingTime();

    test.step("*** Cliking on the preview ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);

    test.step("*** Validating the success message ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.assert.verifyElementDisplayedByText('Success!', 'success not visible')
    await io.assert.verifyElementDisplayedByText('1 Page, 1 Record', 'success not visible')

    test.step("*** Closing the import ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
  });
});
