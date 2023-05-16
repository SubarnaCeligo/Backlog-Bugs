import { test, expect } from "@lib/BaseTest";
import * as selectors from "@selectors/Selectors";

test.describe("My Account Test Case", () => {
  test.beforeEach(async ({ myAccountPage, basePage }) => {
    await basePage.navigateTo(myAccountPage.MY_ACCOUNT_PAGE_URL);
  });

  test("C752 Verify Change password with invalid current pass and valid new pass - should show error messsage @smoke", async ({
    basePage,
    myAccountTD
  }) => {
    await basePage.click(selectors.MyAccountPagePO.EDIT_PASSWORD);
    await basePage.isVisible(selectors.MyAccountPagePO.DIALOG_BOX);
    await basePage.fill(
      selectors.MyAccountPagePO.CURRENT_PASSWORD,
      myAccountTD.C752.CURRENT_PASSWORD
    );
    await basePage.fill(
      selectors.MyAccountPagePO.NEW_PASSWORD,
      myAccountTD.C752.NEW_PASSWORD
    );
    await basePage.click(selectors.MyAccountPagePO.CHANGE_PASSWORD);
    let msg = await basePage.getText(selectors.MyAccountPagePO.SNACK_BAR_MESSAGE);
    await expect(msg).toContain(
      "Current password failed to authenticate.  Please try again."
    );
  });

  test("C28995 Verify Help texts are scrollable in My account Users", async ({
    basePage,
    assert
  }) => {
    await basePage.click(selectors.MyAccountPagePO.USERS);
    await basePage.click(selectors.MyAccountPagePO.HELP_TEXT);
    await assert.checkSnapshot(
      selectors.MyAccountPagePO.HELP_TEXT_DIALOG_BOX,
      "HelpText.png"
    );
  });
});
