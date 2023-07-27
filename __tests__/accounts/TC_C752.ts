import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import * as C752 from "@testData/MyAccount/C752.json";

test.describe("C752 Verify Change password with invalid current pass and valid new pass - should show error messsage", () => {

  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
  });

  test("C752 Verify Change password with invalid current pass and valid new pass - should show error messsage @smoke", async ({
    io
  }) => {
    await io.myAccountPage.changePassword(C752);
    await io.assert.verifyElementText(selectors.myAccountPagePO.SNACK_BAR_MESSAGE, "Current password failed to authenticate.  Please try again.")
  });
});
