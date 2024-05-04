import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C61155 Verify If all the NS steps in my integration are solely configured to use SuiteApp then only the SuiteApp installation step has to be shown in the install steps.`, () => {
  test(`@Env-All C61155 Verify If all the NS steps in my integration are solely configured to use SuiteApp then only the SuiteApp installation step has to be shown in the install steps.`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(
      process.env["IO_UI_CONNECTOR_URL"] +
        "marketplace/installTemplate/preview/651aff4f8b3a9978eb23f121"
    );
    await io.homePage.loadingTime()
    await page.getByText("Loading").waitFor({ state: "hidden", timeout:50000 });
    await io.homePage.clickByText("Install now");
    await io.assert.verifyElementDisplayedByText(
      "Integrator SuiteApp",
      "Integrator SuiteApp is not visible"
    );
    await expect(page.getByText("Integrator Bundle")).not.toBeVisible();
    await io.homePage.addStep("Verified 'Integrator Bundle' is not visible");
  });
});
