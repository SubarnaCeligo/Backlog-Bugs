import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('Test to validate user is able to add import mappings, hooks, input filer to "Azure Synapse" import on flow builder page', () => {
  test("@Env-All @Epic-IO-65860 @Zephyr-IO-T29716 @Priority-P2 " , async ({
    io,
    page
  }) => {
    await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
   
    await page.click(selectors.basePagePO.TOOLS);
    await io.homePage.goToMenu("Tools", "Flow builder");
    await io.flowBuilder.click(selectors.mappings.ADD_IMPORT);
    await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Azure');
    await io.connectionPage.addStep("Filled the search area to search for the connection with the required name");
    await io.assert.verifyElementIsDisplayed(selectors.connectionsPagePO.AZURE_SYNAPSE, "Element not displayed");
    await io.connectionPage.addStep("Validated the display for 'Microsoft Azure Synapse Analytics' ");
    await io.connectionPage.click(selectors.connectionsPagePO.AZURE_SYNAPSE);
    await io.connectionPage.addStep("Selected the Azure Synapse connector");
    await io.flowBuilder.clickByText('Import records into destination application');
    io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH);
    await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
    await io.importsPage.selectConnectionDropDown(page, 'AzureConnectionCred_T29698');
    await io.importsPage.fill(selectors.importPagePO.NAME_INPUT,"AzureSynapseImports")
    await io.importsPage.fill(selectors.importPagePO.DESTINATION_TABLENAME_SEARCH_INPUT, "Automation")
    await io.importsPage.clickByText("ramDB.dbo")
    await io.importsPage.click(selectors.basePagePO.SAVE_AND_CLOSE);
    await io.importsPage.loadingTime();
    await io.importsPage.click(selectors.basePagePO.ADD_DATA_PROCESSOR);
    await io.importsPage.waitForElementAttached(selectors.flowBuilderPagePO.PAGE_PROCESSOR_HOOKS );
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.PAGE_PROCESSOR_HOOKS,'Element is not displayed');
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.IMPORT_MAPPINGS,'Import mapping is not displayed');
    await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.INPUT_FILTER,'Input filter is displayed');
  });
});