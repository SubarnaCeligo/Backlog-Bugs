import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C51404_C51405_C51406_C51407", () => {
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    // Delete the flow
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
    await io.flowBuilder.click(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DELETE_FLOW);
    //confirm  delete 
    await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);
    await io.flowBuilder.loadingTime();

    var exp_id = await io.api.getExportId('TC_C51404_C51405_C51406_C51407');
    await io.api.deleteCall("v1/exports/" + exp_id);
    await io.homePage.loadingTime();
  });

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
    await io.homePage.loadingTime()
  });
  test("@Zephyr-IO-T5633 @Zephyr-IO-T5634 @Zephyr-IO-T5635 @Zephyr-IO-T5636 @Env-All TC_C51404_C51405_C51406_C51407", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    test.step("*** Clicked on PageGenerator ***", async ()=>{});

    await io.homePage.click(selectors.flowBuilderPagePO.HTTP_FORM_SWITCH);
    test.step("*** Selected HTTP as the adaptor ***", async ()=>{});
    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime()

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "HTTP ZENDESK CONNECTION");
    await io.homePage.loadingTime()
    test.step("*** Choosing the Zendesk HTTP connection ***", async ()=>{});

    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_C51404_C51405_C51406_C51407");
    test.step("*** Naming the PageGenerator ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_METHOD, "GET");
    test.step("*** Selecting the method from the DROPDOWN ***", async ()=>{});
    test.step("*** Providing Relative URL :users ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_RELATIVE_URI, "/users");
    await io.homePage.fillWebPage(selectors.exportsPagePO.EXPORT_TYPE_DROPDOWN, "all");
    test.step("*** Selecting Export type method from  DROPDOWN ***", async ()=>{});
    await io.homePage.click(selectors.exportsPagePO.NON_STANDARD_API_TAB);
    test.step("*** Entering the value for Path Record for HTTP response body ***", async ()=>{});
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.PATH_TO_RESOURCE_PATH, "users");

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Saving and closing the export***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.ADD_DATA_PROCESSOR);
    test.step("*** Clicking on More Actions***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION);
    test.step("*** Clicking on Transformations rules ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.myAccountPage.click(selectors.flowBuilderPagePO.FIELD_MAPPING_SOURCE);
    await page.keyboard.type("$.email");
    await io.myAccountPage.click(selectors.flowBuilderPagePO.FIELD_MAPPING_GENERATE);
    await page.keyboard.type("gmail");

    // to blur out the screen and enable save buttons
    await io.homePage.click(selectors.basePagePO.EXPAND_ALL);

    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Saving and closing the Transformations ***", async ()=>{});
    await io.homePage.loadingTime();

    // C51404
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION);
    await io.homePage.loadingTime();
    await io.myAccountPage.click(selectors.flowBuilderPagePO.FIELD_MAPPING_GENERATE);
    await page.keyboard.type("-yahoomail");

    test.step("*** Editing  rules Transformations ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    test.step("*** Click on preview ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    await io.homePage.loadingTime();
    var AFE1Data31 = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    await io.assert.expectToContainValue("gmail-yahoomail",String(AFE1Data31), "");
    test.step("***Validating the output data ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    test.step("*** Discarding the changes ***", async ()=>{});
    await io.homePage.loadingTime();

    // C51405
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_TRANSFORMATION);
    test.step("*** Clicking on Transformations rules ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.JAVASCRIPTWINDOW);
    test.step("*** Selecting type as Javascript ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.SCRIPTSLIST);
    await io.homePage.clickByText("TC_C51404_C51405_C51406_C51407_transform_DND");

    test.step("*** Selecting script ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    test.step("*** Click on preview ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    test.step("*** Click on preview ***", async ()=>{});
    await io.homePage.loadingTime();
    var AFE1Data32 = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    await io.assert.expectToContainValue("email",String(AFE1Data32), "");
    test.step("***Validating the output data ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    
    // C51406
    await io.homePage.click(selectors.basePagePO.ADD_DATA_PROCESSOR);
    test.step("*** Clicking on More Actions***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_FILTER);
    test.step("*** Clicking on Output Filter ***", async ()=>{});
    await io.homePage.loadingTime();
    var ruleValue = await page.$$(
      selectors.flowBuilderPagePO.SELECT_FIELD
    );
    await ruleValue[1].fill("true");
    test.step("***Editing the  Output Filter rules ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    test.step("*** Click on preview ***", async ()=>{});
    const previewTrue = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    await io.assert.expectToBeValue(String(previewTrue), "TRUE: record will be processed", "");
    test.step("Verifiying the output data", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();

    // C51407
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_FILTER);
    await io.homePage.loadingTime();
    test.step("*** Clicking on Output Filter ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.JAVASCRIPTWINDOW);
    await io.homePage.loadingTime();
    test.step("*** Selecting type as Javascript ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SCRIPTSLIST);
    await io.homePage.clickByText("TC_C51404_C51405_C51406_C51407_filter_DND");

    test.step("*** Selecting script ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    await io.homePage.loadingTime();
    test.step("*** Click on preview ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    test.step("*** Click on preview ***", async ()=>{});
    await io.homePage.loadingTime();
    var AFE1Data3 = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    await io.assert.expectToContainValue("true",String(AFE1Data3), "");
    test.step("***Validating the output data ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
  });
});
