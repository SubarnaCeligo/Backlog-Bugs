import { test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('@Author-ashu-g TC_C52880 Sign In with Google & Signup are shown in EU domain Login page', () => {
  test('@Epic-IO-28475 @Priority-P3 @Zephyr-IO-T1134 @Env-All TC_C52880 Sign In with Google & Signup are shown in EU domain Login page', async ({
    io
  }) => {
    await io.myAccountPage.navigateTo(`${process.env.IOURL}?application=shopify`);
    await io.homePage.loadingTime();
    await io.assert.verifyElementDisplayedByText("EU account sign in", "Switch to EU domain link is not present");

    // click on switch to EU domain
    await io.homePage.click(selectors.loginPagePO.EU_SIGN_IN);
    await io.homePage.loadingTime();

    // verify sign in page
    const euLoginUrl = await io.homePage.getCurrentUrl();
    await io.assert.expectToContainValue("eu.integrator.io/signin?application=shopify", euLoginUrl, "Incorrect EU url")
    await io.assert.verifyElementDisplayedByText("Sign in with Google", "'Sign in with Google' text is not displayed");
    await io.assert.verifyElementDisplayedByText("Sign up", "Sign up link is not present");
  });
});