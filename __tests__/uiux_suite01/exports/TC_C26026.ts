import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C26026_Verify 'View debug logs' not visible non-RT exports or imports", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test.afterEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("C26026_Verify 'View debug logs' not visible non-RT exports or imports", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'netsuite');
        await io.flowBuilder.click(selectors.connectionsPagePO.NETSUITE_CONNECTION);
        await io.flowBuilder.clickByText('Export records from source application');
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'NETSUITE CONNECTION');
        await io.flowBuilder.clickByText('NETSUITE CONNECTION');
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_C26026');
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.EXPORT_RECORDTYPE_ADD, 'Account')
        await io.flowBuilder.clickByText('Account');
        await io.flowBuilder.fill(`${selectors.flowBuilderPagePO.EXPORT_SAVED_SEARCH} input`, '59266')
        await io.homePage.click(selectors.flowBuilderPagePO.EXPORTTYPE);
        await io.flowBuilder.clickByText('All - always export all data');
        await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EXPORT);
        // Validating view debug not available in non-RT exports
        await expect(await page.locator(selectors.flowBuilderPagePO.EXPORT)).not.toHaveCSS("debug", "flowStepLogs");
        await io.homePage.click(selectors.basePagePO.CLOSE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_DESTINATION_OR_LOOKUP);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'netsuite');
        await io.flowBuilder.click(selectors.connectionsPagePO.NETSUITE_CONNECTION);
        await io.flowBuilder.clickByText("Import records into destination application");
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'NETSUITE CONNECTION');
        await io.flowBuilder.clickByText('NETSUITE CONNECTION');
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_C26026');
        await io.flowBuilder.click(selectors.flowBuilderPagePO.RECORD_TYPE);
        await io.flowBuilder.fill(`${selectors.flowBuilderPagePO.RECORD_TYPE} input`, 'Account')
        await io.flowBuilder.clickByText('Account');
        await io.flowBuilder.clickByText('Add');
        await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.IMPORT);
        // Validating view debug not available in non-RT imports
        await expect(await page.locator(selectors.flowBuilderPagePO.IMPORT)).not.toHaveCSS("debug", "flowStepLogs");
    });
}); 
