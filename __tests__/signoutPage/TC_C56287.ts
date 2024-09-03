import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe("C56287 Verify if the user is navigating to signup page (/signup?) by clicking on the link in the sign in page", () => {
   test.beforeEach('check sign out', async ({ io, page }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    const isNotLoggedIn = await io.loginPage.checkLoginState();
    if (!isNotLoggedIn) {
      await io.homePage.waitForElementAttached(selectors.loginPagePO.EMAIL);
      async function attemptSignIn() {
        await io.signInPage.fill(selectors.loginPagePO.EMAIL, process.env["IO_UserName"]);
        await io.signInPage.fill(selectors.loginPagePO.PASSWORD, decrypt(process.env["IO_Password"]));
        await io.signInPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
      }
      await attemptSignIn();
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
        if (errorMessage) {
          const waitSeconds = parseInt(match[1]);
          console.log('Waiting for', waitSeconds, 'seconds before retrying');
          await page.waitForTimeout(waitSeconds * 1000);
          console.log('Retrying sign-in after wait');
          await attemptSignIn();
        }
      }
    }
  })
  test("@Env-All @Zephyr-IO-T1103 C56287 Verify if the user is navigating to signup page (/signup?) by clicking on the link in the sign in page", async ({
    io,
    page
  }) => {
    await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    await io.homePage.click(selectors.loginPagePO.SIGNUP_SIGNIN_FOOTER);
    expect(page.url()).toContain("/signup");
    await io.homePage.addStep("Verified user is navigated to signup page");
    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.CELIGO_LOGO,
      "Celigo logo is not displayed"
    );
    await expect(
      page.locator("h3").filter({ hasText: "Sign up" })
    ).toBeVisible();
    await io.homePage.addStep("Verified Sign up text is displayed");

    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.ADD_NAME,
      "Name field is not displayed"
    );
    await io.homePage.addStep("Verified Name field is displayed");

    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.EMAIL,
      "Business email field is not displayed"
    );
    await io.homePage.addStep("Verified Business email field is displayed");

    await io.assert.verifyElementIsDisplayed(
      selectors.loginPagePO.COMPANY,
      "Company field is not displayed"
    );

    await io.homePage.addStep("Verified Company field is displayed");

    await io.assert.verifyElementIsDisplayed(
      selectors.signUpPagePO.PHONE,
      "Phone field is not displayed"
    );
    await io.homePage.addStep("Verified Phone field is displayed");

    await io.assert.verifyElementIsDisplayed(
      "#agreeTOSAndPP",
      "I agree to the Terms of Service and Privacy Policy checkbox is not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.loginPagePO.SIGN_UP_BUTTON,
      "Sign up button is not displayed"
    );
    await io.assert.verifyElementIsDisplayed(
      selectors.loginPagePO.SIGNUP_SIGNIN_FOOTER,
      "Sign in link is not displayed"
    );
  });
}
);
