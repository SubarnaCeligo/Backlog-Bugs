import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C22764_Verify for the preview data panel the dropdown options are 10, 20, 30... 90, 100(multiple of 10)", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test.afterEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All @Zephyr-IO-T8190 C22764_Verify for the preview data panel the dropdown options are 10, 20, 30... 90, 100(multiple of 10) UI_Backlog", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
        await io.homePage.loadingTime()
        await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'Shopify');
        await io.homePage.loadingTime()
        await io.homePage.click(selectors.connectionsPagePO.SHOPIFY_CONNECTION);
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fillByIndex(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'SHOPIFY CONNECTION', 0);
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTION_OPTION_TEXT);
        await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'Shopify_Export');
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.homePage.loadingTime()
        await io.flowBuilder.click(selectors.flowBuilderPagePO.SELECT_PREVIEW_RECORDS);
        await io.homePage.loadingTime()
        await io.assert.verifyElementDisplayedByText('10', "Batch size not available")
    });
}); 
