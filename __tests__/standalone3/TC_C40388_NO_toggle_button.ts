import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C40388_NO_toggle.json";

test.describe("TC_C40388_NO_toggle", async () => {
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

  test("@Zephyr-IO-T5914 @Env-All TC_C40388_NO_toggle", async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
    flowId = await io.createResourceFromAPI(HTTP, "FLOWS");

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.TRANSFER);
    test.step("*** clicking on the trnasfer  ***", async ()=>{});
    var preview = await io.homePage.isVisible(selectors.importPagePO.CLICKPREVIEW);
    await io.assert.expectToBeTrue(preview, "");
    ("*** verifying the preview button  to be displayed  ***");
    var edit_mock = await io.homePage.isVisible(selectors.flowBranchingPO.EDIT_MOCK_INPUT);
    await io.assert.expectToBeTrue(edit_mock, "");
    test.step("*** verifying the edit mock button  to be displayed  ***", async ()=>{});
    var preview_togggle = await io.homePage.isVisible(selectors.importPagePO.CLICKPREVIEWTOGGLE);
    await expect(preview_togggle).toBeFalsy();
    test.step("*** verifying the preview toggle button not to be displayed  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicked on close import  ***", async ()=>{});
  });
});
