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
    const fileChooserPromise = page.waitForEvent("filechooser");
    await page.getByText("Choose file").click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/SuiteApp/C61136.zip");
    await page.getByText("Install Integration").click();
    await page.locator("[data-test='Proceed']").click();
    await expect(page.getByText("Integrator SuiteApp")).toBeVisible();
  });
});
