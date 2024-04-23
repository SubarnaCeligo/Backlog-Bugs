import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.skip(
  "C55955 Verify clicking on cancel button in the reset password page is navigating to the signin page",
  () => {
    test.beforeEach("Sign out", async ({ io, page }) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      const isNotLoggedIn = await io.loginPage.checkLoginState();
      if (!isNotLoggedIn) {
        await io.homePage.waitForElementAttached(selectors.basePagePO.ACCOUNT);
        await io.homePage.hover(selectors.basePagePO.ACCOUNT);
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
      await io.homePage.navigateTo(link.toString());
      await io.homePage.getByRoleClick("link", "Cancel");
      const regex = /signin$/;
      await page.waitForURL(regex);
      await io.assert.expectToContainValue(
        "signin",
        page.url(),
        "URL doesn't contain signin"
      );
    });
  }
);
