import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C61135 Verify the Install link functionality displayed for the Integrator SuiteApp step`, () => {
  test(`C61135 Verify the Install link functionality displayed for the Integrator SuiteApp step`, async ({
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
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/SuiteApp/C61135.zip");
    await io.homePage.addStep("Uploaded integration zip file");
    await io.homePage.clickByText("Install Integration");
    await io.homePage.click(selectors.basePagePO.DIALOG_PROCEED_BUTTON);
    const configure = async () => {
      await expect(page.getByText("Integrator SuiteApp")).toBeVisible();
      await io.homePage.addStep("Checked if 'Integrator SuiteApp' is visible");
      await io.homePage.click(
        selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
      );
      await io.homePage.clickByText("Use existing connection");
      await io.homePage.clickByText("Please select");
      await page
        .locator(selectors.connectionsPagePO.CONNECTION_LIST_MODAL)
        .getByText("NETSUITE CONNECTION")
        .click();
      await io.homePage.addStep("Selected 'NETSUITE CONNECTION' from dropdown");
      await io.homePage.click(selectors.basePagePO.SAVE);
      await expect(page.getByText("Verifying")).toBeVisible();
      await io.homePage.addStep("Checked if 'Verifying' is visible");
      await expect(page.getByText("Installed")).toBeVisible();
      await io.homePage.addStep("Checked if 'Installed' is visible");
    };
    await configure();
    await io.homePage.click(selectors.connectionsPagePO.CONNECTION_LIST_MODAL);
    await io.homePage.click(selectors.homePagePO.CLONE_INTEGRATION);
    await io.homePage.click(selectors.integrationPagePO.CLONE_INTEGRATION_BUTTON);
    await configure();
  });
});
