import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.skip(
  "C55952 Verify all the available fields in the Rest password page after navigating to the page via email link",
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
    test("C55952 Verify all the available fields in the Rest password page after navigating to the page via email link", async ({
      io,
      page
    }) => {
      await io.homePage.navigateTo(
        "https://staging.integrator.io/request-reset?email=qaautomation1@celigo.com"
      );
      await io.homePage.click(selectors.basePagePO.SUBMIT);
      const link = await io.emailVal.getLinkFromEmail(
        "[staging.integrator.io] Request to reset your password"
      );
      await io.homePage.navigateTo(link);
      await io.assert.verifyElementIsDisplayed(
        selectors.basePagePO.CELIGO_LOGO,
        "Celigo logo is not displayed"
      );
      await io.assert.verifyElementIsDisplayed(
        selectors.loginPagePO.PASSWORD,
        "Password field is not displayed"
      );
      await expect(page.getByRole("button", { name: "Save" })).toBeVisible();
      await io.homePage.addStep('Verified "Save" button is visible');
      await expect(page.getByRole("link", { name: "Cancel" })).toBeVisible();
      await io.homePage.addStep('Verified "Cancel" button is visible');
    });
  }
);
