import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T28415_T28438_T28439_T28440 Verify XML parser for FTP,Gdrive,S3,dropbox for diff file size", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Epic-IO-47338 @Priority-P2 @Zephyr-IO-T28415 @Env-All Verify XML parser for FTP for diff file size", async ({ io, page }) => {
        
        //Navigate to exports page
        await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
        await io.homePage.loadingTime();
        
        //Select FTP
        await io.exportsPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.exportsPage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'ftp');
        await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.FTP_CONNECTION);
        await io.exportsPage.click(selectors.connectionsPagePO.FTP_CONNECTION);

        await io.exportsPage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.exportsPage.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'FTP CONNECTION');
        await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST);
        await io.exportsPage.clickByTextByIndex('FTP CONNECTION', 0);

        //FIll in details
        await io.exportsPage.fill(selectors.connectionsPagePO.NAME_INPUT, 'FTP_Export');
        await io.exportsPage.click(selectors.basePagePO.SAVE);
        await io.exportsPage.click(selectors.flowBuilderPagePO.ADVANCE);

        //Select File type
        await io.exportsPage.click(selectors.exportsPagePO.FILE_TYPE);
        await io.exportsPage.click(selectors.flowBuilderPagePO.XMLVALUE);

        //Upload a file exceeding 5MB
        let fileInput1 = await page.$(selectors.basePagePO.UPLOAD_FILE);
        await fileInput1.setInputFiles("testData/inputData/Exports/TC_T28415_T28438_T28439_T28440.xml");
        
        //Verify error message
        await io.exportsPage.waitForElementAttached(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR);
        let errorMessage = (await io.flowBuilder.getText(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR)).toString();
        await io.assert.expectToBeValue("File exceeds max file size", errorMessage, "Error message did not appear for large XML file");       
    });
    test("@Epic-IO-47338 @Priority-P2 @Zephyr-IO-T28438 @Env-All Verify XML parser for S3 for diff file size", async ({ io, page }) => {
        
        //Navigate to exports page
        await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
        await io.homePage.loadingTime();
        
        //Select S3
        await io.exportsPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.exportsPage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'S3');
        await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.S3_CONNECTION);
        await io.exportsPage.click(selectors.connectionsPagePO.S3_CONNECTION);

        await io.exportsPage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.exportsPage.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'S3 CONNECTION');
        await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST);
        await io.exportsPage.clickByTextByIndex('S3 CONNECTION', 0);

        //FIll in details
        await io.exportsPage.fill(selectors.connectionsPagePO.NAME_INPUT, 'AmazonS3_Export');
        await io.exportsPage.click(selectors.basePagePO.SAVE);
        await io.exportsPage.click(selectors.flowBuilderPagePO.ADVANCE);

        //Select File type
        await io.exportsPage.click(selectors.exportsPagePO.FILE_TYPE);
        await io.exportsPage.click(selectors.flowBuilderPagePO.XMLVALUE);

        //Upload a file exceeding 5MB
        let fileInput1 = await page.$(selectors.basePagePO.UPLOAD_FILE);
        await fileInput1.setInputFiles("testData/inputData/Exports/TC_T28415_T28438_T28439_T28440.xml");
        
        //Verify error message
        await io.exportsPage.waitForElementAttached(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR);
        let errorMessage = (await io.flowBuilder.getText(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR)).toString();
        await io.assert.expectToBeValue("File exceeds max file size", errorMessage, "Error message did not appear for large XML file");       
    });
    test("@Epic-IO-47338 @Priority-P2 @Zephyr-IO-T28439 @Env-All Verify XML parser for dropbox for diff file size", async ({ io, page }) => {
        
        //Navigate to exports page
        await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
        await io.homePage.loadingTime();
        
        //Select dropbox
        await io.exportsPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.exportsPage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'DROPBOX');
        await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.DROPBOX);
        await io.exportsPage.click(selectors.flowBuilderPagePO.DROPBOX);

        await io.exportsPage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.exportsPage.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'DROPBOX CONNECTION');
        await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST);
        await io.exportsPage.clickByTextByIndex('DROPBOX CONNECTION', 0);

        //FIll in details
        await io.exportsPage.fill(selectors.connectionsPagePO.NAME_INPUT, 'DROPBOX_Export');
        await io.exportsPage.click(selectors.basePagePO.SAVE);
        await io.exportsPage.click(selectors.flowBuilderPagePO.ADVANCE);

        //Select File type
        await io.exportsPage.click(selectors.exportsPagePO.FILE_TYPE);
        await io.exportsPage.click(selectors.flowBuilderPagePO.XMLVALUE);

        //Upload a file exceeding 5MB
        let fileInput1 = await page.$(selectors.basePagePO.UPLOAD_FILE);
        await fileInput1.setInputFiles("testData/inputData/Exports/TC_T28415_T28438_T28439_T28440.xml");
        
        //Verify error message
        await io.exportsPage.waitForElementAttached(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR);
        let errorMessage = (await io.flowBuilder.getText(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR)).toString();
        await io.assert.expectToBeValue("File exceeds max file size", errorMessage, "Error message did not appear for large XML file");       
    });
    // Commenting below test as it is not valid now as per Epics
    // Epic 1: https://celigo.atlassian.net/browse/CON-8238
    // Epic 2: https://celigo.atlassian.net/browse/IO-79313
    /*
    test("@Epic-IO-47338 @Priority-P2 @Zephyr-IO-T28440  @Env-All Verify XML parser for GDrive for diff file size", async ({ io, page }) => {
        
        //Navigate to exports page
        await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
        await io.homePage.loadingTime();
        
        //Select GDrive
        await io.exportsPage.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.exportsPage.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'google drive');
        await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.GDRIVE);
        await io.exportsPage.click(selectors.flowBuilderPagePO.GDRIVE);

        await io.exportsPage.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.exportsPage.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'GOOGLEDRIVE CONNECTION');
        await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST);
        await io.exportsPage.clickByTextByIndex('GOOGLEDRIVE CONNECTION', 0);

        //FIll in details
        await io.exportsPage.fill(selectors.connectionsPagePO.NAME_INPUT, 'Gdrive_Export');
        await io.exportsPage.click(selectors.basePagePO.SAVE);
        await io.exportsPage.click(selectors.flowBuilderPagePO.ADVANCE);

        //Select File type
        await io.exportsPage.click(selectors.exportsPagePO.FILE_TYPE);
        await io.exportsPage.click(selectors.flowBuilderPagePO.XMLVALUE);

        //Upload a file exceeding 5MB
        let fileInput1 = await page.$(selectors.basePagePO.UPLOAD_FILE);
        await fileInput1.setInputFiles("testData/inputData/Exports/TC_T28415_T28438_T28439_T28440.xml");
        
        //Verify error message
        await io.exportsPage.waitForElementAttached(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR);
        let errorMessage = (await io.flowBuilder.getText(selectors.basePagePO.VALUE_MUST_BE_PROVIDED_ERROR)).toString();
        await io.assert.expectToBeValue("File exceeds max file size", errorMessage, "Error message did not appear for large XML file");       
    });*/

}); 
