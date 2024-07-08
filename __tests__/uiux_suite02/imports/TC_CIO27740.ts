import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe('Verify if other file providers should not have MIME type', () => {
    test.beforeEach(async ({ io }) => {
        await io.homePage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test('@Env-All Verify if other file providers should not have MIME type ', async({io,page}) => {
        await io.homePage.click(selectors.basePagePO.RESOURCES);
        await io.homePage.clickByText('Imports')
        await io.homePage.clickByText(' Create import')
        await io.importsPage.click(selectors.flowBuilderPagePO.AMAZONS3)
        await io.importsPage.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
        await io.homePage.clickByText('S3 CONNECTION')
        await io.flowBuilder.fill(selectors.importPagePO.NAME, 'import');
        await io.homePage.clickByText('Next');
        const mimeType = await io.homePage.isVisible(selectors.importPagePO.MIMETYPE)
        await io.assert.expectToBeValue(mimeType.toString(), "false", "Field MIME type is present for other file provider imports");
    });
  })

