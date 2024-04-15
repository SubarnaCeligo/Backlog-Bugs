import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe("C57431 Verify the success message in the forgot password page after we submit the password reset request by providing the email id of the user", () => {
  test.beforeEach('check sign out', async ({ io, page }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    const isNotLoggedIn = await io.loginPage.checkLoginState();
    if (!isNotLoggedIn) {
      await io.homePage.waitForElementAttached(selectors.loginPagePO.EMAIL);
      await io.signInPage.fill(selectors.loginPagePO.EMAIL, process.env["IO_UserName"]);
      await io.signInPage.fill(selectors.loginPagePO.PASSWORD, decrypt(process.env["IO_Password"]));
      await io.signInPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
    }
  })
  test("C57431 Verify the success message in the forgot password page after we submit the password reset request by providing the email id of the user", async ({ io, page }) => {
    await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    await io.signInPage.click(selectors.loginPagePO.FORGOT_PASSWORD);
    await io.signInPage.fill(selectors.loginPagePO.EMAIL_ID, process.env["IO_UserName"]);
    await io.signInPage.click(selectors.basePagePO.SUBMIT);
    await io.signInPage.waitForElementAttached(':has-text("Check your email for a link to reset your password.")')
    await io.assert.verifyElementText(selectors.loginPagePO.FORGOT_PASSWORD_TEXTBOX, 'Check your email for a link to reset your password.  If you don’t see our reset password email, check your spam folder or try requesting a reset link again, making sure you enter the email address that was used to set up your account. Or you can sign up for a new account.');
  });
});