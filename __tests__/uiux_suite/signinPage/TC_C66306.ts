import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C66306 Verify Sign up with Google is enabled on NA Sign up page", () => {
  test.beforeEach("Sign out", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    const isNotLoggedIn = await io.loginPage.checkLoginState();
    if (!isNotLoggedIn) {
      await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT);
      await page.hover(selectors.basePagePO.ACCOUNT);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    }
  });
  test("C66306 Verify Sign up with Google is enabled on NA Sign up page", async ({
    io,
    page
  }) => {
    await io.homePage.click(selectors.loginPagePO.SIGNUP_SIGNIN_FOOTER);
    await io.assert.verifyElementDisplayedByText(
      "Sign up with Google",
      "Sign up with Google is not displayed"
    );
  });
});
