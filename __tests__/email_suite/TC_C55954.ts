import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { randomString, randomNumber } from "@celigo/aut-utilities";

test.describe.skip(
  "C55954 Verify that we should get an error message if we try to reset password using the a link which is older and expired",
  () => {
    test.beforeEach("Sign out", async ({ io, page }) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.flowBuilder.loadingTime();
      const isNotLoggedIn = await io.loginPage.checkLoginState();
      if (!isNotLoggedIn) {
        await io.flowBuilder.click(selectors.basePagePO.ACCOUNT_BUTTON);
        await io.homePage.click(selectors.basePagePO.SIGN_OUT);
      }
    });
    test("C55954 Verify that we should get an error message if we try to reset password using the a link which is older and expired", async ({
      io,
      page
    }) => {
      await io.homePage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "request-reset");
      await io.homePage.loadingTime();
      await io.homePage.fill(selectors.homePagePO.EMAIL, "qaautomation1+emailsuite@celigo.com");
      await io.homePage.click(selectors.basePagePO.SUBMIT);
      await page.waitForTimeout(5000);
      const webLink = new URL(process.env.IO_UI_CONNECTOR_URL);
      const link = await io.emailVal.getLinkFromEmail(`[${webLink.host}] Request to reset your password`, false, "pwqa1");
      const password = "C!e" + randomString(5) + randomNumber(5);
      await io.homePage.navigateTo(link.toString());
      await io.homePage.loadingTime();
      await io.homePage.fill(selectors.loginPagePO.PASSWORD, password);
      await io.homePage.clickByTextByIndex("Save", 0);
      await page.waitForTimeout(10000);
      await io.homePage.navigateTo(link.toString());
      await io.homePage.loadingTime();
      await io.assert.verifyElementDisplayedByText(
        "The reset password link is no longer valid. Enter your email address to receive a link to reset your password.",
        "Expired link error message is not displayed"
      );
    });
  }
);
