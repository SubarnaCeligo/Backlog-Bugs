import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("TC_T28416_T28441_T28442_T28443 Verify XML parser for FTP,Gdrive,S3,dropbox with proper resource path and Parse strategy as Custom and Trim leading and trailing spaces checked", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Epic-IO-47338 @Priority-P2 @Zephyr-IO-T28416 @Env-All Verify XML parser for FTP with proper resource path and Parse strategy as Custom and Trim leading and trailing spaces checked", async ({ io, page }) => {

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

        //Upload a file 
        let fileInput1 = await page.$(selectors.basePagePO.UPLOAD_FILE);
        await fileInput1.setInputFiles("testData/inputData/Exports/TC_T28416_T28441_T28442_T28443.xml");

        //Valid resource path
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.RESOUCEPATH, '/Items/ns1:Item/ns1:ItemId');

        //Trim spaces
        await io.exportsPage.click(selectors.flowBuilderPagePO.TRIMSPACECHECKBOX);

        //Preview and validate response
        await io.flowBuilder.click(selectors.importPagePO.FETCH_PREVIEW);
        await io.homePage.loadingTime();
        await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.CONTENT);
        let previewData = (await io.exportsPage.getText(selectors.flowBuilderPagePO.CONTENT)).toString();
        await io.assert.expectToBeValue('{  "page_of_records": [    {      "record": "100001193354120"    }  ]}', previewData, 'Spaces are not trimmed');

        await io.flowBuilder.fill(selectors.flowBuilderPagePO.RESOUCEPATH, '/Items/ns1:Item/ns1:OrganizationId');
        await io.flowBuilder.click(selectors.importPagePO.FETCH_PREVIEW);
        await io.homePage.loadingTime();
        await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.CONTENT);
        previewData = (await io.exportsPage.getText(selectors.flowBuilderPagePO.CONTENT)).toString();
        await io.assert.expectToBeValue('{  "page_of_records": [    {      "record": "300000002130092"    }  ]}', previewData, 'Spaces are not trimmed');


    });
    test("@Epic-IO-47338 @Priority-P2 @Zephyr-IO-T28441 @Env-All Verify XML parser for S3 with proper resource path and Parse strategy as Custom and Trim leading and trailing spaces checked", async ({ io, page }) => {

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

        //Upload a file 
        let fileInput1 = await page.$(selectors.basePagePO.UPLOAD_FILE);
        await fileInput1.setInputFiles("testData/inputData/Exports/TC_T28416_T28441_T28442_T28443.xml");

        //Valid resource path
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.RESOUCEPATH, '/Items/ns1:Item/ns1:ItemId');

        //Trim spaces
        await io.exportsPage.click(selectors.flowBuilderPagePO.TRIMSPACECHECKBOX);

        //Preview and validate response
        await io.flowBuilder.click(selectors.importPagePO.FETCH_PREVIEW);
        await io.homePage.loadingTime();
        await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.CONTENT);
        let previewData = (await io.exportsPage.getText(selectors.flowBuilderPagePO.CONTENT)).toString();
        await io.assert.expectToBeValue('{  "page_of_records": [    {      "record": "100001193354120"    }  ]}', previewData, 'Spaces are not trimmed');

        await io.flowBuilder.fill(selectors.flowBuilderPagePO.RESOUCEPATH, '/Items/ns1:Item/ns1:ItemClass');
        await io.flowBuilder.click(selectors.importPagePO.FETCH_PREVIEW);
        await io.homePage.loadingTime();
        await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.CONTENT);
        previewData = (await io.exportsPage.getText(selectors.flowBuilderPagePO.CONTENT)).toString();
        await io.assert.expectToBeValue('{  "page_of_records": [    {      "record": "Inventory Item"    }  ]}', previewData, 'Spaces are not trimmed');

    });
    test("@Epic-IO-47338 @Priority-P2 @Zephyr-IO-T28442 @Env-All Verify XML parser for Dropbox with proper resource path and Parse strategy as Custom and Trim leading and trailing spaces checked", async ({ io, page }) => {

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

        //Upload a file 
        let fileInput1 = await page.$(selectors.basePagePO.UPLOAD_FILE);
        await fileInput1.setInputFiles("testData/inputData/Exports/TC_T28416_T28441_T28442_T28443.xml");

        //Valid resource path
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.RESOUCEPATH, '/Items/ns1:Item/ns1:ItemId');

        //Trim spaces
        await io.exportsPage.click(selectors.flowBuilderPagePO.TRIMSPACECHECKBOX);

        //Preview and validate response
        await io.flowBuilder.click(selectors.importPagePO.FETCH_PREVIEW);
        await io.homePage.loadingTime();
        await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.CONTENT);
        let previewData = (await io.exportsPage.getText(selectors.flowBuilderPagePO.CONTENT)).toString();
        await io.assert.expectToBeValue('{  "page_of_records": [    {      "record": "100001193354120"    }  ]}', previewData, 'Spaces are not trimmed');

        await io.flowBuilder.fill(selectors.flowBuilderPagePO.RESOUCEPATH, '/Items/ns1:Item/ns1:ItemClass');
        await io.flowBuilder.click(selectors.importPagePO.FETCH_PREVIEW);
        await io.homePage.loadingTime();
        await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.CONTENT);
        previewData = (await io.exportsPage.getText(selectors.flowBuilderPagePO.CONTENT)).toString();
        await io.assert.expectToBeValue('{  "page_of_records": [    {      "record": "Inventory Item"    }  ]}', previewData, 'Spaces are not trimmed');


        });

    // Commenting below test as it is not valid now as per Epics
    // Epic 1: https://celigo.atlassian.net/browse/CON-8238
    // Epic 2: https://celigo.atlassian.net/browse/IO-79313
    /*
    test("@Epic-IO-47338 @Priority-P2 @Zephyr-IO-T28443 @Env-All Verify XML parser for GDrive with proper resource path and Parse strategy as Custom and Trim leading and trailing spaces checked", async ({ io, page }) => {

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

        //Upload a file 
        let fileInput1 = await page.$(selectors.basePagePO.UPLOAD_FILE);
        await fileInput1.setInputFiles("testData/inputData/Exports/TC_T28416_T28441_T28442_T28443.xml");

        //Valid resource path
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.RESOUCEPATH, '/Items/ns1:Item/ns1:ItemId');

        //Trim spaces
        await io.exportsPage.click(selectors.flowBuilderPagePO.TRIMSPACECHECKBOX);

        //Preview and validate response
        await io.flowBuilder.click(selectors.importPagePO.FETCH_PREVIEW);
        await io.homePage.loadingTime();
        await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.CONTENT);
        let previewData = (await io.exportsPage.getText(selectors.flowBuilderPagePO.CONTENT)).toString();
        await io.assert.expectToBeValue('{  "page_of_records": [    {      "record": "100001193354120"    }  ]}', previewData, 'Spaces are not trimmed');

        await io.flowBuilder.fill(selectors.flowBuilderPagePO.RESOUCEPATH, '/Items/ns1:Item/ns1:ItemNumber');
        await io.flowBuilder.click(selectors.importPagePO.FETCH_PREVIEW);
        await io.homePage.loadingTime();
        await io.exportsPage.waitForElementAttached(selectors.flowBuilderPagePO.CONTENT);
        previewData = (await io.exportsPage.getText(selectors.flowBuilderPagePO.CONTENT)).toString();
        await io.assert.expectToBeValue('{  "page_of_records": [    {      "record": "N000082D012A"    }  ]}', previewData, 'Spaces are not trimmed');
      
    });*/
}); 
