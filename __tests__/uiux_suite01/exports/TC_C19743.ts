import { expect, test } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("C19743_Export Panel: Color code Export panel request/response/output like in the AFEs", () => {
    test.beforeEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test.afterEach(async ({ io }) => {
        await io.myAccountPage.navigateTo(io.data.links.HOME_PAGE_URL);
    });
    test("@Env-All @Zephyr-IO-T5582 C19743_Export Panel: Color code Export panel request/response/output like in the AFEs UI_Backlog", async ({ io, page }) => {
        await io.homePage.navigateTo(io.data.links.EXPORTS_PAGE_URL);
        await io.flowBuilder.click(selectors.basePagePO.ADD_NEW_RESOURCE);
        await io.flowBuilder.fill(selectors.settingsPagePO.APP_NAME_INPUT, 'netsuite');
        await io.flowBuilder.click(selectors.connectionsPagePO.NETSUITE_CONNECTION);
        await io.flowBuilder.click(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN);
        await io.flowBuilder.fill(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN, 'NETSUITE CONNECTION');
        await io.exportsPage.clickByTextByIndex('NETSUITE CONNECTION', 0);
        await io.homePage.fill(selectors.connectionsPagePO.NAME_INPUT, 'Netsuite_Export');
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        // Validating preview text panel colors
        await io.flowBuilder.clickByText('Preview');
        await io.flowBuilder.loadingTime()
        const previewColor= page.getByText("source").last();
        await expect(previewColor).toHaveCSS("color", "rgb(200, 40, 41)");
    });
}); 
