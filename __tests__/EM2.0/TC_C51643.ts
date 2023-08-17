import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51626 from "../../testData/EM2.0/TC_C51626.json"

test.describe("C51643 Verify the default view by clicking on the Error count in the (within a flow bubble, flow step drawer, run console, or run history)", () => {
    test("C51643 Verify the default view by clicking on the Error count in the (within a flow bubble, flow step drawer, run console, or run history)", async ({io, page}) => {
        const errorFlowId = await io.fillForm(C51626, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51626', errorFlowId);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible'});
        await page.getByText("1 error").nth(1).click();
        await expect(page.locator(selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS)).toHaveAttribute('aria-selected', 'true');
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS_TABLE_ROWS);
        const errorList = await page.$$(selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS_TABLE_ROWS);
        expect(await errorList[0].getAttribute('class')).toContain('Mui-selected');
        expect(page.locator(selectors.flowBuilderPagePO.EM2dot0PO.ACE_EDITOR_INPUT)).toBeDefined();
        expect(page.getByText('Error details')).toBeDefined();
    });
});
