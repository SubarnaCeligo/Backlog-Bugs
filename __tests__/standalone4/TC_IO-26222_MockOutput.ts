
import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import NS from "@testData/STANDALONE/IO-26223_limit_exportType.json";

test.describe("IO-26222_MockOutput", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    test.step("*** Beginning of Test Suite ***", async ()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });
  test.afterEach(async ({io,page}, testInfo) => {
    test.step("*** End of Test Suite ***", async () => { });
    const openActionsMenu = await page.$$(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU);
    const isActionsClickable = await openActionsMenu[0].isEnabled();
    if (isActionsClickable) {
      await io.homePage.clickButtonByIndex(selectors.flowBuilderPagePO.OPEN_ACTIONS_MENU, 0);
      await io.homePage.click(selectors.flowBuilderPagePO.DELETE_FLOW);
      await io.homePage.loadingTime();
      await io.homePage.click(selectors.basePagePO.DELETE_BUTTON);
      await io.homePage.loadingTime();
    }
    test.step("Flow Deleted Successfully", async () => { });
  });
  test("IO-26222_MockOutput @Env-All @Zephyr-IO-T14433 @Zephyr-IO-T14434 @Zephyr-IO-T14435 @Zephyr-IO-T14471 @Zephyr-IO-T14472 @Zephyr-IO-T14450 @Zephyr-IO-T14446 @Zephyr-IO-T14457 @Zephyr-IO-T14532 @Zephyr-IO-T14533 @Zephyr-IO-T14436 @Zephyr-IO-T14451 @Zephyr-IO-T14453 @Zephyr-IO-T14458 @Zephyr-IO-T14459 @Zephyr-IO-T14439 @Zephyr-IO-T14489 @Zephyr-IO-T14440", async ({io,page}, testInfo) => {
    //C55418 - Verify a new section called Mock output added above “Advanced” in exports & lookups
    await io.flowBuilder.clickCreateFlowButton();
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_SOURCE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.APPLICATION);
    await page.keyboard.type("zendesk");
    await io.homePage.click(selectors.connectionsPagePO.ZENDESK);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    let conn = NS["connectionId"];

    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn);
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS, 0);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "test export");
    await io.homePage.fillWebPage(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE, "65c21ada260e1bf04527e1a7");
    await io.homePage.fillWebPage(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION, "65c21ada260e1bf04527e1a8");
    var exportTypeAssistant = await page.$(
      selectors.exportsPagePO.ASSISTANT_META_DATA_EXPORT_TYPE
    );
    await exportTypeAssistant.focus();
    await io.homePage.click(selectors.exportsPagePO.ASSISTANT_META_DATA_EXPORT_TYPE);
    var limit = await page.$(selectors.flowBuilderPagePO.LIMITTYPE);
    await limit.focus();
    await io.homePage.click(selectors.flowBuilderPagePO.LIMITTYPE);
    var mockoutput = await page.$(selectors.exportsPagePO.MOCK_OUTPUT_ARIA_EXPAND_BUTTON);
    await mockoutput.focus();
    var mockOutputSection = await io.homePage.isVisible(selectors.exportsPagePO.MOCK_OUTPUT_ARIA_EXPAND_BUTTON);
    await io.assert.expectToBeTrue(mockOutputSection, "");
    test.step("*** Validation for C55418 - Verify a new section called Mock output added above “Advanced” in exports & lookups ***", async ()=>{});

    //C55419 - Verify Mock output section is collapsed by default in exports & lookup form
    var mockOutputSectionCollapsed = await io.homePage.isVisible(selectors.flowBuilderPagePO.MOCKOUTPUTSECTIONCOLLAPSED);
    await io.assert.expectToBeTrue(mockOutputSectionCollapsed, "");
    test.step("*** Validation for C55419 - Verify Mock output section is collapsed by default in exports & lookup form ***", async ()=>{});

    //C55420 - Verify editor button in mock output field in export & lookup form
    await io.homePage.click(selectors.exportsPagePO.MOCK_OUTPUT_ARIA_EXPAND_BUTTON);
    var mockOutputEditorBtn = await io.homePage.isVisible(selectors.exportsPagePO.MOCK_OUTPUT_WINDOW);
    await io.assert.expectToBeTrue(mockOutputEditorBtn, "");
    test.step("*** Validation for C55420 - Verify editor button in mock output field in export & lookup form ***", async ()=>{});

    //C55473 - Verify done button in mock output editor - export & lookup
    await io.homePage.click(selectors.exportsPagePO.MOCK_OUTPUT_WINDOW);
    var doneButton = await io.homePage.isVisible(selectors.flowBuilderPagePO.DONEBUTTON);
    await io.assert.expectToBeTrue(doneButton, "");
    test.step("*** Validation for C55473 - Verify done button in mock output editor - export & lookup ***", async ()=>{});

    //C55474 - Verify HTTP request, response and parsed output tabs in mock output editor - export & lookup
    var httpRequest = await io.homePage.isVisible(selectors.exportsPagePO.HTTPREQUEST);
    await io.assert.expectToBeTrue(httpRequest, "");
    var httpResponse = await io.homePage.isVisible(selectors.exportsPagePO.HTTP_RESPONSE);
    await io.assert.expectToBeTrue(httpResponse, "");
    var parsedOutput = await io.homePage.isVisible(selectors.exportsPagePO.PARSED_OUTPUT);
    await io.assert.expectToBeTrue(parsedOutput, "");
    test.step("*** Validation for C55474 - Verify HTTP request, response and parsed output tabs in mock output editor - export & lookup ***", async ()=>{});
    await io.homePage.click(selectors.basePagePO.CLOSE_RIGHT_DRAWER);

    //C55449 - Verify error message when invalid json is entered in mock output field - export & lookup
    await io.homePage.click(selectors.flowBuilderPagePO.MOCKOUTPUTFIELD);
    await io.homePage.fillWebPage(selectors.flowBuilderPagePO.MOCKOUTPUTFIELD, "test");
    var text1 = await io.homePage.getTextFromElement(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR, "Mock output must be valid JSON.");
    await io.assert.expectToBeTrue(text1, "");
    test.step("*** Validation for C55449 - Verify error message when invalid json is entered in mock output field - export & lookup ***", async ()=>{});

    //C55443 - Verify Mock data with more than 10 records or 10 rows for export & lookup
    let data = NS["MockData"];
    await io.homePage.clearTextValue(selectors.flowBuilderPagePO.MOCKOUTPUTFIELD);
    await io.exportsPage.fill("#mockOutput-inline textarea", JSON.stringify(data));
    var text2 = await io.homePage.getTextFromElement(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR, "Mock output cannot be more than 10 records. Reduce the amount of records and try again.");
    await io.assert.expectToBeTrue(text2, "");
    test.step("*** Validation for C55443 - Verify Mock data with more than 10 records or 10 rows for export & lookup ***", async ()=>{});

    //C55458 - Verify error when the entered data is not in the platform’s required canonical form - export & lookup
    let data1 = NS["InvalidMockData"];
    await io.homePage.click(selectors.flowBuilderPagePO.MOCKOUTPUTFIELD);
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Delete');
    await io.homePage.loadingTime();
    await io.homePage.fill("#mockOutput-inline textarea", JSON.stringify(data1));
    var text3 = await io.homePage.getTextFromElement(selectors.basePagePO.ORGIDERRORTEXT1, "Mock output must be in integrator.io canonical format.");
    await io.assert.expectToBeTrue(text3, "");
    test.step("*** Validation for C55458 - Verify error when the entered data is not in the platform’s required canonical form - export & lookup ***", async ()=>{});

    //C57275 - Verify learn more link is present in mock output error message
    var learnMore = await io.homePage.isVisible(selectors.flowBuilderPagePO.GETMOREINFOLINK);
    await io.assert.expectToBeTrue(learnMore, "");
    test.step("*** Validation for C57275 - Verify learn more link is present in mock output error message ***", async ()=>{});

    //C57276 - Verify clicking on learn more link is redirecting to corresponding page
    const link = await page.locator(selectors.flowBuilderPagePO.GETMOREINFOLINK);
    const link1 = await link.getAttribute("href");
    await io.assert.expectToContainValue("https://docs.celigo.com/hc/en-us/articles/4473437451163-integrator-io-canonical-format-for-mock-data", link1, "");
    test.step("*** Validation for C57276 - Verify clicking on learn more link is redirecting to corresponding page ***", async ()=>{});

    //C55421 - Verify The mock data can be edited directly in the export form
    let data2 = NS["ValidMockData"];
    await io.homePage.click(selectors.flowBuilderPagePO.MOCKOUTPUTFIELD);
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Meta+A');
    await page.keyboard.press('Delete');
    await io.homePage.loadingTime();
    await io.homePage.fill("#mockOutput-inline textarea", JSON.stringify(data2));
    test.step("*** Validation for C55421 - Verify The mock data can be edited directly in the export form ***", async ()=>{});

    //C55450 - Verify help text for Mock output field - export & lookup
    await io.homePage.click(selectors.flowBuilderPagePO.EXPORT_MOCKOUTPUT);
    var expectedHelpText =
      "Mock outputMock output simulates exported data when you configure a flow or execute a flow test run. Instead of executing the export to retrieve live sample data (or waiting for webhook listeners to receive data), integrator.io uses the mock output you provide to simulate how source records will appear while you are configuring your flow.Click Populate with preview data to replace any mock output values in this editor with preview data, or enter your own mock output data (max 10 records up to 1 MB in size) in integrator.io canonical format. Running a test without mock data will auto-populate this field with preview data (same as clicking Populate with preview data)";
    var actualHelpText = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await io.assert.expectToContainValue(expectedHelpText, String(actualHelpText), "");
    test.step("*** Validation for C55450 - Verify help text for Mock output field - export & lookup ***", async ()=>{});

    //C55453 - Verify 'integrator.io canonical format' link present in the mock output field help text - export & lookup
    var canonicalFormatLink = await io.homePage.isVisible(selectors.flowBuilderPagePO.GETMOREINFOLINK);
    await io.assert.expectToBeTrue(canonicalFormatLink, "");
    test.step("*** Validation for C55453 - Verify 'integrator.io canonical format' link present in the mock output field help text - export & lookup ***", async () => { });
    await io.homePage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);

    //C55452 - Verify 'preview data' link present in the mock output field help text - export & lookup
    // var previewDataLink = await io.homePage.isVisible(selectors.flowBuilderPagePO.PREVIEWDATALINK);
    // await io.assert.expectToBeTrue(previewDataLink, "");
    // test.step("*** Validation for C55452 - Verify 'preview data' link present in the mock output field help text - export & lookup ***", async ()=>{});

    //C55459 - Verify Populate with preview data button is available in mock output field - export & lookup
    var populateWithPreviewDataBtn = await io.homePage.isVisible(selectors.flowBuilderPagePO.POPULATEWITHPREVIEWDATABTN);
    await io.assert.expectToBeTrue(populateWithPreviewDataBtn, "");
    test.step("*** Validation for C55459 - Verify Populate with preview data button is available in mock output field - export & lookup ***", async ()=>{});

    //C55461 - Verify 'preview data' link present in the Populate with preview data help text - export & lookup
    // var previewDataLink1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.PREVIEWDATALINK);
    // await io.assert.expectToBeTrue(previewDataLink1, "");
    // test.step("*** Validation for C55461 - Verify 'preview data' link present in the Populate with preview data help text - export & lookup ***", async ()=>{});

    //C55460 - Verify help text for Populate with preview data - export & lookup"
    await io.homePage.click("//button[@data-test='populateMockOutput']/../../button");
    var expectedHelpText1 =
      "Click to make a live call to the source application. The result returned by the source app will replace any current mock output data in this field.";
    var actualHelpText1 = await io.homePage.getText(selectors.connectionsPagePO.HELP_BUBBLE);
    await io.assert.expectToContainValue(expectedHelpText1, String(actualHelpText1), "");
    test.step("*** Validation for C55460 - Verify help text for Populate with preview data - export & lookup ***", async ()=>{});

    //C55425 - Verify provided mock data is saved to the Export
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var exportBubble = await io.homePage.isVisible(selectors.flowBuilderPagePO.EXPORT);
    await io.assert.expectToBeTrue(exportBubble, "");
    test.step("*** Validation for C55425 - Verify provided mock data is saved to the Export ***", async ()=>{});

    //C55422,C55426 - Verify The mock data can be edited directly in the lookup form
    await io.homePage.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.click(selectors.flowBuilderPagePO.APPLICATION);
    await page.keyboard.type("zendesk");
    await io.homePage.click(selectors.connectionsPagePO.ZENDESK);
    await io.homePage.click(selectors.mappings.LOOKUP_RECORD);
    await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    let conn1 = NS["connectionId"];

    await io.homePage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.homePage.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, conn1);
    await io.homePage.clickByIndex(selectors.flowBuilderPagePO.PATH_TO_MANY_OPTIONS, 0);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    await io.homePage.fillWebPage(selectors.basePagePO.ADD_NAME, "test export");
    await io.homePage.fillWebPage(selectors.exportsPagePO.ASSISTANT_META_DATA_RESOURCE, "65c21ada260e1bf04527e1a7");
    await io.homePage.fillWebPage(selectors.exportsPagePO.ASSISTANT_META_DATA_OPERATION, "65c21ada260e1bf04527e1a8");
    await io.homePage.click(selectors.exportsPagePO.MOCK_OUTPUT_ARIA_EXPAND_BUTTON);
    let data3 = NS["ValidMockData"];
    await io.homePage.fill("#mockOutput-inline textarea", JSON.stringify(data3));
    await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.homePage.loadingTime();
    await io.homePage.isPageReady();
    var exportBubble1 = await io.homePage.isVisible(selectors.flowBuilderPagePO.EXPORT);
    await io.assert.expectToBeTrue(exportBubble1, "");
    await io.homePage.loadingTime();
    test.step("*** Validation for C55422,C55426 - Verify The mock data can be edited directly in the lookup form ***", async ()=>{});
  });
});
