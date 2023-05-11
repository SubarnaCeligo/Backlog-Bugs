import { test, expect } from "@lib/BaseTest";

test.describe("My Account Test Case", () => {
  test.beforeEach(async ({ myAccountPage, webActions }) => {
    await webActions.navigateTo(myAccountPage.MY_ACCOUNT_PAGE_URL);
  });

  test("C752 Verify Change password with invalid current pass and valid new pass - should show error messsage @smoke", async ({
    webActions,
    myAccountPO,
    myAccountTD
  }) => {
    await webActions.click(myAccountPO.EDIT_PASSWORD);
    await webActions.isVisible(myAccountPO.DIALOG_BOX);
    await webActions.fill(myAccountPO.CURRENT_PASSWORD, myAccountTD.C752.CURRENT_PASSWORD);
    await webActions.fill(myAccountPO.NEW_PASSWORD, myAccountTD.C752.NEW_PASSWORD);
    await webActions.click(myAccountPO.CHANGE_PASSWORD);
    let msg = await webActions.getText(myAccountPO.SNACK_BAR_MESSAGE);
    await expect(msg).toContain(
      "Current password failed to authenticate.  Please try again."
    );
  });

  test("C28995 Verify Help texts are scrollable in My account Users", async ({
    webActions,
    assert,
    myAccountPO
  }) => {
    await webActions.click(myAccountPO.USERS);
    await webActions.click(myAccountPO.HELP_TEXT);
    await assert.checkSnapshot(myAccountPO.HELP_TEXT_DIALOG_BOX, "HelpText.png");
  });
});
