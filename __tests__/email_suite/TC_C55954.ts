import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(
  "C55954 Verify that we should get an error message if we try to reset password using the a link which is older and expired",
  () => {
    test.beforeEach("Sign out", async ({ io, page }) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      const isNotLoggedIn = await io.loginPage.checkLoginState();
      if (!isNotLoggedIn) {
        await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT);
        await io.homePage.hover(selectors.basePagePO.ACCOUNT);
        await io.homePage.click(selectors.basePagePO.SIGN_OUT);
      }
    });
    test("@Env-All C55954 Verify that we should get an error message if we try to reset password using the a link which is older and expired", async ({
      io,
      page
    }) => {
      const link = await io.emailVal.getLinkFromEmail(
        "[staging.integrator.io] Request to reset your password"
      );
      await io.homePage.navigateTo(link.toString());
      await io.homePage.fill(selectors.loginPagePO.PASSWORD, "123");
      await io.homePage.getByRoleClick("button", "Save");

      await io.assert.verifyElementDisplayedByText(
        "Sorry, the link to reset your password has expired",
        "Expired link error message is not displayed"
      );
    });
  }
);
