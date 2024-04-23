import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.skip(
  "C55953 Verify the user is able to save the newly set password successfully via email reset password link",
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
    test("C55953 Verify the user is able to save the newly set password successfully via email reset password link", async ({
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
      await io.homePage.navigateTo(link.toString());
      await io.homePage.fill(selectors.loginPagePO.PASSWORD, "123");
      await io.assert.verifyElementIsDisplayed(
        "#pageInfo",
        "Password tooltip is not displayed"
      );
      const randomString = "Celigo1" + Math.random().toString(36).substring(7);
      await io.homePage.fill(selectors.loginPagePO.PASSWORD, randomString);
      await io.homePage.click(selectors.basePagePO.CELIGO_LOGO);
      await io.assert.verifyElementAttribute(
        selectors.loginPagePO.PASSWORD,
        "type",
        "password"
      );
      await io.loginPage.click(selectors.loginPagePO.HIDE_PASSWORD);
      await io.assert.verifyElementAttribute(
        selectors.loginPagePO.PASSWORD,
        "type",
        "text"
      );
      await io.homePage.getByRoleClick("button", "Save");
      await io.loginPage.fill(
        selectors.loginPagePO.EMAIL,
        "qaautomation1@celigo.com"
      );
      await io.loginPage.fill(selectors.loginPagePO.PASSWORD, randomString);
      await io.loginPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
      const regex = /home$/;
      await page.waitForURL(regex);
      await io.assert.expectToContainValue(
        "home",
        page.url(),
        "URL doesn't contain home"
      );
      await io.homePage.addStep("Verified user is able to login successfully");
    });
  }
);
