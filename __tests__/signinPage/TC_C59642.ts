import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C58439 Verify after clicking on "https://www.celigo.com/platform/free\-trial/" Link User is re-directing to "https://integrator.io/signup" Page.`, () => {
  test(`@Env-All @Zephyr-IO-T1112 C59642 Verify after clicking on "https://www.celigo.com/platform/free\-trial/" Link User is re-directing to "https://integrator.io/signup" Page.`, async ({
    io,
    page
  }) => {
    await io.homePage.navigateTo("https://staging.celigo.com/platform");
    await io.homePage.loadingTime();
    await io.homePage.clickByTextByIndex('Free Trial', 0)
    await io.homePage.loadingTime();
    await io.homePage.addStep("Clicked on Free Trial Link");
    await io.assert.expectToContainValue(
      "https://integrator.io/signup",
      page.url(),
      "User is not re-directing to https://integrator.io/signup Page."
    );
  });
});
