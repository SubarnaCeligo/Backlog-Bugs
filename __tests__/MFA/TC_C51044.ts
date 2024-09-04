import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C51044 Verify if the SSO and MFA options are disabled by default when trying to invite a user.", () => {
  test("@Env-All @Zephyr-IO-T19655 C51044 Verify if the SSO and MFA options are disabled by default when trying to invite a user.", async ({io, page}) => {
      await io.myAccountPage.navigateTo(io.data.links.MY_ACCOUNT_PAGE_URL);
      await io.homePage.loadingTime()
      await io.myAccountPage.click(selectors.myAccountPagePO.USERS);
      await io.homePage.loadingTime()
      await io.myAccountPage.clickByText('Invite user');
      await io.homePage.loadingTime()
      await io.myAccountPage.click(selectors.myAccountPagePO.ACCOUNT_MFA_REQUIRED);
      await io.homePage.loadingTime()
      await io.assert.verifyElementAttributeContainsText(selectors.myAccountPagePO.ACCOUNT_MFA_REQUIRED, 'aria-checked', 'true');
  });
});