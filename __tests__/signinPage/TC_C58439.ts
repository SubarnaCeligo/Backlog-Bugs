import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(
  "C58439 Verify if we are entering to /signin we are navigating to homepage when there is an active session in the browser",
  () => {
    test("C58439 Verify if we are entering to /signin we are navigating to homepage when there is an active session in the browser", async ({
      io,
      page
    }) => {
      await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
      await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "signin");
      await page.waitForURL("/home");
      expect(page.url()).toContain("/home");
      await io.homePage.addStep("Verified user is navigated to homepage");
    });
  }
);
