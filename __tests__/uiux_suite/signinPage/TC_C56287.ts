import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.skip(
  "C56287 Verify if the user is navigating to signup page (/signup?) by clicking on the link in the sign in page",
  () => {
    test("C56287 Verify if the user is navigating to signup page (/signup?) by clicking on the link in the sign in page", async ({
      io,
      page
    }) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT);
      await page.hover(selectors.basePagePO.ACCOUNT);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
      // todo replace: selectors.loginPagePO.SIGNUP_SIGNIN_FOOTER
      await io.homePage.click('[data-test="signupOrSigninFooter"]');
      expect(page.url()).toContain("/signup");
      await io.homePage.addStep("Verified user is navigated to signup page");
      await io.assert.verifyElementIsDisplayed(
        // todo replace: selectors.basePagePO.CELIGO_LOGO
        '[data-test="celigo-logo"]',
        "Celigo logo is not displayed"
      );
      await expect(
        page.locator("h3").filter({ hasText: "Sign up" })
      ).toBeVisible();
      await io.homePage.addStep("Verified Sign up text is displayed");
      await expect(page.getByPlaceholder("Name*")).toBeVisible();
      await io.homePage.addStep("Verified Name field is displayed");
      await expect(page.getByPlaceholder("Business email*")).toBeVisible();
      await io.homePage.addStep("Verified Business email field is displayed");
      await expect(page.getByPlaceholder("Company")).toBeVisible();
      await io.homePage.addStep("Verified Company field is displayed");
      await expect(page.getByPlaceholder("Phone")).toBeVisible();
      await io.homePage.addStep("Verified Phone field is displayed");
      await io.assert.verifyElementIsDisplayed(
        "#agreeTOSAndPP",
        "I agree to the Terms of Service and Privacy Policy checkbox is not displayed"
      );
      await io.assert.verifyElementIsDisplayed(
        // todo replace: selectors.loginPagePO.SIGN_UP_BUTTON
        '[data-test="Sign up"]',
        "Sign up button is not displayed"
      );
      await io.assert.verifyElementIsDisplayed(
        // todo replace: selectors.loginPagePO.SIGNUP_SIGNIN_FOOTER
        '[data-test="signupOrSigninFooter"]',
        "Sign in link is not displayed"
      );
    });
  }
);
