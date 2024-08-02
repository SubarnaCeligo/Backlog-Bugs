import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C65083 Verify Relocated the “Help” option from the left navigation bar to the left nav in the bottom left corner.", () => {
  test("@Env-All @Zephyr-IO-T22197 C65083 Verify Relocated the “Help” option from the left navigation bar to the left nav in the bottom left corner.", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.loadingTime()
    await io.homePage.isPageLoaded()
    await expect(page.locator(selectors.homePagePO.HELPER_MENU)).toBeVisible();
    await io.homePage.addStep("Verified 'Help' is visible in the left nav");
  });
});
