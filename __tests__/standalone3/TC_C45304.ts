import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C45304.json";

test.describe("TC_C45304", () => {
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

  test("@Zephyr-IO-T18453 @Env-All TC_C45304", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()

    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(HTTP, "FLOWS");
    await io.homePage.loadingTime()
   
    test.step("*** Clicking on + symbol ***", async ()=>{});
    await io.homePage.waitForElementAttached(selectors.basePagePO.ADD_DATA_PROCESSOR)
    await io.homePage.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 1);
    var opt = await io.homePage.isVisible(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.assert.expectToBeTrue(opt, "");
    test.step("*** Verified user should be able to view import mapping option available for XML file type ***", async ()=>{});
  });
});
