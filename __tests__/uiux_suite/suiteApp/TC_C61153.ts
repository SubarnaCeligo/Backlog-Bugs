import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C61153 Verify If all the NS steps in my integration are solely configured to use SuiteBundle then only the SuiteBundle installation step has to be shown in the install steps.`, () => {
  test(`C61153 Verify If all the NS steps in my integration are solely configured to use SuiteBundle then only the SuiteBundle installation step has to be shown in the install steps.`, async ({
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
    await fileChooser.setFiles("testData/SuiteApp/C61153.zip");
    await io.homePage.addStep("Uploaded integration zip file");
    await page.getByText("Install integration").click();
    await io.homePage.addStep("Clicked 'Install Integration' button");
    await page.locator(selectors.basePagePO.DIALOG_PROCEED_BUTTON).click();
    await io.homePage.addStep("Clicked 'Proceed' button");
    await expect(
      page.getByText("Integrator Bundle", { exact: true })
    ).toBeVisible();
    await io.homePage.addStep("Checked if 'Integrator Bundle' is visible");
    await expect(page.getByText("Integrator SuiteApp")).not.toBeVisible();
    await io.homePage.addStep("Checked if 'Integrator SuiteApp' is not visible");
  });
});
