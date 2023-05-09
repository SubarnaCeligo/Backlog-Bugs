import { test, expect } from "@lib/BaseTest";

test.describe("My Account Test Case", () => {
  test("C752 Verify Change password with invalid current pass and valid new pass - should show error messsage @smoke", async ({
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
    await webActions.delay(2000);
    await webActions.click(myAccountPO.USERS);
    await webActions.click(myAccountPO.HELP_TEXT);
    await webActions.delay(5000);
    await assert.checkSnapshot(myAccountPO.HELP_TEXT_DIALOG_BOX, "HelpText.png");
  });

  test("C57810 Verify whether the page is showing the proper readable error , when the connection goes to offline", async ({
    connectionsPage,
    homePage,
    webActions,
    homePagePO,
    concPagePO,
    myAccountPO
  }) => {
    await homePage.navigateToHome();
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
});
