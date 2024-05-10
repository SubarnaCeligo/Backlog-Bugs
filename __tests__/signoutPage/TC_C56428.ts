import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe("C56428 Verify refreshing on signin/ request reset/ forgot password/ accept invite pages should stay", () => {
  test.beforeEach("C56428 Signing out", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    const isNotLoggedIn = await io.loginPage.checkLoginState();
    if (!isNotLoggedIn) {
      await io.homePage.waitForElementAttached(selectors.loginPagePO.EMAIL);
      await io.signInPage.fill(selectors.loginPagePO.EMAIL, process.env["IO_UserName"]);
      await io.signInPage.fill(selectors.loginPagePO.PASSWORD, decrypt(process.env["IO_Password"]));
      await io.signInPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
      const maxWaitTime = 30000;
      const startTime = Date.now();
      let errorMessage;
      let match;
      while (!match && (Date.now() - startTime) < maxWaitTime) {
          await page.waitForTimeout(2000); 
          const pageContent = await page.content();
          const errorMessageRegex = /Please try again after (\d+) seconds/;
          match = pageContent.match(errorMessageRegex);
          if (match && match[1]) {
              errorMessage = match[0];
          }
      }
      if (errorMessage) {
          const waitSeconds = parseInt(match[1]);
          await page.waitForTimeout(waitSeconds * 1000);
          console.log('Waiting time is', waitSeconds)
          await io.signInPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
          console.log('After successfully wait clicked signin')
      }
    }
  });

  test("@Env-All @Zephyr-IO-T17010 C56428 Sign in page", async ({ io, page }) => {
    await test.step("Sign in page", async () => {
      await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
      await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
      await io.homePage.waitForElementAttached(selectors.basePagePO.SUBMIT);
      await io.homePage.addStep("Reloading the page");
      await io.homePage.reloadPage();
      await io.assert.verifyElementIsDisplayed(selectors.basePagePO.SUBMIT, "Sign in is not displayed");
      await io.assert.verifyElementIsDisplayed(selectors.loginPagePO.EMAIL, "Email is not displayed");
      await io.assert.verifyElementIsDisplayed(selectors.loginPagePO.PASSWORD, "Password is not displayed");
    });

    await test.step("Forgot password page", async () => {
      await io.signInPage.click(selectors.loginPagePO.FORGOT_PASSWORD);
      await io.signInPage.reloadPage();
      await io.assert.verifyElementContainsText(selectors.basePagePO.H3_TEXT_SELECTOR, 'Forgot your password?');
      await io.assert.verifyElementIsDisplayed(selectors.basePagePO.SUBMIT, "Submit is not displayed");
      await io.assert.verifyElementIsDisplayed(selectors.loginPagePO.EMAIL_ID, "Email is not displayed");
    });
  });
});