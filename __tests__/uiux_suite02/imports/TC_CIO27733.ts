import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('Verify if google drive import has a MIME type dropdown', () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test('@Env-All @Zephyr-IO-T18684 Verify if google drive import has a MIME type dropdown', async ({ io, page }) => {
        await io.homePage.click(selectors.basePagePO.RESOURCES);
        await io.homePage.clickByText('Imports')
        await io.homePage.clickByText(' Create import')
        await io.importsPage.click(selectors.flowBuilderPagePO.GDRIVE)
        await io.importsPage.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
        await io.homePage.clickByText('GOOGLEDRIVE CONNECTION')
        await io.flowBuilder.fill(selectors.importPagePO.NAME, 'import');
        await io.homePage.clickByText('Next');
        await io.assert.verifyElementIsDisplayed(selectors.importPagePO.MIMETYPE, "MIME type is not displayed");
    });
  })

