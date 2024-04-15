import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe(
  "C66318 Verify Sign in via Google option is shown in profile page for EU domain",
  () => {
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
    test("C66318 Verify Sign in via Google option is shown in profile page for EU domain", async ({
      io,
      page
    }) => {
      await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_ICON);
      await io.homePage.click(selectors.basePagePO.ACCOUNT_ICON);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
      await io.assert.verifyElementDisplayedByText(
        "Sign in with Google",
        "'Sign in with Google' text is not displayed"
      );
    });
  }
);
