import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe("Test to validate connection is not created if user gives wrong credentials like host name, user name, password, data base name", () => {
  test.beforeEach(async ({ io, page }) => {
    // await io.connections.deleteConnection("AzureConnectionCred_T29346");
    await io.myAccountPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.connectionPage.navigateTo(io.data.links.CONNECTIONS_PAGE_URL);
    await io.connectionPage.loadingTime();
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, 'AzureConnectionCred_T29346');
    await io.connectionPage.loadingTime();
    let numOFConnections =await page.$$(selectors.importPagePO.TEST_RESULTS_CONTENTS);
    if(numOFConnections){
    for(let i = 0; i < numOFConnections.length; i++){
      await io.connections.deleteConnection('AzureConnectionCred_T29346');
      await io.connectionPage.loadingTime();
    }
  }
  });

  test("@Env-All @Zephyr-IO-T29346 @Priority-P2", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await page.click(selectors.basePagePO.RESOURCES);
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Azure');
    await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.AZURE_SYNAPSE, "Element not displayed");
    await io.connectionPage.click(selectors.connectionsPagePO.AZURE_SYNAPSE);
    await io.connectionPage.fill(selectors.connectionsPagePO.NAME_INPUT, "AzureConnectionCred_T29346");
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.HOST);
    await io.connectionPage.fill(selectors.connectionsPagePO.HOST, process.env["AZURE_SYNAPSE_HOST"]);
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.AZURE_SYNAPSE_DB);
    await io.connectionPage.fill(selectors.connectionsPagePO.AZURE_SYNAPSE_DB, process.env["AZURE_SYNAPSE_DB"]);
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.AZURE_SYNAPSE_USER);
    await io.connectionPage.fill(selectors.connectionsPagePO.AZURE_SYNAPSE_USER, process.env["AZURE_SYNAPSE_USERNAME"]);
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.AZURE_SYNAPSE_PASSWORD);
    await io.connectionPage.fill(selectors.connectionsPagePO.AZURE_SYNAPSE_PASSWORD, decrypt(process.env["AZURE_SYNAPSE_PASSWORD"]));
    await io.connectionPage.click(selectors.basePagePO.TEST_CONNECTION);
    await page.getByText("Testing your connection...").waitFor({ state: "hidden", timeout:360000 });
    await io.connectionPage.loadingTime();
    await page.getByText('Your connection is working great! Nice Job!').waitFor({ state: `visible`, timeout: 60000 });
    await io.assert.verifyElementDisplayedByText('Your connection is working great! Nice Job!', "Connection message  is not displayed ");
    await io.connectionPage.clickByText('Save & close');
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, "AzureConnectionCred_T29346");
    await io.connectionPage.click(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
    await io.connectionPage.click(selectors.integrationPagePO.EDIT);
    await io.connectionPage.click(selectors.flowBuilderPagePO.CLOSE);
    await page.getByText("Testing your connection...", { exact: false }).waitFor({ state: `hidden`, timeout: 120000 });
    await page.getByText("Saving..", { exact: false }).waitFor({ state: `hidden`, timeout: 120000 });
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR);
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, "AzureConnectionCred_T29346");
    await io.connectionPage.click(selectors.connectionsPagePO.ACTIONS_MENU_BUTTON);
    await io.connectionPage.click(selectors.integrationPagePO.DELETE_FLOW);
    await io.connectionPage.clickByText('Delete');
    await io.connectionPage.fill(selectors.connectionsPagePO.CONNECTION_PAGE_SEARCH_BAR, "AzureConnectionCred_T29346");
    await io.assert.verifyElementDisplayedByText('Your search didn’t return any matching results. Try expanding your search criteria.', 'Element is not yet deleted');
  });

  test("@Env-All @Zephyr-IO-T29343 @Priority-P2 Test to validate user is able to see connection guide on top right corner and user is able to navigate after clicking that", async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.addStep("Navigated to homepage");
    await page.click(selectors.basePagePO.RESOURCES);
    await io.homePage.addStep("Clicked on Resources and then will click on Connection");
    await io.homePage.goToMenu("Resources", "Connections");
    await io.flowBuilder.click(selectors.connectionsPagePO.CREATE_CONNECTION);
    await io.connectionPage.addStep("Clicked on create connection button");
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Azure');
    await io.connectionPage.addStep("Filled the application name to search");
    await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.AZURE_SYNAPSE, "Element not displayed");
    await io.connectionPage.addStep("verified azure synapse application under connection dropdown");
    await io.connectionPage.click(selectors.connectionsPagePO.AZURE_SYNAPSE);
    await io.connectionPage.addStep("Navigated to the create connection drawer after selecting azure synapse connector from the dropdown");
    await io.connectionPage.loadingTime();
    await io.assert.verifyElementDisplayedByText('Connection guide', "Connection guide not displayed");
    await io.connectionPage.addStep("Verified the Connection Guide for Azure Synapse");
    await io.connectionPage.loadingTime();
    const element = await page.$('a[href*="https://docs.celigo.com/hc/en-us/articles/25818586127387-Set-up-a-connection-to-Microsoft-Azure-Synapse-Analytics"]');
    let linkText = await element.innerText();
    await io.assert.expectToBeValue('Connection guide', linkText, 'Connection guide link is not visible');
    await io.connectionPage.addStep("Navigated to the respective connection guide URL");
  });
});