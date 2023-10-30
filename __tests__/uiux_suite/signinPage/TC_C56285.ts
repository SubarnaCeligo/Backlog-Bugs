import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.skip(
  "C56285 Verify if we are able submit a request to provide the password reset link and cancel the request in the forgot password page",
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
    test("C56285 Verify the user is able to save the newly set password successfully via email reset password link", async ({
      io,
      page
    }) => {
      await io.homePage.navigateTo(
        "https://staging.integrator.io/request-reset?email=qaautomation1@celigo.com"
      );
      await io.homePage.click(selectors.basePagePO.SUBMIT);
      await page.waitForTimeout(5000);
      const link = await io.emailVal.getLinkFromEmail(
        "[staging.integrator.io] Request to reset your password"
      );
      await io.homePage.navigateTo(link);
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
      await page.getByRole("button", { name: "Save" }).click();
      await io.homePage.addStep("Clicked on save button");
      await io.loginPage.fill(
        selectors.loginPagePO.EMAIL,
        "qaautomation1@celigo.com"
      );
      await io.loginPage.fill(selectors.loginPagePO.PASSWORD, randomString);
      await io.loginPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
      const regex = /home$/;
      await page.waitForURL(regex);
      expect(page.url()).toContain("home");
      await io.homePage.addStep("Verified user is able to login successfully");
    });
    test("C56285 Verify the user is able to cancel and redirected to signin page", async ({
      io,
      page
    }) => {
      await io.homePage.navigateTo(
        "https://staging.integrator.io/request-reset?email=qaautomation1@celigo.com"
      );
      await page.getByRole("link", { name: "Cancel" }).click();
      const regex = /signin$/;
      await page.waitForURL(regex);
      expect(page.url()).toContain("signin");
      await io.homePage.addStep("Verified user is redirected to signin page");
    });
  }
);
