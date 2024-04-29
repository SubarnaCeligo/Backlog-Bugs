import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(
  "C56164 Verify the error message is getting displayed if we click on the link in Invite user email with an active session /accept-invite:token?",
  () => {
    test("@Env-All C56164 Verify the error message is getting displayed if we click on the link in Invite user email with an active session /accept-invite:token?", async ({
      io,
      page
    }) => {
      await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
      await io.homePage.loadingTime();
      await io.homePage.navigateTo(process.env.IO_UI_CONNECTOR_URL + "request-reset");
      await io.homePage.fill(selectors.homePagePO.EMAIL, "qaautomation1+emailsuite@celigo.com");
      await io.homePage.click(selectors.basePagePO.SUBMIT);
      await page.waitForTimeout(15000);
      const webLink = new URL(process.env.IO_UI_CONNECTOR_URL);
      const link = await io.emailVal.getLinkFromEmail(`[${webLink.host}] Request to reset your password`, false, "pwqa1");
      await io.homePage.navigateTo(link.toString());
      await io.homePage.loadingTime();
      await io.assert.verifyElementDisplayedByText("You already have an active session running. Please sign out from the account and try again.", "Please signout from the account and try again.");
    });
  }
);
