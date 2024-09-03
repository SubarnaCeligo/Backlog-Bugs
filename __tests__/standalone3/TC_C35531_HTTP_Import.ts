import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import HTTP from "@testData/STANDALONE/HTTP_connection.json";

test.describe("HTTP_standalone_import", () => {
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});
       
    // Delete the flow
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
    await io.flowBuilder.click(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DELETE_FLOW);
    //confirm  delete 
    await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);
    await io.flowBuilder.loadingTime();
    
    // Delete the import
    await io.homePage.navigateTo(io.data.links.IMPORTS_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR);
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'AutomationStandalone_HTTP_IMPORT');
    // Wait for search to complete
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
    await io.homePage.click(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.DELETE_FLOW);
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    // confirm  delete 
    await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
  });

  test("@Zephyr-IO-T9705 @Env-All TC_C35531_Create new  & update existing records.", async ({ io, page }, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async () => { });
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);

    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async () => { });
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async () => { });
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP  as the adaptor ***", async () => { });
    await io.homePage.loadingTime();

    test.step("*** Clicking on type of import ***", async () => { });

    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    test.step("*** Choosing type of import from dropdown ***", async () => { });

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();

    var conn = HTTP[0]["connectionId"];
    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    test.step("*** Choosing the desired connection ***", async () => { });

    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "AutomationStandalone_HTTP_IMPORT");
    test.step("*** Renaming the PageProcessor ***", async () => { });
    test.step("*** Http method clicking  ***", async () => { });
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_METHOD, "COMPOSITE");
    test.step("*** Selecting the desired Http method  ***", async () => { });
    test.step("*** clicking on the composity type dropdown ***", async () => { });
    await io.homePage.fillWebPage(selectors.exportsPagePO.COMPOSITE_DROPDOWN, "createandupdate");
    test.step("*** clicking on the create  and update existing type ***", async () => { });
    var rest = await io.homePage.getTextFromElement(selectors.importPagePO.IGNORE_EXISTING, "Identify existing records");
    await io.assert.expectToBeTrue(rest, "");
    test.step("*** Verifying whether the Identify existing records ***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.importPagePO.IDENTIFY_RECORDS);
    await io.homePage.loadingTime();

    test.step("*** clicking on the which field text box ***", async () => { });
    await io.homePage.fill(selectors.importPagePO.NAME_WDIO, "id");
    await io.homePage.fillWebPage(selectors.importPagePO.DROP, "lookup");
    await io.homePage.click(selectors.importPagePO.DYNAMICLOOKUP);
    await io.homePage.click(selectors.importPagePO.ADD_LOOKUP);

    test.step("*** clicking on plus to create lookup ***", async () => { });
    await io.homePage.click(selectors.importPagePO.METHOD);
    await io.homePage.click(selectors.exportsPagePO.HTTP_METHOD_GET);
    test.step("*** clicking on get Http method  ***", async () => { });
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.importPagePO.RESOURCE_PATH);
    await io.homePage.fillWebPage(selectors.importPagePO.RESOURCE_PATH, "id");
    test.step("*** entering the resource identifier path  ***", async () => { });
    await io.homePage.click(selectors.importPagePO.NAME_FIELD);
    await io.homePage.fillWebPage(selectors.importPagePO.NAME_FIELD, "name");
    test.step("*** entering the name  ***", async () => { });
    await io.homePage.click(selectors.importPagePO.RELATIVE_URL);
    await io.homePage.fillWebPage(selectors.importPagePO.RELATIVE_URL, "/tickets.json");
    test.step("*** entering relative URL  ***", async () => { });
    test.step("*** verification save button is clickable or not    ***", async () => { });
    let saveButton = await page.$$(selectors.basePagePO.SAVE_AND_CLOSE);
    await saveButton[1].click()
    test.step("*** saving the lookup***", async () => { });
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_COMPOSITE);
    test.step("***create method  clicking  ***", async () => { });
    await io.homePage.loadingTime()
    await io.homePage.fillWebPage(selectors.importPagePO.HTTPPOSTMETHOD, "POST");
    test.step("***Selecting POST method from dropdown ***", async () => { });
    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_COMPOSITE_UPDATE);
    test.step("***update method  clicking  ***", async () => { });
    await io.homePage.fillWebPage(selectors.importPagePO.HTTPPUTMETHOD, "PUT");
    test.step("***Selecting PUT method from dropdown ***", async () => { });
    const kam = await page.locator(selectors.basePagePO.SAVE_AND_CLOSE);
    const kal = await kam.isEnabled()
    await io.assert.expectToBeTrue(kal, "");
    test.step("*** verification save button is clickable or not    ***", async () => { });
    await kam.click();
    await io.homePage.loadingTime();
  });
});
