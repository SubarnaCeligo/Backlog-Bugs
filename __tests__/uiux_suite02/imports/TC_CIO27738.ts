import { test, expect } from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import CIO27738 from '@testData/Imports/CIO27738.json';

test.describe(`CIO27738_Verify MIME type data after cloning.`, () => {
    test(`@Env-All CIO27738 Verify MIME type data after cloning`, async ({ io, page }) => {
        await io.createResourceFromAPI(CIO27738, "FLOWS");
        await io.homePage.loadingTime()
        
        await io.flowBuilder.waitForElementAttached(selectors.integrationPagePO.OPENACTIONSMENU);
        await io.homePage.click(selectors.integrationPagePO.OPENACTIONSMENU);
        await io.flowBuilder.clickByText("Clone flow");
        await io.flowBuilder.clickByText("Please select");
        await io.flowBuilder.selectTextfromDropDown(page, process.env["IO_Integration_ID"])
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
        await io.flowBuilder.fill(selectors.integrationPagePO.INTEGRATION_PAGE_SEARCH_BAR, 'Clone - TC_CIO27738');
        await io.integrationPage.waitForElementAttached(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
        await io.integrationPage.click(selectors.flowBuilderPagePO.ACTIONS_SELECTOR);
        await io.flowBuilder.clickByTextByIndex("Clone - TC_CIO27738", 0);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.TRANSFER);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.TRANSFER);
        const defaultData = await io.importsPage.getText(selectors.importPagePO.MIMETYPE);
        await io.assert.expectToContainValue('Mime typeGoogle Audio', defaultData.toString(), "")
        });
});
