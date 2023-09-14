import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C102560 Verify caret is showing for items where we have sub menu", () => {
  test("C102560 Verify caret is showing for items where we have sub menu", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await expect(
      page
        .locator('[data-test="Account"]')
        .locator('[data-testid="ArrowRightIcon"]')
    ).toBeVisible();
    await io.homePage.addStep("Verified caret is visible for Account");
    await expect(
      page
        .locator('[data-test="Tools"]')
        .locator('[data-testid="ArrowRightIcon"]')
    ).toBeVisible();
    await io.homePage.addStep("Verified caret is visible for Tools");
    await expect(
      page
        .locator('[data-test="Resources"]')
        .locator('[data-testid="ArrowRightIcon"]')
    ).toBeVisible();
    await io.homePage.addStep("Verified caret is visible for Resources");
    await expect(
      page.locator('[data-test="Help"]').locator('[data-testid="ArrowRightIcon"]')
    ).toBeVisible();
    await io.homePage.addStep("Verified caret is visible for Help");
  });
});
