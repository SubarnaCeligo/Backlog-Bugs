import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C59861 To verify that the User is able to sign up from EU sign in page", () => {
  test("@Env-All @Zephyr-IO-T1109 C59861 To verify that the User is able to sign up from EU sign in page", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo("https://eu.integrator.io/signup");
    await io.homePage.loadingTime()
    await io.assert.verifyElementDisplayedByText("Sign up with Google","Sign up with Google is not displayed");
    await io.homePage.fill(`${selectors.signUpPagePO.NAME} input`, 'Test Account');
    await io.homePage.fill(`${selectors.signUpPagePO.EMAIL} input`, 'invalidEmailValidation@celigo.com');
    await io.homePage.fill(`${selectors.signUpPagePO.COMPANY} input`, 'Test');
    await io.homePage.click(selectors.signUpPagePO.AGREETOSANDPP);
    await io.homePage.click(selectors.signUpPagePO.SIGNUP);
  });
});
