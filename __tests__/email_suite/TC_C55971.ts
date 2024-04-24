import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(
  "C55971 Verify when we use an old password that was set in the last 20 passwords we should get an error in the reset password page",
  () => {
    test.beforeEach("Sign out", async ({ io, page }) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.loadingTime();
      const isNotLoggedIn = await io.loginPage.checkLoginState();
      if (!isNotLoggedIn) {
        await io.flowBuilder.click(selectors.basePagePO.ACCOUNT_BUTTON);
        await io.homePage.click(selectors.basePagePO.SIGN_OUT);
      }
    });
    test("@Env-All C55971 Verify when we use an old password that was set in the last 20 passwords we should get an error in the reset password page", async ({
      io,
      page
    }) => {
      await io.homePage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "request-reset");
      await io.homePage.loadingTime();
      await io.homePage.fill(selectors.homePagePO.EMAIL, "qaautomation1+emailsuite@celigo.com");
      await io.homePage.click(selectors.basePagePO.SUBMIT);
      // Delay for new email to be sent, otherwise picks up old email
      await page.waitForTimeout(5000);
      const webLink = new URL(process.env.IO_UI_CONNECTOR_URL);
      const link = await io.emailVal.getLinkFromEmail(
        `[${webLink.host}] Request to reset your password`, false, "pwqa1"
      );
      await io.homePage.navigateTo(link.toString());
      await io.homePage.fill(selectors.loginPagePO.PASSWORD, "Celigo@123");
      await io.homePage.getByRoleClick("button", "Save");

      await io.assert.verifyElementDisplayedByText(
        "You are not allowed to choose a password that matches with the previous 20 passwords. Please choose another password.",
        "Reused password error message is not displayed"
      );
    });
  }
);
