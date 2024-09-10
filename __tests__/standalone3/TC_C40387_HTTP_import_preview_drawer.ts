import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C40387_Preview_HTTP_import_drawer.json";

test.describe("TC_C40387_HTTP_import_preview_toggle", async () => {
  let flowId: string;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    const flowDoc = await io.api.getCall("v1/flows/" + flowId);
    const pgExportId = flowDoc?.pageGenerators?.[0]?._exportId;
    const ppExportId = flowDoc?.pageProcessors?.[0]?._exportId;

    // Delete the flow
    await io.api.deleteFlowViaAPI(flowId)
    await io.api.deleteCall("v1/exports/" + pgExportId);
    await io.api.deleteCall("v1/exports/" + ppExportId);
    await io.homePage.loadingTime();
  });

  test("@Zephyr-IO-T5913 @Env-All TC_C40387_HTTP_import_preview_toggle", async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
    flowId = await io.createResourceFromAPI(HTTP, "FLOWS");
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    var preview = await io.homePage.isVisible(selectors.importPagePO.CLICKPREVIEWTOGGLE);
    
    await expect(preview).toBeFalsy();
    test.step("*** verifying the preveiw toggle is not be dispalyed  ***", async ()=>{});
    await io.homePage.loadingTime();
    var edit_mock = await io.homePage.isVisible(selectors.flowBranchingPO.EDIT_MOCK_INPUT);
    await expect(edit_mock).toBeFalsy();
    test.step("*** verifying the edit mock toggle is not be dispalyed  ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
    test.step("*** Clicked on close drawer   ***", async ()=>{});
  });
});
