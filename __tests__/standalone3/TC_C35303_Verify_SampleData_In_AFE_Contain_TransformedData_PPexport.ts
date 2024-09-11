import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/TC_C35303_Verify_SampleData_In_AFE_Contain_TransformedData_PPexport.json";

test.describe("TC_C35303_Verify_SampleData_In_AFE_Contain_TransformedData_PPexport", () => {
  let flowId: string;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    const flowDoc = await io.api.getCall("v1/flows/" + flowId);
    const pgExportId = flowDoc?.pageGenerators?.[0]?._exportId;
    const ppExportId = flowDoc?.pageProcessors?.[0]?._exportId;
    const ppImportId = flowDoc?.pageProcessors?.[0]?._importId;

    // Delete the flow
    await io.api.deleteFlowViaAPI(flowId)
    await io.api.deleteCall("v1/exports/" + pgExportId);
    await io.api.deleteCall("v1/exports/" + ppExportId);
    await io.api.deleteCall("v1/imports/" + ppImportId);
    await io.homePage.loadingTime();
  });
  
  test("@Zephyr-IO-T5580 @Env-All TC_C35303_Verify_SampleData_In_AFE_Contain_TransformedData_PPexport", async ({io,page}, testInfo) => {
    // *Create flow
    test.step("*** Creating PageGenerator ***", async ()=>{});
    flowId = await io.createResourceFromAPI(HTTP, "FLOWS");

    test.step("*** Clicking on Import button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});

    test.step("*** Clicking on what would you like to do ", async ()=>{});

    test.step("*** Clicking on Look up additional records ***", async ()=>{});
    await io.homePage.click(selectors.mappings.LOOKUP_RECORD);
    await io.homePage.loadingTime()

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime()

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, HTTP.qa_connection);
    test.step("***Choosing the desired HTTP connection ***", async ()=>{});

    await io.homePage.loadingTime()
    test.step("*** Entering Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "AutomationStandalone_Http export");

    test.step("*** Selecting HTTP Method ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_METHOD, "GET");
    
    test.step("*** Entering the data into relative URI ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_RELATIVEURI, "/users");

    test.step(" Selecting Export type ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN, "all");

    test.step("*** Clicking on Non-standard API response patterns ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);

    test.step("*** Entering the value for Path Record for HTTP response body ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH, "users");
    
    test.step("*** Clicking on save and close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    test.step("*** Clicking on add data processor button ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1);

    test.step("*** clicking on Look up Transformation ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.LOOKUPTRANSFORMATION);
    await io.homePage.loadingTime();

    await io.myAccountPage.click(selectors.flowBuilderPagePO.FIELD_MAPPING_SOURCE);
    await page.keyboard.type("name");

    await io.myAccountPage.click(selectors.flowBuilderPagePO.FIELD_MAPPING_GENERATE);
    await page.keyboard.type("transformed_Name");

    // to blur out the screen and enable save buttons
    await io.homePage.click(selectors.basePagePO.EXPAND_ALL);

    test.step("*** Clicking on save and close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.homePage.loadingTime();

    test.step("*** Clicking on Add Processor ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.PAGE_PROCESSOR);

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});

    test.step("*** Clicking on what would you like to do ", async ()=>{});

    test.step("*** Clicking on import records ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime()

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, HTTP.qa_connection);
    test.step("***Choosing the desired HTTP connection ***", async ()=>{});
    await io.homePage.loadingTime();

    test.step("*** Entering Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "AutomationStandalone_Http import");

    test.step("*** Selecting HTTP Method ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_METHOD, "POST");

    test.step("*** Clicking on save and close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.homePage.loadingTime();

    test.step("*** Clicking on add data processor button ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.ADD_DATA_PROCESSOR, 1);

    test.step("*** clicking on Response mapping ***", async ()=>{});
    await io.homePage.click(selectors.mappings.DEFAULT_MAPPING_TYPE.RESPONSE_MAPPING);

    await io.homePage.loadingTime();

    await io.myAccountPage.click(selectors.transformationPO.TEXT_EXTRACT + '0"] div');
    await page.keyboard.type("data");
    await io.myAccountPage.doubleClick(selectors.transformationPO.TEXT_GENE + '0"] div');
    await page.keyboard.type("Lookup_Response");

    test.step("*** Clicking on save and close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();

    test.step("*** Clicking on import button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT);

    test.step("** Clicking on Relative URI Handlebar ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.exportsPagePO.HTTP_RELATIVEURI, 1);

    await io.homePage.loadingTime();

    test.step("*** Verifying sample data In AFE Contains transofmed Data from previous PP Export ***", async ()=>{});
    var data = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("Lookup_Response",data, "");
    await io.assert.expectToContainValue("transformed_Name",data, "");

    test.step("*** Clicking on Relative URI Handlebar close button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBUTTON);

    test.step("*** Clicking on close button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSING_IMPORT);
  });
});
