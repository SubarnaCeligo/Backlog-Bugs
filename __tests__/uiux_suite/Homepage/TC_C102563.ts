import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C102563 Verify White checkmarks is showing for active section", () => {
  test("C102563 Verify White checkmarks is showing for active section", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.hover(selectors.basePagePO.ACCOUNT);
    await io.homePage.addStep("Hovered over 'Account'");
    await io.homePage.click(selectors.myAccountPagePO.PROFILE);
    const profile = page.locator(selectors.myAccountPagePO.PROFILE);
    await expect(profile.locator(selectors.basePagePO.CHECK_ICON)).toBeVisible();
    await io.homePage.addStep(
      "Verified White checkmarks is showing for active section"
    );
  });
});
