import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C62659_To verify that the Iframe is loaded from Sign in Page for IO", () => {
  test("C62659_To verify that the Iframe is loaded from Sign in Page for IO UI_Backlog", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.ACCOUNT_BUTTON);
    await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    // Validating loaded for Sign in page
    await io.assert.verifyElementIsDisplayed(selectors.basePagePO.CELIGO_LOGO, "Celigo logo is not displayed");
    await expect(page.locator("h3").filter({ hasText: "Sign in" })).toBeVisible();
  });
}
);
