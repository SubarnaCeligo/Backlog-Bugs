import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import testData from "@testData/Connections/C63011.json";

test.describe(`C61158 Verify If some of the NS steps are configured to use suiteApp and some to use SuiteBundle,then both SuiteApp and SuiteBundle Installation steps have to be dispayed in the install steps.`, () => {
  test(`@Env-All @Zephyr-IO-T23162 C61158 Verify If some of the NS steps are configured to use suiteApp and some to use SuiteBundle,then both SuiteApp and SuiteBundle Installation steps have to be dispayed in the install steps.`, async ({
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
    await page.getByText("Loading Template...").waitFor({ state: "hidden", timeout: 150000 });
    await io.homePage.clickByText("Install now");
    await io.homePage.loadingTime()
    await io.assert.verifyElementDisplayedByText(
      "Integrator Bundle",
      "Integrator Bundle is not visible"
    );
  });
});
