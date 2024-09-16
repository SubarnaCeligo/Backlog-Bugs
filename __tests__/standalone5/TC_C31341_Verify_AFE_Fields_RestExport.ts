import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import Rest from "@testData/STANDALONE/TC_C31341_Verify_AFE_Fields_RestExport.json";

test.describe("TC_C31341_Verify_AFE_Fields_RestExport", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test("@Zephyr-IO-T5513 @Env-All TC_C31341_Verify_AFE_Fields_RestExport", async ({io,page}, testInfo) => {
    // *Create Page Generators
    test.step("*** Creating PageGenerator ***", async ()=>{});
    await io.pageGenerator( "Allure",Rest);

    test.step("*** Clicking on Import button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});

    test.step("*** Clicking on what would you like to do ", async ()=>{});

    test.step("*** Clicking on Look up additional records ***", async ()=>{});
    await io.homePage.click(selectors.mappings.LOOKUP_RECORD);
    
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.exportsPagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.CONNECTION);
    await page.keyboard.type(Rest.qa_connection);
    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONDROP0);
    await io.homePage.loadingTime();

    test.step("***Choosing the desired HTTP connection ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** Clicking on NEXT button ***", async ()=>{});

    test.step("*** Entering Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "AutomationStandalone_Http export");

    test.step("*** Selecting HTTP Method ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_METHOD, "POST");

    test.step("*** Clicking on Relative URI Handlebar ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.exportsPagePO.HTTP_RELATIVEURI, 1);

    test.step("*** Entering the data into AFE2.0 Handlebar Template ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, "{{data.name}}");

    test.step("*** Clicking on save and close button ***", async ()=>{});
    await io.homePage.clickByTextByIndex('Save & close', 1);

    test.step("*** Clicking on HTTP Request Body Handlebar ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.HTTP_BODY);
    test.step("*** Entering the data into AFE2.0 Handlebar Template ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, "{{data.name}}");

    test.step("*** Clicking on save and close button ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.SAVE_AND_CLOSE, 1);

    test.step(" Selecting Export type ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN, "once");

    test.step("*** Selecting HTTP Method to Update Record ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.importPagePO.HTTPUPDATEMETHOD, "PUT");

    test.step("*** Clicking on Relative URI to Update Record Handlebar ***", async ()=>{});
    await io.homePage.clickButtonByIndex( selectors.flowBuilderPagePO.RELATIVEURIUPDATERECORD, 1);
   
    test.step("*** Entering the data into AFE2.0 Handlebar Template ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, "{{data.myField}}");

    test.step("*** Clicking on save and close button ***", async ()=>{});
    await io.homePage.clickByTextByIndex('Save & close', 1);

    test.step("*** Clicking on HTTP Request Body Handlebar ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.HTTPREQUESTBODYHANDLEBAR);
    
    test.step("*** Entering the data into AFE2.0 Handlebar Template ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, "{{data.myField}}");

    test.step("*** Clicking on save and close button ***", async ()=>{});
    await io.homePage.clickByTextByIndex('Save & close', 1);
    test.step("*** Clicking on save and close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Clicking on Import button ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.IMPORTLOOKUP);

    test.step("*** Clicking on Relative URI Handlebar ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.exportsPagePO.HTTP_RELATIVEURI, 1);

    test.step("*** Verifying Sample data in Relative URI AFE1.0 ***", async ()=>{});
    var data = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("data",String(data), "");

    test.step("*** Clickng on close button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBUTTON);

    test.step("*** Clicking on HTTP Request Body Handlebar ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.HTTP_BODY);

    test.step("*** Verifying Sample data in HTTP Request Body AFE1.0 ***", async ()=>{});
    var data1 = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("data",String(data1), "");

    test.step("*** Clickng on close button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBUTTON);

    test.step("*** Clicking on Relative URI to Update Record Handlebar ***", async ()=>{});
    await io.homePage.clickButtonByIndex( selectors.flowBuilderPagePO.RELATIVEURIUPDATERECORD, 1);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Verifying Sample data in Relative URI to Update Record AFE1.0 ***", async ()=>{});
    var data2 = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("data",String(data2), "");

    test.step("*** Clickng on close button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSEBUTTON);

    test.step("*** Clicking on HTTP Request Body Handlebar ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.HTTPREQUESTBODYHANDLEBAR);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();

    test.step("*** Verifying Sample data in HTTP Request Body AFE1.0 ***", async ()=>{});
    var data3 = await io.homePage.getText(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.assert.expectToContainValue("data",String(data3), "");
  });
});
