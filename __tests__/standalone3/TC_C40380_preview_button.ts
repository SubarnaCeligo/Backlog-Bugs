import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C40380_toggle.json";

test.describe("TC_C40380_HTTP_import_preview_toggle", async () => {
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

  test("@Zephyr-IO-T5906 @Env-All TC_C40380_HTTP_import_preview_toggle", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()

    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(HTTP, "FLOWS");

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.importPagePO.CLICKIMPORT);
    test.step("*** clicking on the import  ***", async ()=>{});
    var preview_togggle = await io.homePage.isVisible(selectors.importPagePO.CLICKPREVIEWTOGGLE);
    await io.assert.expectToBeTrue(preview_togggle, "");
    test.step("*** verifying the preview toggle to be displayed  ***", async ()=>{});
    var preview = await io.homePage.isVisible(selectors.importPagePO.CLICKPREVIEW);
    await io.assert.expectToBeTrue(preview, "");
    test.step("*** verifying the preview butoon to be displayed  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicked on close import  ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    test.step(" Navigating to Home Page ", async ()=>{});
  });
});
