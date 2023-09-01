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
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("Choose file").click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/SuiteApp/C61153.zip");
    await page.getByText("Install Integration").click();
    await page.locator("[data-test='Proceed']").click();
    await expect(page.getByText("Integrator Bundle")).toBeVisible();
    await expect(page.getByText("Integrator SuiteApp")).not.toBeVisible();
  });
});
