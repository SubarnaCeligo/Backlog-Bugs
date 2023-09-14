import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C65088 Verify left navigation bar static, and displaying top-level actions.", () => {
  test("C65088 Verify left navigation bar static, and displaying top-level actions.", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    const leftNav = page.locator(".MuiDrawer-root.MuiDrawer-docked > div");
    await expect(leftNav).toBeVisible();
    await io.homePage.addStep("Verified left nav is visible");
    await expect(leftNav.locator('[data-test="Home"]')).toBeVisible();
    await io.homePage.addStep("Verified Home is visible in the left nav");
    await expect(
      leftNav.locator('[data-test="account-dashboard"]')
    ).toBeVisible();
    await io.homePage.addStep(
      "Verified Account Dashboard is visible in the left nav"
    );
    await expect(leftNav.locator('[data-test="Tools"]')).toBeVisible();
    await io.homePage.addStep("Verified Tools is visible in the left nav");
    await expect(leftNav.locator('[data-test="Resources"]')).toBeVisible();
    await io.homePage.addStep("Verified Resources is visible in the left nav");
    await expect(leftNav.locator('[data-test="Marketplace"]')).toBeVisible();
    await io.homePage.addStep("Verified Marketplace is visible in the left nav");
    await expect(leftNav.locator('[data-test="Help"]')).toBeVisible();
    await io.homePage.addStep("Verified Help is visible in the left nav");
    await expect(leftNav.locator('[data-test="Account"]')).toBeVisible();
    await io.homePage.addStep("Verified Account is visible in the left nav");
  });
});
