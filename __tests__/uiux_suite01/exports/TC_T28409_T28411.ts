import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T28409_T28411 Verify XML parser for FTP,Gdrive,S3,dropbox when XML file is invalid", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Epic-IO-47338 @Priority-P2 @Zephyr-IO-T28409 @Env-All Verify XML parser for FTP when XML file is invalid", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'FTP');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.FTP);
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'FTP CONNECTION');
        await io.exportsPage.clickByTextByIndex('FTP CONNECTION', 0);
        await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'FTP_Export');
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.click(selectors.exportsPagePO.FILE_TYPE);
        await io.flowBuilder.clickByText('XML');
        let fileInput1 = await page.$(selectors.basePagePO.UPLOAD_FILE);
        await fileInput1.setInputFiles("testData/inputData/Exports/T28409.xml");
        await io.connectionPage.addStep("Upload invalid xml");
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_PARSER);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW);
        await io.connectionPage.addStep("Clicking on preview");
        await expect(page.locator(selectors.exportsPagePO.ERROR_ACCORDION_SUMMARY)).toBeVisible();
    });
     // Commenting below test as it is not valid now as per Epics 
     // Epic 1: https://celigo.atlassian.net/browse/CON-8238 
     // Epic 2: https://celigo.atlassian.net/browse/IO-79313
     /*
    test("@Epic-IO-47338 @Priority-P2 @Zephyr-IO-T28474 @Env-All Verify XML parser for Gdrive when XML file is invalid", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Google Drive');
        await io.flowBuilder.clickByText('Google Drive');
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'GOOGLEDRIVE CONNECTION');
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
        await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'GDRIVE_EXPORT');
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.click(selectors.exportsPagePO.FILE_TYPE);
        await io.flowBuilder.clickByText('XML');
        let fileInput1 = await page.$(selectors.basePagePO.UPLOAD_FILE);
        await fileInput1.setInputFiles("testData/inputData/Exports/T28409.xml");
        await io.connectionPage.addStep("Upload invalid xml");
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_PARSER);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW);
        await io.connectionPage.addStep("Clicking on preview");
        await expect(page.locator(selectors.exportsPagePO.ERROR_ACCORDION_SUMMARY)).toBeVisible();
    });
    */
    test("@Epic-IO-47338 @Priority-P2 @Zephyr-IO-T28475 @Env-All Verify XML parser for S3 when XML file is invalid", async ({ io, page }) => {
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
        await io.flowBuilder.click(selectors.exportsPagePO.FILE_TYPE);
        await io.flowBuilder.clickByText('XML');
        let fileInput1 = await page.$(selectors.basePagePO.UPLOAD_FILE);
        await fileInput1.setInputFiles("testData/inputData/Exports/T28409.xml");
        await io.connectionPage.addStep("Upload invalid xml");
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_PARSER);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW);
        await io.connectionPage.addStep("Clicking on preview");
        await expect(page.locator(selectors.exportsPagePO.ERROR_ACCORDION_SUMMARY)).toBeVisible();
    });
    test("@Epic-IO-47338 @Priority-P2 @Zephyr-IO-T28476 @Env-All Verify XML parser for dropbox when XML file is invalid", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
        await io.homePage.loadingTime();
        await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);

        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'dropbox');
        await io.flowBuilder.clickByText('Dropbox');

        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'DROPBOX CONNECTION');
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
        await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'Dropbox_Export')
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.click(selectors.exportsPagePO.FILE_TYPE);
        await io.flowBuilder.clickByText('XML');
        let fileInput1 = await page.$(selectors.basePagePO.UPLOAD_FILE);
        await fileInput1.setInputFiles("testData/inputData/Exports/T28409.xml");
        await io.connectionPage.addStep("Upload invalid xml");
        await io.flowBuilder.click(selectors.basePagePO.LAUNCH_PARSER);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.PREVIEW);
        await io.connectionPage.addStep("Clicking on preview");
        await expect(page.locator(selectors.exportsPagePO.ERROR_ACCORDION_SUMMARY)).toBeVisible();
    });
}); 
