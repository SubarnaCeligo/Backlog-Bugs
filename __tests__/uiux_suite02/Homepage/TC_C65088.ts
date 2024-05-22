import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C65088 Verify left navigation bar static, and displaying top-level actions.", () => {
  test("C65088 Verify left navigation bar static, and displaying top-level actions.", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    const leftNav = page.locator(selectors.basePagePO.LEFT_NAV);
    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.LEFT_NAV,
      "Left nav is not visible"
    );
    await io.homePage.addStep("Verified left nav is visible");
    await expect(leftNav.locator(selectors.basePagePO.HOME)).toBeVisible();
    await io.homePage.addStep("Verified 'Home' is visible in the left nav");
    await expect(leftNav.locator(selectors.basePagePO.DASHBOARD)).toBeVisible();
    await io.homePage.addStep("Verified 'Dashboard' is visible in the left nav");
    await expect(leftNav.locator(selectors.basePagePO.TOOLS)).toBeVisible();
    await io.homePage.addStep("Verified 'Tools' is visible in the left nav");
    await expect(leftNav.locator(selectors.basePagePO.RESOURCES)).toBeVisible();
    await io.homePage.addStep("Verified 'Resources' is visible in the left nav");
    await expect(leftNav.locator(selectors.basePagePO.MARKETPLACE)).toBeVisible();
    await io.homePage.addStep(
      "Verified 'Marketplace' is visible in the left nav"
    );
    // await expect(leftNav.locator(selectors.basePagePO.HELP)).toBeVisible();
    // await io.homePage.addStep("Verified 'Help' is visible in the left nav");
    await expect(leftNav.locator(selectors.basePagePO.ACCOUNT)).toBeVisible();
    await io.homePage.addStep("Verified 'Account' is visible in the left nav");
  });
});
