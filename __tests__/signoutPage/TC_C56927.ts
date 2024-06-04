import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe("C56927 Verify if the user is not navigating to IO page after clicking on the Request reset password from the /request-reset?application=concur page and showing the confirmation in the concur page itself", () => {
  test.beforeEach('check sign out', async ({ io, page }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    const isNotLoggedIn = await io.loginPage.checkLoginState();
    if (!isNotLoggedIn) {
      await io.homePage.waitForElementAttached(selectors.loginPagePO.EMAIL);
      await io.signInPage.fill(selectors.loginPagePO.EMAIL, process.env["IO_UserName"]);
      await io.signInPage.fill(selectors.loginPagePO.PASSWORD, decrypt(process.env["IO_Password"]));
      await io.signInPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
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
      }
      if (errorMessage) {
          const waitSeconds = parseInt(match[1]);
          await page.waitForTimeout(waitSeconds * 1000);
          console.log('Waiting time is', waitSeconds)
          await io.signInPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
          console.log('After successfully wait clicked signin')
      }
    }
  })

  test("@Env-All @Zephyr-IO-T1009 C56927 Verify if the user is not navigating to IO page after clicking on the Request reset password from the /request-reset?application=concur page and showing the confirmation in the concur page itself", async ({ io, page }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    await io.signInPage.click(selectors.loginPagePO.FORGOT_PASSWORD);
    await io.signInPage.fill(selectors.loginPagePO.EMAIL_ID, process.env["IO_UserName"]);
    await io.signInPage.click(selectors.basePagePO.SUBMIT);
    await io.signInPage.waitForElementAttached(':has-text("Check your email for a link to reset your password.")')
    await io.assert.verifyElementDisplayedByText('Forgot your password?', 'Check your email for a link to reset your password.');
  });
});