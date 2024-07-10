import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { randomString, randomNumber } from "@celigo/aut-utilities";

test.describe("T968 Verify with all possible HTML tags in name field in the signup form.", () => {
  test("@Epic-IO-86262 @Priority-P2 @Zephyr-IO-T968 @Env-All Verify with all possible HTML tags in name field in the signup form.", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.loadingTime();
    await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    await io.homePage.loadingTime();
    await io.signInPage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "signup");
    await io.homePage.loadingTime();
    // name with HTML characters
    await io.signInPage.fill(selectors.basePagePO.NAME, "Test Auto<h1>Test<h1>");
    let email = `qaautomation1+${
      randomString(5) + randomNumber(5)
    }emailsuite@celigo.com`;
    await io.signInPage.fill(selectors.loginPagePO.EMAIL, email);
    await io.signInPage.fill(selectors.loginPagePO.COMPANY, "Celigo");
    await io.signInPage.click(selectors.basePagePO.AGREETOSANDPP);
    await io.signInPage.click(selectors.loginPagePO.SIGN_UP_BUTTON);
    await page.waitForTimeout(5000);
    let validationMsg = await page.getByText("Name is in invalid format.");
    expect(await validationMsg.isVisible()).toBeTruthy();
    await io.signInPage.fill(selectors.basePagePO.NAME, "Test Auto,Test.");
    await io.signInPage.click(selectors.loginPagePO.SIGN_UP_BUTTON);
    await page.waitForTimeout(5000);
    expect(await validationMsg.isVisible()).toBeTruthy();
  });
}
);