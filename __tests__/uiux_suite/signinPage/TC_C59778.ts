import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.skip(
  "C59778 Verify terms of service link is a single link in sign up page",
  () => {
    test.beforeEach("Sign out", async ({ io, page }) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      const isNotLoggedIn = await io.loginPage.checkLoginState();
      if (!isNotLoggedIn) {
        await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT);
        await page.hover(selectors.basePagePO.ACCOUNT);
        await io.homePage.click(selectors.basePagePO.SIGN_OUT);
      }
    });
    test("C59778 Verify terms of service link is a single link in sign up page", async ({
      io,
      page
    }) => {
      await io.homePage.click(selectors.loginPagePO.SIGNUP_SIGNIN_FOOTER);
      await io.homePage.click(selectors.loginPagePO.SIGN_UP_BUTTON);
      await io.assert.verifyElementDisplayedByText(
        "Terms of Service / Service Subscription Agreement",
        "'Terms of Service / Service Subscription Agreement' link is not displayed"
      );
    });
  }
);
