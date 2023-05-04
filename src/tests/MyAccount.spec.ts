import { test, expect } from "@lib/BaseTest";

test.describe("My Account Test Case", () => {
   

  test("C752 Verify Change password with invalid current pass and valid new pass - should show error messsage @smoke @sanity", async ({
    myAccountPage,
    webActions,
    myAccountPO
  }) => {
    await myAccountPage.navigateToMyAccount();
    await webActions.click(myAccountPO.EDIT_PASSWORD);
    await webActions.isVisible(myAccountPO.DIALOG_BOX);
    await webActions.fill(myAccountPO.CURRENT_PASSWORD, "Test125362");
    await webActions.fill(myAccountPO.NEW_PASSWORD, "Test21234");
    await webActions.click(myAccountPO.CHANGE_PASSWORD);
    let msg = await webActions.getText(myAccountPO.SNACK_BAR_MESSAGE);
    await expect(msg).toContain(
      "Current password failed to authenticate.  Please try again."
    );
  });

  test("C28995 Verify Help texts are scrollable in My account > Users", async ({
    myAccountPage,
    webActions,
    assert,
    myAccountPO
  }) => {
    await myAccountPage.navigateToMyAccount();
    await webActions.click(myAccountPO.USERS);
    await webActions.click(myAccountPO.HELP_TEXT);
    await webActions.delay(3000);
    await assert.checkSnapshot(myAccountPO.HELP_TEXT_DIALOG_BOX, "HelpText.png");
  });

  test("C57810 Verify whether the page is showing the proper readable error , when the connection goes to offline", async ({
    myAccountPage,
    connectionsPage,
    homePage,
    webActions,
    homePagePO,
    concPagePO,
    myAccountPO
  }) => {
    await myAccountPage.navigateToMyAccount();
    await homePage.goToPage('Resources->Connections');
    await webActions.click(homePagePO.CONNECTIONS);
    await webActions.click(concPagePO.CREATE_CONNECTION);
    await webActions.delay(3000);
    await connectionsPage.selectApplication("Magento 2");
    await webActions.fill(concPagePO.NAME, 'Test C57810');
    await webActions.fill(concPagePO.MAGENTO2_BASE_URI, "http://3.81.80.44/enterprise242/pub/rest");
    await webActions.fill(concPagePO.MAGENTO2_USERNAME, 'new_userdemo0123');
    await webActions.fill(concPagePO.MAGENTO2_PASSWORD, 'uHLtwnRm948%');
    await webActions.click(concPagePO.MAGENTO2_GENERATE_TOKEN);
    await webActions.fill(concPagePO.MAGENTO2_BASE_URI, "http://3.8.80.44/enterprise242/pub/rest");
    await webActions.delay(2000);
    await webActions.click(concPagePO.TEST_CONNECTION);
    await webActions.delay(5000);
    var actual = await webActions.getText(myAccountPO.SNACK_BAR_MESSAGE);
    await expect(actual).toBe("Your test was not successful. Check your information and try again");
  });

  // test("C55447 Verify the error message when data size is more than 1 MB for export & lookup", async ({
  //   myAccountPage,
  //   connectionsPage,
  //   homePage,
  //   settingsPage,
  //   webActions,
  //   assert
  // }) => {
  //   await myAccountPage.navigateToMyAccount();
  //   await homePage.goToPage('Resources->Exports');
  //   await webActions.click(commonPagePO.ADD_NEW_RESOURCE);
  //   await connectionsPage.selectApplication('FTP');
  //   await webActions.click('[data-test="connection"]');
  //   await settingsPage.selectTextFromDropDown('63762281c13e8e0bbb0cc514');
  //   await webActions.delay(3000);
  //   await webActions.fill(commonPagePO.NAME, "test C55447");
  //   await webActions.click(commonPagePO.SAVE);
  //   await webActions.click(settingsPagePO.MOCK_OUTPUT);
  //   await webActions.click('[data-test="mockOutput"]');
  //   await homePage.pasteFileContent('test-data/sample.json', '[id="mockOutput"] textarea', 1);
  //   var error = await webActions.getText('[class^="MuiFormHelperText-root jss"]');
  //   await expect(error).toBe('Mock output cannot be larger than 1 MB. Decrease your mock data size and try again.');
  // });

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
    await homePage.goToPage('Resources->Exports');
    await webActions.click(commonPagePO.ADD_NEW_RESOURCE);
    await connectionsPage.selectApplication('ReCharge');
    await webActions.click(commonPagePO.CONNECTION);
    await settingsPage.selectTextFromDropDown('6371daf4bfae042ac744b7da');
    await webActions.delay(3000);
    await webActions.fill(commonPagePO.NAME, "test C51543");
    await webActions.click(commonPagePO.SAVE);
    await webActions.click(exportsPagePO.RECHARGE_RESOURCE);
    await settingsPage.selectTextFromDropDown('6345f57469f848d92751c040');
    await webActions.click(exportsPagePO.RECHARGE_API_ENDPOINT);
    await settingsPage.selectTextFromDropDown('6345f57469f848d92751c041');
    var map: Map <any, any> = new Map();
    map.set("email", "a");
    map.set("status", "a");
    map.set("shopify_customer_id", "a");
    map.set("created_at_min", "a");
    map.set("created_at_max", "a");
    map.set("hash", "a");
    map.set("updated_at_min", "a");
    map.set("updated_at_max", "a");
    await flowBuilderPage.fillQueryParameters(map);
    await settingsPage.screenshot('[id="assistantMetadata.queryParams"]', 'QueryParams');
    await webActions.click(commonPagePO.CLOSE);
    await webActions.click(commonPagePO.DISCARD_CHANGES);
  });

  test("C51623 Verify the Scroll bar for Message column in the Error rows page of New view by navigating from the Current View", async ({
    myAccountPage,
    homePagePO,
    homePage,
    settingsPage,
    flowBuilderPagePO,
    webActions,
    assert
  }) => {
    await myAccountPage.navigateToMyAccount();
    await homePage.goToPage('Home');
    var tileStatus = await webActions.page.$$(homePagePO.TILE_STATUS);
    var tileName = await webActions.page.$$(homePagePO.TILE_NAME);
    for (var i = 0; i < tileStatus.length; i++) {
      var status = await tileStatus[i].textContent();
      console.log('status >>> ', status);
      if (status.includes('error')) {
        await tileName[i].click();
        await webActions.delay(5000);
        break;
      }
    }
    var errors = await webActions.page.$$('tbody > tr > td:nth-child(2) > div > a');
    for (var i = 0; i < errors.length; i++) {
      var noOfErrors = await errors[i].textContent();
      console.log('noOfErrors >>> ', noOfErrors);
      if (noOfErrors.includes('error')) {
        await errors[i].click();
        await webActions.page.waitForLoadState();
        await webActions.delay(2000);
        break;
      }
    }
    errors = await webActions.page.$$('[class$=" MuiButton-textPrimary MuiButton-disableElevation"]');
    for (var i = 0; i < errors.length; i++) {
      noOfErrors = await errors[i].textContent();
      console.log('noOfErrors >>> ', noOfErrors);
      if ((await noOfErrors).includes('error')) {
        await errors[i].click();
        await webActions.page.waitForLoadState();
        await webActions.delay(2000);
        break;
      }
    }
    await webActions.click(flowBuilderPagePO.TOGGLE_VIEW);
    await webActions.click('[data-value="list"]');
    await webActions.page.waitForLoadState();
    await settingsPage.screenshot('div.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 > div > div > div > div > div > table > tbody > tr', "Message Column")
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
    await homePage.goToPage('Tools->Flow builder');
    await webActions.click(flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
    await settingsPage.selectApplication("FTP");
    await settingsPage.selectTextFromDropDown('transferFiles');
    await webActions.click(commonPagePO.CONNECTION);
    await settingsPage.selectTextFromDropDown('63762281c13e8e0bbb0cc514');
    await webActions.click(flowBuilderPagePO.USE_EXISTING_EXPORT);
    await settingsPage.selectTextFromDropDown('6384c3779a6b3d1fac8df815');
    await webActions.click(commonPagePO.SAVE);
    await webActions.click(flowBuilderPagePO.DATA_PROCESSOR);
    await webActions.click(flowBuilderPagePO.DATA_PROCESSOR);
    await webActions.delay(1000);
    await webActions.click(flowBuilderPagePO.IMPORT_MAPPINGS);
    await webActions.click(flowBuilderPagePO.MAPPER_2);
    await webActions.click(flowBuilderPagePO.FIELD_MAPPING_ADD);
    await webActions.page.keyboard.type("Cursor here");
    await settingsPage.screenshot('[class="rc-tree-list-holder-inner"]', "Mapping");
    await webActions.click(commonPagePO.CLOSE);
    await webActions.click(commonPagePO.DISCARD_CHANGES);
    await webActions.click(flowBuilderPagePO.OPEN_ACTIONS_MENU);
    await webActions.click(flowBuilderPagePO.DELETE_FLOW);
    await webActions.click(commonPagePO.DELETE);
  });
});
