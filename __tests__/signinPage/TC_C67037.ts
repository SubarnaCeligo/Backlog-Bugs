import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe.skip("C67037 Verify if the error message is shown when the user tries to signup using google with an existing email.", () => {
  test("C67037 Verify if the error message is shown when the user tries to signup using google with an existing email.", async ({io, page}) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_ICON);
    await io.homePage.click(selectors.basePagePO.ACCOUNT_ICON);
    await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    await io.homePage.click(selectors.loginPagePO.SIGNUP_SIGNIN_FOOTER);
    await io.homePage.clickByText('Sign up with Google');
    await io.homePage.fill(selectors.loginPagePO.IDENTIFIER_ID, 'qaautomation1@celigo.com');
    await io.homePage.clickByTextByIndex('Next', 0);
    await io.homePage.fill(selectors.loginPagePO.PASSWD, decrypt('SU9xYUAxMjM0NTY='));
    await io.homePage.clickByTextByIndex('Next',0);
    await io.assert.verifyElementDisplayedByText('Sign in via Google failed. Please sign in first with your email/password to link your Google account.', 'No error message');
  });
});