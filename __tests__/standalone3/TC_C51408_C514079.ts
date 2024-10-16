import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_C51408_C51409", () => {
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** Deleting resources ***", async ()=>{});

    // Delete the flow
    await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
    await io.flowBuilder.click(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
    await io.flowBuilder.click(selectors.flowBuilderPagePO.DELETE_FLOW);
    //confirm  delete 
    await io.flowBuilder.click(selectors.basePagePO.DELETE_BUTTON);
    await io.flowBuilder.loadingTime();

    var imp_id = await io.api.getImportId('TC_C51408_C51409');
    await io.api.deleteCall("v1/imports/" + imp_id);
    await io.homePage.loadingTime();
  });

  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.goToFlowsPage();
  });
  test("@Zephyr-IO-T5637 @Zephyr-IO-T5638 @Env-All TC_C51408_C51409", async ({io,page}, testInfo) => {
    await io.flowBuilder.clickCreateFlowButton();
    test.step("*** Create Flow Selected ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    test.step("*** Clicked on PageProcessor ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.RESTAPIHTTP);
    await test.step("*** Selected Rest(API) as the adaptor ***",()=>{});
    test.step("*** Clicking on type of import ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SELECTED_IMPORT_RECORDS);
    test.step("*** Choosing type of import from dropdown ***", async ()=>{});
    await io.homePage.loadingTime();
    test.step("*** Clicking on create from scratch ***", async ()=>{});
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime()

    await io.homePage.fillWebPage(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, "HTTP ZENDESK CONNECTION");
    test.step("*** Choosing the desired RestAPI connection ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.RENAME, "TC_C51408_C51409");
    test.step("*** Naming the PageProcessors ***", async ()=>{});

    await io.homePage.click(selectors.importPagePO.SELECTHTTPMETHOD);
    test.step("*** Http method clicking  ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.fillWebPage(selectors.importPagePO.HTTPPOSTMETHOD, "POST");

    await io.homePage.fillWebPage(selectors.exportsPagePO.HTTP_RELATIVE_URI, "users");
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Saving Import ***", async ()=>{});
    await io.homePage.loadingTime();

    await io.homePage.click(selectors.basePagePO.ADD_DATA_PROCESSOR);

    await io.homePage.click(selectors.flowBuilderPagePO.INPUT_FILTER);
    await io.homePage.loadingTime();
    var rule = await page.$$(
      selectors.flowBuilderPagePO.SELECT_FIELD
    );
    await rule[0].selectOption("job._id");
    var rule = await page.$$(
      selectors.flowBuilderPagePO.SELECT_FIELD
    );
    await rule[1].click();
    await page.keyboard.type("simple");
    test.step("*** Providing filter rules ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESOURCE);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    test.step("*** Saving and closing the filter rules  ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.INPUT_FILTER);
    await io.homePage.loadingTime();
    var ruleValue = await page.$$(
      selectors.flowBuilderPagePO.SELECT_FIELD
    );
    await ruleValue[1].fill("sample");
    test.step("***Editing the  Input Filter rules ***", async ()=>{});
    await io.homePage.click(selectors.mappings.MAPPER2DOT0PO.PREVIEW);
    test.step("*** Click on preview ***", async ()=>{});
    const preview = await io.homePage.copyResourceData(selectors.mappings.MAPPER2DOT0PO.PREVIEWRESULT);
    await io.assert.expectToContainValue("FALSE: record will be ignored/discarded",String(preview), "");
    test.step("Verifiying the output data", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE);
    await io.homePage.click(selectors.basePagePO.DISCARD_CHANGES);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.flowBuilderPagePO.INPUT_FILTER);
    await io.homePage.loadingTime();
    test.step("*** Clicking on Input Filter ***", async ()=>{});
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.basePagePO.JAVASCRIPTWINDOW);
    test.step("*** Selecting type as Javascript ***", async ()=>{});
    await io.homePage.click(selectors.flowBuilderPagePO.SCRIPTSLIST);
    await io.homePage.clickByText("TC_C51404_C51405_C51406_C51407_filter_DND");

    await io.homePage.loadingTime();
    test.step("*** Selecting script ***", async ()=>{});
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
