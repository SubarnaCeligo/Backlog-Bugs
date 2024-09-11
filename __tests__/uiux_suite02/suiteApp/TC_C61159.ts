import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C61159 Verify IIf all the NS stepsn my integration are solely configured to use SuiteApp then only the SuiteApp installation step has to be shown in the install steps.`, () => {
  test.afterEach(async ({ io }) => {
    const intId = await io.api.getIntegrationDetails("1- 1-15june-NewFlow1", "_id");
    await io.api.deleteIntegration(intId);
  });
  test(`@Env-All @Zephyr-IO-T23163 C61159 Verify IIf all the NS stepsn my integration are solely configured to use SuiteApp then only the SuiteApp installation step has to be shown in the install steps.`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(
      `${io.data.links.HOME_PAGE_URL}/installIntegration`
    );
    await page.getByText("Loading...").waitFor({ state: "hidden" });
    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/inputData/SuiteApp/C61159.zip");
    await io.homePage.addStep("Uploaded integration zip file");
    await io.homePage.clickByText("Install integration");
    await io.homePage.click(selectors.basePagePO.DIALOG_PROCEED_BUTTON);
    await page.locator(`//*[contains(@class,'MuiTypography-root') and contains(text(),'Loading')]`).first().waitFor({ state: "hidden", timeout: 600000 });
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