import { test, expect } from "@lib/BaseTest";
import { MyAccountPagePO } from "@objects/MyAccountPagePO";


test.describe("My Account Test Case", () =>{
  let myAccount: MyAccountPagePO;
  myAccount = new MyAccountPagePO();
  
test("C752 Verify Change password with invalid current pass and valid new pass - should show error messsage", async ({
  myAccountPage,
  webActions
}) => {
  await myAccountPage.navigateToMyAccount();
  await webActions.click(myAccount.EDIT_PASSWORD);
  await webActions.isVisible(myAccount.DIALOG_BOX);
  await webActions.fill(myAccount.CURRENT_PASSWORD, "Test125362");
  await webActions.fill(myAccount.NEW_PASSWORD, "Test21234");
  await webActions.click(myAccount.CHANGE_PASSWORD);
  let msg = await webActions.getText(myAccount.SNACK_BAR_MESSAGE);
  await expect(msg).toContain(
    "Current password failed to authenticate.  Please try again."
  );
});

test("C28995 Verify Help texts are scrollable in My account > Users", async ({
  myAccountPage,
  webActions,
  assert
}) => {
  await myAccountPage.navigateToMyAccount();
  await webActions.click(myAccount.USERS);
  await webActions.click(myAccount.HELP_TEXT);
  await webActions.delay(3000);
  await assert.checkSnapshot(myAccount.HELP_TEXT_DIALOG_BOX, "HelpText.png");
});
});