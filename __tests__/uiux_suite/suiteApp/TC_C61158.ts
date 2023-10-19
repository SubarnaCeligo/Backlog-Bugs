import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/C63011.json";

test.describe(`C61158 Verify If some of the NS steps are configured to use suiteApp and some to use SuiteBundle,then both SuiteApp and SuiteBundle Installation steps have to be dispayed in the install steps.`, () => {
  test(`C61158 Verify If some of the NS steps are configured to use suiteApp and some to use SuiteBundle,then both SuiteApp and SuiteBundle Installation steps have to be dispayed in the install steps.`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(
      process.env["IO_UI_CONNECTOR_URL"] +
        "marketplace/installTemplate/preview/6516a1efb099920bd58b1850"
    );
    await io.homePage.clickByText("Install now");
    await io.assert.verifyElementDisplayedByText(
      "Integrator SuiteApp",
      "Integrator SuiteApp is not visible"
    );
    await io.assert.verifyElementDisplayedByText(
      "Integrator Bundle",
      "Integrator Bundle is not visible"
    );
  });
});
