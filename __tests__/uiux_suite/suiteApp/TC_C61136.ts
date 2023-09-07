import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C61136 Verify the Integrator SuiteApp step displayed while uploading an integration zip file`, () => {
  test(`C61136 Verify the Integrator SuiteApp step displayed while uploading an integration zip file`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(
      `${io.data.links.HOME_PAGE_URL}/installIntegration`
    );
    await io.homePage.addStep(
      "Navigated to install integration page (/home/installIntegration)"
    );
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("Choose file").click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/SuiteApp/C61136.zip");
    await io.homePage.addStep("Uploaded integration zip file");
    await page.getByText("Install Integration").click();
    await io.homePage.addStep("Clicked 'Install Integration' button");
    await page.locator(selectors.basePagePO.DIALOG_PROCEED_BUTTON).click();
    await io.homePage.addStep("Clicked 'Proceed' button");
    await expect(page.getByText("Integrator SuiteApp")).toBeVisible();
    await io.homePage.addStep("Checked if 'Integrator SuiteApp' is visible");
  });
});
