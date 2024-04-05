import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C102561 Verify if we hover over item/sub menu, It should highlighted.", () => {
  test("C102561 Verify if we hover over item/sub menu, It should highlighted.", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.click(selectors.homePagePO.HOME_PROFILE_MENU);
    await io.homePage.addStep("Hovered over 'Account'");
    await expect(page.locator(selectors.homePagePO.HOME_PROFILE_MENU)).toHaveCSS(
      "background-color",
      "rgb(240, 245, 249)"
    );
    await io.homePage.addStep("Verified menu item is highlighted");
  });
});
