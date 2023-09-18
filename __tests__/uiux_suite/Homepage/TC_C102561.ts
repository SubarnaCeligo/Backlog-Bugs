import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C102561 Verify if we hover over item/sub menu, It should highlighted.", () => {
  test("C102561 Verify if we hover over item/sub menu, It should highlighted.", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await page.hover(selectors.basePagePO.ACCOUNT);
    await io.homePage.addStep("Hovered over 'Account'");
    await expect(page.locator(selectors.basePagePO.ACCOUNT)).toHaveCSS(
      "background-color",
      "rgb(51, 61, 71)"
    );
    await io.homePage.addStep("Verified menu item is highlighted");
  });
});
