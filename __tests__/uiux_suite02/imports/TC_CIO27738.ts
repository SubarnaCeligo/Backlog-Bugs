import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import CIO27738 from '@testData/Imports/CIO27738.json';

test.describe(`CIO27738_Verify connection form base URI while cloning.`, () => {
    test(`CIO27738 Verify connection form base URI while cloning and run the flow`, async ({ io, page }) => {
        await io.createResourceFromAPI(CIO27738, "FLOWS");
        await io.flowBuilder.waitForElementAttached(selectors.integrationPagePO.OPENACTIONSMENU);
        await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
        await io.flowBuilder.clickByText("Clone flow");
        await io.flowBuilder.clickByText("Please select");
        await io.flowBuilder.clickByTextByIndex("Automation Flows", 0);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.CLONE_FLOW_BUTTON);
        await io.flowBuilder.clickByTextByIndex("Configure", 0);
        await io.flowBuilder.click(selectors.connectionsPagePO.EXISTING);
        await io.flowBuilder.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
        await io.flowBuilder.clickByIndex(selectors.basePagePO.MENU_ITEM, 1);
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.flowBuilder.clickByTextByIndex("Configure", 0);
        await io.flowBuilder.click(selectors.connectionsPagePO.EXISTING);
        await io.flowBuilder.click(selectors.exportsPagePO.CREATE_SELECT_CONNECTION);
        await io.flowBuilder.clickByIndex(selectors.basePagePO.MENU_ITEM, 1);
        await io.flowBuilder.click(selectors.basePagePO.SAVE);
        await io.homePage.navigateTo(process.env["IO_Integration_URL"]);
        await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
        await page.type(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Clone - TC_C0008');
        await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
        await io.integrationPage.click(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
        await io.flowBuilder.clickByTextByIndex("Clone - TC_C0008", 0);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
        const defaultData = await io.importsPage.getText(selectors.importPagePO.MIMETYPE);
        expect(defaultData).toBe('Google Audio');
        });
});
