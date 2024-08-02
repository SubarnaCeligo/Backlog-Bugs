import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe(`TC_C61149_C61145 Verify the Install link functionality displayed for the Integrator SuiteApp step`, () => {
  test.afterEach(async ({ io }) => {
    const res = await io.api.deleteIntegrationRecursively("61130_UIUX_SUITE02");
  });
  test(`@Zephyr-IO-T23153 @Zephyr-IO-T23150 @Env-All C61149_C61145 Verify the Install link functionality displayed for the Integrator SuiteApp step`, async ({
    page,
    io
  }) => {
    await io.homePage.navigateTo(`${io.data.links.HOME_PAGE_URL}/installIntegration`);
    await io.homePage.addStep(
      "Navigated to install integration page (/home/installIntegration)"
    );
    await io.flowBuilder.loadingTime();
    await page.getByText("Loading").nth(0).waitFor({ state: "hidden" });
    const fileChooserPromise = page.waitForEvent("filechooser");
    await io.homePage.clickByText("Choose file");
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles("testData/inputData/SuiteApp/C61135.zip");
    await io.homePage.addStep("Uploaded integration zip file");
    await io.homePage.clickByText("Install integration");
    await io.flowBuilder.loadingTime();
    await io.homePage.click(selectors.basePagePO.DIALOG_PROCEED_BUTTON);
    await page.getByLabel("breadcrumb").getByText("Home").click();
    await io.homePage.addStep("Clicked 'Home' from breadcrumb");
    await io.homePage.waitForElementAttached(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR)
    await io.homePage.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, "61130_UIUX_SUITE02")
    await page
      .locator(selectors.homePagePO.INTEGRATION_TILES)
      .filter({ hasText: "Continue setup >61130_UIUX_SUITE02" })
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
    await io.flowBuilder.clickByText("Please select");
    let connMap = await io.api.loadConnections();
    var connId = connMap.get("NETSUITE CONNECTION");
    await io.connectionPage.selectTextfromDropDown(page, connId)
    await io.homePage.addStep("Selected 'NETSUITE CONNECTION' from dropdown");
    await io.homePage.click(selectors.basePagePO.SAVE);
    await io.assert.verifyElementDisplayedByText("Verifying", "'Verifying' step not displayed");
    await io.assert.checkElementState("text='Installed'", "isDisabled");
  });
});
