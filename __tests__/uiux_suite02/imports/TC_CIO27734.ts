import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('Verify if google drive import has a MIME type has a help text', () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    });

    test('@Env-All Verify if google drive import has a MIME type has a help text', async ({ io, page }) => {
        await io.homePage.click(selectors.basePagePO.RESOURCES);
        await io.homePage.clickByText('Imports');
        await io.homePage.clickByText(' Create import');
        await io.importsPage.click(selectors.flowBuilderPagePO.GDRIVE);
        await io.importsPage.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
        await io.homePage.clickByText('GOOGLEDRIVE CONNECTION');
        await io.flowBuilder.fill(selectors.importPagePO.NAME, 'import');
        await io.homePage.clickByText('Next');
        await io.assert.verifyElementIsDisplayed(selectors.importPagePO.HELPTEXT_ICON_MIMETYPE, "MIME type help text is not displayed");
        await io.importsPage.click(selectors.importPagePO.HELPTEXT_ICON_MIMETYPE);
        const helptextContent = await io.importsPage.getText(selectors.importPagePO.HELPTEXT_DATA);
        expect(helptextContent).toBe('Choose the format of the files you\'re working with or querying in Google Drive. The default "Do Not Override" option allows Google Drive to automatically detect the file\'s MIME type. If specific operations require a particular MIME type, select it from the provided list. For a detailed list of MIME types, see to the Google Drive API MIME types guide.');
    });
});

