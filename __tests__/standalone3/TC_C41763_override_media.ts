import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import GraphQl from "@testData/STANDALONE/TC_C41763_override_media.json";

test.describe("TC_C41763_override_media", () => {
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

  test("@Zephyr-IO-T9972 @Env-All TC_C41763_override_media", async ({io,page}, testInfo) => {
    // // *Create flow
    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(GraphQl, "FLOWS");

    test.step("*** Clicking on export buttoon ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    expect(io.homePage.isVisible(selectors.flowBuilderPagePO.MEDIATYPESUCCESSRESP)).toBeTruthy()
    expect(io.homePage.isVisible(selectors.flowBuilderPagePO.MEDIATYPEERRORRESP)).toBeTruthy()

    var success = await io.homePage.getTextFromElement(selectors.flowBuilderPagePO.MEDIATYPESUCCESSRESP, "CSV");
    await io.assert.expectToBeTrue(success, "");

    var error = await io.homePage.getTextFromElement(selectors.flowBuilderPagePO.MEDIATYPEERRORRESP, "XML");
    await io.assert.expectToBeTrue(error, "");

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.MEDIATYPESUCCESSRESP, "xml");
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.MEDIATYPEERRORRESP, "plaintext");
    await io.homePage.click(selectors.flowBuilderPagePO.RESOUCEPATH);
    await page.keyboard.type("/test");
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT);
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    var success = await io.homePage.getTextFromElement(selectors.flowBuilderPagePO.MEDIATYPESUCCESSRESP, "XML");
    await io.assert.expectToBeTrue(success, "");

    var error = await io.homePage.getTextFromElement(selectors.flowBuilderPagePO.MEDIATYPEERRORRESP, "Plain text");
    await io.assert.expectToBeTrue(error, "");

  });
});
