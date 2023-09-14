import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C102563 Verify White checkmarks is showing for active section", () => {
  test("C102563 Verify White checkmarks is showing for active section", async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo(process.env["IO_UI_CONNECTOR_URL"] + "home");
    await page.hover('[data-test="Account"]');
    await io.homePage.addStep("Hovered over 'Account'");
    await io.homePage.click('[data-test="Profile"]');
    const profile = page.locator('[data-test="Profile"]');
    await expect(profile.locator('[data-testid="CheckIcon"]')).toBeVisible();
    await io.homePage.addStep(
      "Verified White checkmarks is showing for active section"
    );
  });
});
