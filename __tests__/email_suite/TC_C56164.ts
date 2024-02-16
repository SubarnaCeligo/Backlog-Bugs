import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.skip(
  "C56164 Verify the error message is getting displayed if we click on the link in Invite user email with an active session /accept-invite:token?",
  () => {
    test("C56164 Verify the error message is getting displayed if we click on the link in Invite user email with an active session /accept-invite:token?", async ({
      io,
      page
    }) => {
      await io.homePage.navigateTo(
        process.env.IO_UI_CONNECTOR_URL +
          "accept-invite:token?email=" +
          process.env.IO_EMAIL_ACCOUNT
      );
      await io.homePage.click(selectors.basePagePO.SUBMIT);
      const link = await io.emailVal.getLinkFromEmail(
        "[staging.integrator.io] Request to reset your password"
      );
      await io.homePage.navigateTo(link.toString());
      await io.assert.verifyElementDisplayedByText(
        "You already have an active session running.",
        "SPlease signout from the account and try again."
      );
    });
  }
);
