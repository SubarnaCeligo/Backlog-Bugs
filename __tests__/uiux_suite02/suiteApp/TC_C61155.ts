import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C61155 Verify If all the NS steps in my integration are solely configured to use SuiteApp then only the SuiteApp installation step has to be shown in the install steps.`, () => {
  test(`@Env-All C61155 Verify If all the NS steps in my integration are solely configured to use SuiteApp then only the SuiteApp installation step has to be shown in the install steps.`, async ({
    page,
    io
  }) => {
    if(process.env["IO_UI_CONNECTOR_URL"] == "https://qa.staging.integrator.io/"){
    await io.homePage.navigateTo(
      process.env["IO_UI_CONNECTOR_URL"] +
        "marketplace/installTemplate/preview/6639f9f38ce96d807cde769e"
    );
    } else if(process.env["IO_UI_CONNECTOR_URL"] == "https://staging.integrator.io/"){
      await io.homePage.navigateTo(
        process.env["IO_UI_CONNECTOR_URL"] +
          "marketplace/installTemplate/preview/6639fa7ea075cfae57469022"
      );
    } else{
      await io.homePage.navigateTo(
        process.env["IO_UI_CONNECTOR_URL"] +
          "marketplace/installTemplate/preview/6639dfd0acce1a31b70d4709"
      );
    }
    await io.homePage.loadingTime()
    await io.homePage.clickByText("Install now");
    await io.assert.verifyElementDisplayedByText(
      "Integrator SuiteApp",
      "Integrator SuiteApp is not visible"
    );
    await io.homePage.addStep("Verified 'Integrator Bundle' is not visible");
  });
});
