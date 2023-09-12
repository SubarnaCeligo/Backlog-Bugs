import {expect, test} from "@celigo/ui-core-automation";
import * as selectors from "@celigo/aut-selectors";
import C51626 from "../../../testData/EM2.0/TC_C51626.json"

test.describe("C51643 Verify the default view by clicking on the Error count in the (within a flow bubble, flow step drawer, run console, or run history)", () => {
    test("C51643 Verify the default view by clicking on the Error count in the (within a flow bubble, flow step drawer, run console, or run history)", async ({io, page}) => {
        const errorFlowId = await io.fillFormUI(C51626, "FLOWS");
        await io.api.runBatchFlowViaAPI('TC_C51626', errorFlowId);
        const lastRun = page.getByText('Last run')
        await lastRun.waitFor({state: 'visible',timeout:60000*3});
        await page.getByText("1 error").nth(1).click();
        await io.assert.verifyElementAttribute(selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS,'aria-selected', 'true')
        await io.flowBuilder.waitForElementAttached(selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS_TABLE_ROWS);
        await io.assert.verifyElementAttributeContainsText(selectors.flowBuilderPagePO.EM2dot0PO.OPEN_ERRORS_TABLE_ROWS,'class','Mui-selected');
        await io.assert.verifyElementIsDisplayed(selectors.flowBuilderPagePO.EM2dot0PO.ACE_EDITOR_INPUT,"Unable to locate Ace Editor Input");
        await io.assert.verifyElementDisplayedByText("Error details","Unable to verify Error details")
        
    });
});
