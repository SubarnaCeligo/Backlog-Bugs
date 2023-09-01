import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C61156 Verify IIf all the NS stepsn my integration are solely configured to use SuiteApp then only the SuiteApp installation step has to be shown in the install steps.`, () => {
  test(`C61156 Verify IIf all the NS stepsn my integration are solely configured to use SuiteApp then only the SuiteApp installation step has to be shown in the install steps.`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(
      `${io.data.links.HOME_PAGE_URL}/installIntegration`
    );
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("Choose file").click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/SuiteApp/C61156.zip");
    await page.getByText("Install Integration").click();
    await page.locator("[data-test='Proceed']").click();
    await expect(page.getByText("Integrator SuiteApp")).toBeVisible();
    await expect(page.getByText("Integrator Bundle")).not.toBeVisible();
  });
});
