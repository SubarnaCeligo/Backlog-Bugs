import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C1547 Verify 'Invite User' button is shown when clicked on Users option in my account page", () => {

  test.beforeEach(async ({ io }) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
  });

  test("@Env-All @Zephyr-IO-T6882 C1547 Verify 'Invite User' button is shown when clicked on Users option in my account page", async ({
    io
  }) => {
    await io.myAccountPage.click(selectors.myAccountPagePO.USERS);
    await io.assert.verifyElementText(selectors.myAccountPagePO.INVITE_USER_BUTTON, "Invite user");
  });
});
