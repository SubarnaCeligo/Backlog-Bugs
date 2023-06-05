import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import * as C752 from "@testData/MyAccount/C752.json";

test.describe("My Account Test Case new", () => {

  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
  });

  test("C752 Verify Change password with invalid current pass and valid new pass - should show error messsage @smoke", async ({
    io
  }) => {
    await io.myAccountPage.changePassword(C752);
    let msg = await io.myAccountPage.getText(
      selectors.myAccountPagePO.SNACK_BAR_MESSAGE
    );
    await expect(msg).toContain(
      "Current password failed to authenticate.  Please try again."
    );
  });

  test("C28995 Verify Help texts are scrollable in My account Users", async ({
    io
  }) => {
    await io.myAccountPage.click(selectors.myAccountPagePO.USERS);
    await io.myAccountPage.click(selectors.myAccountPagePO.HELP_TEXT);
    await io.assert.checkSnapshot(
      selectors.myAccountPagePO.HELP_TEXT_DIALOG_BOX,
      "HelpText.png"
    );
  });
});
