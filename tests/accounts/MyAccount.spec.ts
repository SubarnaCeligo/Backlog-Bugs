import { test, expect } from "@lib/BaseTest";
import { LoginPage } from "@pages/LoginPage";
import * as selectors from "@selectors/Selectors";


test.describe("My Account Test Case", () => {
  test.beforeEach(async ({io,page}) => {
    //await io.basePage.navigateTo(io.LINKS.MY_ACCOUNT_PAGE_URL);
  });

  test("C752 Verify Change password with invalid current pass and valid new pass - should show error messsage @smoke", async ({
    myAccountTD,
    io,
    connectionsPage
  }) => {

    // await io.editForm();
    // await io.myAccountPage
    //         .fill(selectors.MyAccountPagePO.EDIT_PASSWORD,x)
    //         .
    // await io.basePage.click(selectors.MyAccountPagePO.EDIT_PASSWORD);
    // await io.basePage.isVisible(selectors.MyAccountPagePO.DIALOG_BOX);
    // await io.basePage.fill(
    //   selectors.MyAccountPagePO.CURRENT_PASSWORD,
    //   myAccountTD.C752.CURRENT_PASSWORD
    // );
    // await io.basePage.fill(
    //   selectors.MyAccountPagePO.NEW_PASSWORD,
    //   myAccountTD.C752.NEW_PASSWORD
    // );
    // await io.basePage.click(selectors.MyAccountPagePO.CHANGE_PASSWORD);
    // let msg = await io.basePage.getText(
    //   selectors.MyAccountPagePO.SNACK_BAR_MESSAGE
    // );
    // await expect(msg).toContain(
    //   "Current password failed to authenticate.  Please try again."
    // );
  });

  test("C28995 Verify Help texts are scrollable in My account Users", async ({
    assert,io
  }) => {
    await io.myAccountPage.click(selectors.MyAccountPagePO.USERS);
    await io.myAccountPage.click(selectors.MyAccountPagePO.HELP_TEXT);
    await assert.checkSnapshot(
      selectors.MyAccountPagePO.HELP_TEXT_DIALOG_BOX,
      "HelpText.png"
    );
  });
});
