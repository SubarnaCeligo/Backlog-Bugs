import { test, expect } from "@lib/BaseTest";
import { LoginPage } from "@pages/LoginPage";
import * as selectors from "@selectors/Selectors";
import * as MyAccountData from "@testData/MyAccount";
 var data = MyAccountData;

test.describe.skip("My Account Test Case", () => {
  
  test.beforeEach(async ({io,page}) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
  });

  test("C752 Verify Change password with invalid current pass and valid new pass - should show error messsage @smoke", async ({
    io
  }) => {
   await io.myAccountPage.changePassword(data.MyAccountTestData.C752);
    let msg = await io.myAccountPage.getText(
      selectors.MyAccountPagePO.SNACK_BAR_MESSAGE
    );
    await expect(msg).toContain(
      "Current password failed to authenticate.  Please try again."
    );
  });

  test("C28995 Verify Help texts are scrollable in My account Users", async ({
    io
  }) => {
    await io.myAccountPage.click(selectors.MyAccountPagePO.USERS);
    await io.myAccountPage.click(selectors.MyAccountPagePO.HELP_TEXT);
    await io.assert.checkSnapshot(
      selectors.MyAccountPagePO.HELP_TEXT_DIALOG_BOX,
      "HelpText.png"
    );
  });
});
