import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51661 from '../../testData/EM2.0/TC_C51661.json';

test.describe("C51637 Verify the drawer title, tab titles and tab order in the 'Resolved Error' drawer", () => {
    test("C51637 Verify the drawer title, tab titles and tab order in the 'Resolved Error' drawer", async ({io, page}) => {
        const errorFlowId = await io.fillFormUI(C51661, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51661', errorFlowId);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible'});
        await page.getByText("1 error").nth(1).click();
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.TOGGLE_VIEW_DROPDOWN);
        const options = await page.$$(selectors.flowBuilderPagePO.EM2dot0PO.TOGGLE_VIEW_DROPDOWN_OPTIONS);
        options[1].click();
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU_RESOLVE_ERROR);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.RESOLVED_ERRORS_TAB);
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU_EDIT_RETRY_DATA);
        const errorDetails = await page.$("text='Error details'");
        const editRetryData = await page.$("text='Edit retry data'");
        const httpRequest = await page.$("text='HTTP request'");
        const httpResponse = await page.$("text='HTTP response'");
        const errorFields = await page.$("text='Error fields'");
        expect(errorDetails).not.toBe(null);
        expect(editRetryData).not.toBe(null);
        expect(httpRequest).not.toBe(null);
        expect(httpResponse).not.toBe(null);
        expect(errorFields).not.toBe(null);
    });
  });