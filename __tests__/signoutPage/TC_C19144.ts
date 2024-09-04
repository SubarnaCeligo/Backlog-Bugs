import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe("C19144 Verify user is able to proceed further on after entering password with opened eye button", () => {
  test.beforeEach('check sign out', async ({ io, page }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    // const isNotLoggedIn = await io.loginPage.checkLoginState();
    // if (!isNotLoggedIn) {
    //   await io.homePage.waitForElementAttached(selectors.loginPagePO.EMAIL);
    //   async function attemptSignIn() {
    //     await io.signInPage.fill(selectors.loginPagePO.EMAIL, process.env["IO_UserName"]);
    //     await io.signInPage.fill(selectors.loginPagePO.PASSWORD, decrypt(process.env["IO_Password"]));
    //     await io.signInPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
    //   }
    //   await attemptSignIn();
    //   const maxWaitTime = 30000;
    //   const startTime = Date.now();
    //   let errorMessage;
    //   let match;
    //   while (!match && (Date.now() - startTime) < maxWaitTime) {
    //     await page.waitForTimeout(2000);
    //     const pageContent = await page.content();
    //     const errorMessageRegex = /Please try again after (\d+) seconds/;
    //     match = pageContent.match(errorMessageRegex);
    //     if (match && match[1]) {
    //       errorMessage = match[0];
    //     }
    //     if (errorMessage) {
    //       const waitSeconds = parseInt(match[1]);
    //       console.log('Waiting for', waitSeconds, 'seconds before retrying');
    //       await page.waitForTimeout(waitSeconds * 1000);
    //       console.log('Retrying sign-in after wait');
    //       await attemptSignIn();
    //     }
      // }
    // }
  });
  test("@Env-All @Zephyr-IO-T1068 C19144 Verify user is able to proceed further on after entering password with opened eye button", async ({ io, page }) => {
    await io.homePage.loadingTime()
    await io.homePage.loadingTime()
    await io.homePage.loadingTime()
    await io.homePage.loadingTime()
    await io.homePage.loadingTime()
    await io.homePage.loadingTime()
    await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    await io.homePage.waitForElementAttached(selectors.loginPagePO.EMAIL);
    await io.signInPage.fill(selectors.loginPagePO.EMAIL, process.env["IO_UserName"]);
    await io.signInPage.fill(selectors.loginPagePO.PASSWORD, decrypt(process.env["IO_Password"]));
    await io.signInPage.click('.MuiSvgIcon-root');
    await io.myAccountPage.loadingTime()
    await io.signInPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
  });
});