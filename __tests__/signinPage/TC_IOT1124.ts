import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("@Author-MayankOmar IO-T1124 Verify the NA region login screen when creating a shopify connection from the app store", () => {

  test("@Env-All @Zephyr-IO-T1124 C52784 Verify the NA region login screen when creating a shopify connection from the app store", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(
      "https://qa.staging.integrator.io/signin?application=shopify"
    );
    await io.homePage.addStep("*** Navigated to Shopify  Signin page ***");
    await io.homePage.loadingTime();
    const emailInput = await page.$(selectors.loginPagePO.EMAIL);
    const password = await page.$(selectors.loginPagePO.PASSWORD);
    const signinButton = await page.$(selectors.loginPagePO.SIGN_IN_BUTTON);
    const forgotPassword = await page.$(selectors.loginPagePO.FORGOT_PASSWORD);

    expect(emailInput).not.toBeNull();
    await io.homePage.addStep("*** Validating Email Input Box is Present  ***");
    expect(password).not.toBeNull();
    await io.homePage.addStep("*** Validating Password Input Box is Present  ***");
    expect(signinButton).not.toBeNull();
    await io.homePage.addStep("*** Validating Signin Button is Present  ***");
    expect(forgotPassword).not.toBeNull();
    await io.homePage.addStep("*** Validating Forgot Password Button is Present  ***");
    await io.assert.verifyElementDisplayedByText(
      "Sign in with Google",
      "'Sign in with Google' text is not displayed"
    );
    await io.homePage.addStep("*** Validating Signin With Google option is Present  ***");
    await io.assert.verifyElementDisplayedByText(
        "EU account sign in",
        "Switch to EU domain link  is not Present"
      );
    await io.homePage.addStep("*** Validating Switch To EU link  is Present  ***");
    await io.assert.verifyElementDisplayedByText(
        "Sign up",
        "Sign up link is not Present"
      );
    await io.homePage.addStep("*** Validating Signup link  is Present  ***");

  });
});
