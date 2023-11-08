import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.skip(
  "C55971 Verify when we use an old password that was set in the last 20 passwords we should get an error in the reset password page",
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
    test("C55971 Verify when we use an old password that was set in the last 20 passwords we should get an error in the reset password page", async ({
      io,
      page
    }) => {
      await io.homePage.navigateTo(
        process.env.IO_UI_CONNECTOR_URL +
          "request-reset?email=" +
          process.env.IO_EMAIL_ACCOUNT
      );
      await io.homePage.click(selectors.basePagePO.SUBMIT);
      // Delay for new email to be sent, otherwise picks up old email
      await page.waitForTimeout(5000);
      const link = await io.emailVal.getLinkFromEmail(
        "[staging.integrator.io] Request to reset your password"
      );
      await io.homePage.navigateTo(link);
      await io.homePage.fill(selectors.loginPagePO.PASSWORD, "Celigo@123");
      await io.homePage.getByRoleClick("button", "Save");

      await io.assert.verifyElementDisplayedByText(
        "You are not allowed to choose a password that matches with the previous 20 passwords. Please choose another password.",
        "Reused password error message is not displayed"
      );
    });
  }
);
