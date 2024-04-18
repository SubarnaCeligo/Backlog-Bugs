import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from '@celigo/aut-utilities';

test.describe(
  "C67012 Verify the user is able to reset their password if they forget it, and this should not affect the new sign-up process",
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
    test("@Env-All C67012 Verify the user is able to reset their password if they forget it, and this should not affect the new sign-up process", async ({
      io,
      page
    }) => {
      await io.homePage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "request-reset");
      await io.flowBuilder.loadingTime();
      await io.homePage.fill(selectors.homePagePO.EMAIL, "qaautomation1+emailsuite@celigo.com");
      await io.homePage.click(selectors.basePagePO.SUBMIT);
      // Delay for new email to be sent, otherwise picks up old email
      await page.waitForTimeout(5000);
      const webLink = new URL(process.env.IO_UI_CONNECTOR_URL);
      const link = await io.emailVal.getLinkFromEmail(`[${webLink.host}] Request to reset your password`, false, "pwqa1");
      await io.homePage.navigateTo(link.toString());
      await io.homePage.fill(selectors.loginPagePO.PASSWORD, "123");
      await io.assert.verifyElementIsDisplayed(
        selectors.basePagePO.PAGE_INFO,
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
        "qaautomation1+emailsuite@celigo.com"
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
      await io.homePage.addStep(
        "Verified user is able to change password successfully"
      );
    });
  }
);
