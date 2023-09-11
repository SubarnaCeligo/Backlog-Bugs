import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C61159 Verify IIf all the NS stepsn my integration are solely configured to use SuiteApp then only the SuiteApp installation step has to be shown in the install steps.`, () => {
  test(`C61159 Verify IIf all the NS stepsn my integration are solely configured to use SuiteApp then only the SuiteApp installation step has to be shown in the install steps.`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(
      `${io.data.links.HOME_PAGE_URL}/installIntegration`
    );
    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/SuiteApp/C61159.zip");
    await io.homePage.addStep("Uploaded integration zip file");
    await io.homePage.clickByText("Install integration");
    await io.homePage.click(selectors.basePagePO.DIALOG_PROCEED_BUTTON);
    await expect(page.getByText("Integrator SuiteApp")).toBeVisible();
    await io.homePage.addStep("Checked if 'Integrator SuiteApp' is visible");
    await expect(
      page.getByText("Integrator Bundle", { exact: true })
    ).toBeVisible();
    await io.homePage.addStep("Checked if 'Integrator Bundle' is visible");
  });
});
