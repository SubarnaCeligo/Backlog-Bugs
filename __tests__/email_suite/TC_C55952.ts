import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(
  "C55952 Verify all the available fields in the Rest password page after navigating to the page via email link",
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
    test("@Env-All Verify all the available fields in the Rest password page after navigating to the page via email link", async ({
      io,
      page
    }) => {
      await io.homePage.navigateTo(
        process.env.IO_UI_CONNECTOR_URL +
          "request-reset?email=" +
          process.env.IO_EMAIL_ACCOUNT
      );
      await io.homePage.click(selectors.basePagePO.SUBMIT);
      const link = await io.emailVal.getLinkFromEmail(
        "[staging.integrator.io] Request to reset your password"
      );
      await io.homePage.navigateTo(link.toString());
      await io.assert.verifyElementIsDisplayed(
        selectors.basePagePO.CELIGO_LOGO,
        "Celigo logo is not displayed"
      );
      await io.assert.verifyElementIsDisplayed(
        selectors.loginPagePO.PASSWORD,
        "Password field is not displayed"
      );
      await io.assert.verifyElementDisplayedByText(
        "Save",
        "Save button is not displayed"
      );
      await io.assert.verifyElementDisplayedByText(
        "Cancel",
        "Cancel button is not displayed"
      );
    });
  }
);
