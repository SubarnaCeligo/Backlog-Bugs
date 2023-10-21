import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

  test.describe.skip("C56428 Verify refreshing on signin/ request reset/ forgot password/ accept invite pages should stay", () => {
    test.beforeEach("C56428 Signing out", async ({io, page}) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      const isNotLoggedIn = await io.loginPage.checkLoginState();
      if(!isNotLoggedIn){
          await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT);
          await page.hover(selectors.basePagePO.ACCOUNT);
          await io.homePage.click(selectors.basePagePO.SIGN_OUT);
      }
    });

    test("Sign in page", async ({io, page}) => {
        await test.step("Sign in page",async ()=>{
            await io.homePage.waitForElementAttached(selectors.basePagePO.SUBMIT);
            await io.homePage.addStep("Reloading the page");
            await page.reload();
            await io.assert.verifyElementIsDisplayed(selectors.basePagePO.SUBMIT, "Sign in is not displayed");
            await io.assert.verifyElementIsDisplayed(selectors.loginPagePO.EMAIL_ID, "Email is not displayed");
            await io.assert.verifyElementIsDisplayed(selectors.loginPagePO.PASSWORD_ID, "Password is not displayed");
        });

        await test.step("Forgot password page",async ()=>{
            await io.signInPage.click(selectors.loginPagePO.FORGOT_PASSWORD);
            await page.reload();
            await io.assert.verifyElementContainsText(selectors.basePagePO.H3_TEXT_SELECTOR, 'Forgot your password?');
            await io.assert.verifyElementIsDisplayed(selectors.basePagePO.SUBMIT, "Submit is not displayed");
            await io.assert.verifyElementIsDisplayed(selectors.loginPagePO.EMAIL_ID, "Email is not displayed");
        });
    });
  });