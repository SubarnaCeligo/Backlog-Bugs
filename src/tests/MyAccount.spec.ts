import { test, expect } from "@lib/BaseTest";

test.describe("My Account Test Case", () => {
  test.skip("C752 Verify Change password with invalid current pass and valid new pass - should show error messsage @smoke", async ({
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

  test.skip("C28995 Verify Help texts are scrollable in My account > Users", async ({
    myAccountPage,
    webActions,
    assert,
    myAccountPO
  }) => {
    await myAccountPage.navigateToMyAccount();
    // await webActions.delay(2000);
    await webActions.click(myAccountPO.USERS);
    await webActions.click(myAccountPO.HELP_TEXT);
    await webActions.delay(5000);
    await assert.checkSnapshot(myAccountPO.HELP_TEXT_DIALOG_BOX, "HelpText.png");
  });
});
