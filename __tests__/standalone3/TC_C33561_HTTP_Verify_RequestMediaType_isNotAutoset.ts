import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import NS from "@testData/STANDALONE/TC_C33561_HTTP_Verify_RequestMediaType_isNotAutoset.json";

test.describe("TC_C33561_HTTP_Verify_RequestMediaType_isNotAutoset", () => {
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

  test("@Zephyr-IO-T9853 @Env-All TC_C33561_HTTP_Verify_RequestMediaType_isNotAutoset", async ({io,page}, testInfo) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(NS, "FLOWS");

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT);
    test.step("*** Open HTTP Export ***", async ()=>{});
    await io.homePage.loadingTime();
    var Text1 = await io.homePage.getText(selectors.flowBuilderPagePO.REQUESTMEDIATYPE)
    await io.assert.expectToBeValue(String(Text1), "Do not override", "");
    test.step("*** Veified media type is not auto set based on connection on HTTP Export ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.loadingTime()
    //Verifying mediaType on HTTP Export
    await io.homePage.click(selectors.importPagePO.CLICKIMPORT);
    test.step("*** Open HTTP Import ***", async ()=>{});
    await io.homePage.loadingTime();
    var Text2 = await io.homePage.getText(selectors.flowBuilderPagePO.REQUESTMEDIATYPE)
    await io.assert.expectToBeValue(String(Text2), "Do not override", "");
    test.step("*** Veified media type is not auto set based on connection on HTTP Import ***", async ()=>{});
    test.step("*** Ending of Test Suite ***", async ()=>{});
  });
});
