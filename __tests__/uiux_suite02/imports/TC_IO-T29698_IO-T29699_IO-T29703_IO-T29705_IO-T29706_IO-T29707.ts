import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import { decrypt } from "@celigo/aut-utilities";

test.describe('Test to validate user is able to see new connector "Azure Synapse" under "Databases" section when User tries to searched for application after clicking "create import" from resource --> imports page', () => {
  test("@Env-All @Epic-IO-65860 @Zephyr-IO-T29698 @Zephyr-IO-T29699 @Zephyr - IO-T29703 @Zephyr -IO-T29705 @Zephyr - IO-T29706 @Zephyr - IO-T29707 @Priority-P2" , async ({
    io,
    page
  }) => {
    
    await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    await io.homePage.addStep("Navigated to home page");
    await page.click(selectors.basePagePO.RESOURCES);
    await io.homePage.goToMenu("Resources", "Imports");
    await io.homePage.addStep("Clicked the Resources Tab from menu and then clicked the imports tab and navigated to the imports page.");
    await io.flowBuilder.click(selectors.integrationPagePO.ADDNEWRESOURCE);
    await io.connectionPage.addStep("Clicked on Create import icon");
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Azure');
    await io.connectionPage.addStep("Filled the search area to search for the connection with the required name");
    await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.AZURE_SYNAPSE, "Element not displayed");
    await io.connectionPage.addStep("Validated the display for 'Microsoft Azure Synapse Analytics' ");
    await io.connectionPage.click(selectors.connectionsPagePO.AZURE_SYNAPSE);
    await io.connectionPage.addStep("Selected the Azure Synapse connector");
    await io.importsPage.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
    await io.importsPage.clickByText('AzureConnectionCred_T29698');
    await io.importsPage.click(selectors.connectionsPagePO.EDIT_RESOURCE);
    await io.connectionPage.fill(selectors.importPagePO.  NAME, "AzureConnectionCred_T29346");
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.HOST );
    await io.connectionPage.fill(selectors.connectionsPagePO.HOST , process.env["AZURE_SYNAPSE_HOST"]);
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.AZURE_SYNAPSE_DB);
    await io.connectionPage.fill(selectors.connectionsPagePO.AZURE_SYNAPSE_DB, process.env["AZURE_SYNAPSE_DB"]);
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.AZURE_SYNAPSE_USER);
    await io.connectionPage.fill(selectors.connectionsPagePO.AZURE_SYNAPSE_USER, process.env["AZURE_SYNAPSE_USERNAME"]);
    await io.connectionPage.waitForElementAttached(selectors.connectionsPagePO.AZURE_SYNAPSE_PASSWORD);
    await io.connectionPage.fill(selectors.connectionsPagePO.AZURE_SYNAPSE_PASSWORD, decrypt(process.env["AZURE_SYNAPSE_PASSWORD"]));
    await io.connectionPage.click(selectors.basePagePO.TEST_CONNECTION)
    await io.connectionPage.loadingTime();
    await io.assert.verifyElementDisplayedByText('Your connection is working great! Nice Job!', "Connection message  is not displayed ");
    await io.connectionPage.clickByText('Save & close');
    await io.importsPage.fill(selectors.connectionsPagePO.CONNECTION_NAME,"Azure Import");
    await io.importsPage.clickByText('Next');
    await io.assert.verifyElementDisplayedByText('One to many',"One to many field is not present");
    await io.assert.verifyElementDisplayedByText('Yes (advanced)','Option is not displaying properly');
    await io.assert.verifyElementDisplayedByText('No',"No option is not displayed");
    await io.assert.checkElementState(selectors.importPagePO.ONE_TO_MANY,'isChecked');
    await io.importsPage.addStep('Verified No is selected by default');
    await io.assert.verifyElementDisplayedByText('How would you like the records imported?',"How would you like the records imported? is not displayed");
    await io.assert.checkElementState(selectors.flowBuilderPagePO.BULKINSERTPOSTGRE,'isChecked');
    await io.importsPage.addStep('Use bulk insert SQL query (recommended) is selected by default');
    await io.assert.verifyElementDisplayedByText("Use bulk insert SQL query (recommended)", "option is not displayed");
    await io.assert.verifyElementDisplayedByText("Use SQL query once per record", "option is not visible");
    await io.assert.verifyElementDisplayedByText("Use SQL query once per page of records", "option is not visible");
    await io.assert.verifyElementDisplayedByText("Use SQL query on first page only", "Option not displayed");
    await io.assert.verifyElementDisplayedByText("Destination table *", "Destination table is not added");  
    await io.assert.checkElementState(selectors.flowBuilderPagePO.REFRESHBUTTONPOSTGRE, 'isVisible');
    await io.flowBuilder.click(selectors.importPagePO. BUILD_DESTINATION_TABLE_AZURESYNAPSE);
    await io.assert.verifyElementDisplayedByText("Build destination table","Not Naviaged to Build destination table Editor");
    await io.flowBuilder.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
    await io.homePage.click(selectors.importPagePO.DESTINATION_TABLE_SEARCH);
    await io.homePage.addStep("*** Clicked on destination table search field ***");
    await io.homePage.click(selectors.importPagePO.DESTINATION_TABLENAME_SEARCH_INPUT );
    await io.homePage.fill(selectors.importPagePO.DESTINATION_TABLENAME_SEARCH_INPUT,"automation_agents_restapi");
    await io.flowBuilder.clickByText('automation_agents_restapi');
    await io.homePage.addStep("*** Verified we are getting 'ramDB.dbo.automation_agents_restapi' as table name ***");
    await io.homePage.click(selectors.flowBuilderPagePO.CLEARTEXTBUTTONPOSTGRE);
    await io.homePage.addStep("*** Clicked the 'X' button  ***");
    await io.homePage.click(selectors.importPagePO.DESTINATION_TABLE_SEARCH);
    await io.homePage.addStep("*** Clicked on destination table search field ***");
    await page.getByPlaceholder('Enter the name of the table').click();
    await page.getByPlaceholder('Enter the name of the table').fill('abcdef');

    await io.assert.verifyElementDisplayedByText("Your search didn’t return any matching results. Enter the name of an existing table.", "Error message not displayed properly");
    
    



  });
});