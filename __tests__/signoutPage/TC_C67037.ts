import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe("C67037 Verify if the error message is shown when the user tries to signup using google with an existing email.", () => {
   test.beforeEach('check sign out', async ({ io, page }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    const isNotLoggedIn = await io.loginPage.checkLoginState();
    if (!isNotLoggedIn) {
      await io.homePage.waitForElementAttached(selectors.loginPagePO.EMAIL);
      async function attemptSignIn() {
        await io.signInPage.fill(selectors.loginPagePO.EMAIL, process.env["IO_UserName"]);
        await io.signInPage.fill(selectors.loginPagePO.PASSWORD, decrypt(process.env["IO_Password"]));
        await io.signInPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
      }
      await attemptSignIn();
      const maxWaitTime = 30000;
      const startTime = Date.now();
      let errorMessage;
      let match;
      while (!match && (Date.now() - startTime) < maxWaitTime) {
        await page.waitForTimeout(2000);
        const pageContent = await page.content();
        const errorMessageRegex = /Please try again after (\d+) seconds/;
        match = pageContent.match(errorMessageRegex);
        if (match && match[1]) {
          errorMessage = match[0];
        }
        if (errorMessage) {
          const waitSeconds = parseInt(match[1]);
          console.log('Waiting for', waitSeconds, 'seconds before retrying');
          await page.waitForTimeout(waitSeconds * 1000);
          console.log('Retrying sign-in after wait');
          await attemptSignIn();
        }
      }
    }
  })
  test("@Env-All @Zephyr-IO-T17834 C67037 Verify if the error message is shown when the user tries to signup using google with an existing email.", async ({ io, page }) => {
    await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    await io.homePage.click(selectors.loginPagePO.SIGNUP_SIGNIN_FOOTER);
    await io.homePage.clickByText('Sign up with Google');
    await io.homePage.fill(selectors.loginPagePO.IDENTIFIER_ID, 'qaautomation1@celigo.com');
    await io.homePage.clickByTextByIndex('Next', 0);
    await io.homePage.fill(selectors.loginPagePO.PASSWD, decrypt('SU9xYUAxMjM0NTY='));
    await io.homePage.clickByTextByIndex('Next', 0);
    await io.assert.verifyElementDisplayedByText('Sign in via Google failed. Please sign in first with your email/password to link your Google account.', 'No error message');
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.SUBMIT, 'Sign in button is not displayed after sign out');
    await io.assert.verifyElementIsDisplayed(selectors.loginPagePO.EMAIL, 'Email input is not displayed after sign out');
    await io.assert.verifyElementIsDisplayed(selectors.loginPagePO.PASSWORD, 'Password input is not displayed after sign out');
  });
});