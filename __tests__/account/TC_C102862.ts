import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C102862 Verify all the available fields in the Forgot your password?(/request-reset) page", () => {
  test("@Env-All @Zephyr-IO-T1101 C56284 Verify all the available fields in the Forgot your password?(/request-reset) page", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    await io.homePage.click(selectors.loginPagePO.SIGNUP_SIGNIN_FOOTER);

    await io.assert.verifyElementNotBeFound("input[placeholder=Role]");

    await io.signInPage.fill(selectors.basePagePO.NAME, "Test Automation");
    const randomNumber = Math.floor(Math.random() * 90000) + 10000;
    await io.signInPage.fill(
      selectors.loginPagePO.EMAIL,
      `testemail+${randomNumber}@celigo.com`
    );
    await io.signInPage.fill(selectors.loginPagePO.COMPANY, "Celigo");
    await io.signInPage.click(selectors.basePagePO.AGREETOSANDPP);
    await io.signInPage.click(selectors.loginPagePO.SIGN_UP_BUTTON);

    await io.homePage.loadingTime();

    const elementText = await (
      await page.$("body")
    ).evaluate(el => el.textContent);
    await io.assert.expectToContainValue(
      "Account successfully created. Please check your inbox for an account activation link.",
      elementText,
      "The page body does not contain account created message"
    );
  });
});
