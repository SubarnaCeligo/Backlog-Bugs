import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('Test to validate that the SQL server version under Application Details is hidden and Azure is selected by default.', () => {
  test("@Env-All @Zephyr-IO-T29342 @Priority-P2", async ({
    io,
    page
  }) => {
    
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.addStep("Navigated to home page");
    await page.click(selectors.basePagePO.RESOURCES);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.homePage.addStep("Clicked the Resources Tab from menu and then clicked the connection tab and navigated to the connection page.");
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.connectionPage.addStep("Clicked on Create Connection icon");
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Azure');
    await io.connectionPage.addStep("Filled the search area to search for the connection with the required name");
    await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.AZURE_SYNAPSE, "Element not displayed");
    await io.connectionPage.addStep("Validated the display for 'Microsoft Azure Synapse Analytics' ");
    await io.connectionPage.click(selectors.connectionsPagePO.AZURE_SYNAPSE);
    await io.connectionPage.addStep("Selected the Azure Synapse connector");
    await io.assert.verifyElementAttributeContainsText(selectors.connectionsPagePO. APPLICATION ,'value','Microsoft Azure Synapse Analytics');
    await io.connectionPage.addStep('validated user is able to see "Azure Synapse" selected at "Application" field after selecting the connector and it is hard coded')
    const sqlversion = await io.flowBuilder.isVisible(selectors.connectionsPagePO.VERSION);
    await io.assert.expectToBeFalse(sqlversion, "SQL version  is not hidden");
  });
});