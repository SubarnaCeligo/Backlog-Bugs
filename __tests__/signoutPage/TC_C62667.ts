import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe("C62667_To verify that the iFrame is loaded for Sign up page", () => {
  test.beforeEach('check sign out', async ({ io, page }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
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
          await io.signInPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
      }
    }
  })
  test("@Env-All @Zephyr-IO-T1115 C62667_To verify that the iFrame is loaded for Sign up page UI_Backlog", async ({ io, page }) => {
    await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    await io.homePage.click(selectors.loginPagePO.SIGNUP_SIGNIN_FOOTER);
    expect(page.url()).toContain("/signup");
    // Validating  loaded for Sign up page
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.CELIGO_LOGO, "Celigo logo is not displayed");
    await expect(page.locator("h3").filter({ hasText: "Sign up" })).toBeVisible();
  });
}
);
