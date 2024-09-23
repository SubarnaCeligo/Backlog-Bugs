import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('Test to validate user is able to see "Mock response" field inside "Mock response" section and it should be non mandatory, expandable and collapsable', () => {
  test("@Env-All @Epic-IO-65860 @Zephyr-IO-T29708 @Zephyr-IO-T29709 @Zephyr -IO-T29700 @Zephyr-IO-T29701 @Zephyr - IO-T29702 @Priority-P2", async ({
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
    await io.importsPage.selectConnectionDropDown(page,'AzureConnectionCred_T29698');
    await io.importsPage.fill(selectors.connectionsPagePO. CONNECTION_NAME,"AzureSynapseImports");
  
    await io.importsPage.click(selectors.basePagePO.SAVE);
    await io.assert.verifyElementIsDisplayed(selectors.importPagePO.EXPAND_MOCK_RESPONSE,"Element is not present");
    await io.importsPage.click(selectors.importPagePO.EXPAND_MOCK_RESPONSE);
    await io.assert.verifyElementDisplayedByText('Populate with canonical stub','Populate with canonical stub link is not displayed');
    await io.importsPage.addStep('Verified the Mock response expandable ');
    await io.assert.checkElementState(selectors.basePagePO.SAVE,'isDisabled');
    await io.importsPage.addStep('Verified Mock Response is optional field as without filling the mockResponse the save button is disabled');
    await io.importsPage.click(selectors.importPagePO.POPULATE_CANONICAL_STUB);
    await io.assert.verifyElementTextByIndex('[class="ace_string"]','"1234567890"',1);
    await io.importsPage.addStep("Verified on clicking 'Populate with canonical stub' data is populated in 'Mock response' ");
    await io.importsPage.click(selectors.exportsPagePO. HELP_TEXT_ICLIENT );
    await io.importsPage.addStep("Verified help text icon");

  });
});
