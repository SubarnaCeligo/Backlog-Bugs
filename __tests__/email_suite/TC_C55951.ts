import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(
  "C55951 Verify when clicked on reset password link in(/reset-password:token?) in forgot password email error should be thrown if there is an active session in browser",
  () => {
    test("@Env-All C55951 Verify when clicked on reset password link in(/reset-password:token?) in forgot password email error should be thrown if there is an active session in browser", async ({
      io,
      page
    }) => {
      await io.homePage.navigateTo(
        process.env.IO_UI_CONNECTOR_URL +
          "request-reset?email=" +
          process.env.IO_EMAIL_ACCOUNT
      );
      await io.homePage.click(selectors.basePagePO.SUBMIT);
      const link = await io.emailVal.getLinkFromEmail(
        "[staging.integrator.io] Request to reset your password"
      );
      await io.homePage.navigateTo(link.toString());
      await io.assert.verifyElementDisplayedByText(
        "You already have an active session running.",
        "Session running error is not displayed"
      );
    });
  }
);
