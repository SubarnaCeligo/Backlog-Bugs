import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { randomString, randomNumber, decrypt } from "@celigo/aut-utilities";
test.describe("TC_C59779 Verify the hyperlinks for Terms of Service / Service Subscription Agreement and Privacy Policy in sign up page", () => {
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
  test("@Env-All @Zephyr-IO-T1381 TC_C59779 Verify the hyperlinks for Terms of Service / Service Subscription Agreement and Privacy Policy in sign up page", async ({ io }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.flowBuilder.loadingTime();
    await io.homePage.loadingTime()
    await io.homePage.loadingTime()
    await io.homePage.loadingTime()
    await io.homePage.loadingTime()
    await io.homePage.loadingTime()
    await io.homePage.loadingTime()
    await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    await io.homePage.click(selectors.loginPagePO.SIGNUP_SIGNIN_FOOTER);
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.clickByText(
      "Terms of Service / Service Subscription Agreement"
    );
    const page1 = await io.homePage.switchWindow();
    await io.flowBuilder.loadingTime();
    await expect((await page1.title()).toString()).toBe(
      "Terms of Service – Celigo"
    );
    await io.homePage.switchWindow();
    await io.flowBuilder.navigateTo("https://www.celigo.com/privacy/");
    const page2 = await io.homePage.switchWindow();
    await io.flowBuilder.loadingTime();
    expect((await page2.title()).toString()).toBe(
      "Terms of Service – Celigo"
    );
  });
});
