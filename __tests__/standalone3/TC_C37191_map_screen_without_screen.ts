import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C37191_map_screen_without_screen.json";

test.describe("TC_C37191_SF_mapping_Assistnant_screen", async () => {
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

  test("@Zephyr-IO-T5883 @Env-All TC_C37191_SF_mapping_Assistnant_screen", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()

    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(HTTP, "FLOWS");
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    await io.homePage.waitForElementAttached(selectors.basePagePO.ADD_DATA_PROCESSOR)
    await io.homePage.clickByIndex(selectors.basePagePO.ADD_DATA_PROCESSOR, 1);
    test.step("*** clicking on the define options ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    test.step("*** clicking on the importmapping ***", async ()=>{});
    await io.homePage.click(selectors.playgroundPO.LAYOUT_TOGGLE);
    test.step("*** clicking on the togglelyout ***", async ()=>{});
    await io.homePage.click(selectors.mappings.COMPACT2);
    test.step("clicking on the frame without assistant ", async ()=>{});
    var mapping = await io.assert.checkElementState(selectors.mappings.RULE, "isVisible");
    expect(mapping).toBeTruthy;
    test.step("verifying the mapping side is displayed ", async ()=>{});
    var input = await io.assert.checkElementState(selectors.mappings.MAPPING_INPUT_DATA, "isVisible");
    expect(input).toBeTruthy;
    test.step("verifying the  input is displayed ", async ()=>{});
    var output = await io.assert.checkElementState(selectors.mappings.MAPPING_OUTPUT_DATA, "isVisible");
    expect(output).toBeTruthy;
    test.step("verifying the output is displayed ", async ()=>{});
    var output = await io.assert.checkElementState(selectors.mappings.MAPPING_ASSISTANT, "isVisible");
    expect(output).toBeFalsy;
    test.step("verifying the assistant is not displayed ", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    test.step("*** Clicked on close drawer***", async ()=>{});
  });
});
