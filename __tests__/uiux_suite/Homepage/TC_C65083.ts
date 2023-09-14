import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C65083 Verify Relocated the “Help” option from the left navigation bar to the left nav in the bottom left corner.", () => {
  test("C65083 Verify Relocated the “Help” option from the left navigation bar to the left nav in the bottom left corner.", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    const leftNav = page.locator(".MuiDrawer-root.MuiDrawer-docked > div");
    await expect(leftNav.locator('[data-test="Help"]')).toBeVisible();
    await io.homePage.addStep("Verified 'Help' is visible in the left nav");
  });
});
