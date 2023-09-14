import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C102559 Verify Hovering over any item that contains a sub-level menu will expand the sub-level menu", () => {
  test("C102559 Verify Hovering over any item that contains a sub-level menu will expand the sub-level menu", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await page.hover('[data-test="Account"]');
    await io.homePage.addStep("Hovered over 'Account'");
    await io.assert.verifyElementIsDisplayed(
      selectors.homePagePO.SIGN_OUT,
      "Sub-menu is not visible"
    );
  });
});
