import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";

test.describe("T2383 Verify AFE window in different browsers like Firefox, Safari and Chrome", () => {
    test("@Env-All @Zephyr-IO-T2383 @Priority-P2 T2383 Verify AFE window in different browsers like Firefox, Safari and Chrome", async ({io, page}) => {
        await io.exportsPage.addStep('*** Navigating to Exports Page ***');
        await io.exportsPage.navigateTo(io.data.links.EXPORTS_PAGE_URL)

        await io.exportsPage.addStep('*** Creating a new FTP Export ***');
        await io.exportsPage.click(selectors.exportsPagePO.ADD_NEW_RESOURCE);
        await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.APP_NAME_INPUT);
        await io.exportsPage.fill(selectors.connectionsPagePO.APP_NAME_INPUT, "FTP");
        await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.FTP_CONNECTION);
        await io.exportsPage.click(selectors.connectionsPagePO.FTP_CONNECTION);
        await io.exportsPage.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
        await io.exportsPage.waitForElementAttached(selectors.connectionsPagePO.CONNECTIONS_DROPDOWN_LIST);
        await io.exportsPage.clickByTextByIndex("FTP CONNECTION", 0);
        await io.exportsPage.waitForElementAttached(selectors.importPagePO.NAME);
        await io.exportsPage.fill(selectors.importPagePO.NAME, 'FTP Export');
        await io.exportsPage.loadingTime();
        await io.exportsPage.click(selectors.basePagePO.SAVE);

        await io.exportsPage.addStep('*** Opening AFE Editor ***');
        await io.exportsPage.click(selectors.flowBuilderPagePO.DIRECTORYHANLEBAR);
        await io.exportsPage.loadingTime();

        await io.exportsPage.addStep('*** Entering curly braces and verifying that handlebar window is available ***');
        await io.exportsPage.click(selectors.flowBuilderPagePO.RULE);
        await page.keyboard.type('{{');
        await io.exportsPage.loadingTime();
        await io.assert.verifyElementIsDisplayed(selectors.basePagePO.HANDLEBAR_POPPER, 'Handlebars window is not visible');

        await page.keyboard.type('{');
        await io.exportsPage.loadingTime();
        await io.assert.verifyElementIsDisplayed(selectors.basePagePO.HANDLEBAR_POPPER, 'Handlebars window is not visible');
    });
});