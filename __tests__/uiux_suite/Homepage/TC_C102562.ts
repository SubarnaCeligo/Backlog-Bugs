import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C102562 Verify for items at the bottom of navigation bar with sub menu", () => {
  test("C102562 Verify for items at the bottom of navigation bar with sub menu", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await page.hover(selectors.basePagePO.ACCOUNT);
    await io.homePage.addStep("Hovered over 'Account'");
    const subMenuTopMargin = await page
      .locator(selectors.basePagePO.ACCOUNT)
      .evaluate(
        e =>
          e.parentElement
            .querySelector("div > div > div > div")
            // @ts-ignore
            .computedStyleMap()
            // @ts-ignore
            .get("margin-top").value
      );
    await io.assert.expectToBeValue(
      subMenuTopMargin,
      "auto",
      "Sub-menu is not visible"
    );
  });
});
