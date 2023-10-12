import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe.skip(`Verify after clicking on "https://www.celigo.com/platform/free\-trial/" Link User is re-directing to "https://integrator.io/signup" Page.`, () => {
  test(`Verify after clicking on "https://www.celigo.com/platform/free\-trial/" Link User is re-directing to "https://integrator.io/signup" Page.`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo("https://staging.celigo.com/platform");
    await page
      .locator(selectors.basePagePO.MAIN_CONTENT_LINKS)
      .filter({ hasText: "Free Trial" })
      .first()
      .click();
    await io.homePage.addStep("Clicked on Free Trial Link");
    await io.assert.expectToContainValue(
      "https://integrator.io/signup",
      page.url(),
      "User is not re-directing to https://integrator.io/signup Page."
    );
  });
});
