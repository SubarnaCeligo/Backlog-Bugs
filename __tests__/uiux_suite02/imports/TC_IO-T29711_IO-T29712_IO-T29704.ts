import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('Test to validate user is able to see "Batch size", "Data URI template", "Concurrency ID lock template" fields under "Advanced" section with "?" help text icon and correct help text', () => {
    test("@Env-All @Epic-IO-65860 @Zephyr-IO-T29711 @Zephyr-IO-T29712 @Zephyr - IO-T29704 @Priority-P2", async ({
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
        await io.importsPage.selectConnectionDropDown(page, 'AzureConnectionCred_T29698');
        await io.importsPage.fill(selectors.connectionsPagePO. CONNECTION_NAME,"AzureSynapseImports");
        await io.importsPage.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.clickByText("Advanced");
        await io.assert.verifyElementDisplayedByText("Batch size", "Batch size field is not displayed");
        await io.homePage.addStep("**Batch size field is verified***");
        await io.assert.verifyElementDisplayedByText('Concurrency ID lock template','Concurrency ID lock template field is not displayed');
        await io.homePage.addStep("**Concurrency ID lock template field is verified***");
        await io.assert.verifyElementDisplayedByText('Data URI template','Data URI template field is not displayed');
        await io.homePage.addStep("**Data URI template field is verified***");
        await io.importsPage.clickByIndex(selectors.exportsPagePO.HELP_TEXT_ICLIENT,7);
        await io.importsPage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
        await io.homePage.addStep("**Batch size field help text icon is verified***");
        await io.importsPage.clickByIndex(selectors.exportsPagePO.HELP_TEXT_ICLIENT,8);
        await io.homePage.addStep("**Concurrency ID lock template field help text icon is verified***");
        await io.importsPage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
        await io.importsPage.clickByIndex(selectors.importPagePO.ID_LOCK_TEMPLATE,1);
        await io.assert.verifyElementDisplayedByText('Resources available for your handlebars template',"Handlebar editor is not opened");
        await io.importsPage.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);
        await io.importsPage.clickByIndex(selectors.exportsPagePO.HELP_TEXT_ICLIENT,9);
        await io.homePage.addStep("**Data URI template field help text icon is verified***");
        await io.importsPage.click(selectors.connectionsPagePO.HELPTEXT_CLOSE);
        await io.importsPage.clickByIndex(selectors.flowBuilderPagePO.DATAURITEMPLATE,1);
        await io.assert.verifyElementDisplayedByText('Build data URI template','Build data URI template is not displayed');
        await io.importsPage.click(selectors.flowBuilderPagePO.CLOSE_RIGHT_DRAWER);

        

    });
});