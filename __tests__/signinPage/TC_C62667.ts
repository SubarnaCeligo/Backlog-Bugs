import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C62667_To verify that the iFrame is loaded for Sign up page", () => {
  test("C62667_To verify that the iFrame is loaded for Sign up page UI_Backlog", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    await io.homePage.click(selectors.loginPagePO.SIGNUP_SIGNIN_FOOTER);
    expect(page.url()).toContain("/signup");
    // Validating  loaded for Sign up page
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.CELIGO_LOGO, "Celigo logo is not displayed");
    await expect(page.locator("h3").filter({ hasText: "Sign up" })).toBeVisible();
  });
}
);
