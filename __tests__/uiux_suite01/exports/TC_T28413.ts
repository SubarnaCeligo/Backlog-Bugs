import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T28413_T28457_T28458_T28459 Verify XML parser help for FTP, Gdrive, S3, dropbox with proper resource path", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test.afterEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Epic-IO-47338 @Priority-P2 @Zephyr-IO-T28413 @Env-All Verify XML parser help for FTP with proper resource path", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);

        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'ftp');
        await io.flowBuilder.click(selectors.connectionsPagePO.FTP_CONNECTION);

        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'FTP CONNECTION');
        await io.exportsPage.clickByTextByIndex('FTP CONNECTION', 0);
        await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'FTP_Export');
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADVANCE);

        await io.flowBuilder.click(selectors.exportsPagePO.FILE_TYPE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.XMLVALUE);
        let fileInput1 = await page.$(selectors.basePagePO.UPLOAD_FILE);
        await fileInput1.setInputFiles("testData/inputData/Exports/TC_T28413_T28414.xml");

        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_PARSER);
        await io.flowBuilder.fillByIndex(selectors.flowBuilderPagePO.RESOUCEPATH, '/Items/ns1:Item', 1);

        await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW);

        await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES, '\"page_of_records\"', 0);
        await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES, '\"record\"', 1);
        await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES, '\"ns1:ItemId\"', 2);
        await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES, '\"ns1:OrganizationId\"', 3);
        await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES, '\"ns1:OrganizationCode\"', 4);
    });

    test("@Epic-IO-47338 @Priority-P2 @Zephyr-IO-T28457 @Env-All Verify XML parser help for S3 with proper resource path", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);

        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'S3');
        await io.flowBuilder.click(selectors.connectionsPagePO.S3_CONNECTION);

        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'S3 CONNECTION');
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
        await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'S3_Export');
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADVANCE);

        await io.flowBuilder.click(selectors.exportsPagePO.FILE_TYPE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.XMLVALUE);
        let fileInput1 = await page.$(selectors.basePagePO.UPLOAD_FILE);
        await fileInput1.setInputFiles("testData/inputData/Exports/TC_T28413_T28414.xml");

        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_PARSER);
        await io.flowBuilder.fillByIndex(selectors.flowBuilderPagePO.RESOUCEPATH, '/Items/ns1:Item', 1);

        await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW);

        await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES, '\"page_of_records\"', 0);
        await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES, '\"record\"', 1);
        await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES, '\"ns1:ItemId\"', 2);
        await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES, '\"ns1:OrganizationId\"', 3);
        await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES, '\"ns1:OrganizationCode\"', 4);
    });
     // Commenting below test as it is not valid now as per Epics 
     // Epic 1: https://celigo.atlassian.net/browse/CON-8238 
     // Epic 2: https://celigo.atlassian.net/browse/IO-79313
     /*
    test("@Epic-IO-47338 @Priority-P2 @Zephyr-IO-T28458 @Env-All Verify XML parser help for Google Drive with proper resource path", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);

        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'drive');
        await io.flowBuilder.clickByText('Google Drive');

        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'GOOGLEDRIVE CONNECTION');
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
        await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'gDrive_Export');
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADVANCE);

        await io.flowBuilder.click(selectors.exportsPagePO.FILE_TYPE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.XMLVALUE);
        let fileInput1 = await page.$(selectors.basePagePO.UPLOAD_FILE);
        await fileInput1.setInputFiles("testData/inputData/Exports/TC_T28413_T28414.xml");

        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_PARSER);
        await io.flowBuilder.fillByIndex(selectors.flowBuilderPagePO.RESOUCEPATH, '/Items/ns1:Item', 1);

        await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW);

        await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES, '\"page_of_records\"', 0);
        await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES, '\"record\"', 1);
        await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES, '\"ns1:ItemId\"', 2);
        await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES, '\"ns1:OrganizationId\"', 3);
        await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES, '\"ns1:OrganizationCode\"', 4);
    });
    */
    test("@Epic-IO-47338 @Priority-P2 @Zephyr-IO-T28459 @Env-All Verify XML parser help for Dropbox with proper resource path", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);

        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'dropbox');
        await io.flowBuilder.clickByText('Dropbox');

        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'DROPBOX CONNECTION');
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
        await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'Dropbox_Export');
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADVANCE);

        await io.flowBuilder.click(selectors.exportsPagePO.FILE_TYPE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.XMLVALUE);
        let fileInput1 = await page.$(selectors.basePagePO.UPLOAD_FILE);
        await fileInput1.setInputFiles("testData/inputData/Exports/TC_T28413_T28414.xml");

        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_PARSER);
        await io.flowBuilder.fillByIndex(selectors.flowBuilderPagePO.RESOUCEPATH, '/Items/ns1:Item', 1);

        await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW);

        await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES, '\"page_of_records\"', 0);
        await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES, '\"record\"', 1);
        await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES, '\"ns1:ItemId\"', 2);
        await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES, '\"ns1:OrganizationId\"', 3);
        await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES, '\"ns1:OrganizationCode\"', 4);
    });
}); 
