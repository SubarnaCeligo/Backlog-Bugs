import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C55971 Verify when we use an old password that was set in the last 20 passwords we should get an error in the reset password page", () => {
  test.beforeEach("Sign out", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    const isNotLoggedIn = await io.loginPage.checkLoginState();
    if (!isNotLoggedIn) {
      await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT);
      await page.hover(selectors.basePagePO.ACCOUNT);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    }
  });
  test("C55971 Verify when we use an old password that was set in the last 20 passwords we should get an error in the reset password page", async ({
    io,
    page
  }) => {
    const link = await io.emailVal.getLinkFromEmail(
      "[staging.integrator.io] Request to reset your password"
    );
    await io.homePage.navigateTo(link);
    await io.homePage.fill(selectors.loginPagePO.PASSWORD, "Celigo@123");
    await page.getByRole("button", { name: "Save" }).click();
    await io.homePage.addStep("Clicked on save button");
    await expect(
      page.getByText(
        "You are not allowed to choose a password that matches with the previous 20 passwords. Please choose another password."
      )
    ).toBeVisible();
    await io.homePage.addStep(
      "Verified reused password error message is displayed"
    );
  });
});
