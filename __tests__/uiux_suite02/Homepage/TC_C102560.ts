import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C102560 Verify caret is showing for items where we have sub menu", () => {
  test("C102560 Verify caret is showing for items where we have sub menu", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await io.homePage.loadingTime()
    await expect(
      page
        .locator(selectors.homePagePO.HOME_PROFILE_MENU)
    ).toBeVisible();
    await io.homePage.addStep("Verified Account is visisble");
    await io.homePage.isPageLoaded()
    await expect(
      page
        .locator("[data-test='Tools']>svg")
    ).toBeVisible();
    await io.homePage.addStep("Verified caret is visible for Tools");
    await expect(
      page
        .locator("[data-test='Resources']>svg")
    ).toBeVisible();
    await io.homePage.addStep("Verified caret is visible for Resources");
  });
});
