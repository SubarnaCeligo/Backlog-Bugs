import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C59659 Verify sample url link for Sign up Page", () => {
  test("@Env-All @Zephyr-IO-T1113 C59659 Verify sample url link for Sign up Page", async ({ io, page }) => {
    await io.homePage.navigateTo(
      "https://www.celigo.com/integrations/hubspot-netsuite/"
    );
    await page.locator("a").filter({ hasText: "Try for free" }).click();
    await io.homePage.addStep("Clicked on 'Try for free' button");
    await page.waitForURL(/^https:\/\/integrator\.io\/signup/);
    await io.assert.expectToContainValue(
      "https://integrator.io/signup",
      page.url(),
      "User is not re-directing to https://integrator.io/signup Page."
    );
  });
});
