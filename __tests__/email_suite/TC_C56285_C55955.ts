import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(
  "C56285_C55955 Verify if we are able submit a request to provide the password reset link and cancel the request in the forgot password page & Verify clicking on cancel button in the reset password page is navigating to the signin page",
  () => {
    test.beforeEach("Sign out", async ({ io, page }) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.loadingTime();
      const isNotLoggedIn = await io.loginPage.checkLoginState();
      if (!isNotLoggedIn) {
        await io.flowBuilder.click(selectors.basePagePO.ACCOUNT_BUTTON);
        await io.homePage.click(selectors.basePagePO.SIGN_OUT);
      }
      await io.homePage.delay(1000 * 60 * 3);
    });
    test("@Env-All C56285_C55955 Verify the user is able to save the newly set password successfully via email reset password link and Verify the user is able to cancel and redirected to signin page & Verify clicking on cancel button in the reset password page is navigating to the signin page", async ({
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
      const link = await io.emailVal.getLinkFromEmail(`[${webLink.host}] Request to reset your password`, false, "pwqa1");
      await io.homePage.navigateTo(link.toString());
      await io.homePage.loadingTime();
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
      await io.homePage.delay(1000 * 60 * 3);
      await io.homePage.getByRoleClick("button", "Save");
      await io.loginPage.fill(selectors.loginPagePO.EMAIL, "qaautomation1+emailsuite@celigo.com");
      await io.loginPage.fill(selectors.loginPagePO.PASSWORD, randomString);
      await io.loginPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
      const regex = /home$/;
      await page.waitForURL(regex);
      await io.assert.expectToContainValue(
        "home",
        page.url(),
        "URL doesn't contain home"
      );
      await io.homePage.loadingTime();
      await io.homePage.addStep("Verified user is able to login successfully");
      const isNotLoggedIn = await io.loginPage.checkLoginState();
      if (!isNotLoggedIn) {
        await io.flowBuilder.click(selectors.basePagePO.ACCOUNT_BUTTON);
        await io.homePage.click(selectors.basePagePO.SIGN_OUT);
      }
      await io.homePage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "request-reset");
      await io.homePage.loadingTime();
      await io.homePage.delay(1000 * 60 * 3);
      await io.homePage.fill(selectors.homePagePO.EMAIL, "qaautomation1+emailsuite@celigo.com");
      await io.homePage.click(selectors.basePagePO.SUBMIT);
      const webLink1 = new URL(process.env.IO_UI_CONNECTOR_URL);
      await page.waitForTimeout(8000);
      const link1 = await io.emailVal.getLinkFromEmail(
        `[${webLink1.host}] Request to reset your password`, false, "pwqa1"
      );
      await io.homePage.navigateTo(link1.toString());
      await io.homePage.loadingTime();
      await io.flowBuilder.clickByTextByIndex("Cancel", 0);
      const regex1 = /signin$/;
      await page.waitForURL(regex1);
      await io.assert.expectToContainValue(
        "signin",
        page.url(),
        "URL doesn't contain signin"
      );
      await io.homePage.addStep("Verified user is redirected to signin page");
    });
    test.afterEach("signin into main account",async ({page, io}) => {
      await io.homePage.navigateTo(process.env["IOURL"]);
      await io.homePage.loadingTime();
      await io.loginPage.fill(selectors.loginPagePO.EMAIL, process.env["IO_UserName"]);
      await io.loginPage.fill(selectors.loginPagePO.PASSWORD, process.env["IO_Password"]);
      await io.loginPage.click(selectors.loginPagePO.SIGN_IN_BUTTON); 
    })
  }
);
