import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C59659 Verify sample url link for Sign up Page", () => {
  test("C59659 Verify sample url link for Sign up Page", async ({ io, page }) => {
    await io.homePage.navigateTo(
      "https://www.celigo.com/integrations/hubspot-netsuite/"
    );
    await page.getByText("Get Started for Free!").click();
    expect(page.url()).toContain("https://integrator.io/signup");
  });
});
