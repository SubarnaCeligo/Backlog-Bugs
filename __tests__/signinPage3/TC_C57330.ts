import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe("C57330 Verify if the user is logged out we should be navigating to signin page as expected", () => {
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
  test("C57330 Verify if the user is logged out we should be navigating to signin page as expected", async ({ io, page }) => {
    await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.SUBMIT, 'Sign in button is not displayed after sign out');
    await io.assert.verifyElementIsDisplayed(selectors.loginPagePO.EMAIL, 'Email input is not displayed after sign out');
    await io.assert.verifyElementIsDisplayed(selectors.loginPagePO.PASSWORD, 'Password input is not displayed after sign out');
  });
});
