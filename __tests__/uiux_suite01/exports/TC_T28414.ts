import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T28414_T28461_T28462_T28463 Verify XML parser help for FTP, Gdrive, S3, dropbox with invalid resource path", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test.afterEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Epic-IO-47338 @Priority-P2 @Zephyr-IO-T28414 @Env-All Verify XML parser help for FTP with invalid resource path", async ({ io, page }) => {
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
        await io.flowBuilder.fillByIndex(selectors.flowBuilderPagePO.RESOUCEPATH, 'Items/ns1:Item', 1);

        await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW); 
        await io.homePage.loadingTime();

        await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES, '\"page_of_records\"', 0);
        await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES, '\"record\"', 1);
        let test = await page.locator(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES)
        .filter({ hasText: '\"ns1:ItemId\"' })
        .first()
        .isVisible();
        await expect(test).toBe(false);
        test = await page.locator(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES)
        .filter({ hasText: '\"ns1:OrganizationId\"' })
        .first()
        .isVisible();
        await expect(test).toBe(false);
        test = await page.locator(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES)
        .filter({ hasText: '\"ns1:OrganizationCode\"' })
        .first()
        .isVisible();
        await expect(test).toBe(false); 
    });

    test("@Epic-IO-47338 @Priority-P2 @Zephyr-IO-T28461 @Env-All Verify XML parser help for S3 with invalid resource path", async ({ io, page }) => {
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
        await io.flowBuilder.fillByIndex(selectors.flowBuilderPagePO.RESOUCEPATH, 'Items/ns1:Item', 1);

        await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW);
        await io.homePage.loadingTime();

        await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES, '\"page_of_records\"', 0);
        await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES, '\"record\"', 1);
        let test = await page.locator(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES)
        .filter({ hasText: '\"ns1:ItemId\"' })
        .first()
        .isVisible();
        await expect(test).toBe(false);
        test = await page.locator(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES)
        .filter({ hasText: '\"ns1:OrganizationId\"' })
        .first()
        .isVisible();
        await expect(test).toBe(false);
        test = await page.locator(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES)
        .filter({ hasText: '\"ns1:OrganizationCode\"' })
        .first()
        .isVisible();
        await expect(test).toBe(false); 
    });
    
     // Commenting below test as it is not valid now as per Epics 
     // Epic 1: https://celigo.atlassian.net/browse/CON-8238 
     // Epic 2: https://celigo.atlassian.net/browse/IO-79313
   /*
    test("@Epic-IO-47338 @Priority-P2 @Zephyr-IO-T28462 @Env-All Verify XML parser help for Google Drive with invalid resource path", async ({ io, page }) => {
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
        await io.flowBuilder.fillByIndex(selectors.flowBuilderPagePO.RESOUCEPATH, 'Items/ns1:Item', 1);

        await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW);
        await io.homePage.loadingTime();

        await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES, '\"page_of_records\"', 0);
        await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES, '\"record\"', 1);
        let test = await page.locator(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES)
        .filter({ hasText: '\"ns1:ItemId\"' })
        .first()
        .isVisible();
        await expect(test).toBe(false);
        test = await page.locator(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES)
        .filter({ hasText: '\"ns1:OrganizationId\"' })
        .first()
        .isVisible();
        await expect(test).toBe(false);
        test = await page.locator(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES)
        .filter({ hasText: '\"ns1:OrganizationCode\"' })
        .first()
        .isVisible();
        await expect(test).toBe(false); 
    });
    */
    test("@Epic-IO-47338 @Priority-P2 @Zephyr-IO-T28463 @Env-All Verify XML parser help for Dropbox with invalid resource path", async ({ io, page }) => {
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
        await io.flowBuilder.fillByIndex(selectors.flowBuilderPagePO.RESOUCEPATH, 'Items/ns1:Item', 1);

        await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW);
        await io.homePage.loadingTime();

        await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES, '\"page_of_records\"', 0);
        await io.assert.verifyElementTextByIndex(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES, '\"record\"', 1);
        let test = await page.locator(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES)
        .filter({ hasText: '\"ns1:ItemId\"' })
        .first()
        .isVisible();
        await expect(test).toBe(false);
        test = await page.locator(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES)
        .filter({ hasText: '\"ns1:OrganizationId\"' })
        .first()
        .isVisible();
        await expect(test).toBe(false);
        test = await page.locator(selectors.flowBuilderPagePO.SCRIPT_RESULT_VARIABLES)
        .filter({ hasText: '\"ns1:OrganizationCode\"' })
        .first()
        .isVisible();
        await expect(test).toBe(false); 
    });
}); 
