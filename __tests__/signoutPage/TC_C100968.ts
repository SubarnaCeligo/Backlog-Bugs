import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe("C100968 If user tries to forget password for +1 email then + is removing automatically", () => {
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
          console.log('Waiting time is', waitSeconds)
          await io.signInPage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
          console.log('After successfully wait clicked signin')
      }
    }
  })
    test("@Env-All @Zephyr-IO-T25639 C100968 If user tries to forget password for +1 email then + is removing automatically", async ({io, page}) => {
      await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
      await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
      await io.homePage.waitForElementAttached(selectors.loginPagePO.EMAIL);
      await io.homePage.click(selectors.loginPagePO.EMAIL);
      await page.keyboard.type('testaccount+1@celigo.com');
      await io.homePage.click(selectors.loginPagePO.FORGOT_PASSWORD);
      await io.assert.verifyJSElementValue(selectors.loginPagePO.EMAIL, 'testaccount+1@celigo.com')
    });
  });