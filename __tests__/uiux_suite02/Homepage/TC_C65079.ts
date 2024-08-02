import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('C65079 Verify sub-menu option of "Help" is showing after hovering on "Help" option.', () => {
  test('@Env-All @Zephyr-IO-T22194 C65079 Verify sub-menu option of "Help" is showing after hovering on "Help" option.', async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.click(selectors.homePagePO.HELPER_MENU);
    await io.homePage.addStep("Hovered over 'Help'");
    await io.assert.verifyElementIsDisplayed(
      selectors.basePagePO.HELP_CENTER,
      "Sub-menu is not visible"
    );
  });
});
