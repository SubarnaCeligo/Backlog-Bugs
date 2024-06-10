import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C61153 Verify If all the NS steps in my integration are solely configured to use SuiteBundle then only the SuiteBundle installation step has to be shown in the install steps.`, () => {
  test(`@Env-All @Zephyr-IO-T23157 C61153 Verify If all the NS steps in my integration are solely configured to use SuiteBundle then only the SuiteBundle installation step has to be shown in the install steps.`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(
      `${io.data.links.HOME_PAGE_URL}/installIntegration`
    );
    await io.homePage.addStep(
      "Navigated to install integration page (/home/installIntegration)"
    );
    await page.getByText("Loading").waitFor({ state: "hidden" });
    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/inputData/SuiteApp/C61153.zip");
    await io.homePage.addStep("Uploaded integration zip file");
    await io.homePage.clickByText("Install integration");
    await io.homePage.addStep("Clicked 'Install Integration' button");
    await io.homePage.click(selectors.basePagePO.DIALOG_PROCEED_BUTTON);
    await io.homePage.addStep("Clicked 'Proceed' button");
    await io.assert.verifyElementDisplayedByText(
      "Integrator Bundle",
      "'Integrator Bundle' step not displayed"
    );
    await expect(page.getByText("Integrator SuiteApp")).not.toBeVisible();
    await io.homePage.addStep("Checked if 'Integrator SuiteApp' is not visible");
  });
});
