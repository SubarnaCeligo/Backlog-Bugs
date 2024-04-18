import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe("C67037 Verify if the error message is shown when the user tries to signup using google with an existing email.", () => {
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
  test("C67037 Verify if the error message is shown when the user tries to signup using google with an existing email.", async ({io, page}) => {
    await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    await io.homePage.click(selectors.loginPagePO.SIGNUP_SIGNIN_FOOTER);
    await io.homePage.clickByText('Sign up with Google');
    await io.homePage.fill(selectors.loginPagePO.IDENTIFIER_ID, 'qaautomation1@celigo.com');
    await io.homePage.clickByTextByIndex('Next', 0);
    await io.homePage.fill(selectors.loginPagePO.PASSWD, decrypt('SU9xYUAxMjM0NTY='));
    await io.homePage.clickByTextByIndex('Next',0);
    await io.assert.verifyElementDisplayedByText('qaautomation1@celigo.com', 'No error message');
  });
});