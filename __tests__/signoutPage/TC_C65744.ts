import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe("C65744 Verify that the user should not be able to signin to the IO account if the signup has failed for some reason.", () => {
    test("@Env-All @Zephyr-IO-T17830 C65744 Verify that the user should not be able to signin to the IO account if the signup has failed for some reason.", async ({io, page}) => {
      await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
      await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
      await io.homePage.click(selectors.loginPagePO.SIGNUP_SIGNIN_FOOTER);
      await io.homePage.clickByText('Sign up with Google');
      await io.homePage.fill(selectors.loginPagePO.IDENTIFIER_ID, 'qaautomation1@celigo.com');
      await io.homePage.clickByTextByIndex('Next', 0);
      await io.homePage.fill(selectors.loginPagePO.PASSWD, decrypt('SU9xYUAxMjM0NTY='));
      await io.homePage.clickByTextByIndex('Next',0);
      await io.homePage.loadingTime()
      await io.assert.verifyElementDisplayedByText('Sign in via Google failed. Please sign in first with your email/password to link your Google account.', 'No error message');
      await io.assert.verifyElementIsDisplayed(selectors.basePagePO.SUBMIT, 'Sign in button is not displayed after sign out');
      await io.assert.verifyElementIsDisplayed(selectors.loginPagePO.EMAIL, 'Email input is not displayed after sign out');
      await io.assert.verifyElementIsDisplayed(selectors.loginPagePO.PASSWORD, 'Password input is not displayed after sign out');
    });
  });