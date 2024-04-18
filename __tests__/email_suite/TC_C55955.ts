import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(
  "C55955 Verify clicking on cancel button in the reset password page is navigating to the signin page",
  () => {
    test.beforeEach("Sign out", async ({ io, page }) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.loadingTime();
      const isNotLoggedIn = await io.loginPage.checkLoginState();
      if (!isNotLoggedIn) {
        await io.flowBuilder.click(selectors.basePagePO.ACCOUNT_BUTTON);
        await io.homePage.click(selectors.basePagePO.SIGN_OUT);
      }
    });
    test("@Env-All C55955 Verify clicking on cancel button in the reset password page is navigating to the signin page", async ({
      io,
      page
    }) => {
      await io.homePage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "request-reset");
      await io.homePage.loadingTime();
      await io.homePage.fill(selectors.homePagePO.EMAIL, "qaautomation1+emailsuite@celigo.com");
      await io.homePage.click(selectors.basePagePO.SUBMIT);
      const webLink = new URL(process.env.IO_UI_CONNECTOR_URL);
      await page.waitForTimeout(5000);
      const link = await io.emailVal.getLinkFromEmail(
        `[${webLink.host}] Request to reset your password`, false, "pwqa1"
      );
      await io.homePage.navigateTo(link.toString());
      await io.homePage.loadingTime();
      await io.flowBuilder.clickByTextByIndex("Cancel", 0);
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
