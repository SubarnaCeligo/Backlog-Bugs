import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C106839_Test to validate that the user is getting help text, help syntax, able to edit the expression, and should be able to select any item from the Fields section and include it in the expression -->>FTP Connection/export/import/lookup", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test.afterEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C106839_Test to validate that the user is getting help text, help syntax, able to edit the expression, and should be able to select any item from the Fields section and include it in the expression -->>FTP Connection/export/import/lookup", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
        await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'ftp');
        await io.flowBuilder.click(selectors.connectionsPagePO.FTP_CONNECTION);
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'FTP CONNECTION');
        await io.flowBuilder.clickByTextByIndex('FTP connection', 0);
        await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'FTP_Export');
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.clickByIndex(selectors.flowBuilderPagePO.FTPDIRECTORYPATH, 1);
        await io.flowBuilder.fillByIndex(selectors.flowBuilderPagePO.EM2DOT0PO.ACE_EDITOR_INPUT, '{{', 3);
        // User able to edit the expression
        await io.flowBuilder.clickByText('Numeric');
        await io.flowBuilder.clickByText('abs');
        await io.flowBuilder.clickByText('connection');
    });
}); 
