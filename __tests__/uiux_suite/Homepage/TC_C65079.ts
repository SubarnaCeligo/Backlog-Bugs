import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('C65079 Verify sub-menu option of "Help" is showing after hovering on "Help" option.', () => {
  test('C65079 Verify sub-menu option of "Help" is showing after hovering on "Help" option.', async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await page.hover('[data-test="Help"]');
    await io.homePage.addStep("Hovered over 'Help'");
    await io.assert.verifyElementIsDisplayed(
      '[data-test="help_center"]',
      "Sub-menu is not visible"
    );
  });
});
