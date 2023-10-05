import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

  test.describe("C56428 Verify refreshing on signin/ request reset/ forgot password/ accept invite pages should stay", () => {
    test.beforeEach("C56428 Signing out", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT);
      await page.hover(selectors.basePagePO.ACCOUNT);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    });

    test("Sign in page", async ({io, page}) => {
        await io.homePage.waitForElementAttached(selectors.basePagePO.SUBMIT);
        await io.homePage.addStep("Reloading the page");
        await page.reload();
        await io.assert.verifyElementIsDisplayed(selectors.basePagePO.SUBMIT, "Sign in is not displayed");
        await io.assert.verifyElementIsDisplayed(selectors.loginPagePO.EMAIL_ID, "Email is not displayed");
        await io.assert.verifyElementIsDisplayed(selectors.loginPagePO.PASSWORD_ID, "Password is not displayed");
    });

    test("Forgot password page", async ({io, page}) => {
      await io.signInPage.click(selectors.loginPagePO.FORGOT_PASSWORD);
      await page.reload();
      await io.assert.verifyElementContainsText(selectors.basePagePO.H3_TEXT_SELECTOR, 'Forgot your password?');
      await io.assert.verifyElementIsDisplayed(selectors.basePagePO.SUBMIT, "Submit is not displayed");
      await io.assert.verifyElementIsDisplayed(selectors.loginPagePO.EMAIL_ID, "Email is not displayed");
  });

    test("Reset link sent page", async ({io, page}) => {
        await io.signInPage.click(selectors.loginPagePO.FORGOT_PASSWORD);
        await io.signInPage.fill(selectors.loginPagePO.EMAIL_ID,process.env["IO_UserName"]);
        await io.signInPage.click(selectors.basePagePO.SUBMIT);
        await io.homePage.addStep("Reloading the page");
        await page.reload();
        await io.signInPage.waitForElementAttached(':has-text("Check your email for a link to reset your password.")')
        await io.assert.verifyElementText(selectors.loginPagePO.FORGOT_PASSWORD_TEXTBOX, 'Check your email for a link to reset your password.  If you don’t see our reset password email, check your spam folder or try requesting a reset link again, making sure you enter the email address that was used to set up your account. Or you can sign up for a new account.');
    });

  });