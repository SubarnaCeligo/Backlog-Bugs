import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C61132 Verify the Install link functionality displayed for the Integrator SuiteApp step`, () => {
  test(`C61132 Verify the Install link functionality displayed for the Integrator SuiteApp step`, async ({
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
    await fileChooser.setFiles("testData/SuiteApp/C61132.zip");
    await io.homePage.addStep("Uploaded integration zip file");
    await page.getByText("Install Integration").click();
    await io.homePage.addStep("Clicked 'Install Integration' button");
    // TODO: await page.locator(selectors.basePagePO.DIALOG_PROCEED_BUTTON).click();
    await page.locator("[data-test='Proceed']").click();
    await io.homePage.addStep("Clicked 'Proceed' button");
    const configure = async () => {
      await expect(page.getByText("Integrator SuiteApp")).toBeVisible();
      await io.homePage.addStep("Checked if 'Integrator SuiteApp' is visible");
      // TODO: await page.locator(selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON.click();
      await page.locator("[data-test='Configure']").click();
      await io.homePage.addStep("Clicked 'Configure' button");
      await page.getByText("Use existing connection").click();
      await io.homePage.addStep("Clicked 'Use existing connection' radio button");
      await page.getByText("Please select").click();
      await io.homePage.addStep("Clicked 'Please select' dropdown");
      await page
        // TODO: .locator(selectors.connectionsPagePO.CONNECTION_LIST_MODAL)
        .locator("#menu-connection")
        .getByText("NETSUITE CONNECTION")
        .click();
      await io.homePage.addStep("Selected 'NETSUITE CONNECTION' from dropdown");
      await io.connectionPage.click(selectors.basePagePO.SAVE);
      await io.homePage.addStep("Clicked Save button");
      await expect(page.getByText("Verifying")).toBeVisible();
      await io.homePage.addStep("Checked if 'Verifying' is visible");
      await expect(page.getByText("Installed")).toBeVisible();
      await io.homePage.addStep("Checked if 'Installed' is visible");
    };
    await configure();
    // TODO: await page.locator(selectors.integrationPagePO.CONNECTION_LIST_MODAL).click();
    await page.locator('[data-test="Install"]').click();
    await io.homePage.addStep("Clicked 'Install' button");
    await page.locator(selectors.homePagePO.CLONE_INTEGRATION).click();
    await io.homePage.addStep("Clicked 'Clone Integration' button (top right)");
    // TODO: await page.locator(selectors.integrationPagePO.CLONE_INTEGRATION_BUTTON).click();
    await page.locator("[data-test='Clone integration']").click();
    await io.homePage.addStep("Clicked 'Clone integration' button (bottom)");
    await configure();
  });
});
