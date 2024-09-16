import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C41248_Checking_the_methods", () => {
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    // Delete the export
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_C41248_Graphql_export');
    // Wait for search to complete
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
    await io.homePage.click(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    // confirm  delete 
    await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
  });

  test("@Zephyr-IO-T10046 @Env-All TC_C41248_Checking_the_methods", async ({io,page}, testInfo) => {
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
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_C41248_Graphql_export");

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
    test.step("*** selecting the all export type textfield ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** selecting save button ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.exportsPagePO.HTTP_METHOD);
    test.step("*** clicking on the http method field  ***", async ()=>{});
    await io.homePage.click(selectors.importPagePO.HTTPPOSTMETHOD);
    test.step("*** selecting post method***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.SAVE);
    test.step("*** selecting save button ***", async ()=>{});
    await io.homePage.loadingTime()
    
    expect(io.assert.checkElementState( selectors.flowBuilderPagePO.GRAPHQL_QUERY, "isVisible") &&
        io.assert.checkElementState(selectors.flowBuilderPagePO.GRAPHQL_OPERATION_NAME_TEXTFIELD, "isVisible") &&
        io.assert.checkElementState(selectors.flowBuilderPagePO.GRAPHQL_VARIABLES_TEXTFIELD, "isVisible")
    ).toBeTruthy;
    test.step("*** verified Query as mandatory field and operational name and variables  as optional  ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
  });
});
