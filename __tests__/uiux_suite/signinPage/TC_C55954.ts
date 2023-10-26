import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C55954 Verify that we should get an error message if we try to reset password using the a link which is older and expired", () => {
  test.beforeEach("Sign out", async ({ io, page }) => {
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    const isNotLoggedIn = await io.loginPage.checkLoginState();
    if (!isNotLoggedIn) {
      await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT);
      await page.hover(selectors.basePagePO.ACCOUNT);
      await io.homePage.click(selectors.basePagePO.SIGN_OUT);
    }
  });
  test("C55954 Verify that we should get an error message if we try to reset password using the a link which is older and expired", async ({
    io,
    page
  }) => {
    const link = await io.emailVal.getLinkFromEmail(
      "[staging.integrator.io] Request to reset your password"
    );
    await io.homePage.navigateTo(link);
    await io.homePage.fill(selectors.loginPagePO.PASSWORD, "123");
    await page.getByRole("button", { name: "Save" }).click();
    await io.homePage.addStep("Clicked on save button");
    await expect(
      page.getByText("Sorry, the link to reset your password has expired")
    ).toBeVisible();
    await io.homePage.addStep("Verified expired link error message is displayed");
  });
});
