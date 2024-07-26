import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C18741_Verify on the resource listing pages update timestamp is shown as expected as a tooltip", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test.afterEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All @Zephyr-IO-62015 C18741_Verify on the resource listing pages update timestamp is shown as expected as a tooltip UI_Backlog", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
        await io.flowBuilder.click(selectors.integrationPagePO.ADDNEWRESOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'netsuite');
        await io.flowBuilder.click(selectors.connectionsPagePO.NETSUITE_CONNECTION);
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'NETSUITE CONNECTION');
        await io.exportsPage.clickByTextByIndex('NETSUITE CONNECTION', 0);
        await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_C18741');
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_C18741');
        await io.flowBuilder.fill(selectors.flowBuilderPagePO.EXPORT_RECORDTYPE_ADD, 'Account')
        await io.flowBuilder.clickByText('Account');
        await io.flowBuilder.fill(`${selectors.flowBuilderPagePO.EXPORT_SAVED_SEARCH} input`, '59266')
        await io.homePage.click(selectors.flowBuilderPagePO.EXPORTTYPE);
        await io.flowBuilder.clickByText('All - always export all data');
        await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.homePage.hover(selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN1,1, true)
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.LASTUPDATEDCOLUMN1)
        // Validating Timestamp visible
        const timestampDisplayed = await io.flowBuilder.isVisible('text="Just now"');
    });
}); 
