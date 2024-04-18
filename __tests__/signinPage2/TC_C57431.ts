import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C57431 Verify the success message in the forgot password page after we submit the password reset request by providing the email id of the user", () => {
  test("C57431 Verify the success message in the forgot password page after we submit the password reset request by providing the email id of the user", async ({ io, page }) => {
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