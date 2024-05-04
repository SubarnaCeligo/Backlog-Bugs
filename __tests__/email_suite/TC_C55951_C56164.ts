import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(
  "C55951_C56164",
  () => {
    test("@Env-All @Zephyr-IO-T982 @Zephyr-IO-T1080 @Zephyr-IO-T7038 C55951_C56164 Verify when clicked on reset password link in(/reset-password:token?) in forgot password email error should be thrown if there is an active session in browser and /accept-invite:token?", async ({
      io,
      page
    }) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.loadingTime();
      await io.homePage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "request-reset");
      await io.homePage.loadingTime();
      await io.homePage.delay(1000 * 60 * 3);
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