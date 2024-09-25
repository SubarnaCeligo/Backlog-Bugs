import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('Test to validate user is able to see new connector "Azure Synapse" under "Databases" section when User tries to searched for application after clicking "create connection" from resource --> connections page', () => {
  test("@Env-All @Zephyr-IO-T29337 @Zephyr-IO-T29338 @Zephyr-IO-T29339 @Zephyr-IO-T29340 @Zephyr-IO-T29341  @Priority-P2", async ({
    io,
    page
  }) => {
    
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
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
    await io.assert.verifyElementAttributeContainsText(selectors.connectionsPagePO.APPLICATION,'value','Microsoft Azure Synapse Analytics');
    await io.connectionPage.addStep('validated user is able to see "Azure Synapse" selected at "Application" field after selecting the connector and it is hard coded')
    await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.HOST, "Host is not visible");
    await io.connectionPage.addStep("Host name is validated");
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.DATABASENAME, "Database not displayed");
    await io.connectionPage.addStep("Database field is validated");
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.USERNAME_RDBMS, "Username field is not displayed");
    await io.connectionPage.addStep("Username field is validated");
    await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.RDBMS_PASSWORD, "Password field is not displayed");
    await io.connectionPage.addStep("Password field is validated");
    await io.assert.verifyElementIsDisplayed(selectors.exportsPagePO.HELP_TEXT_ICLIENT, 'Help text with ? is not displayed');
    await io.connectionPage.addStep("Help text with '?' is validated");
    await io.assert.verifyElementDisplayedByText('Configure properties', "Configure properties field is not displayed");
    await io.connectionPage.addStep('Configure properties field display is validated');
    await io.assert.verifyElementDisplayedByText('Borrow concurrency from', "Borrow concurrency from is not displayed");
    await io.connectionPage.addStep('Borrow concurrency field display is validated');
    await io.assert.verifyElementDisplayedByText('Target concurrency level *', 'Target concurrency level is not displayed');
    await io.connectionPage.addStep('Target concurrency level field display is validated');
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.CONN_CONCURRENCY, 'Concurrency level is not displayed');
    await io.connectionPage.addStep('concurrency level field display is validated');
  });
});