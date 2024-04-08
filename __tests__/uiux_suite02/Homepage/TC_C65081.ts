import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('C65081 Verify "My account" option moved from the top navigation bar to the left nav in the bottom left corner.', () => {
  test('C65081 Verify "My account" option moved from the top navigation bar to the left nav in the bottom left corner.', async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.loadingTime()
    const myAccount = (selectors.homePagePO.HOME_PROFILE_MENU);
    await expect(await page.locator(myAccount)).not.toBeVisible();
    await io.homePage.addStep(
      "Verified My Account is not visible in the top nav"
    );
    await expect(await page.locator(myAccount)).toBeVisible();
    await io.homePage.addStep("Verified My Account is visible in the left nav");
  });
});
