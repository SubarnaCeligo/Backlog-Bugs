import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import Rest from "@testData/STANDALONE/TC_C34940_HTTPExportImport_Verify_AFETogglePresent.json";

test.describe("TC_C34940_HTTPExportImport_Verify_AFETogglePresent", () => {
  let flowId: any;

  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    // Delete the flow
    io.api.deleteFlowViaAPI(flowId)

    // Delete the lookup export
    await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'AutomationStandalone_Http export');
    // Wait for search to complete
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
    await io.homePage.click(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    // confirm  delete 
    await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();

    // Delete the pg export
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'AutomationStandalone_');
    // Wait for search to complete
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
    await io.homePage.click(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    // confirm  delete 
    await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
  });
  test("@Zephyr-IO-T5569 @Env-All TC_C34940_HTTPExportImport_Verify_AFETogglePresent", async ({io,page}, testInfo) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    if(process.env["ENVIRONMENT"] == "qaprod") {
      Rest.pageGenerators[0].qa__export._connectionId = Rest.qaprod_httpcon;
    }
    // *Create flow
    test.step("*** Creating flow ***", async ()=>{});
    flowId = await io.createResourceFromAPI(Rest, "FLOWS");

    test.step("*** Clicking on Import button ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});
    test.step("*** Clicking on what would you like to do ", async ()=>{});
    test.step("*** Clicking on Look up additional records ***", async ()=>{});
    await io.homePage.click(selectors.mappings.LOOKUP_RECORD);

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);

    await io.homePage.loadingTime()
    if(global.environmet == "qaprod") {
      await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, Rest.qaprod_httpcon);
    } else if(process.env["ENVIRONMENT"] == "iaqa") {
      await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, Rest.iaqa_httpcon);
    } else {
      await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, Rest.qa_connection);
    }
    test.step("***Choosing the desired HTTP connection ***", async ()=>{});

    test.step("*** Entering Name ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "AutomationStandalone_Http export");
    test.step("*** Selecting HTTP Method ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.importPagePO.SELECTHTTPMETHOD, "POST");
    test.step("*** Clicking on Relative URI Handlebar ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.exportsPagePO.HTTP_RELATIVEURI, 1);
    test.step("*** Entering the data into AFE2.0 Handlebar Template ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, "{{data.name}}");
    test.step("*** Clicking on save and close button ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.SAVE_AND_CLOSE, 1);
    test.step("*** Clicking on HTTP Request Body Handlebar ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.HTTP_BODY);
    test.step("*** Entering the data into AFE2.0 Handlebar Template ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.HTTPREQUSTBODY, "{{data.name}}");
    test.step("*** Clicking on save and close button ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.SAVE_AND_CLOSE, 1);
    test.step(" Selecting Export type ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN, "all");

    test.step("*** Clicking on save and close button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    test.step("*** Clicking on Import button ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.LOOKUP);
    test.step("*** Clicking on Relative URI Handlebar ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.exportsPagePO.HTTP_RELATIVEURI, 1);

    test.step("*** Verifying the AFE toggle is present ***", async ()=>{});
    var status1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await io.assert.expectToBeTrue(status1, "");
    var status2 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await io.assert.expectToBeTrue(status2, "");

    test.step("*** Clicked on close ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);

    await io.homePage.click(selectors.exportsPagePO.HTTP_BODY);
    test.step("*** Clicked on HTTP Requestbody Openhandler ***", async ()=>{});

    test.step("*** Verifying the AFE toggle is present ***", async ()=>{});
    var status3 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_ONE_DOT_ZERO);
    await io.assert.expectToBeTrue(status3, "");
    var status4 = await io.homePage.isVisible(selectors.flowBuilderPagePO.AFE_TWO_DOT_ZERO);
    await io.assert.expectToBeTrue(status4, "");

    test.step("*** Clicked on close ***", async ()=>{});
    await io.homePage.clickButtonByIndex(selectors.basePagePO.CLOSE, 1);

    await io.homePage.loadingTime();

    test.step("*** Clicked on close ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.CLOSINGDRAWER);
  });
});
