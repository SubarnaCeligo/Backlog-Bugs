import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe("C66316 Verify Sign up with Google is the first option and the sign up form is the second option on the page", () => {
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
  test("C66316 Verify Sign up with Google is the first option and the sign up form is the second option on the page", async ({ io, page }) => {
    await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    await io.loginPage.clickByText('Sign up');
    await io.loginPage.waitForElementAttached('#root');
    const contentsDiv = await page.locator('#root [type="submit"]').nth(0).innerText();
    await io.assert.expectToContainValue('Sign up with Google', contentsDiv, 'Upper div does not contain sign up with google');
  });
});