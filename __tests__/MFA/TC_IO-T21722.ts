import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("IO-T21722 Verify if the 'Reset MFA' option is shown across Owner records in the admin account.", () => {
  test("@Env-All @Zephyr-IO-T21722 Verify if the 'Reset MFA' option is shown across Owner records in the admin account.", async ({io, page}) => {
     await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
    await io.myAccountPage.waitForElementAttached(selectors.myAccountPagePO.USERS);
    await io.myAccountPage.click(selectors.myAccountPagePO.USERS);
    await io.myAccountPage.clickByIndex(selectors.myAccountPagePO.OPEN_ACTIONSMENU,2);
    await io.assert.verifyElementDisplayedByText("Reset MFA","Reset MFA is not displayed");
  });
});