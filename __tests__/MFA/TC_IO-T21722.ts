import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T17224 Verify if the accounts are listed in the primary account dropdown to which the user has access to.", () => {
  test("@Env-All @Zephyr-IO-T17224 Verify if the accounts are listed in the primary account dropdown to which the user has access to.", async ({io, page}) => {
    await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.USERS);
    await io.myAccountPage.click(selectors.myAccountPagePO.USERS);
    await io.myAccountPage.clickByIndex(selectors.myAccountPagePO.OPEN_ACTIONSMENU,2);
    await io.assert.verifyElementDisplayedByText("Reset MFA","Reset MFA is not displayed");
  });
});