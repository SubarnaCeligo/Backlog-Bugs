import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C61136 Verify the Integrator SuiteApp step displayed while uploading an integration zip file`, () => {
  test.afterEach(async ({ io }) => {
    const intId = await io.api.getIntegrationDetails("61130", "_id");
    await io.api.deleteIntegration(intId);
  });
  test(`@Env-All @Zephyr-IO-T23142 C61136 Verify the Integrator SuiteApp step displayed while uploading an integration zip file`, async ({
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
    await fileChooser.setFiles("testData/inputData/SuiteApp/C61136.zip");
    await io.homePage.addStep("Uploaded integration zip file");
    await io.homePage.clickByText("Install integration");
    await io.homePage.click(selectors.basePagePO.DIALOG_PROCEED_BUTTON);
    await io.assert.verifyElementDisplayedByText(
      "Integrator SuiteApp",
      "'Integrator SuiteApp' step not displayed"
    );
  });
});
