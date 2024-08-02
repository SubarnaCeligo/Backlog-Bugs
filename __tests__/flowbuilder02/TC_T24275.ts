import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T24275 - Verify Next button is activating if we select the tile from 'Your existing flow steps'", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Epic-IO-54539 T24275 - Verify Next button is activating if we select the tile from 'Your existing flow steps @Env-All @Priority-P2'", async ({ io, page }) => {
        //Navigate to flow builder page
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.flowBuilder.loadingTime();
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);

        //Add Source
        await io.flowBuilder.click(selectors.basePagePO.ADD_SOURCE_BUTTON);

        //Search and select an application
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.APP_NAME_INPUT);
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "FTP");
        await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.FTP_CONNECTION);
        await io.flowBuilder.click(selectors.connectionsPagePO.FTP_CONNECTION);

        //Wait for existing resources to load
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.OPENAI.NLS_RESOURCE);
        //Click on any existing resource
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.OPENAI.NLS_RESOURCE, 0);

        //Verify if Next button is clickable
        await io.assert.verifyElementToBeClickable(selectors.basePagePO.SAVE);

        //Close
        await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
        await io.flowBuilder.loadingTime();

        //Lookup
        //Add Source
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);

        //Search and select an application
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.APP_NAME_INPUT);
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "FTP");
        await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.FTP_CONNECTION);
        await io.flowBuilder.click(selectors.connectionsPagePO.FTP_CONNECTION);

        //Select Lookup
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.SELECT_LOOKUP);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECT_LOOKUP);

        //Wait for existing resources to load
        // await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.OPENAI.NLS_RESOURCE);
        //Click on any existing resource
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.OPENAI.NLS_RESOURCE, 0);

        //Verify if Next button is clickable
        await io.assert.verifyElementToBeClickable(selectors.basePagePO.SAVE);

        //Close
        await io.flowBuilder.click(selectors.importPagePO.IMPORT_CLOSE_DRAWER);
        await io.flowBuilder.click(selectors.basePagePO.DISCARD_CHANGES);
        await io.flowBuilder.loadingTime();

        //Import
        //Add Source
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);

        //Search and select an application
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.APP_NAME_INPUT);
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.APP_NAME_INPUT, "FTP");
        await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.FTP_CONNECTION);
        await io.flowBuilder.click(selectors.connectionsPagePO.FTP_CONNECTION);

        //Select Lookup
        await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.TRANSFER_FILES);
        await io.flowBuilder.click(selectors.connectionsPagePO.TRANSFER_FILES);

        //Wait for existing resources to load
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.OPENAI.NLS_RESOURCE);
        //Click on any existing resource
        await io.flowBuilder.clickButtonByIndex(selectors.flowBuilderPagePO.OPENAI.NLS_RESOURCE, 0);

        //Verify if Next button is clickable
        await io.assert.verifyElementToBeClickable(selectors.basePagePO.SAVE);

    });
});