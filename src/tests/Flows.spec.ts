import { test, expect } from "@lib/BaseTest";

test.describe("Flows Page Test Cases", () => {


  test("C55447 Verify the error message when data size is more than 1 MB for export & lookup", async ({
    myAccountPage,
    connectionsPage,
    homePage,
    settingsPage,
    webActions,
    commonPagePO,
    settingsPagePO,
    assert
  }) => {
    await myAccountPage.navigateToMyAccount();
    await homePage.goToPage('Resources->Exports');
    await webActions.click(commonPagePO.ADD_NEW_RESOURCE);
    await connectionsPage.selectApplication('FTP');
    await webActions.click('[data-test="connection"]');
    await settingsPage.selectTextFromDropDown('63762281c13e8e0bbb0cc514');
    await webActions.delay(3000);
    await webActions.fill(commonPagePO.NAME, "test C55447");
    await webActions.click(commonPagePO.SAVE);
    //await webActions.click(settingsPagePO.MOCK_OUTPUT);
    await webActions.click('[data-test="mockOutput"]');
    await homePage.pasteFileContent('test-data/sample.json', '[id="mockOutput"] textarea', 1);
    var error = await webActions.getText('[class^="MuiFormHelperText-root jss"]');
    await expect(error).toBe('Mock output cannot be larger than 1 MB. Decrease your mock data size and try again.');
  });

  test.skip("C51543 Verify the allignmnet after adding multiple query parameters", async ({
    myAccountPage,
    connectionsPage,
    homePage,
    settingsPage,
    flowBuilderPage,
    webActions,
    commonPagePO,
    exportsPagePO,
    assert
  }) => {
    await myAccountPage.navigateToMyAccount();
    await homePage.goToPage("Resources->Exports");
    await webActions.click(commonPagePO.ADD_NEW_RESOURCE);
    await connectionsPage.selectApplication("ReCharge");
    await webActions.click(commonPagePO.CONNECTION);
    await settingsPage.selectTextFromDropDown("6371daf4bfae042ac744b7da");
    await webActions.delay(3000);
    await webActions.fill(commonPagePO.NAME, "test C51543");
    await webActions.click(commonPagePO.SAVE);
    await webActions.click(exportsPagePO.RECHARGE_RESOURCE);
    await settingsPage.selectTextFromDropDown("6345f57469f848d92751c040");
    await webActions.click(exportsPagePO.RECHARGE_API_ENDPOINT);
    await settingsPage.selectTextFromDropDown("6345f57469f848d92751c041");
    var map: Map<any, any> = new Map();
    map.set("email", "a");
    map.set("status", "a");
    map.set("shopify_customer_id", "a");
    map.set("created_at_min", "a");
    map.set("created_at_max", "a");
    map.set("hash", "a");
    map.set("updated_at_min", "a");
    map.set("updated_at_max", "a");
    await flowBuilderPage.fillQueryParameters(map);
    await settingsPage.screenshot(
      '[id="assistantMetadata.queryParams"]',
      "QueryParams"
    );
    await webActions.click(commonPagePO.CLOSE);
    await webActions.click(commonPagePO.DISCARD_CHANGES);
  });

  test.skip("C51867 verify when user adds a new mapping row then the cursor focus should be in destination field of new row in case of multiple source tabs", async ({
    myAccountPage,
    commonPagePO,
    homePage,
    settingsPage,
    flowBuilderPagePO,
    webActions,
    assert
  }) => {
    await myAccountPage.navigateToMyAccount();
    await homePage.goToPage("Tools->Flow builder");
    await webActions.click(flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await settingsPage.selectApplication("FTP");
    await settingsPage.selectTextFromDropDown("transferFiles");
    await webActions.click(commonPagePO.CONNECTION);
    await settingsPage.selectTextFromDropDown("63762281c13e8e0bbb0cc514");
    await webActions.click(flowBuilderPagePO.USE_EXISTING_EXPORT);
    await settingsPage.selectTextFromDropDown("6384c3779a6b3d1fac8df815");
    await webActions.click(commonPagePO.SAVE);
    await webActions.click(flowBuilderPagePO.DATA_PROCESSOR);
    await webActions.click(flowBuilderPagePO.DATA_PROCESSOR);
    await webActions.delay(1000);
    await webActions.click(flowBuilderPagePO.IMPORT_MAPPINGS);
    await webActions.click(flowBuilderPagePO.MAPPER_2);
    await webActions.click(flowBuilderPagePO.FIELD_MAPPING_ADD);
    await webActions.page.keyboard.type("Cursor here");
    await settingsPage.screenshot(
      '[class="rc-tree-list-holder-inner"]',
      "Mapping"
    );
    await webActions.click(commonPagePO.CLOSE);
    await webActions.click(commonPagePO.DISCARD_CHANGES);
    await webActions.click(flowBuilderPagePO.OPEN_ACTIONS_MENU);
    await webActions.click(flowBuilderPagePO.DELETE_FLOW);
    await webActions.click(commonPagePO.DELETE);
  });
});
