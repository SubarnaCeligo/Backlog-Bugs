import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`@Epic-IO-27713  @Priority-P2  @Zephyr-IO-T23139 @Env-All Verify the Install link functionality displayed for the Integrator SuiteApp step`, () => {
  test(`@Epic-IO-27713  @Priority-P2  @Zephyr-IO-T23139 @Env-All Verify the Install link functionality displayed for the Integrator SuiteApp step`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(`${io.data.links.HOME_PAGE_URL}/installIntegration`);
    await io.flowBuilder.loadingTime();
    await page.getByText("Loading").waitFor({ state: "hidden" });
    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/inputData/SuiteApp/C61132.zip");
    await io.homePage.addStep("Uploaded integration zip file");
    await io.homePage.clickByText("Install integration");
    await io.homePage.click(selectors.basePagePO.DIALOG_PROCEED_BUTTON);
    const configure = async () => {
      await io.assert.verifyElementDisplayedByText(
        "Integrator SuiteApp",
        "'Integrator SuiteApp' step not displayed"
      );
      await io.homePage.click(
        selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
      );
      await io.homePage.clickByText("Use existing connection");
      await io.homePage.clickByText("Please select");
      await page
        .locator(selectors.connectionsPagePO.CONNECTION_LIST_MODAL)
        .getByText("NETSUITE CONNECTION").first()
        .click();
      // await io.flowBuilder.clickByTextByIndex("NETSUITE CONNECTION", 0);
      await io.homePage.addStep("Selected 'NETSUITE CONNECTION' from dropdown");
      await io.connectionPage.click(selectors.basePagePO.SAVE);
      await io.assert.verifyElementDisplayedByText(
        "Verifying",
        "'Verifying' step not displayed"
      );
      await io.assert.verifyElementDisplayedByText(
        "Installed",
        "'Installed' step not displayed"
      );
    };
    await configure();
    await io.homePage.clickByText("Install");
    await io.homePage.click(selectors.integrationPagePO.CLONE_INTEGRATION);
    await io.homePage.click(selectors.integrationPagePO.CLONE_INTEGRATION_BUTTON);
    await configure();
  });
});
