import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.skip(
  "C55951 Verify when clicked on reset password link in(/reset-password:token?) in forgot password email error should be thrown if there is an active session in browser",
  () => {
    test("C55951 Verify when clicked on reset password link in(/reset-password:token?) in forgot password email error should be thrown if there is an active session in browser", async ({
      io,
      page
    }) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.loadingTime();
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
      await io.assert.verifyElementDisplayedByText(
        "You already have an active session running. Please sign out from the account and try again.",
        "Session running error is not displayed"
      );
    });
  }
);
