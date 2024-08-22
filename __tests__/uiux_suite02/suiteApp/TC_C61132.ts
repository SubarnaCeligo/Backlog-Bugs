import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`@Epic-IO-27713  @Priority-P2  @Zephyr-IO-T23139 @Env-All Verify the Install link functionality displayed for the Integrator SuiteApp step`, () => {
  test.afterEach(async ({ io }) => {
    const intId = await io.api.getIntegrationDetails("61130_UIUX_SUITE02", "_id");
    await io.api.deleteIntegration(intId);
    const intId1 = await io.api.getIntegrationDetails("Clone - 61130_UIUX_SUITE02", "_id");
    await io.api.deleteIntegration(intId1);
  });
  test(`@Epic-IO-27713  @Priority-P2  @Zephyr-IO-T23139 @Env-All Verify the Install link functionality displayed for the Integrator SuiteApp step`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(`${io.data.links.HOME_PAGE_URL}/installIntegration`);
    await io.flowBuilder.loadingTime();
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
      let connMap = await io.api.loadConnections();
      var connId = connMap.get("NETSUITE CONNECTION");
      await io.homePage.click(`[value='${connId}']`)
      await io.homePage.addStep("Selected 'NETSUITE CONNECTION' from dropdown");
      await io.connectionPage.click(selectors.basePagePO.SAVE);
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
