import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { randomString, randomNumber } from "@celigo/aut-utilities";

test.describe("T1088_T991 Verify all the available fields in the Create password page after navigating to the page via email link in activate account email and validate the create process", () => {
  test("@Epic-IO-86262 @Priority-P2 @Zephyr-IO-T1088 @Zephyr-IO-T991 @Env-All Verify all the available fields in the Create password page after navigating to the page via email link in activate account email and validate the create process", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.SIGNIN_PAGE_URL);
    await io.homePage.loadingTime();
    const isNotLoggedIn = await io.loginPage.checkLoginState();
    if (isNotLoggedIn) {
      await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
      await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
      await io.homePage.loadingTime();
    }
    await io.signInPage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "signup");
    await io.homePage.loadingTime();
    await io.signInPage.fill(selectors.basePagePO.NAME, "Test Auto");
    let email = `qaautomation1+${
      randomString(5) + randomNumber(5)
    }emailsuite@celigo.com`;
    await io.signInPage.fill(selectors.loginPagePO.EMAIL, email);
    await io.signInPage.fill(selectors.loginPagePO.COMPANY, "Celigo");
    await io.signInPage.click(selectors.basePagePO.AGREETOSANDPP);
    await io.signInPage.click(selectors.loginPagePO.SIGN_UP_BUTTON);
    await page.waitForTimeout(5000);
    let link = await io.emailVal.getLinkFromEmail(
      "Activate your Celigo staging.integrator.io account",
      true,
      "pwqa1"
    );
    await io.homePage.navigateTo(io.data.links.SIGNIN_PAGE_URL);
    const isNotLoggedIn2 = await io.loginPage.checkLoginState();
    if (isNotLoggedIn2) {
      await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
      await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
      await io.homePage.loadingTime();
    }
    await io.homePage.navigateTo(link[0].split("<br>")[0]);
    await io.homePage.loadingTime();
    let createMsg = await page.getByText("Create your password");
    expect(await createMsg.isVisible()).toBeTruthy();
    expect(await page.isVisible(selectors.loginPagePO.PASSWORD)).toBeTruthy();
    const password = "C!" + randomString(5) + randomNumber(5);
    await io.signInPage.fill(selectors.loginPagePO.PASSWORD, password);
    let validationMsg = await page.getByText("Contains at least one capital letter");
    expect(await validationMsg.isVisible()).toBeTruthy();
    await io.signInPage.click(selectors.basePagePO.SUBMIT);
    await io.homePage.loadingTime();
    expect(await createMsg.isVisible()).toBeFalsy();
  });
}
);