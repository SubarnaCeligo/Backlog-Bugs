import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C52403_C52401_Verify_Able_Add_Mapping_Sub_Record_Mapping_Window_default_locked_mapping", () => {
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
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'TC_C52403_C52401');
    // Wait for search to complete
    await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
    await io.homePage.click(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.DELETE_FLOW);
    await io.homePage.click(selectors.integrationPagePO.DELETE_FLOW);
    // confirm  delete 
    await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
    await io.homePage.loadingTime();
  });

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
  });

  test("@Zephyr-IO-T22749 @Zephyr-IO-T22747 @Env-All TC_C52403_C52401_Verify_Able_Add_Mapping_Sub_Record_Mapping_Window_default_locked_mapping", async ({io,page}, testInfo) => {
    await io.homePage.loadingTime();
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    test.step("*** Clicked on Create Flow ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on Import ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.NETSUITE);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});
    test.step("*** Clicking on what would you like to do ", async ()=>{});
    test.step("*** Clicking on Look up additional records ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);

    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime()

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "NETSUITE CONNECTION");
    test.step("***Choosing the desired HTTP connection ***", async ()=>{});
    await io.homePage.loadingTime();

    test.step("*** Entering Name ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_C52403_C52401");

    test.step("*** Selecting record type ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RECORD_TYPE, "itemreceipt");

    await io.homePage.click(selectors.mappings.SUBRECORD_BUTTON);
    test.step("*** Selecting subrecord button ***", async ()=>{});
    await io.homePage.click(selectors.mappings.SUBRECORD_DROPDOWN);
    test.step("*** Selecting subrecord dropdown ***", async ()=>{});
    
    await io.homePage.click(selectors.importPagePO.SELECTED_SUB_RECORDS);
    await io.homePage.click(selectors.mappings.SUBRECORD_PATH_TO_NODE);
    test.step("*** clicking dropdown ***", async ()=>{});
    await io.homePage.click(selectors.mappings.SUBRECORD_DOLLAR_SYMBOL);
    test.step("*** clicking and selecting dollar symbol***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.MFA_SAVE);
    test.step("*** clicking save button ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.flowBuilderPagePO.ADD_RADIO_BUTTON);
    test.step("*** clicking on add radio button***", async ()=>{});

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    test.step("*** clicking and selecting save close***", async ()=>{});

    test.step("*** clicking on mapping button***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.IMPORT_MAPPINGS);
    await io.homePage.loadingTime();
    test.step("*** clicking on newsubrecordmapping button***", async ()=>{});
    await io.homePage.click(selectors.mappings.NEWSUBRECORDMAPPING);
    await io.homePage.loadingTime();

    test.step("*** clicking on subrecord ***", async ()=>{});
    await io.homePage.click(selectors.mappings.DEFAULT_MAPPING_TYPE.FIELD_MAPPING_GENERATE);
    await page.keyboard.type("Custom Form (InternalId)");
    test.step("*** Entered destination textfield ***", async ()=>{});
    await io.homePage.loadingTime();

    await page.locator(selectors.mappings.MAPPER1DOT0PO.SOURCE_RECORD_FIELD_FIRST).dblclick();
    await page.keyboard.type("test")
    test.step("*** Entered source textfield ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** clicking on the save and close button ***", async ()=>{});

    await io.homePage.loadingTime();
    
    test.step("*** Validating able to add the required mappings sub-record and able to save ***", async ()=>{});
    var ele = await io.homePage.isVisible(selectors.mappings.NEWSUBRECORDMAPPING);
    await io.assert.expectToBeTrue(ele, "");

    await io.homePage.loadingTime();
    
    test.step("*** Clicked On Import Mapping ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SUBRECORD_MAPPING);
    await io.homePage.loadingTime();
    await io.assert.verifyElementDisplayedByText("Subrecord Mapping", "Subrecord mapping not visible");

    test.step("*** Validating able to see a default locked mapping ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);
  });
});
