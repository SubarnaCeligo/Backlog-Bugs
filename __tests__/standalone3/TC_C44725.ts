import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import FTP from "@testData/STANDALONE/TC_C44725.json";

test.describe("TC_C44725", () => {
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

  test("@Zephyr-IO-T1912 @Env-QA @Env-IAQA @Env-P5 TC_C44725", async ({io,page}, testInfo) => {
    // *Create flow
    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(FTP, "FLOWS");

    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.loadingTime();
    test.step("*** click on import mapping name help text ***", async ()=>{});    
    await page.locator(selectors.flowBuilderPagePO.HELP_TEXT_ICON).nth(3).click();
    test.step("*** Validate the help text***", async ()=>{});
    var data = await page.locator(selectors.connectionsPagePO.CONNHELPTEXT).textContent();
    await io.assert.expectToContainValue("to define the record structures integrator.io sends to the destination application",String(data), "");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE)

    test.step("*** click on import mapper type help text ***", async ()=>{});
    await page.locator(selectors.flowBuilderPagePO.HELP_TEXT_ICON).nth(4).click();
    test.step("*** Validate the help text***", async ()=>{});
    data = await page.locator(selectors.connectionsPagePO.CONNHELPTEXT).textContent();
    await io.assert.expectToContainValue("Mapper 2.0 provides an improved record representation that allows users to better visualize the record structure integrator.io sends to the target application",String(data), "");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE)

    test.step("*** click on import mapper structure help text ***", async ()=>{});
    await page.locator(selectors.flowBuilderPagePO.HELP_TEXT_ICON).nth(5).click();
    test.step("*** Validate the help text***", async ()=>{});
    data = await page.locator(selectors.connectionsPagePO.CONNHELPTEXT).textContent();
    await io.assert.expectToContainValue("Define the JSON structure of the data to send to the destination application",String(data), "");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE)

    test.step("*** Click on the setting gear icon ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.SETTINGSBUTTONS);
    await io.homePage.loadingTime();

    test.step("*** click on mapping settings name help text ***", async ()=>{});
    await page.locator(selectors.flowBuilderPagePO.HELP_TEXT_ICON).nth(8).click();
    test.step("*** Validate the help text***", async ()=>{});
    data = await page.locator(selectors.connectionsPagePO.CONNHELPTEXT).textContent();
    await io.assert.expectToContainValue("Define mappings for the destination field",String(data), "");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE)

    test.step("*** click on mapping data type help text ***", async ()=>{});
    await page.locator(selectors.flowBuilderPagePO.HELP_TEXT_ICON).nth(9).click();
    test.step("*** Validate the help text***", async ()=>{});
    data = await page.locator(selectors.connectionsPagePO.CONNHELPTEXT).textContent();
    await io.assert.expectToContainValue("Select the data type of the destination field",String(data), "");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE)

    test.step("*** click on field mapping data type help text ***", async ()=>{});
    await page.locator(selectors.flowBuilderPagePO.HELP_TEXT_ICON).nth(10).click();
    test.step("*** Validate the help text***", async ()=>{});
    data = await page.locator(selectors.connectionsPagePO.CONNHELPTEXT).textContent();
    await io.assert.expectToContainValue("Select the type of mapping you want to apply to the destination field",String(data), "");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE)

    test.step("*** click on destination field help text ***", async ()=>{});
    await page.locator(selectors.flowBuilderPagePO.HELP_TEXT_ICON).nth(11).click();
    test.step("*** Validate the help text***", async ()=>{});
    data = await page.locator(selectors.connectionsPagePO.CONNHELPTEXT).textContent();
    await io.assert.expectToContainValue("Check this box if the destination field is a date type field",String(data), "");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE)

    test.step("*** click on source data type help text ***", async ()=>{});
    await page.locator(selectors.flowBuilderPagePO.HELP_TEXT_ICON).nth(12).click();
    test.step("*** Validate the help text***", async ()=>{});
    data = await page.locator(selectors.connectionsPagePO.CONNHELPTEXT).textContent();
    await io.assert.expectToContainValue("The source field data type is automatically assigned when the source field is chosen from the drop-down list",String(data), "");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE)

    test.step("*** click on Action to take help text ***", async ()=>{});
    await page.locator(selectors.flowBuilderPagePO.HELP_TEXT_ICON).nth(13).click();
    test.step("*** Validate the help text***", async ()=>{});
    data = await page.locator(selectors.connectionsPagePO.CONNHELPTEXT).textContent();
    await io.assert.expectToContainValue("Select one of the following options when the mappings return an empty value",String(data), "");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE)

    test.step("*** click on settings description help text ***", async ()=>{});
    await page.locator(selectors.flowBuilderPagePO.HELP_TEXT_ICON).nth(14).click();
    test.step("*** Validate the help text***", async ()=>{});
    data = await page.locator(selectors.connectionsPagePO.CONNHELPTEXT).textContent();
    await io.assert.expectToContainValue("Describe your mappings so that other users can quickly understand the logic without having to read through the configurations",String(data), "");
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE)

    test.step("*** Click on the mapping type ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.MAPPING_TYPE);
    test.step("*** Click on the look up ***", async ()=>{});
    await io.homePage.clickButtonBasedOnLabelName(selectors.flowBuilderPagePO.SELECTPAGINGMETHOD, "Lookup");
    test.step("*** Click on the dynamic look up ***", async ()=>{});
    await io.homePage.click(selectors.mappings.DYNAMICLOOKUP);
    test.step("*** Click on the look up name help icon ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.LOOKUPHELPTEXT);
    test.step("*** Validate the text in the help icon ***", async ()=>{});
    data = await page.locator(selectors.connectionsPagePO.CONNHELPTEXT).textContent();
    await io.assert.expectToContainValue("Enter a descriptive and unique name to identify this lookup for future use",String(data), "");
    test.step("*** Close the import mappings ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.click(selectors.basePagePO.CLOSE);
  });
});
