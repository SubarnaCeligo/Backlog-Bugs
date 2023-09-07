import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51626 from "../../../testData/EM2.0/TC_C51626.json"

test.describe("C51638 Verify the Footer buttons in the Error details tab of Resolved Errors drawer", () => {
    test("C51638 Verify the Footer buttons in the Error details tab of Resolved Errors drawer", async ({io, page}) => {
        const errorFlowId = await io.fillFormUI(C51626, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51626', errorFlowId);
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
        //await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU);
        await io.flowBuilder.click(selectors.flowBuilderPagePO.EM2dot0PO.ACTIONS_MENU_EDIT_RETRY_DATA);
        expect(await page.getByText("Save & retry")).toBeVisible();
        expect(await page.getByText("Save & close")).toBeVisible();
        expect(await page.getByText("Close")).toBeVisible();
    });
});
