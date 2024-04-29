import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(
  "C55952 Verify all the available fields in the Rest password page after navigating to the page via email link",
  () => {
    test.beforeEach("Sign out", async ({ io, page }) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.loadingTime();
      const isNotLoggedIn = await io.loginPage.checkLoginState();
      if (!isNotLoggedIn) {
        await io.flowBuilder.click(selectors.basePagePO.ACCOUNT_BUTTON);
        await io.homePage.click(selectors.basePagePO.SIGN_OUT);
      }
      await page.waitForTimeout(300000);
    });
    test("@Env-All Verify all the available fields in the Rest password page after navigating to the page via email link", async ({
      io,
      page
    }) => {
      await io.homePage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "request-reset");
      await io.homePage.loadingTime();
      await io.homePage.fill(selectors.homePagePO.EMAIL, "qaautomation1+emailsuite@celigo.com");
      await io.homePage.click(selectors.basePagePO.SUBMIT);
      const webLink = new URL(process.env.IO_UI_CONNECTOR_URL);
      await page.waitForTimeout(5000);
      const link = await io.emailVal.getLinkFromEmail(
        `[${webLink.host}] Request to reset your password`, false, "pwqa1"
      );
      await io.homePage.navigateTo(link.toString());
      await io.homePage.loadingTime();
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
