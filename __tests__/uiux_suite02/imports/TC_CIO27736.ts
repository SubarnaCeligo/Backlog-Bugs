import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('Verify if google drive import has a MIME type is a not a mandatory is field option', () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test('Verify if google drive import has a MIME type is a not a mandatory is field option', async({io,page}) => {
        await io.homePage.click(selectors.basePagePO.RESOURCES);
        await io.homePage.clickByText('Imports')
        await io.homePage.clickByText(' Create import')
        await io.importsPage.click(selectors.flowBuilderPagePO.GDRIVE)
        await io.importsPage.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
        await io.homePage.clickByText('GOOGLEDRIVE CONNECTION')
        await page.type(selectors.importPagePO.NAME, 'import');
        await io.homePage.clickByText('Next');
        await page.type(selectors.importPagePO.NAME, 'import');
        await io.flowBuilder.clickByText("Save & close");
        await io.assert.verifyElementNotBeFound(selectors.importPagePO.MIMETYPE_ERROR);
    });
  })

