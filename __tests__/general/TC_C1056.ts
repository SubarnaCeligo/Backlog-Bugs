
import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt ,randomNumber} from "@celigo/aut-utilities";

test.describe("TC_C1056", () => {
  test.beforeEach(async ({io,page}, testInfo) => {
    await test.step("*** Beginning of Test Suite ***",()=>{});
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
  });

  test("TC_C1056", async ({io,page}, testInfo) => {
    await io.homePage.click(selectors.homePagePO.HOME_PROFILE_MENU);
    await test.step("*** Clicked on Profile Menu ***",()=>{});
    await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    await test.step("*** Clicked on Sign Out Button ***",()=>{});
    await io.homePage.isPageLoaded();
    await io.homePage.click(selectors.loginPagePO.FORGOT_PASSWORD);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    var page1 = (await ((await page.$(selectors.loginPagePO.ENTER_YOUR_EMAIL_TEXT)).textContent())).toString()
    await io.assert.expectToBeValue(page1, "Enter your email address and we will send you a link to reset your password.", "");

    await test.step("*** Verified A request reset password page should be displayed. ***",()=>{});

    await io.homePage.fillWebPage(selectors.loginPagePO.EMAIL, process.env["IO_UserName"]);
    await io.homePage.click(selectors.loginPagePO.SIGN_IN_BUTTON);
    await io.homePage.isPageLoaded();
    await io.homePage.isPageReady();
    await test.step("*** Entered Email ***",()=>{});
    let text = (await ((await page.$(selectors.loginPagePO.ENTER_YOUR_EMAIL_TEXT)).textContent())).toString()
    await io.assert.expectToContainValue(`Check your email for a link to reset your password.`,text, "");
  });
});
