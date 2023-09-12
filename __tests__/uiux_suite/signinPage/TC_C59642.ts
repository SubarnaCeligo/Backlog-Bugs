import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`Verify after clicking on "https://www.celigo.com/platform/free\-trial/" Link User is re-directing to "https://integrator.io/signup" Page.`, () => {
  test(`Verify after clicking on "https://www.celigo.com/platform/free\-trial/" Link User is re-directing to "https://integrator.io/signup" Page.`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo("https://staging.celigo.com/platform");
    await page
      .locator("#main-content a")
      .filter({ hasText: "Free Trial" })
      .first()
      .click();
    expect(page.url()).toContain("https://integrator.io/signup");
  });
});
