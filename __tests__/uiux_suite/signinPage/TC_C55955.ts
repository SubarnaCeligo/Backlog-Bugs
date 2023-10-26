import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C55955 Verify clicking on cancel button in the reset password page is navigating to the signin page", () => {
  test.beforeEach("Sign out", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    const isNotLoggedIn = await io.loginPage.checkLoginState();
    if (!isNotLoggedIn) {
      await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT);
      await page.hover(selectors.basePagePO.ACCOUNT);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    }
  });
  test("C55955 Verify clicking on cancel button in the reset password page is navigating to the signin page", async ({
    io,
    page
  }) => {
    const link = await io.emailVal.getLinkFromEmail(
      "[staging.integrator.io] Request to reset your password"
    );
    await io.homePage.navigateTo(link);
    await page.getByRole("link", { name: "Cancel" }).click();
    await io.homePage.addStep("Clicked on Cancel button");
    const regex = /signin$/;
    await page.waitForURL(regex);
    expect(page.url()).toContain("signin");
    await io.homePage.addStep("Verified expired link error message is displayed");
  });
});
