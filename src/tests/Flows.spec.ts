import { test, expect } from "@lib/BaseTest";

test.describe("Flows Page Test Cases", () => {
  test.skip("C55447 Verify the error message when data size is more than 1 MB for export & lookup", async ({
    exportsPagePO,
    connectionsPage,
    settingsPage,
    webActions,
    commonPagePO,
    flowBuilderPage,
  }) => {
    await webActions.navigateTo(flowBuilderPage.EXPORTS_PAGE_URL);
    await webActions.click(commonPagePO.ADD_NEW_RESOURCE);
    await connectionsPage.selectApplication("FTP");
    await flowBuilderPage.selectConnection("FTP CONNECTION");
    await webActions.fill(commonPagePO.NAME, "Test C55447");
    await webActions.click(commonPagePO.SAVE);
    await webActions.click(exportsPagePO.MOCK_OUTPUT_WINDOW);
    await settingsPage.pasteFileContent(
      "testData/C55447.json",
      exportsPagePO.MOCK_OUTPUT_TEXTAREA,
    );
    var error = await webActions.getText(exportsPagePO.MOCK_OUTPUT_DATA_SIZE_ERROR);
    await expect(error).toBe(
      "Mock output cannot be larger than 1 MB. Decrease your mock data size and try again."
    );
  });

  test("C51543 Verify the allignmnet after adding multiple query parameters", async ({
    connectionsPage,
    settingsPage,
    flowBuilderPage,
    webActions,
    commonPagePO,
    exportsPagePO,
    assert
  }) => {
    await webActions.navigateTo(flowBuilderPage.EXPORTS_PAGE_URL);
    await webActions.click(commonPagePO.ADD_NEW_RESOURCE);
    await connectionsPage.selectApplication("Stripe");
    await flowBuilderPage.selectConnection("STRIPE CONNECTION");
    await webActions.fill(commonPagePO.NAME, "test C51543");
    await webActions.click(commonPagePO.SAVE);
    await webActions.click(exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await settingsPage.selectTextFromDropDown("Balance");
    await webActions.click(exportsPagePO.ASSISTANT_META_DATA_OPERATION);
    await settingsPage.selectTextFromDropDown("List all balance history");
    var map: Map<any, any> = new Map();
    map.set("expand[]", "a");
    map.set("limit", "a");
    map.set("available_on", "a");
    map.set("created", "a");
    map.set("currency", "a");
    map.set("ending_before", "a");
    map.set("starting_after", "a");
    map.set("payout", "a");
    map.set("source", "a");
    map.set("type", "a");
    await flowBuilderPage.fillQueryParameters(map);
    await webActions.click(exportsPagePO.CONFIGURE_EXPORT_TYPE);
    await assert.checkSnapshot(
      exportsPagePO.QUERY_PARAMETERS_AREA,
      "C51543.png"
    );
    await webActions.click(commonPagePO.CLOSE);
    await webActions.click(commonPagePO.DISCARD_CHANGES);
  });

  test("C51867 verify when user adds a new mapping row then the cursor focus should be in destination field of new row in case of multiple source tabs", async ({
    commonPagePO,
    settingsPage,
    flowBuilderPagePO,
    flowBuilderPage,
    exportsPagePO,
    webActions,
    assert
  }) => {
    await webActions.navigateTo(flowBuilderPage.FLOW_BUILDER_PAGE_URL);
    await webActions.click(flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await settingsPage.selectApplication("FTP");
    await settingsPage.selectTextFromDropDown("transferFiles");
    await flowBuilderPage.selectConnection("FTP CONNECTION");
    await webActions.click(commonPagePO.SAVE);
    await webActions.fill(commonPagePO.NAME, "C51867");
    await webActions.click(exportsPagePO.FILE_TYPE);
    await settingsPage.selectTextFromDropDown("csv");
    await webActions.fill(exportsPagePO.FTP_DIRECTORY_PATH, "C51867");
    await webActions.click(commonPagePO.SAVE_AND_CLOSE);
    await webActions.page.waitForLoadState();
    await webActions.page.waitForSelector(flowBuilderPagePO.DATA_PROCESSOR);
    await webActions.page.waitForTimeout(2000);
    await webActions.click(flowBuilderPagePO.DATA_PROCESSOR);
    await webActions.click(flowBuilderPagePO.IMPORT_MAPPINGS);
    await webActions.click(flowBuilderPagePO.MAPPER_2);
    await webActions.click(flowBuilderPagePO.FTP_FIELD_MAPPING_ADD);
    await webActions.page.keyboard.type("Cursor here");
    await assert.checkSnapshot(
      flowBuilderPagePO.MAPPINGS_AREA,
      "C51867.png"
    );
    await webActions.click(commonPagePO.CLOSE);
    await webActions.click(commonPagePO.DISCARD_CHANGES);
    await flowBuilderPage.deleteFlow();
  });

  test("C51126 Verify the preview route it should not consider the 'draft' status mapping fields", async ({
    myAccountPage,
    connectionsPage,
    settingsPage,
    flowBuilderPage,
    flowBuilderPagePO,
    exportsPagePO,
    commonPagePO,
    webActions
  }) => {
    await myAccountPage.navigateToMyAccount();
    await webActions.navigateTo(flowBuilderPage.FLOW_BUILDER_PAGE_URL);
    await webActions.click(flowBuilderPagePO.ADD_SOURCE);
    await connectionsPage.selectApplication("BigCommerce");
    await flowBuilderPage.selectConnection(
      "BIGCOMMERCE CONNECTION"
    );
    await webActions.click(commonPagePO.SAVE);
    await webActions.fill(commonPagePO.NAME, "C51126");
    await webActions.click(exportsPagePO.ASSISTANT_META_DATA_VERSION);
    await settingsPage.selectTextFromDropDown("v2");
    await webActions.click(exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await settingsPage.selectTextFromDropDown("customers");
    await webActions.click(exportsPagePO.ASSISTANT_META_DATA_OPERATION);
    await settingsPage.selectTextFromDropDown("list_customers");
    await webActions.click(commonPagePO.SAVE_AND_CLOSE);
    await webActions.page.waitForLoadState();
    await webActions.click(flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await connectionsPage.selectApplication("HTTP");
    await settingsPage.selectTextFromDropDown("importRecords");
    await flowBuilderPage.selectConnection("3PL CONNECTION");
    await webActions.click(commonPagePO.SAVE);
    await webActions.page.waitForTimeout(2000);
    var http = await webActions.page.$$(flowBuilderPagePO.HTTP_FORM_SWITCH);
    console.log("HTTP LENGTH >>>> ", http.length);
    if (http.length > 0){ await http[0].click(); }
    await webActions.fill(commonPagePO.NAME, "C51126");
    await webActions.click(exportsPagePO.HTTP_METHOD);
    await settingsPage.selectTextFromDropDown("POST");
    await webActions.fill(exportsPagePO.HTTP_RELATIVE_URI, "v2");
    await webActions.click(commonPagePO.SAVE);
    await webActions.click(commonPagePO.CLOSE);
    await webActions.page.waitForLoadState();
    await webActions.page.waitForSelector(flowBuilderPagePO.DATA_PROCESSOR);
    await webActions.page.waitForTimeout(2000);
    await webActions.click(flowBuilderPagePO.DATA_PROCESSOR);
    await webActions.click(flowBuilderPagePO.IMPORT_MAPPINGS);
    await webActions.click(flowBuilderPagePO.MAPPER_2);
    var map: Map<any, any> = new Map();
    map.set("id", "id");
    map.set("test", "");
    await flowBuilderPage.updateImportMappings(map);
    await webActions.click(flowBuilderPagePO.PREVIEW);
    await webActions.page.waitForTimeout(5000);
    var text = await webActions.getText(
      flowBuilderPagePO.MAPPINGS_PREVIEW_RESULT_AREA
    );
    await expect(text).toBe('{  "id": "id"}');
    await webActions.click(commonPagePO.CLOSE);
    await webActions.click(commonPagePO.DISCARD_CHANGES);
    await flowBuilderPage.deleteFlow();
  });

  test("C51623 Verify the Scroll bar for Message column in the Error rows page of New view by navigating from the Current View", async ({
    commonPagePO,
    settingsPage,
    exportsPagePO,
    flowBuilderPage,
    connectionsPage,
    flowBuilderPagePO,
    webActions,
    assert
  }) => {
    await webActions.navigateTo(flowBuilderPage.FLOW_BUILDER_PAGE_URL);
    await webActions.click(flowBuilderPagePO.ADD_SOURCE);
    await connectionsPage.selectApplication("BigCommerce");
    await flowBuilderPage.selectConnection(
      "BIGCOMMERCE CONNECTION"
    );
    await webActions.click(commonPagePO.SAVE);
    await webActions.fill(commonPagePO.NAME, "C51623 Export");
    await webActions.click(exportsPagePO.ASSISTANT_META_DATA_VERSION);
    await settingsPage.selectTextFromDropDown("v2");
    await webActions.click(exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await settingsPage.selectTextFromDropDown("customers");
    await webActions.click(exportsPagePO.ASSISTANT_META_DATA_OPERATION);
    await settingsPage.selectTextFromDropDown("list_customers");
    await webActions.click(exportsPagePO.ASSISTANT_META_DATA_EXPORT_TYPE);
    await settingsPage.selectTextFromDropDown("test");
    await webActions.click(commonPagePO.SAVE_AND_CLOSE);
    await webActions.page.waitForLoadState();
    await webActions.click(flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await connectionsPage.selectApplication("BigCommerce");
    await settingsPage.selectTextFromDropDown("lookupRecords");
    await flowBuilderPage.selectConnection(
      "BIGCOMMERCE CONNECTION"
    );
    await webActions.click(commonPagePO.SAVE);
    await webActions.fill(commonPagePO.NAME, "C51623 Import");
    await webActions.click(exportsPagePO.ASSISTANT_META_DATA_VERSION);
    await settingsPage.selectTextFromDropDown("v2");
    await webActions.click(exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await settingsPage.selectTextFromDropDown("customers");
    await webActions.click(exportsPagePO.ASSISTANT_META_DATA_OPERATION);
    await settingsPage.selectTextFromDropDown("get_a_customer_group");
    await webActions.fill(exportsPagePO.ASSISTANT_META_DATA_PATH_PARAMS_ID, "C51623");
    await webActions.click(commonPagePO.SAVE_AND_CLOSE);
    await webActions.page.waitForLoadState();
    await webActions.page.waitForTimeout(3000);
    await flowBuilderPage.runFlow();
    await flowBuilderPage.navigateToJobErrorDashboard("C51623 Import");
    await webActions.click(flowBuilderPagePO.TOGGLE_VIEW);
    await webActions.click(flowBuilderPagePO.LIST_VIEW_ERRORS);
    await webActions.page.waitForLoadState();
    await assert.checkSnapshot(
      flowBuilderPagePO.LIST_VIEW_ERRORS_MESSAGE,
      "C51623.png"
    );
    await webActions.click(commonPagePO.CLOSE_RIGHT_DRAWER);
    await flowBuilderPage.deleteFlow();
  });
  
  test("C45346 Verify the text displayed in the Source field Drop down", async ({
    connectionsPage,
    flowBuilderPage,
    settingsPage,
    flowBuilderPagePO,
    exportsPagePO,
    commonPagePO,
    webActions,
    assert
  }) => {
    await webActions.navigateTo(flowBuilderPage.FLOW_BUILDER_PAGE_URL);
    await webActions.click(flowBuilderPagePO.ADD_SOURCE);
    await connectionsPage.selectApplication("BigCommerce");
    await flowBuilderPage.selectConnection(
      "BIGCOMMERCE CONNECTION"
    );
    await webActions.click(commonPagePO.SAVE);
    await webActions.fill(commonPagePO.NAME, "C45346");
    await webActions.click(exportsPagePO.ASSISTANT_META_DATA_VERSION);
    await settingsPage.selectTextFromDropDown("v2");
    await webActions.click(exportsPagePO.ASSISTANT_META_DATA_RESOURCE);
    await settingsPage.selectTextFromDropDown("customers");
    await webActions.click(exportsPagePO.ASSISTANT_META_DATA_OPERATION);
    await settingsPage.selectTextFromDropDown("list_customers");
    await webActions.click(commonPagePO.SAVE_AND_CLOSE);
    await webActions.page.waitForLoadState();
    await webActions.click(flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await connectionsPage.selectApplication("HTTP");
    await settingsPage.selectTextFromDropDown("importRecords");
    await flowBuilderPage.selectConnection("HTTP BIGCOMMERCE CONNECTION");
    await webActions.click(commonPagePO.SAVE);
    await webActions.fill(commonPagePO.NAME, "C45346");
    await webActions.click(exportsPagePO.HTTP_METHOD);
    await settingsPage.selectTextFromDropDown("POST");
    await webActions.fill(exportsPagePO.HTTP_RELATIVE_URI, "v2");
    await webActions.click(commonPagePO.SAVE);
    await webActions.click(commonPagePO.CLOSE);
    await webActions.page.waitForLoadState();
    await webActions.page.waitForSelector(flowBuilderPagePO.DATA_PROCESSOR);
    await webActions.page.waitForTimeout(2000);
    await webActions.click(flowBuilderPagePO.DATA_PROCESSOR);
    await webActions.click(flowBuilderPagePO.IMPORT_MAPPINGS);
    await webActions.click(flowBuilderPagePO.MAPPER_2);
    await webActions.click(flowBuilderPagePO.MAPPER2_SOURCE_FIELD_TEXT);
    await assert.checkSnapshot(
      flowBuilderPagePO.MAPPER2_TYPE_OR_SELECT_SOURCE_FIELD_TEXT,
      "C45346.png"
    );
    await webActions.click(commonPagePO.CLOSE);
    await flowBuilderPage.deleteFlow();
  });
});
