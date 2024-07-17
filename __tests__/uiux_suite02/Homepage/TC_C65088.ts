import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C65088 Verify left navigation bar static, and displaying top-level actions.", () => {
  test("@Env-All @Zephyr-IO-T22198 C65088 Verify left navigation bar static, and displaying top-level actions.", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.loadingTime()
    await io.homePage.isPageLoaded()
    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.LEFT_NAV,
      "Left nav is not visible"
    );
    await io.homePage.addStep("Verified left nav is visible");
    await expect(page.locator(selectors.basePagePO.HOME)).toBeVisible();
    await io.homePage.addStep("Verified 'Home' is visible in the left nav");
    await expect(page.locator(selectors.basePagePO.DASHBOARD)).toBeVisible();
    await io.homePage.addStep("Verified 'Dashboard' is visible in the left nav");
    await expect(page.locator(selectors.basePagePO.TOOLS)).toBeVisible();
    await io.homePage.addStep("Verified 'Tools' is visible in the left nav");
    await expect(page.locator(selectors.basePagePO.RESOURCES)).toBeVisible();
    await io.homePage.addStep("Verified 'Resources' is visible in the left nav");
    await expect(page.locator(selectors.basePagePO.MARKETPLACE)).toBeVisible();
    await io.homePage.addStep(
      "Verified 'Marketplace' is visible in the left nav"
    );
    await expect(page.locator(selectors.homePagePO.HELPER_MENU)).toBeVisible();
    await io.homePage.addStep("Verified 'Help' is visible in the left nav");
  });
});
