import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('Verify if Google Drive import has a MIME type with the list of data', () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    });

    test('@Env-All CIO27741, CIO27742 and CIO27743 Verify if Google Drive import has a MIME type for audio documents,document files,Drive SDK files,drawings,general files,folders,forms,Fusion Tables,Jamboard files,mail layout documents,maps,photos,presentations,scripts,shortcuts,sites,spreadsheets,unknown files and videos', async ({ io, page }) => {
        await io.homePage.click(selectors.basePagePO.RESOURCES);
        await io.homePage.clickByText('Imports');
        await io.homePage.clickByText(' Create import');
        await io.importsPage.click(selectors.flowBuilderPagePO.GDRIVE);
        await io.importsPage.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
        await io.homePage.clickByText('GOOGLEDRIVE CONNECTION');
        await io.flowBuilder.fill(selectors.importPagePO.NAME, 'import');
        await io.homePage.clickByText('Next');
        await io.importsPage.click(selectors.importPagePO.MIMETYPE);
        await io.flowBuilder.selectStaticDropDown(selectors.importPagePO.MIMETYPE, "Email layout");
        await io.assert.verifyElementDisplayedByText("Email layout","error if val not found");
        await io.assert.verifyElementDisplayedByText("Google Apps Script","error if val not found");
        await io.assert.verifyElementDisplayedByText("Google Audio","error if val not found");
        await io.assert.verifyElementDisplayedByText("Google Docs","error if val not found");
        await io.assert.verifyElementDisplayedByText("Google Drawings","error if val not found");
        await io.assert.verifyElementDisplayedByText("Google Forms","error if val not found");
        await io.assert.verifyElementDisplayedByText("Google Drive folder","error if val not found");
        await io.assert.verifyElementDisplayedByText("Google Drive file","error if val not found");
        await io.assert.verifyElementDisplayedByText("Google Forms","error if val not found");
        await io.homePage.clickByText('Google Forms');
        await io.flowBuilder.waitForText(selectors.importPagePO.MIMETYPE, "Google Forms");
        await io.importsPage.click(selectors.importPagePO.MIMETYPE);
        await io.assert.verifyElementDisplayedByText("Google Fusion Tables","error if val not found");
        await io.assert.verifyElementDisplayedByText("Google Jamboard","error if val not found");
        await io.assert.verifyElementDisplayedByText("Google My Maps","error if val not found");
        await io.assert.verifyElementDisplayedByText("Google Photos","error if val not found");
        await io.assert.verifyElementDisplayedByText("Google Sheets","error if val not found");
        await io.homePage.clickByText('Google Sheets');
        await io.flowBuilder.waitForText(selectors.importPagePO.MIMETYPE, "Google Sheets");
        await io.importsPage.click(selectors.importPagePO.MIMETYPE);
        await io.assert.verifyElementDisplayedByText("Google Sites","error if val not found");
        await io.assert.verifyElementDisplayedByText("Google Slides","error if val not found");
        await io.assert.verifyElementDisplayedByText("Google Video","error if val not found");
        await io.homePage.clickByText('Google Video');
        await io.flowBuilder.waitForText(selectors.importPagePO.MIMETYPE, "Google Video");
        await io.importsPage.click(selectors.importPagePO.MIMETYPE);
        await io.assert.verifyElementDisplayedByText("Shortcut","error if val not found");
        await io.assert.verifyElementDisplayedByText("Third-party shortcut","error if val not found");
        await io.assert.verifyElementDisplayedByText("Unknown","error if val not found");
    });
});

