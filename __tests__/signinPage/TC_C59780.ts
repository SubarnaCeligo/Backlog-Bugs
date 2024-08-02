import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C59780 Verify the revised error text when sign up with without agreeing t&c", () => {
  test("@Env-All @Zephyr-IO-T1382 C59780 Verify the revised error text when sign up with without agreeing t&c", async ({
    io,
  }) => { 
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime()
    await io.flowBuilder.click(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    await io.homePage.loadingTime();
    await io.homePage.click(selectors.loginPagePO.SIGNUP_SIGNIN_FOOTER);
    await io.homePage.loadingTime();
    await io.homePage.fill(`${selectors.signUpPagePO.NAME} input`, 'Test Account');
    await io.homePage.fill(`${selectors.signUpPagePO.EMAIL} input`, 'invalidEmailValidation@celigo.com');
    await io.homePage.fill(`${selectors.signUpPagePO.COMPANY} input`, 'Test');
    await io.homePage.click(selectors.signUpPagePO.SIGNUP);
    const errorMsg = (await io.homePage.getText(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR)).toString();
    await io.assert.expectToContainValue('You must agree to the Terms of Service / Service Subscription Agreement and Privacy Policy to continue.', errorMsg, "Error is not showing properly");
  });
});
