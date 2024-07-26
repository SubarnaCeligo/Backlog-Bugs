import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C25984_Verify the View debug logs option is available to only Listeners ie. webhook, realtime applications (NS & SF)", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test.afterEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All @Zephyr-IO-T4842 C25984_Verify the View debug logs option is available to only Listeners ie. webhook, realtime applications (NS & SF) UI_Backlog", async ({ io, page }) => {
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.homePage.loadingTime()
        await io.homePage.waitForElementAttached(selectors.flowBuilderPagePO.CREATEFLOW)
        await io.homePage.click(selectors.flowBuilderPagePO.CREATEFLOW);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.ADD_SOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'netsuite');
        await io.flowBuilder.click(selectors.connectionsPagePO.NETSUITE_CONNECTION);
        await io.flowBuilder.clickByText('Listen for real-time data from source application');
        await io.flowBuilder.click(selectors.basePagePO.CREATE_FROM_SCRATCH)
        await io.flowBuilder.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN)
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'NETSUITE CONNECTION');
        await io.exportsPage.clickByTextByIndex('NETSUITE CONNECTION', 0);
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.fill(selectors.connectionsPagePO.NAME_INPUT, 'TC_C25984');
        await io.flowBuilder.click(selectors.importPagePO.NETSUITE_DISTRIBUTED_RECORDTYPE);
        await io.flowBuilder.fill(`${selectors.importPagePO.NETSUITE_DISTRIBUTED_RECORDTYPE} input`, 'Account')
        await io.flowBuilder.clickByText('Account');
        await io.homePage.click(selectors.basePagePO.SAVE_AND_CLOSE);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.LISTENER);
        // Validating view debug available in NS
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.VIEW_DEBUG_LOG, 'view debug not available')

    });
}); 
