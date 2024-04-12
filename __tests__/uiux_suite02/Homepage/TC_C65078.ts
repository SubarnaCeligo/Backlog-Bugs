import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('C65078 Verify sub-menu option of "My account" is showing after hovering on "My account" option.', () => {
  test('@Env-All C65078 Verify sub-menu option of "My account" is showing after hovering on "My account" option.', async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.loadingTime()
    await io.homePage.click(selectors.homePagePO.HOME_PROFILE_MENU);
    await io.homePage.addStep("Hovered over 'Account'");
    await io.assert.verifyElementIsDisplayed(
      selectors.homePagePO.SIGN_OUT,
      "Sub-menu is not visible"
    );
  });
});
