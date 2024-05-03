import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { randomString, randomNumber } from "@celigo/aut-utilities";

test.describe(
  "C55952_C55953_C55971_C67012_C55954",
  () => {
    let link;
    test.beforeEach("Sign out", async ({ io, page }) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.loadingTime();
      const isNotLoggedIn = await io.loginPage.checkLoginState();
      if (!isNotLoggedIn) {
        await io.flowBuilder.click(selectors.basePagePO.ACCOUNT_BUTTON);
        await io.homePage.click(selectors.basePagePO.SIGN_OUT);
      }
      await io.homePage.delay(1000 * 60 * 3);
      await io.homePage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "request-reset");
      await io.homePage.loadingTime();
      await io.homePage.fill(selectors.homePagePO.EMAIL, "qaautomation1+emailsuite@celigo.com");
      await io.homePage.click(selectors.basePagePO.SUBMIT);
      const webLink = new URL(process.env.IO_UI_CONNECTOR_URL);
      await page.waitForTimeout(5000);
      link = await io.emailVal.getLinkFromEmail(
        `[${webLink.host}] Request to reset your password`, false, "pwqa1"
      );
      await io.homePage.navigateTo(link.toString());
      await io.homePage.loadingTime();
    });
    test("@Env-All C55953_C55952_C55971_C67012_C55954 Verify the user is able to save the newly set password successfully via email reset password link &  Verify all the available fields in the Rest password page after navigating to the page via email link & Verify when we use an old password that was set in the last 20 passwords we should get an error in the reset password page & Verify the user is able to reset their password if they forget it, and this should not affect the new sign-up process & Verify that we should get an error message if we try to reset password using the a link which is older and expired", async ({
      io,
      page
    }) => {
      //Verify all the available fields in the Rest password page after navigating to the page via email link
      
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

      //Verify when we use an old password that was set in the last 20 passwords we should get an error in the reset password page
      
      await io.homePage.fill(selectors.loginPagePO.PASSWORD, "Celigo@123");
      await io.homePage.delay(1000 * 60 * 2);
      await io.homePage.getByRoleClick("button", "Save");
      await io.assert.verifyElementDisplayedByText(
        "You are not allowed to choose a password that matches with the previous 20 passwords. Please choose another password.",
        "Reused password error message is not displayed"
      );

      //Verify the user is able to save the newly set password successfully via email reset password link & Verify the user is able to reset their password if they forget it, and this should not affect the new sign-up process
      
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
      await io.homePage.addStep("Verified user is able to login successfully");
      await io.homePage.loadingTime();
      
      //Verify that we should get an error message if we try to reset password using the a link which is older and expired
      await io.flowBuilder.click(selectors.basePagePO.ACCOUNT_BUTTON);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
      await io.homePage.loadingTime();
      await io.homePage.navigateTo(link.toString());
      await io.homePage.loadingTime();
      await io.assert.verifyElementDisplayedByText(
        "The reset password link is no longer valid. Enter your email address to receive a link to reset your password.",
        "Expired link error message is not displayed"
      );
      await io.homePage.navigateTo(process.env["IOURL"]);
      await io.homePage.loadingTime();
      await io.loginPage.fill(selectors.loginPagePO.EMAIL, process.env["IO_UserName"]);
      await io.loginPage.fill(selectors.loginPagePO.PASSWORD, process.env["IO_Password"]);
      await io.loginPage.click(selectors.loginPagePO.SIGN_IN_BUTTON); 
    });
  }
);
