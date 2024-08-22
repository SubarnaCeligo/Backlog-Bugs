import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`C61135 Verify the Install link functionality displayed for the Integrator SuiteApp step`, () => {
  test.afterEach(async ({ io }) => {
    const intId = await io.api.getIntegrationDetails("61130_UIUX_SUITE02", "_id");
    await io.api.deleteIntegration(intId);
  });
  test.beforeEach(async ({ io, page }) => {
    const intId = await io.api.getIntegrationDetails("61130_UIUX_SUITE02", "_id");
    await io.api.deleteIntegration(intId);
});
  test(`@Epic-IO-29826 @Priority-P2 @Env-All @Zephyr-IO-T23141 C61135 Verify the Install link functionality displayed for the Integrator SuiteApp step`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(`${io.data.links.HOME_PAGE_URL}/installIntegration`);
    await io.homePage.addStep(
      "Navigated to install integration page (/home/installIntegration)"
    );
    await io.flowBuilder.loadingTime();
    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/inputData/SuiteApp/C61135.zip");
    await io.homePage.addStep("Uploaded integration zip file");
    await io.flowBuilder.loadingTime();
    await io.homePage.clickByText("Install integration");
    await io.flowBuilder.loadingTime();
    await io.homePage.click(selectors.basePagePO.DIALOG_PROCEED_BUTTON);
    await io.flowBuilder.loadingTime();
    await page.getByLabel("breadcrumb").getByText("Home").click();
    await io.homePage.addStep("Clicked 'Home' from breadcrumb");
    await io.flowBuilder.loadingTime();
    await io.flowBuilder.fill(selectors.integrationPagePO.HOME_SEARCH, '61130_UIUX_SUITE02');
    await io.flowBuilder.loadingTime();
    await page
      .locator(selectors.homePagePO.INTEGRATION_TILES)
      .filter({ hasText: "Continue setup >" } && { hasText: "61130_UIUX_SUITE02" })
      .last()
      .locator("button")
      .first()
      .click();
    await io.homePage.addStep("Clicked 'Continue setup >61130_UIUX_SUITE02'");
    await io.assert.verifyElementDisplayedByText(
      "Integrator SuiteApp",
      "'Integrator SuiteApp' step not displayed"
    );
    await io.homePage.click(
      selectors.integrationPagePO.SETUP_INTEGRATION_CONFIGURE_BUTTON
    );
    await io.homePage.clickByText("Use existing connection");
    await io.homePage.clickByText("Please select");
    await io.flowBuilder.loadingTime();
    let connMap = await io.api.loadConnections();
    var connId = connMap.get("NETSUITE CONNECTION");
    await io.homePage.click(`[value='${connId}']`)
    await io.homePage.addStep("Selected 'NETSUITE CONNECTION' from dropdown");
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.homePage.loadingTime()
    await io.assert.verifyElementDisplayedByText(
      "Installed",
      "'Installed' step not displayed"
    );
    await io.flowBuilder.click(selectors.integrationPagePO.UNINSTALL);
    await io.flowBuilder.click(selectors.integrationPagePO.UNINSTALL_CONFIRM);
  });
});
