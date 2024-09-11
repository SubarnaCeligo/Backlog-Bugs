import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C41680_GraphQLExport", () => {
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    // Delete the export
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_C41680_GraphQLExport');
    // Wait for search to complete
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
    await io.homePage.click(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    // confirm  delete 
    await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
  });

  test("@Zephyr-IO-T9968 @Env-All TC_C41680_GraphQLExport", async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.goToMenu("Resources","Exports");
    test.step("*** clicked on connection button ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.connectionsPagePO.GRAPHQL_CONNECTOR);
    test.step("*** Choosing the desired graphql connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "GRAPHQL CONNECTION");
    test.step("*** Entering testcase name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_C41680_GraphQLExport");

    test.step("*** Clicking on next button ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime()

    await io.homePage.click(selectors.exportsPagePO.HTTP_METHOD);
    test.step("*** selecting the http method ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.HTTP_METHOD_GET);
    await io.homePage.click(selectors.flowBuilderPagePO.GRAPHQL_QUERY);
    test.step("*** selecting the query textfield ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.GRAPHQL_QUERY, "GraphQl_import");
    test.step("*** writing in the query textfield ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.GRAPHQL_OPERATION_NAME_TEXTFIELD);
    test.step("*** clicking the operation field ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.GRAPHQL_OPERATION_NAME_TEXTFIELD, "AutomationStandalone_GraphQl_import");
    test.step("*** writing in the operation field ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.GRAPHQL_VARIABLES_TEXTFIELD);
    test.step("*** clicking the variable text field ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.GRAPHQL_VARIABLES_TEXTFIELD, "GraphQl_import");
    test.step("*** writing in the variable text field ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN);
    test.step("*** clicking the export type textfield ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.DATA_VALUE_ALL);
    test.step("*** selecting the all t export type textfield ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** selecting save button ***", async ()=>{});
    await io.homePage.loadingTime()

    await io.homePage.click(selectors.importPagePO.ADVANCED);
    test.step("*** Clicking on Advance section  ***", async ()=>{});
    var res = await io.homePage.isVisible(selectors.importPagePO.ADVANCED);
    await io.assert.expectToBeTrue(res, "");
    test.step("*** Checking that the Advanced section is displayed or not ***", async ()=>{});


    await io.homePage.click(selectors.basePagePO.CUSTOM_SETTING);
    test.step("*** Clicking on custom settings section  ***", async ()=>{});
    var res = await io.homePage.isVisible(selectors.basePagePO.CUSTOM_SETTING);
    await io.assert.expectToBeTrue(res, "");
    test.step("*** Checking that the custom settings section is displayed or not ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
  });
});
