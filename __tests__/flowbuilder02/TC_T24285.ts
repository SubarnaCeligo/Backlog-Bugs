import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T24285 -Verify user can create export/lookup/import with the 'Clone flow step' radio button after updating the configuration.", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
        //make sure the account has at least one shopify export
        // await io.createResourceFromAPI(exportJson, 'EXPORT');
    });
    test("@Epic-IO-54539 @Priority-P2 @Env-All @Zephyr-IO-T24285 - Verify user can create export/lookup/import with the 'Clone flow step' radio button after updating the configuration.", async ({ io, page }) => {
        //Navigate to flow builder page
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);

        //Add Source
        await io.flowBuilder.click(selectors.basePagePO.ADD_SOURCE_BUTTON);

        //Search and select an application
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.APP_NAME_INPUT);
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "HTTP");
        await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.HTTP_CNNECTOR);
        await io.flowBuilder.click(selectors.connectionsPagePO.HTTP_CNNECTOR);

        //Wait for existing resources to load
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.OPENAI.NLS_RESOURCE);
        await io.flowBuilder.click(selectors.basePagePO.CONNECTION_DROPDOWN);
        await io.flowBuilder.loadingTime();
        await io.flowBuilder.clickByTextByIndex('HTTP ZENDESK CONNECTION', 0);
        await io.flowBuilder.loadingTime();

        //Click on any existing resource
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.OPENAI.NLS_RESOURCE, 0);

        //Verify if Next button is clickable
        await io.flowBuilder.click(selectors.basePagePO.SAVE);

        //Wait for the page to load
        await io.flowBuilder.waitForElementAttached(selectors.basePagePO.ADD_NAME);

        //select connection
        await io.flowBuilder.click(selectors.basePagePO.CONNECTION);
        await io.flowBuilder.fill(selectors.basePagePO.CONNECTION_DROPDOWN, 'HTTP ZENDESK CONNECTION');
        await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST);
        await io.flowBuilder.clickByTextByIndex('HTTP ZENDESK CONNECTION', 0);

        //Make sure Clone flow is selected
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLONE_RESOURCE);

        //Update name
        const randomNumber = Math.floor(Math.random() * (999 - 100 + 1)) + 100;
        const flow_name = "clone_flow_step_testExport_" + randomNumber;
        const relativeURI = "usersUpdatedConfig_clone_" + randomNumber
        await io.flowBuilder.fill(selectors.importPagePO.NAME, flow_name);

        //Update Relative URI
        await io.flowBuilder.fill(selectors.importPagePO.HTTP_RELATIVE_URI, relativeURI);

        //save
        await io.flowBuilder.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.loadingTime();

        //Verify that export is added
        let isExportAdded = await io.flowBuilder.isVisible(selectors.flowBuilderPagePO.EMPTY_PAGE_GENERATOR);
        await io.assert.expectToBeFalse(isExportAdded, 'Export is not saved');

        //Verify if Export is saved with updtaed config
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
        //Verify name
        await io.assert.verifyElementAttribute(selectors.importPagePO.NAME, 'value', flow_name);
        //Verify relative URI
        await io.assert.verifyElementAttribute(selectors.importPagePO.HTTP_RELATIVE_URI, 'value', relativeURI);



    });
});