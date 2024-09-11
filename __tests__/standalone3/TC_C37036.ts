import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import BQ from "@testData/STANDALONE/TC_C37036.json";

test.describe("TC_C37036", () => {
  let flowId: string;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    const flowDoc = await io.api.getCall("v1/flows/" + flowId);
    const pgExportId = flowDoc?.pageGenerators?.[0]?._exportId;

    // Delete the flow
    await io.api.deleteFlowViaAPI(flowId)
    await io.api.deleteCall("v1/exports/" + pgExportId);
    await io.homePage.loadingTime();
  });

  test("@Zephyr-IO-T7689 @Env-All TC_C37036", async ({io,page}, testInfo) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
    // *Create flow
    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(BQ, "FLOWS");
    test.step("*** clicked on export ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT);
    await io.homePage.loadingTime();
    test.step("*** clicked on preview ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.CLICKPREVIEW);
    await io.homePage.loadingTime();
    test.step("*** validating preview result ***", async ()=>{});
    var result = await io.homePage.getTextFromElement(selectors.basePagePO.ACE_CONTENT, "1");
    await io.assert.expectToBeTrue(result, "");
    test.step("*** closing the export ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
  });
});
