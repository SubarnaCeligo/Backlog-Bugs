import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.skip(
  "C55951 Verify when clicked on reset password link in(/reset-password:token?) in forgot password email error should be thrown if there is an active session in browser",
  () => {
    test("C55951 Verify when clicked on reset password link in(/reset-password:token?) in forgot password email error should be thrown if there is an active session in browser", async ({
      io,
      page
    }) => {
      await io.homePage.navigateTo(
        "https://staging.integrator.io/request-reset?email=qaautomation1@celigo.com"
      );
      await io.homePage.click(selectors.basePagePO.SUBMIT);
      const link = await io.emailVal.getLinkFromEmail(
        "[staging.integrator.io] Request to reset your password"
      );
      await io.homePage.navigateTo(link);
      await expect(
        page.getByText("You already have an active session running.")
      ).toBeVisible();
      await io.homePage.addStep(
        "Verified 'You already have an active session running.' is visible"
      );
    });
  }
);
